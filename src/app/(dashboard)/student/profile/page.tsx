"use client";

import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  GraduationCap, 
  FileText, 
  Upload, 
  Save,
  Plus,
  X,
  Briefcase
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function StudentProfile() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState(["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"]);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSave = async () => {
    setLoading(true);
    // Mock save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="space-y-8 pb-12">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">My Profile</h1>
          <p className="text-gray-400 text-lg">Manage your academic identity and skill set.</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={loading}
          className="rounded-xl h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl p-8 flex flex-col items-center text-center space-y-4"
          >
            <div className="relative group">
              <div className="h-32 w-32 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-1">
                <div className="h-full w-full rounded-[22px] bg-zinc-900 flex items-center justify-center overflow-hidden">
                  <User className="h-16 w-16 text-white/50" />
                </div>
              </div>
              <button className="absolute bottom-[-8px] right-[-8px] p-2 rounded-xl bg-blue-600 text-white shadow-lg hover:bg-blue-500 transition-colors">
                <Upload className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white">Surya</h2>
              <p className="text-blue-400 font-medium">B.Tech Computer Science</p>
            </div>

            <div className="w-full pt-4 space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 text-sm text-gray-400">
                <Mail className="h-4 w-4 text-blue-400" />
                surya@example.com
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 text-sm text-gray-400">
                <GraduationCap className="h-4 w-4 text-purple-400" />
                CGPA: 8.5 / 10.0
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl p-8 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Resume</h3>
            </div>
            
            <div className="p-8 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-center space-y-4 hover:border-blue-500/30 transition-colors cursor-pointer group">
              <Upload className="h-10 w-10 text-gray-600 group-hover:text-blue-500 transition-colors" />
              <div>
                <p className="text-white font-medium">Upload new resume</p>
                <p className="text-xs text-gray-500 mt-1">PDF, DOCX max 5MB</p>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white/5 flex items-center justify-between border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/5">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">resume_2024.pdf</p>
                  <p className="text-[10px] text-gray-500">Last updated: 2 days ago</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Details Form */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-3xl p-8 space-y-8"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Professional Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Department</label>
                <Input defaultValue="Computer Science & Engineering" className="bg-white/5 border-white/10 text-white rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Semester</label>
                <Input defaultValue="6th Semester" className="bg-white/5 border-white/10 text-white rounded-xl h-12" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-400">Professional Bio</label>
                <textarea 
                  className="w-full min-h-[120px] p-4 bg-white/5 border border-white/10 text-white rounded-2xl outline-none focus:ring-1 ring-blue-500/50 resize-none placeholder:text-gray-600"
                  placeholder="Tell us about your career goals..."
                  defaultValue="Aspiring Fullstack Developer with a passion for AI-powered educational tools. Currently focused on mastering modern web architectures and distributed systems."
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-400">Top Skills</label>
                <span className="text-xs text-blue-400">Add up to 10 skills</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} className="px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-400 border-none group cursor-default">
                    {skill}
                    <button onClick={() => handleRemoveSkill(skill)} className="ml-2 hover:text-white transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Add skill..." 
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    className="w-32 bg-white/5 border-white/10 text-white rounded-xl h-9 text-xs"
                  />
                  <Button onClick={handleAddSkill} size="icon" className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-blue-400">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl p-8 bg-gradient-to-br from-blue-900/10 to-purple-900/10 border-blue-500/10"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-blue-600 text-white">
                <Save className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-white">Profile Visibility</h4>
                <p className="text-sm text-gray-500 text-balance">Your profile is currently visible to your HOD and AI recruiters.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
