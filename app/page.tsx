"use client";
import React, { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import { motion } from "framer-motion";
import { CircleArrowRight } from "lucide-react";

const Page = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/homepage");
    }
  }, [isSignedIn, router]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-950 text-white pt-20">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-10 items-center">
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold leading-tight"
            >
              Connect. Collaborate. Create.
            </motion.h1>
            <p className="text-lg text-gray-400">
              Seamless video conferencing for professionals, teams, and
              creatives.
            </p>
            <div className="flex space-x-4 text-3xl items-center align-middle">
              <h1>Watch OnlineBaithak in Action</h1>
              <CircleArrowRight size={44} />
            </div>
          </div>
          <div className="relative w-full h-[385px] rounded-xl">
            <video
              className="rounded-xl shadow-lg"
              src="/demo-video.mp4"
              poster="/images/video-thumbnail.png"
              controls
              muted
              autoPlay
            />
          </div>
        </section>

        <section className="p-10 bg-gray-900 text-center">
          <h2 className="text-3xl font-semibold mb-8">Why OnlineBaithak?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Secure & Private", emoji: "🔒" },
              { title: "Lightning Fast", emoji: "⚡" },
              { title: "Browser-Based", emoji: "🌐" },
              { title: "Multi-device", emoji: "📱" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-800 p-6 rounded-2xl shadow-xl"
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </div>
            ))}
          </div>
        </section>

        <footer className="p-6 text-center text-sm text-gray-500 border-t border-gray-800">
          <p>© 2025 OnlineBaithak</p>
        </footer>
      </div>
    </>
  );
};

export default Page;
