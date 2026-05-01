"use client";

import { motion } from "framer-motion";
import { 
  User, Mail, GraduationCap, FileText, Upload, Plus, X, Briefcase,
  Shield, Loader2, RefreshCw, Code2, GitBranch
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { studentService } from "@/services/student.service";
import { integrationService } from "@/services/integration.service";
import { authService } from "@/services/auth.service";

export default function StudentProfile() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [bio, setBio] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");

  const [integrationStatus, setIntegrationStatus] = useState<any>(null);
  const [syncing, setSyncing] = useState<string | null>(null);
  const [passwords, setPasswords] = useState({ old: "", new: "" });
  const [updatingPass, setUpdatingPass] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeName, setResumeName] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [profileRes, statusRes] = await Promise.all([
          studentService.getProfile(),
          integrationService.getStatus()
        ]);

        const profile = profileRes.data?.user || profileRes.data?.profile || {};
        if (profile.skills) setSkills(profile.skills);
        if (profile.department) setDepartment(profile.department);
        if (profile.branch) setBranch(profile.branch);
        if (profile.semester || profile.year) setSemester(String(profile.semester || profile.year));
        if (profile.bio) setBio(profile.bio);
        if (profile.cgpa) setCgpa(String(profile.cgpa));
        if (profile.email) setEmail(profile.email);
        if (profile.firstName) setName(`${profile.firstName} ${profile.lastName || ""}`.trim());
        if (profile.resumeUrl) setResumeName("resume.pdf");

        setIntegrationStatus(statusRes.data?.data || null);
      } catch (error) {
        console.error("Failed to load profile data", error);
      } finally {
        setPageLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await studentService.updateProfile({ skills, department, branch, bio, cgpa: parseFloat(cgpa) || undefined });
      toast({ title: "Profile Updated", description: "Your changes have been saved successfully." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update profile", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async (type: "github" | "leetcode") => {
    setSyncing(type);
    try {
      if (type === "github") await integrationService.githubSync();
      else await integrationService.leetcodeSync();
      const statusRes = await integrationService.getStatus();
      setIntegrationStatus(statusRes.data?.data || null);
      toast({ title: "Sync Complete", description: "Your data has been refreshed." });
    } catch {
      toast({ title: "Sync Failed", description: "Please check your connection.", variant: "destructive" });
    } finally {
      setSyncing(null);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingPass(true);
    try {
      await authService.updatePassword(passwords.old, passwords.new);
      toast({ title: "Success", description: "Password updated successfully" });
      setPasswords({ old: "", new: "" });
    } catch {
      toast({ title: "Error", description: "Invalid old password", variant: "destructive" });
    } finally {
      setUpdatingPass(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingResume(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      await studentService.uploadResume(formData);
      setResumeName(file.name);
      toast({ title: "Resume Uploaded", description: "Your resume has been uploaded." });
    } catch {
      toast({ title: "Upload Failed", description: "Could not upload resume.", variant: "destructive" });
    } finally {
      setUploadingResume(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
      </div>
    );
  }

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
          {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Saving...</> : "Save Changes"}
        </Button>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Avatar Card */}
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
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white">{name || session?.user?.firstName || "Student"}</h2>
              <p className="text-blue-400 font-medium">{branch || department || "B.Tech"}</p>
            </div>

            <div className="w-full pt-4 space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 text-sm text-gray-400">
                <Mail className="h-4 w-4 text-blue-400" />
                {email || session?.user?.email || "—"}
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 text-sm text-gray-400">
                <GraduationCap className="h-4 w-4 text-purple-400" />
                CGPA: {cgpa || "—"} / 10.0
              </div>
            </div>
          </motion.div>

          {/* Resume Card */}
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

            <input ref={fileInputRef} type="file" accept=".pdf,.docx" className="hidden" onChange={handleResumeUpload} />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-8 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-center space-y-4 hover:border-blue-500/30 transition-colors cursor-pointer group"
            >
              {uploadingResume ? (
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
              ) : (
                <Upload className="h-10 w-10 text-gray-600 group-hover:text-blue-500 transition-colors" />
              )}
              <div>
                <p className="text-white font-medium">{uploadingResume ? "Uploading..." : "Upload new resume"}</p>
                <p className="text-xs text-gray-500 mt-1">PDF, DOCX max 5MB</p>
              </div>
            </div>

            {resumeName && (
              <div className="p-4 rounded-3xl bg-white/5 flex items-center justify-between border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/5">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{resumeName}</p>
                    <p className="text-[10px] text-gray-500">Uploaded</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setResumeName(null)} className="text-gray-400 hover:text-white hover:bg-white/10">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Professional Details */}
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
                <Input value={department} onChange={e => setDepartment(e.target.value)} placeholder="e.g. Computer Science" className="bg-white/5 border-white/10 text-white rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Branch</label>
                <Input value={branch} onChange={e => setBranch(e.target.value)} placeholder="e.g. CSE" className="bg-white/5 border-white/10 text-white rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Semester / Year</label>
                <Input value={semester} onChange={e => setSemester(e.target.value)} placeholder="e.g. 6" className="bg-white/5 border-white/10 text-white rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">CGPA</label>
                <Input value={cgpa} onChange={e => setCgpa(e.target.value)} placeholder="e.g. 8.5" type="number" step="0.01" min="0" max="10" className="bg-white/5 border-white/10 text-white rounded-xl h-12" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-400">Professional Bio</label>
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className="w-full min-h-[120px] p-4 bg-white/5 border border-white/10 text-white rounded-2xl outline-none focus:ring-1 ring-blue-500/50 resize-none placeholder:text-gray-600"
                  placeholder="Tell us about your career goals..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-400">Top Skills</label>
                <span className="text-xs text-blue-400">Add up to 10 skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <Badge key={skill} className="px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-400 border-none cursor-default">
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
                    onChange={e => setNewSkill(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                    className="w-32 bg-white/5 border-white/10 text-white rounded-xl h-9 text-xs"
                  />
                  <Button onClick={handleAddSkill} size="icon" className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-blue-400">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Integrations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl p-8 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <RefreshCw className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white">External Integrations</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GitBranch className="h-5 w-5 text-white" />
                  <div>
                    <p className="text-sm font-bold text-white">GitHub</p>
                    <p className="text-[10px] text-gray-500">
                      {integrationStatus?.github?.connected
                        ? `Connected (${integrationStatus.github.username})`
                        : "Not Connected"}
                    </p>
                  </div>
                </div>
                {integrationStatus?.github?.connected ? (
                  <Button
                    size="sm" variant="ghost" disabled={syncing === "github"}
                    onClick={() => handleSync("github")}
                    className="h-8 rounded-lg text-xs text-blue-400 hover:bg-blue-400/10"
                  >
                    {syncing === "github" ? <Loader2 className="h-3 w-3 animate-spin" /> : "Sync"}
                  </Button>
                ) : (
                  <Button
                    size="sm" variant="ghost"
                    onClick={() => {
                      // Redirect to backend OAuth flow
                      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
                      window.location.href = `${apiUrl}/integrations/github/connect`;
                    }}
                    className="h-8 rounded-lg text-xs text-blue-400 hover:bg-blue-400/10"
                  >
                    Connect
                  </Button>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Code2 className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-sm font-bold text-white">LeetCode</p>
                    <p className="text-[10px] text-gray-500">
                      {integrationStatus?.leetcode?.connected
                        ? `Connected (${integrationStatus.leetcode.username})`
                        : "Not Connected"}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm" variant="ghost" disabled={syncing === "leetcode"}
                  onClick={() => handleSync("leetcode")}
                  className="h-8 rounded-lg text-xs text-blue-400 hover:bg-blue-400/10"
                >
                  {syncing === "leetcode" ? <Loader2 className="h-3 w-3 animate-spin" /> : "Sync"}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl p-8 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Security Settings</h3>
            </div>

            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="password" placeholder="Current Password"
                  value={passwords.old}
                  onChange={e => setPasswords({ ...passwords, old: e.target.value })}
                  className="bg-white/5 border-white/10 text-white rounded-xl h-11 text-sm"
                  required
                />
                <Input
                  type="password" placeholder="New Password"
                  value={passwords.new}
                  onChange={e => setPasswords({ ...passwords, new: e.target.value })}
                  className="bg-white/5 border-white/10 text-white rounded-xl h-11 text-sm"
                  required
                />
              </div>
              <Button
                type="submit" disabled={updatingPass}
                className="rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs h-10 px-6"
              >
                {updatingPass ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Update Password
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
