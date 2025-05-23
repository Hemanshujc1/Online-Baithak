"use client";
import React, { useState } from "react";
import HomeCard from "../ui/HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "../MeetingModal/MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker";
import Loader from "../Loader/Loader";
import { Input } from "@/components/ui/input";
import { isToday } from "date-fns";

const roundToNearestMinutes = (date: Date, interval: number) => {
  const ms = 1000 * 60 * interval; // interval in milliseconds
  return new Date(Math.ceil(date.getTime() / ms) * ms);
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setmeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();

  if (!client || !user) return <Loader />;

  const createMeeting = async () => {
    if (!client || !user) {
      return;
    }
    try {
      if (!values.dateTime) {
        toast("Please select a date and time");
        return;
      }
      // crypto is global property
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) {
        throw new Error("Failed to create call");
      }
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast("Meeting Created");
    } catch (error) {
      console.log(error);
      toast("Failed to create Meeting");
    }
  };
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        classsName="bg-[#F59E0B]"
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an Instant Meeting"
        handleClick={() => setmeetingState("isInstantMeeting")}
      />
      <HomeCard
        classsName="bg-[#14B8A6]"
        //bg-yellow-1
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your Meeting"
        handleClick={() => setmeetingState("isScheduleMeeting")}
      />
      <HomeCard
        classsName="bg-[#8B5CF6]"
        //bg-purple-1
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your Recordings"
        handleClick={() => router.push("/recordings")}
      />
      <HomeCard
        classsName="bg-[#F43F5E]"
        // bg-blue-1
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        handleClick={() => setmeetingState("isJoiningMeeting")}
      />

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setmeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-[#E4E4E7]">
              Add a Description
            </label>
            <Textarea
              className="bg-[#20262E] border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
            />
            <div className="flex w-full flex-col gap-2.5">
              <label className="text-base text-normal leading-[22px] text-[#E4E4E7]">
                Select Date and Time
              </label>
              {/* <ReactDatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date! })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                timeCaption="time"
                dateFormat="MMM d, yyyy h:mm aa"
                className="w-full rounded bg-[#20262E] p-2 focus:outline-none"
              /> */}
              <ReactDatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date! })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                timeCaption="time"
                dateFormat="MMM d, yyyy h:mm aa"
                className="w-full rounded bg-[#20262E] p-2 focus:outline-none"
                minDate={new Date()}
                minTime={
                  isToday(values.dateTime)
                    ? roundToNearestMinutes(new Date(), 5)
                    : new Date(new Date().setHours(0, 0, 0, 0))
                }
                maxTime={new Date(new Date().setHours(23, 59, 59, 999))} />
            </div>
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setmeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast("Link copied");
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setmeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setmeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          className="border-none bg-[#101418] focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
