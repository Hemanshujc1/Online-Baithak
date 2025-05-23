import React, {useEffect, useState } from "react";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  // CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users, Copy } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "../EndCallButton/EndCallButton";
import Loader from "../Loader/Loader";
import { toast } from "sonner";
import TooltipButton from "../TooltipButton/TooltipButton";

// 'personal'=> !'personal' => false = !false =>true;
// undefined =>!undefined=> true => !true =>true;
type CalllayoutType = "grid" | "speaker-left" | "speaker-right";
const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const router = useRouter();
  const [layout, setLayout] = useState<CalllayoutType>("grid");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 767);
      };
  
      handleResize(); // Initial check
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  


  if (callingState !== CallingState.JOINED) {
    return <Loader />;
  }

 
  
 const CallLayout = () => {
     if (isMobile) return <PaginatedGridLayout groupSize={4} />;
     switch (layout) {
       case "grid":
         return <PaginatedGridLayout groupSize={6} />;
       case "speaker-right":
         return <SpeakerLayout participantsBarPosition="left" />;
       default:
         return <SpeakerLayout participantsBarPosition="right" />;
     }
   };
  
 

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      {/* grids */}
      <div className="relative flex size-full items-center justify-center px-5 py-6">
        <div className="flex size-full max-w-[1000px] items-center justify-center">
          <CallLayout />
        </div>
        <div
          className={cn(
            "absolute right-0 top-0 h-[90vh] w-[40vw] bg-[#101418] transition-transform duration-300 px-4 py-6 rounded-2xl",
            {
              "translate-x-0": showParticipants,
              "translate-x-full": !showParticipants,
            }
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      {/* Controls */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 flex flex-wrap w-[80vw] items-center justify-center gap-5 px-4 pb-3">
        <CallControls onLeave={() => router.push("/homepage")} />
        {!isMobile && (
        <DropdownMenu>
          <div className="flex items-center relative group justify-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
             
              <LayoutList size={18} className="text-white" />
            </DropdownMenuTrigger>
            <div className="absolute bottom-full mb-2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
              <div className="rounded-md bg-[#4c535b] px-3 py-1.5 text-[13px] text-white font-semibold shadow-md whitespace-nowrap">
                Change Layout
              </div>
              <div className="h-2 w-2 rotate-45 bg-[#4c535b] mt-[-4px]"></div>
            </div>
          </div>
          <DropdownMenuContent className="border-[#101418] bg-[#101418] text-white">
            {/* border-dark-1 bg-dark-1  */}
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setLayout(item.toLowerCase() as CalllayoutType);
                  }}
                >
                  {item}
                </DropdownMenuItem>
                {/* border-dark-1 */}
                <DropdownMenuSeparator className="border-[#101418]" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
         )}
        <TooltipButton
          icon={Copy}
          tooltip="Copy Meet Link"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast("Link Copied");
          }}
        />
        <TooltipButton
          icon={Users}
          tooltip="Show Participants"
          onClick={() => setShowParticipants((prev) => !prev)}
        />
        {!isPersonalRoom && <EndCallButton />}
      </div>

    </section>
  );
};

export default MeetingRoom;
