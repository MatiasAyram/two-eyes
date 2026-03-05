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
      className="fixed top-0 z-50 flex w-full items-center justify-between px-3 py-1 ">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-black md:text-3xl tracking-wide">
          <Image  src="/two-eyes-logo.png" alt="Logo" width={50} height={50} />
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-foreground md:flex">
        {headerRoutes.map((route) => (
          <Link key={route.href} href={route.href} className="transition-colors hover:opacity-80">
            {route.label}
          </Link>
        ))}
          
        </nav>
      </div>

      <div className="flex items-center gap-4 text-foreground md:gap-4">
        <Button variant="ghost" size="icon" className="text-foreground hover:bg-transparent hover:text-foreground/80">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
        <Link href="/kids" className="hidden text-sm font-medium hover:text-foreground/80 md:block">
          Kids
        </Link>
        <Button variant="ghost" size="icon" className="hidden text-foreground hover:bg-transparent hover:text-foreground/80 md:flex">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Button variant="ghost" className="flex group items-center gap-2 p-0 hover:bg-transparent">
              <Avatar className="h-8 w-8 rounded-md">
                <AvatarImage src="" alt="@shadcn" />
                <AvatarFallback className="rounded-md text-foreground">N</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-30 bg-background text-foreground ">
            <DropdownMenuLabel className="hover:bg-sidebar-accent cursor-pointer rounded-md">My account</DropdownMenuLabel>
            <DropdownMenuLabel className="hover:bg-sidebar-accent cursor-pointer rounded-md" onClick={() => setTheme(theme==='dark' ? 'light' : 'dark')}>{theme==='dark' ? 'Light mode' : 'Dark mode'}</DropdownMenuLabel>
            <DropdownMenuSeparator  />
            <DropdownMenuItem className=" cursor-pointer rounded-md">
              Profile settings
            </DropdownMenuItem>
            <DropdownMenuItem className=" cursor-pointer rounded-md">
              Help Center
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer rounded-md  hover:text-[#E50914] focus:text-[#E50914]">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
