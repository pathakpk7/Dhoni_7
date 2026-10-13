import { Metadata } from "next";
import { MahiStoryExperience } from "@/components/storybook/MahiStoryExperience";

export const metadata: Metadata = {
  title: "Mahi: The Man Behind the Legend | Interactive Storybook | Project 7",
  description:
    "An interactive, cinematic page-turning digital storybook celebrating the life, career, philosophy, and legacy of MS Dhoni across 36 verified historical moments and 12 chapters.",
  keywords: [
    "MS Dhoni",
    "Captain Cool",
    "Storybook",
    "Cricket Documentary",
    "World Cup 2011",
    "CSK",
    "Interactive Book",
    "Project 7",
  ],
  openGraph: {
    title: "Mahi: The Man Behind the Legend",
    description: "Beyond the numbers. Beyond the trophies. The moments that made a legend.",
    images: ["/images/hero/hero_dhoni_duo.jpg"],
  },
};

export default function VisualizeMahiStoryPage() {
  return <MahiStoryExperience />;
}
