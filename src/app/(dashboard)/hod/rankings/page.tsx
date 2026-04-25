"use client";

import { motion } from "framer-motion";
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star,
  ChevronUp,
  ChevronDown,
  TrendingUp
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const rankings = [
  { rank: 1, name: "Sneha Reddy", score: 982, cgpa: 9.8, status: "up", avatar: "SR" },
  { rank: 2, name: "Rahul Sharma", score: 965, cgpa: 9.6, status: "up", avatar: "RS" },
  { rank: 3, name: "Priya Singh", score: 954, cgpa: 9.5, status: "stable", avatar: "PS" },
  { rank: 4, name: "Amit Patel", score: 942, cgpa: 9.4, status: "down", avatar: "AP" },
  { rank: 5, name: "Neha Gupta", score: 928, cgpa: 9.2, status: "up", avatar: "NG" },
];

export default function HODRankingsPage() {
  return (
    <div className="space-y-8 pb-12">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
             Department Rankings <Trophy className="h-8 w-8 text-amber-400" />
          </h1>
          <p className="text-gray-400">Recognizing excellence across the Computer Science department.</p>
        </div>
      </section>

      {/* Podium Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        {[2, 1, 3].map((pos, i) => {
          const student = rankings.find(r => r.rank === pos)!;
          const isWinner = pos === 1;
          
          return (
            <motion.div
              key={pos}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative order-${pos} glass rounded-3xl p-8 flex flex-col items-center text-center border-white/5 ${
                isWinner ? "md:-translate-y-8 border-amber-500/20 bg-gradient-to-t from-amber-500/5 to-transparent" : ""
              }`}
            >
              {isWinner && (
                <div className="absolute top-[-24px] left-1/2 -translate-x-1/2">
                   <Crown className="h-10 w-10 text-amber-400 fill-amber-400/20 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                </div>
              )}
              
              <div className={`h-24 w-24 rounded-3xl mb-4 flex items-center justify-center text-2xl font-bold border-2 ${
                pos === 1 ? "border-amber-400 text-amber-400" :
                pos === 2 ? "border-zinc-400 text-zinc-400" :
                "border-orange-400 text-orange-400"
              } bg-zinc-900 shadow-xl`}>
                {student.avatar}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1">{student.name}</h3>
              <p className="text-gray-500 text-sm mb-4">Rank #{student.rank}</p>
              
              <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-white/5">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Score</p>
                  <p className="text-lg font-bold text-white">{student.score}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">CGPA</p>
                  <p className="text-lg font-bold text-white">{student.cgpa}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* List Section */}
      <div className="glass rounded-3xl border-white/5 p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Full Leaderboard</h2>
          <Badge className="bg-white/5 text-gray-400 border-none">Updated 10m ago</Badge>
        </div>
        
        <div className="space-y-4">
          {rankings.map((student, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-6">
                 <span className={`text-lg font-bold w-6 text-center ${
                   student.rank === 1 ? "text-amber-400" :
                   student.rank === 2 ? "text-zinc-400" :
                   student.rank === 3 ? "text-orange-400" :
                   "text-gray-600"
                 }`}>
                   {student.rank}
                 </span>
                 <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center font-bold text-sm text-gray-400">
                     {student.avatar}
                   </div>
                   <div>
                     <p className="font-semibold text-white group-hover:text-blue-400 transition-colors">{student.name}</p>
                     <p className="text-[10px] text-gray-500 uppercase tracking-widest">Computer Science</p>
                   </div>
                 </div>
              </div>
              
              <div className="flex items-center gap-12">
                <div className="hidden md:block text-center">
                  <p className="text-[10px] text-gray-500 uppercase mb-0.5">Performance</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-bold text-white">Stable</span>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                   {student.status === "up" ? <ChevronUp className="h-4 w-4 text-emerald-400" /> :
                    student.status === "down" ? <ChevronDown className="h-4 w-4 text-red-400" /> :
                    <span className="h-4 w-4 border-b-2 border-gray-400 mb-2" />}
                   <span className="font-mono font-bold text-white">{student.score} pts</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
