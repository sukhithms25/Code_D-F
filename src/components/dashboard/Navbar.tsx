"use client";

import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";

export function Navbar() {
  const { data: session } = useSession();
  const userName = session?.user?.firstName || "User";

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/5 bg-black/20 px-8 backdrop-blur-md">
      <div className="flex w-full max-w-sm items-center gap-2 rounded-xl bg-white/5 px-3 py-1 border border-white/10">
        <Search className="h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search resources, students..."
          className="w-full bg-transparent px-2 py-1 text-sm outline-none placeholder:text-gray-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white hover:bg-white/5">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-white/5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 outline outline-2 outline-offset-2 outline-white/10">
                <User className="h-5 w-5 text-white" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-white/10 text-white">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem className="focus:bg-white/5 cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/5 cursor-pointer">Security</DropdownMenuItem>
            <DropdownMenuItem 
              className="focus:bg-white/5 cursor-pointer text-red-400 focus:text-red-400"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
