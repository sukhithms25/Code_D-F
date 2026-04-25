"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CinematicIntro } from "@/components/ui/cinematic-intro";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const [introStep, setIntroStep] = useState<'intro' | 'main'>('intro');
  const [showContent, setShowContent] = useState(false);

  const handleIntroComplete = () => {
    setIntroStep('main');
  };

  useEffect(() => {
    if (introStep === 'main') {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 1200); // Slightly longer delay to let the spotlight animation kick in
      return () => clearTimeout(timer);
    }
  }, [introStep]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white flex flex-col items-center justify-center p-4">
      <AnimatePresence>
        {introStep === 'intro' && (
          <CinematicIntro onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Main Feature Card - The "Splite" Demo Structure */}
      <div 
        className={`w-full max-w-6xl transition-all duration-1500 ease-out ${
          introStep === 'main' ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <Card className="w-full min-h-[500px] md:h-[650px] bg-black/[0.96] border-neutral-800 relative overflow-hidden rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,1)]">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          <div className="flex flex-col md:flex-row h-full">
            {/* Left content - UI and Text */}
            <div className="flex-1 p-10 md:p-16 relative z-10 flex flex-col justify-center text-left order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={showContent ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
                    CODE-D-F
                  </h1>
                  <p className="text-lg md:text-xl text-neutral-400 max-w-lg leading-relaxed font-light italic">
                    AI-Powered Personalized Learning & Academic Roadmap Orchestrator. Build your future in 3D.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="h-14 px-10 text-lg font-bold bg-white text-black hover:bg-neutral-200 rounded-full transition-all hover:scale-105" asChild>
                    <Link href="/login">Launch App</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 border-neutral-700 px-10 text-lg font-semibold transition-all hover:bg-white/5 rounded-full hover:border-neutral-500"
                    asChild
                  >
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-3 pt-4">
                  {["AI Roadmap", "3D Analytics", "HOD Portal", "Next-Gen UI"].map((tag) => (
                    <span key={tag} className="px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right content - Spline Robot */}
            <div className="flex-1 relative h-[300px] md:h-auto order-1 md:order-2">
              <AnimatePresence>
                {introStep === 'main' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="w-full h-full"
                  >
                    <SplineScene 
                      scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                      className="w-full h-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer Minimalist */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 0.4 } : { opacity: 0 }}
        className="mt-12 text-[10px] uppercase tracking-[0.4em] text-neutral-500"
      >
        © 2024 CODE-D-F Platform. Experience Design by 21st.dev
      </motion.footer>
    </main>
  );
}
