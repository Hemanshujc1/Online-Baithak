"use client";
import React, { useState, useEffect } from "react";
import MeetingTypeList from "@/components/MeetingTypeList/MeetingTypeList";
import { useGetCalls } from "@/hooks/useGetCalls";
import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";
const Home = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const { upcomingCalls, isLoading } = useGetCalls();

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
            <p className="text-lg font-medium text-[#C9DDFF] lg:text-2xl">
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
