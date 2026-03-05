"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Bell, ChevronDown, X } from "lucide-react";
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
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

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
const notifications = [
  {title: "New documentary available", description: "The Making of Two Eyes is now ready to watch.", time: "2 hours ago", href: "/shows/the-making-of-two-eyes"},
  {title: "Welcome to Two Eyes", description: "Start exploring our curated collection of movies.", time: "1 day ago", href: ""}
];

export function MainHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { theme, setTheme } = useTheme();
  const { state } = useSidebar();

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchOpen]);

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
        "sticky top-0 z-50 flex w-full items-center justify-between py-2 transition-all duration-300 ",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent border-b border-transparent text-foreground"
      )}
    >
      <div className="flex items-center gap-4 md:gap-8 px-4 h-10 w-48 relative">
        <div 
          className="flex items-center h-full"
          onMouseEnter={() => setIsSidebarHovered(true)} 
          onMouseLeave={() => setIsSidebarHovered(false)}
        >
          <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        </div>
        
        <Link href="/" className="ml-2 md:ml-0 flex items-center absolute left-14 transition-all duration-300">
          {isSidebarHovered ? (
            <span className="text-sm md:text-base font-semibold text-muted-foreground animate-in fade-in slide-in-from-left-2 duration-200 whitespace-nowrap">
              {state === "expanded" ? "Close Sidebar" : "Open Sidebar"}
            </span>
          ) : null}
        </Link>
      </div>

      <div className="flex items-center gap-1 md:gap-4 ">
        <div className="relative flex items-center justify-center h-10 w-9">
          {!searchOpen ? (
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground absolute z-10" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          ) : (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-background border border-border/50 rounded-full shadow-lg z-50 h-10 w-60 md:w-80 transition-all duration-300">
              <Search className="h-5 w-5 ml-3 text-muted-foreground shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Títulos, personas, géneros..."
                className="flex-1 bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0"
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 mr-1 text-muted-foreground hover:text-foreground shrink-0 rounded-full"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground md:flex relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-600 border border-background"></span>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 md:w-80 md:mt-1 md:mr-1 rounded-xl border border-border bg-popover/95 backdrop-blur-md p-0 text-popover-foreground shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
              <span className="font-semibold text-sm">Notifications</span>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground hover:bg-transparent">
                Mark all as read
              </Button>
            </div>
            <div className="max-h-75 overflow-y-auto py-1">
              {notifications.map((notification) => {
                return (
                  <DropdownMenuItem key={notification.title} className="flex items-start gap-3 p-3 cursor-pointer rounded-none focus:bg-accent/50 focus:text-accent-foreground border-b border-border/80 last:border-0">
                    <div className={cn("h-10 w-10 shrink-0 overflow-hidden rounded-md flex items-center justify-center", notification.href ? "bg-accent" : "bg-accent/50")}>
                      { notification.href ? (
                        <Image src="/two-eyes-logo.png" alt="thumbnail" width={40} height={40} className="h-full w-full object-cover" />
                      ) : (
                        <Bell className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-tight">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.description}</p>
                      <p className="text-[10px] text-muted-foreground/80 mt-1">{notification.time}</p>
                    </div>
                  </DropdownMenuItem>
                  
                )
              })}
            </div>
            <div className="p-2 border-t border-border/80">
              <Button variant="ghost" className="w-full text-xs h-8 hover:bg-accent/50 cursor-pointer">
                View all settings
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer outline-none">
            <Button variant="ghost" className="flex group items-center  hover:bg-accent/50 rounded-full h-10">
              <Avatar className="h-8 w-8 ring-2 ring-transparent transition-all group-hover:ring-border">
                <AvatarImage src="" alt="@avatar" />
                <AvatarFallback className="bg-primary/10 text-primary">N</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-2 w-2 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-35 mt-1 mr-1  rounded-xl border border-border bg-popover/95 backdrop-blur-md p-2 text-popover-foreground shadow-xl">
            <DropdownMenuLabel className="font-normal px-2 py-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">My account</p>
                <p className="text-xs leading-none text-muted-foreground mt-1">user@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            
            <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="cursor-pointer rounded-lg focus:bg-accent focus:text-accent-foreground">
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-accent focus:text-accent-foreground">
              Profile settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-accent focus:text-accent-foreground">
              Help Center
            </DropdownMenuItem>
            <DropdownMenuItem className="md:hidden cursor-pointer rounded-lg focus:bg-accent focus:text-accent-foreground">
              Kids
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem className="cursor-pointer rounded-lg text-destructive focus:bg-destructive/10 focus:text-destructive">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
