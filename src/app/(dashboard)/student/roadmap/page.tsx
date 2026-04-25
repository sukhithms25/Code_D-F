"use client";

import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  ChevronRight, 
  Map as MapIcon,
  BookOpen,
  Calendar,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const roadmapData = [
  {
    id: 1,
    title: "Foundation of Modern Web",
    status: "completed",
    modules: [
      { name: "Advanced ES6+ Concepts", duration: "4h", status: "completed" },
      { name: "Asynchronous Programming", duration: "6h", status: "completed" },
    ],
  },
  {
    id: 2,
    title: "React Architecture & Performance",
    status: "active",
    modules: [
      { name: "Component Composition", duration: "3h", status: "completed" },
      { name: "Advanced Hooks & Context", duration: "5h", status: "active" },
      { name: "Performance Optimization", duration: "4h", status: "locked" },
    ],
  },
  {
    id: 3,
    title: "Backend & System Design",
    status: "locked",
    modules: [
      { name: "Node.js Architecture", duration: "6h", status: "locked" },
      { name: "Database Scaling Patterns", duration: "8h", status: "locked" },
    ],
  },
];

export default function StudentRoadmap() {
  return (
    <div className="space-y-8 pb-12">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-400">
            <MapIcon className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Learning Path</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Fullstack Architect Roadmap</h1>
          <p className="text-gray-400">Based on your career goal: <span className="text-blue-400 font-medium">Senior Software Engineer</span></p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl border-white/10 bg-white/5 text-white">Download PDF</Button>
          <Button className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white">Sync with GitHub</Button>
        </div>
      </section>

      <Tabs defaultValue="roadmap" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 rounded-xl p-1 mb-8">
          <TabsTrigger value="roadmap" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white">Roadmap View</TabsTrigger>
          <TabsTrigger value="curriculum" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white">Detailed Curriculum</TabsTrigger>
          <TabsTrigger value="resources" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="roadmap" className="mt-0">
          <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-purple-500 before:to-transparent">
            {roadmapData.map((phase, i) => (
              <motion.div 
                key={phase.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* Dot */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-zinc-900 text-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                  {phase.status === "completed" ? <CheckCircle2 className="w-6 h-6" /> : 
                   phase.status === "active" ? <Circle className="w-6 h-6 animate-pulse" /> : 
                   <Lock className="w-5 h-5 text-gray-600" />}
                </div>

                {/* Content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass rounded-3xl p-6 shadow-xl border-white/5 group-hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-blue-400 uppercase">Phase {phase.id}</span>
                    <Badge className={
                      phase.status === "completed" ? "bg-emerald-500/10 text-emerald-400" :
                      phase.status === "active" ? "bg-blue-500/10 text-blue-400" :
                      "bg-white/5 text-gray-500"
                    }>
                      {phase.status}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{phase.title}</h3>
                  <div className="space-y-3">
                    {phase.modules.map((module, j) => (
                      <div key={j} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 hover:bg-black/60 transition-colors cursor-pointer group/module">
                        <div className="flex items-center gap-3">
                          {module.status === "completed" ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> :
                           module.status === "active" ? <Circle className="w-4 h-4 text-blue-400" /> :
                           <Lock className="w-4 h-4 text-gray-600" />}
                          <span className={`text-sm ${module.status === "locked" ? "text-gray-600" : "text-gray-300"}`}>
                            {module.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-500">{module.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="curriculum">
           <div className="glass rounded-3xl p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
             <BookOpen className="h-12 w-12 text-blue-400 mb-4 opacity-50" />
             <h2 className="text-2xl font-bold text-white mb-2">Detailed Curriculum View</h2>
             <p className="text-gray-400 max-w-sm">This section provides a deep dive into every topic, sub-topic, and learning objective in your roadmap.</p>
           </div>
        </TabsContent>

        <TabsContent value="resources">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
             {[1,2,3,4,5,6].map((i) => (
               <div key={i} className="glass rounded-2xl p-6 border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                 <div className="flex items-center justify-between mb-4">
                   <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                     <Star className="h-5 w-5" />
                   </div>
                   <Badge variant="outline" className="border-white/10 text-gray-500">Premium</Badge>
                 </div>
                 <h4 className="font-bold text-white mb-2">Advanced Documentation {i}</h4>
                 <p className="text-sm text-gray-400 mb-4">In-depth technical papers and case studies for modern architectures.</p>
                 <div className="flex items-center justify-between pt-4 border-t border-white/5">
                   <span className="text-xs text-gray-500">12 min read</span>
                   <ChevronRight className="h-4 w-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                 </div>
               </div>
             ))}
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
