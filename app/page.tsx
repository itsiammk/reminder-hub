"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { GlowingStarsBackgroundCard } from "@/components/ui/glowing-stars";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden py-16 sm:py-0">
      <HeroHighlight>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="pt-20 pb-24 text-center">
            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: [20, -5, 0],
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
            >
              With insomnia, nothing&apos;s real. Everything is far away.
              Everything is a{" "}
              <Highlight className="text-black dark:text-white">
                copy, of a copy, of a copy.
              </Highlight>
            </motion.h1>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:scale-105 transition">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Stay Connected
                </h3>
                <p className="text-gray-400">
                  Keep everyone in the loop with seamless sharing options
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:scale-105 transition">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Remind with Ease
                </h3>
                <p className="text-gray-400">
                  Choose your preferred notification method
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:scale-105 transition sm:col-span-2 md:col-span-1">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Multi-Channel
                </h3>
                <p className="text-gray-400">
                  Email, SMS, and WhatsApp notifications
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Link href="/events/new">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-110 cursor-pointer"
              >
                Create Event
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </HeroHighlight>
    </div>
  );
}
