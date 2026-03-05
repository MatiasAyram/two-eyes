import { Play, TrendingUp, MonitorPlay, Film, Plus, Smile } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Play,
  },
  {
    title: "TV Shows",
    url: "/shows",
    icon: MonitorPlay,
  },
  {
    title: "Movies",
    url: "/movies",
    icon: Film,
  },
  {
    title: "New & Popular",
    url: "/latest",
    icon: TrendingUp,
  },
  {
    title: "My List",
    url: "/list",
    icon: Plus,
  },
  {
    title: "Kids",
    url: "/kids",
    icon: Smile,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 items-center mt-2 border-b border-border/50">
        <Link href="/">
          <Image src="/two-eyes-logo.png" alt="Two Eyes Logo" width={80} height={80} className="object-contain" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-semibold">Discovery</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
