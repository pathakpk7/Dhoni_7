import { Metadata } from "next";
import { MahiStoryExperience } from "@/components/storybook/MahiStoryExperience";

export const metadata: Metadata = {
  title: "Mahi: The Man Behind the Legend | Interactive Storybook | Project 7",
  description:
    "An interactive, cinematic page-turning digital storybook celebrating the life, career, philosophy, and legacy of MS Dhoni across 36 verified moments and 12 chapters.",
};

export default function StorybookPage() {
  return <MahiStoryExperience />;
}
