import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, BarChart2, Home, Sparkles } from "lucide-react";
import { MemorabiliaRoom } from "@/components/memorabilia/MemorabiliaRoom";

export const metadata: Metadata = {
  title: "A Legacy Beyond Numbers | MS Dhoni Memorabilia Room | Project 7",
  description:
    "Step inside the moments, milestones, and memories that defined an era. An interactive memorabilia room featuring 29 major trophies, chronological India & CSK jerseys, the £100K Reebok bat, and four hardcover biographical chronicles.",
  keywords: [
    "MS Dhoni",
    "Memorabilia Room",
    "Captain Cool",
    "World Cup 2011",
    "Trophy Cabinet",
    "Reebok Bat",
    "CSK",
    "Project 7",
  ],
  openGraph: {
    title: "A Legacy Beyond Numbers · MS Dhoni Memorabilia Room",
    description: "Step inside the moments, milestones, and memories that defined an era.",
    images: ["/images/room/dhoni_memorabilia_room.jpg"],
  },
};

export default function VisualizeMahiPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950">
      {/* Top Navigation Bar */}
      <nav className="w-full bg-[#0a0b0f]/95 border-b border-white/10 backdrop-blur-md px-4 sm:px-6 py-2.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 group text-neutral-300 hover:text-amber-400 transition-colors"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-amber-500/50 bg-black">
              <Image
                src="/images/brand/dhoni_icon.jpg"
                alt="MS Dhoni Icon"
                fill
                sizes="28px"
                className="object-cover"
              />
            </div>
            <span className="font-serif font-bold text-sm tracking-wide text-white group-hover:text-amber-300">
              PROJECT 7
            </span>
          </Link>

          <div className="h-4 w-px bg-white/20 hidden sm:block" />

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
            <span className="text-amber-400 font-semibold uppercase tracking-wider">
              VISUALIZE MAHI
            </span>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-400">Interactive Memorabilia Room</span>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <Link
            href="/visualize-mahi/story"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Digital Storybook</span>
          </Link>

          <Link
            href="/visualize"
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 transition-colors"
            title="Career Analytics & Telemetry"
          >
            <BarChart2 className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden xs:inline">Career Analytics</span>
            <span className="xs:hidden">Stats</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-neutral-300 hover:text-white transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Main Story</span>
          </Link>
        </div>
      </nav>

      {/* Main Memorabilia Room Component */}
      <main className="flex-1 w-full flex flex-col justify-center">
        <MemorabiliaRoom />
      </main>
    </div>
  );
}
