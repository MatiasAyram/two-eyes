"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Bell, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useTheme } from "next-themes";

export const headerRoutes = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/shows",
    label: "TV Shows",
  },
  {
    href: "/movies",
    label: "Movies",
  },
  {
    href: "/latest",
    label: "New & Popular",
  },
  {
    href: "/list",
    label: "My List",
  },
];

export function MainHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 flex w-full items-center justify-between px-3 py-1 transition-colors duration-300 ",
        isScrolled ? "bg-black" : "bg-linear-to-b from-black/80 to-transparent"
      )}
    >
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-black md:text-3xl tracking-wide">
          <Image  src="/two-eyes-logo.png" alt="Logo" width={50} height={50} />
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-foreground md:flex">
        {headerRoutes.map((route) => (
          <Link key={route.href} href={route.href} className="transition-colors hover:text-white">
            {route.label}
          </Link>
        ))}
          
        </nav>
      </div>

      <div className="flex items-center gap-4 text-white md:gap-6">
        <Button variant="ghost" size="icon" className="text-white hover:bg-transparent hover:text-white/80">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
        <Link href="/kids" className="hidden text-sm font-medium hover:text-white/80 md:block">
          Kids
        </Link>
        <Button variant="ghost" size="icon" className="hidden text-white hover:bg-transparent hover:text-white/80 md:flex">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex group items-center gap-2 p-0 hover:bg-transparent">
              <Avatar className="h-8 w-8 rounded-md">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback className="rounded-md bg-zinc-800 text-white">N</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-white transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-black/95 text-white border-zinc-800">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
              Profile settings
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
              Help Center
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="focus:bg-zinc-800 cursor-pointer text-white hover:text-[#E50914] focus:text-[#E50914]">
              Sign out of Two Eyes
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
