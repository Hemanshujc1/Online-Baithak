"use client"
import React from 'react'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
const EndCallButton = () => {
    const call=useCall();
    const router = useRouter();
    const {useLocalParticipant}=useCallStateHooks();
    const localParticipant = useLocalParticipant();
    const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;
    if(!isMeetingOwner){return null;}
  return (
    // error in color apply nhi ho raha hai
    <Button onClick={async () => {
        await call.endCall();
        router.push('/homepage')
    }} className="bg-red-700 text-xs font-bold" >
        End Call for Everyone
    </Button>
  )
}
export default EndCallButton
