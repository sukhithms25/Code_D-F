"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { registerSchema, RegisterValues } from "@/validations/auth.schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { authService } from "@/services/auth.service";
import { toast } from "@/hooks/use-toast";
import { SplineScene } from "@/components/ui/splite";
import { ArrowLeft, UserPlus, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student",
      department: "",
      branch: "",
      year: "",
    },
  });

  const selectedRole = form.watch("role");

  async function onSubmit(values: RegisterValues) {
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword: _confirmPassword, ...payload } = values;
      
      // Clean up payload: only send relevant fields for the role
      if (payload.role === "student") {
        delete payload.department;
      } else if (payload.role === "hod") {
        delete payload.branch;
        delete payload.year;
      }

      // Remove any empty strings to satisfy backend Joi validation
      const cleanPayload = Object.fromEntries(
        Object.entries(payload).filter(([, v]) => v !== "" && v !== null)
      );

      await authService.register(cleanPayload);
      toast({
        title: "Registration Successful",
        description: "Your account has been created. Please log in.",
      });
      router.push("/login");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full h-full">
      {/* LEFT PANEL: 3D Immersive Hero (Same logic, consistent branding) */}
      <div className="hidden lg:flex flex-1 relative bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10 p-12 flex flex-col justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium tracking-widest uppercase">Center Exit</span>
          </Link>
          
          <div className="space-y-6 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <UserPlus className="text-white w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter">NEW ENTITY</h2>
            </div>
              &quot;The best way to predict the future is to orchestrate it.&quot; Initialize your academic profile now.
          </div>

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-neutral-600">
            <ShieldCheck className="w-4 h-4" /> 
            Encrypted Enrollment Protocol
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Registration Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black/60 backdrop-blur-3xl lg:max-w-[650px] border-l border-white/5 relative overflow-y-auto">
        <div className="w-full max-w-md space-y-8 py-10">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
              Identity Creation
            </h1>
            <p className="text-neutral-500">Register your credentials with the Code-D-F core.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                       <FormLabel className="text-neutral-500 text-xs uppercase tracking-widest">Given Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} className="bg-white/[0.03] border-white/10 text-white rounded-xl h-11 focus:border-white/30" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                       <FormLabel className="text-neutral-500 text-xs uppercase tracking-widest">Surname</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} className="bg-white/[0.03] border-white/10 text-white rounded-xl h-11 focus:border-white/30" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                     <FormLabel className="text-neutral-500 text-xs uppercase tracking-widest">Network Identity</FormLabel>
                    <FormControl>
                      <Input placeholder="email@nexus.com" {...field} className="bg-white/[0.03] border-white/10 text-white rounded-xl h-11 focus:border-white/30" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                       <FormLabel className="text-neutral-500 text-xs uppercase tracking-widest">Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} className="bg-white/[0.03] border-white/10 text-white rounded-xl h-11 focus:border-white/30" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                       <FormLabel className="text-neutral-500 text-xs uppercase tracking-widest">Verify Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} className="bg-white/[0.03] border-white/10 text-white rounded-xl h-11 focus:border-white/30" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                     <FormLabel className="text-neutral-500 text-xs uppercase tracking-widest">System Role</FormLabel>
                    <FormControl>
                      <div className="flex gap-4 p-1 bg-white/5 rounded-2xl border border-white/10">
                        <button
                          type="button"
                          onClick={() => field.onChange("student")}
                          className={`flex-1 h-10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                            field.value === "student" 
                              ? "bg-white text-black shadow-lg" 
                              : "text-neutral-500 hover:text-white"
                          }`}
                        >
                          Student
                        </button>
                        <button
                          type="button"
                          onClick={() => field.onChange("hod")}
                          className={`flex-1 h-10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                            field.value === "hod" 
                              ? "bg-white text-black shadow-lg" 
                              : "text-neutral-500 hover:text-white"
                          }`}
                        >
                          HOD Control
                        </button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {selectedRole === "hod" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-neutral-500 text-xs uppercase tracking-widest">Department</FormLabel>
                        <FormControl>
                          <Input placeholder="Computer Science" {...field} className="bg-white/[0.03] border-white/10 text-white rounded-xl h-11 focus:border-white/30" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

              {selectedRole === "student" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <FormField
                    control={form.control}
                    name="branch"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-neutral-500 text-xs uppercase tracking-widest">Branch</FormLabel>
                        <FormControl>
                          <Input placeholder="CSE" {...field} className="bg-white/[0.03] border-white/10 text-white rounded-xl h-11 focus:border-white/30" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-neutral-500 text-xs uppercase tracking-widest">Year of Study</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="3" 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value) || "")}
                            className="bg-white/[0.03] border-white/10 text-white rounded-xl h-11 focus:border-white/30" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

              <Button 
                type="submit" 
                className="w-full h-14 rounded-full bg-white text-black font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.05)] mt-4" 
                disabled={loading}
              >
                {loading ? "ENROLLING..." : "COMMIT IDENTITY"}
              </Button>
            </form>
          </Form>

          <footer className="pt-6 text-center">
            <p className="text-sm text-neutral-600">
              Already indexed?{" "}
              <Link href="/login" className="text-white hover:text-blue-500 font-medium transition-colors">
                Return to Login
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
