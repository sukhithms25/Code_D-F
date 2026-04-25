"use client";

import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Clock, 
  BarChart3, 
  Award,
  ChevronRight,
  TrendingUp,
  BookOpen
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const progressStats = [
  { module: "Module 1: Web Foundations", progress: 100, status: "Completed", date: "Jan 12, 2024" },
  { module: "Module 2: React Deep Dive", progress: 65, status: "In Progress", date: "Active now" },
  { module: "Module 3: Advanced Node.js", progress: 0, status: "Not Started", date: "Unlock soon" },
];

export default function StudentProgressPage() {
  return (
    <div className="space-y-8 pb-12">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-white">My Progress</h1>
          <p className="text-gray-400">Detailed breakdown of your academic journey and milestones.</p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-3xl p-6 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
            <Clock className="h-6 w-6" />
          </div>
          <div>
             <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Learning Time</p>
             <p className="text-2xl font-bold text-white">124.5h</p>
          </div>
        </div>
        <div className="glass rounded-3xl p-6 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
             <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Avg. Quiz Score</p>
             <p className="text-2xl font-bold text-white">88%</p>
          </div>
        </div>
        <div className="glass rounded-3xl p-6 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400">
            <Award className="h-6 w-6" />
          </div>
          <div>
             <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Achievements</p>
             <p className="text-2xl font-bold text-white">12 Locked</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass rounded-3xl p-8 border-white/5 space-y-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-400" /> Module Progress
          </h2>
          <div className="space-y-8">
            {progressStats.map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white">{item.module}</h4>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                  <Badge variant="outline" className={
                    item.status === "Completed" ? "bg-emerald-500/10 text-emerald-400 border-none" :
                    item.status === "In Progress" ? "bg-blue-500/10 text-blue-400 border-none" :
                    "bg-white/5 text-gray-500 border-none"
                  }>
                    {item.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                     <span>Progression</span>
                     <span>{item.progress}%</span>
                   </div>
                   <Progress value={item.progress} className="h-2 bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass rounded-3xl p-8 border-emerald-500/10 bg-gradient-to-br from-emerald-900/10 to-transparent">
             <div className="flex items-center justify-between mb-8">
               <h2 className="text-xl font-bold text-white flex items-center gap-2">
                 <TrendingUp className="h-5 w-5 text-emerald-400" /> Skill Growth
               </h2>
               <Link href="/student/roadmap" className="text-xs text-blue-400 hover:text-blue-300">Detailed Stats</Link>
             </div>
             <div className="space-y-4">
               {["Frontend Architecture", "State Management", "API Design", "Security"].map((skill, i) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                   <span className="text-sm text-gray-300">{skill}</span>
                   <div className="flex items-center gap-2">
                     <div className="h-1 w-20 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${80 - (i * 10)}%` }} />
                     </div>
                     <span className="text-[10px] font-bold text-emerald-400">+{Math.floor(Math.random() * 5 + 2)}%</span>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="glass rounded-3xl p-8 border-white/5">
             <h2 className="text-xl font-bold text-white mb-6">Recent Badges</h2>
             <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center border border-white/5 group hober:scale-110 transition-transform cursor-pointer">
                    <Award className="h-8 w-8 text-white/50 group-hover:text-blue-400 transition-colors" />
                  </div>
                ))}
                <div className="h-16 w-16 rounded-2xl bg-white/5 border border-dashed border-white/10 flex items-center justify-center">
                   <Plus className="h-6 w-6 text-gray-700" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Plus } from "lucide-react";
