'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import { Loader } from 'lucide-react';

import { useGetCallById } from '@/hooks/useGetCallById';
import Alert from '@/components/Alert/Alert';
import MeetingSetup from '@/components/MeetingSetup/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom/MeetingRoom';

const MeetingPage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // Now AFTER calling hooks, we can safely return based on conditions

  if (!id) {
    return (
      <p className="text-center text-3xl font-bold text-white">
        No Meeting ID Provided
      </p>
    );
  }

  if (!isLoaded || isCallLoading) return <Loader />;

  if (!call) {
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );
  }

  const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed) {
    return <Alert title="You are not allowed to join this meeting" />;
  }

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
