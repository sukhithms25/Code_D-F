"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Target, 
  Award, 
  BookOpen, 
  Zap, 
  ChevronRight,
  ArrowUpRight,
  Calendar,
  BrainCircuit,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { studentService } from "@/services/student.service";

const Container = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`glass rounded-3xl p-6 ${className}`}
  >
    {children}
  </motion.div>
);

export default function StudentDashboard() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [activeRoadmap, setActiveRoadmap] = useState<any>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [scoreRes, roadmapRes, recsRes] = await Promise.all([
          studentService.getScore(),
          studentService.getRoadmap(),
          studentService.getRecommendations()
        ]);

        // Process Stats
        const score = scoreRes.data?.data || {};
        setStats([
          { label: "Overall Progress", value: `${score.progress || 0}%`, change: "+2.5%", icon: TrendingUp, color: "text-blue-400" },
          { label: "Course Score", value: `${score.score || 0}/100`, change: score.grade || "N/A", icon: Target, color: "text-purple-400" },
          { label: "Level", value: score.currentLevel || "Beginner", change: "Syncing...", icon: Award, color: "text-amber-400" },
          { label: "Tasks Done", value: `${score.completedTasks || 0}/${score.totalTasks || 0}`, change: "Targeting...", icon: BookOpen, color: "text-emerald-400" },
        ]);

        setRecommendations(recsRes.data?.data || []);
        setActiveRoadmap(roadmapRes.data?.data || null);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchDashboardData();
    }
  }, [session]);

  if (loading) {
    return (
      <div className="h-[70vh] w-full flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Hello, <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">{session?.user?.firstName || "Student"}</span>
          </h1>
          <p className="text-gray-400 text-lg">Your AI mentor has optimized your learning path for today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="rounded-xl h-12 px-6 bg-white/5 hover:bg-white/10 border-white/10 text-white" variant="outline" asChild>
            <Link href="/student/profile">Edit Profile</Link>
          </Button>
          <Button className="rounded-xl h-12 px-6 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20" asChild>
            <Link href="/student/roadmap">View Full Roadmap</Link>
          </Button>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Container key={i} className="hover:bg-white/[0.07] transition-colors cursor-default group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 border border-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <Badge variant="outline" className="text-[10px] border-white/10 text-gray-400 uppercase tracking-wider">
                Real-time
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h3>
                <span className="text-sm font-medium text-emerald-400 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  {stat.change}
                </span>
              </div>
            </div>
          </Container>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Learning Path */}
        <Container className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <Zap className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Active Roadmap Preview</h2>
            </div>
            <Link href="/student/roadmap" className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-1">
              View Detailed <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-6">
            {!activeRoadmap || activeRoadmap.length === 0 ? (
              <div className="text-center py-10 space-y-4">
                <p className="text-gray-500 italic">No active roadmap found. Ready to start your journey?</p>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white" asChild>
                    <Link href="/student/roadmap">Initialize AI Roadmap</Link>
                </Button>
              </div>
            ) : (
              activeRoadmap.slice(0, 3).map((week: any, index: number) => (
                <div key={index} className="relative pl-8 group">
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10 group-last:bottom-auto group-last:h-6">
                    <div className="absolute top-0 left-[-4px] h-2.5 w-2.5 rounded-full border border-blue-500 bg-black group-first:bg-blue-500" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/[0.08] transition-colors cursor-pointer">
                    <div>
                      <h4 className="font-semibold text-white">Week {week.weekNumber}: {week.tasks?.[0]?.title || "Upcoming Module"}</h4>
                      <p className="text-sm text-gray-500 italic">Module count: {week.tasks?.length || 0} • Status: Pending</p>
                    </div>
                    <Button size="sm" variant="ghost" className="rounded-lg text-blue-400 hover:bg-blue-400/10 h-8">
                      View
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Container>

        {/* AI Recommendations & Messages */}
        <div className="space-y-8">
          <Container className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-white">AI Recommendations</h2>
            </div>
            <div className="space-y-4">
              {recommendations.length === 0 ? (
                <p className="text-sm text-gray-500 italic py-4">Generating personalized skill gap analysis...</p>
              ) : (
                recommendations.map((rec, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-white/5 bg-black/40 hover:border-indigo-500/40 transition-colors">
                    <h4 className="font-medium text-white mb-2">{rec.title}</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-white/5 text-gray-400 border-none text-[10px]">{rec.topic}</Badge>
                      <Badge className="bg-indigo-500/10 text-indigo-400 border-none text-[10px]">{rec.difficulty}</Badge>
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-none text-[10px]">+{rec.points || 20} XP</Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Container>

          <Container>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Calendar className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Campus Alerts</h2>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 p-3 rounded-2xl bg-white/5">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 font-bold">
                  !
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Hackathon Registration</h4>
                  <p className="text-xs text-gray-500 mt-1">Ends in 2 days. Don't miss out on the annual dev fest.</p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

