"use client";

import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  ArrowUpDown,
  User,
  ExternalLink,
  MessageCircle,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { hodService } from "@/services/hod.service";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function HODStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  useEffect(() => {
    async function loadStudents() {
      try {
        const res = await hodService.getStudents();
        const raw = res.data?.students || res.data?.data || [];
        // Normalize fields from backend User model
        const normalized = raw.map((s: any) => ({
          _id: s._id,
          name: `${s.firstName || ""} ${s.lastName || ""}`.trim() || s.email,
          id: s.studentId || s._id?.slice(-6)?.toUpperCase() || "N/A",
          email: s.email,
          cgpa: s.cgpa || "N/A",
          progress: Math.round(s.progress || s.roadmapProgress || 0),
          status: s.score >= 80 ? "Excellent" : s.score >= 60 ? "Average" : "Underperforming",
          risk: s.score < 50 ? "High" : s.score < 70 ? "Medium" : "Low",
          score: s.score || 0
        }));
        setStudents(normalized);
      } catch (error) {
        console.error("Failed to load students", error);
      } finally {
        setLoading(false);
      }
    }
    loadStudents();
  }, []);

  const viewStudentDetails = async (studentId: string) => {
    try {
      const res = await hodService.getStudentById(studentId);
      const raw = res.data?.student || res.data?.data || {};
      setSelectedStudent({
        ...raw,
        name: `${raw.firstName || ""} ${raw.lastName || ""}`.trim(),
        cgpa: raw.cgpa || "N/A",
        progress: Math.round(raw.progress || raw.roadmapProgress || 0),
        risk: raw.score < 50 ? "High" : raw.score < 70 ? "Medium" : "Low",
      });
    } catch (error) {
      console.error("Failed to load student detail", error);
    }
  };

  if (loading) return <div className="p-8 text-white">Loading students...</div>;

  return (
    <div className="space-y-8 pb-12">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-white">Student Monitoring</h1>
          <p className="text-gray-400">Manage and audit student performance across the department.</p>
        </div>
      </section>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass p-4 rounded-3xl border-white/5">
        <div className="flex w-full max-w-sm items-center gap-2 rounded-xl bg-white/5 px-3 py-1 border border-white/10 focus-within:border-blue-500/50 transition-colors">
          <Search className="h-4 w-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by name or UID..." 
            className="w-full bg-transparent px-2 py-1 text-sm text-white outline-none placeholder:text-gray-600"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" className="rounded-xl border-white/10 bg-white/5 text-gray-400 hover:text-white flex-1 md:flex-none">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <Button variant="outline" className="rounded-xl border-white/10 bg-white/5 text-gray-400 hover:text-white flex-1 md:flex-none">
             Sort <ArrowUpDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass rounded-3xl overflow-hidden border-white/5 shadow-2xl"
      >
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-gray-400 font-bold uppercase text-[10px] tracking-widest pl-6">Student</TableHead>
              <TableHead className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">UID</TableHead>
              <TableHead className="text-gray-400 font-bold uppercase text-[10px] tracking-widest text-center">CGPA</TableHead>
              <TableHead className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Progress</TableHead>
              <TableHead className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Risk Level</TableHead>
              <TableHead className="text-gray-400 font-bold uppercase text-[10px] tracking-widest text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student, i) => (
              <TableRow key={i} className="border-white/5 hover:bg-white/[0.04] transition-colors group">
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center text-white border border-white/5">
                      <User className="h-5 w-5 opacity-70" />
                    </div>
                    <div>
                      <p className="font-semibold text-white group-hover:text-blue-400 transition-colors">{student.name}</p>
                      <Badge className="bg-white/5 text-[10px] border-none text-gray-400 px-1 py-0 h-4">{student.status}</Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-400 font-mono text-xs">{student.id}</TableCell>
                <TableCell className="text-center font-bold text-white">{student.cgpa}</TableCell>
                <TableCell className="w-[180px]">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] text-gray-500">
                      <span>{student.progress}%</span>
                      <span>Target: 95%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${student.progress}%` }}
                        className={`h-full rounded-full ${
                          student.progress > 80 ? "bg-emerald-500" : 
                          student.progress > 50 ? "bg-blue-500" : 
                          "bg-orange-500"
                        }`} 
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={
                    student.risk === "High" ? "bg-red-500/10 text-red-500 border-red-500/50" :
                    student.risk === "Medium" ? "bg-orange-500/10 text-orange-400 border-orange-500/50" :
                    "bg-emerald-500/10 text-emerald-400 border-emerald-500/50"
                  } variant="outline">
                    {student.risk === "High" && <AlertCircle className="h-3 w-3 mr-1" />}
                    {student.risk}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-500 hover:text-white hover:bg-white/5 rounded-xl">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zinc-900 border-white/10 text-white">
                      <DropdownMenuLabel>Student Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-white/5" />
                      <DropdownMenuItem onClick={() => viewStudentDetails(student._id)} className="focus:bg-white/5 cursor-pointer">
                        <ExternalLink className="h-4 w-4 mr-2" /> View Full Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-white/5 cursor-pointer">
                        <MessageCircle className="h-4 w-4 mr-2" /> Message Student
                      </DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-white/5 cursor-pointer text-orange-400 focus:text-orange-400">
                        <AlertCircle className="h-4 w-4 mr-2" /> Trigger Intervention
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      <Dialog open={!!selectedStudent} onOpenChange={(open) => !open && setSelectedStudent(null)}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Student Profile</DialogTitle>
            <DialogDescription className="text-gray-400">
              Detailed metrics for {selectedStudent?.name}.
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-gray-400">UID:</span>
                <span className="col-span-3">{selectedStudent.id}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-gray-400">CGPA:</span>
                <span className="col-span-3">{selectedStudent.cgpa}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-gray-400">Progress:</span>
                <span className="col-span-3">{selectedStudent.progress}%</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-gray-400">Risk:</span>
                <span className="col-span-3">{selectedStudent.risk}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
