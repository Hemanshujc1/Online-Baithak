"use client";
import React, { useState, useEffect } from "react";
import MeetingTypeList from "@/components/MeetingTypeList/MeetingTypeList";
import { useGetCalls } from "@/hooks/useGetCalls";
import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const Home = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const { upcomingCalls, isLoading } = useGetCalls();
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (showJoinPopup) {
      const timer = setTimeout(() => {
        setShowJoinPopup(false);
      }, 10000); // 10 seconds
      return () => clearTimeout(timer);
    }
  }, [showJoinPopup]);

  const handleCountdownComplete = () => {
    setShowJoinPopup(true); // show the Join Meeting button
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      // Format time as "10:45"
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour12: false, // 24-hour format
        hour: "2-digit",
        minute: "2-digit",
      });

      setTime(formattedTime);
      setDate(formattedDate);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  const sortedUpcomingCalls = [...(upcomingCalls || [])].sort((a, b) => {
    const aTime = a?.state?.startsAt
      ? new Date(a.state.startsAt).getTime()
      : Infinity;
    const bTime = b?.state?.startsAt
      ? new Date(b.state.startsAt).getTime()
      : Infinity;
    return aTime - bTime;
  });
  const nextMeeting = sortedUpcomingCalls[0];

  const nextMeetingTime = nextMeeting?.state?.startsAt
    ? new Date(nextMeeting.state.startsAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;
  const now = new Date();

  const currentMeeting = sortedUpcomingCalls.find((call) => {
    const start = call?.state?.startsAt ? new Date(call.state.startsAt) : null;

    if (!start) return false;

    const timeDiffInMinutes = (now.getTime() - start.getTime()) / (1000 * 60);
    return timeDiffInMinutes >= 0 && timeDiffInMinutes <= 5; // within last 10 minutes
  });
  const meetingToJoin = currentMeeting || nextMeeting;

  return (
      <section className="flex size-full flex-col gap-10 text-white">
        <div className="h-[300px] w-full rounded-[20px] bg_hero bg-cover banner">
          <div className="flex h-full flex-col justify-between gap-4 max-md:px-5 max-md:py-8 lg:p-11 py-4 px-4">
            <div className="glassmorphism flex flex-row items-around justify-center max-w-[450px] rounded-2xl py-4 px-8 text-center gap-5 text-white text-[14px]">
              {isLoading ? (
                <span>Loading...</span>
              ) : nextMeetingTime ? (
                <>
                  <div className="flex flex-wrap items-center bg-blue-500 font-semibold px-6 py-0 rounded-full">
                    <span>Upcoming Meeting</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <h3 className="text-4xl font-bold text-white">
                      {nextMeetingTime}
                    </h3>
                    {nextMeeting?.state?.startsAt && (
                      <span className="text-sm text-gray-500 animate-fade-in-slow">
                        <CountdownTimer
                          targetTime={new Date(nextMeeting.state.startsAt)}
                          onComplete={handleCountdownComplete}
                        />
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <span>No Upcoming Meeting</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
              <p className="text-lg font-medium text-[#D4D4D8] lg:text-2xl">
                {date}
              </p>
            </div>
          </div>
        </div>
        <MeetingTypeList />
        {showJoinPopup && (
          <div className="absolute top-10 right-10 bg-white text-black px-4 py-3 rounded-xl shadow-md z-50 flex items-center gap-4">
            <button
              onClick={() => router.push(`/meeting/${meetingToJoin?.id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Join Meeting
            </button>
            <button onClick={() => setShowJoinPopup(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </section>
  );
};

export default Home;
