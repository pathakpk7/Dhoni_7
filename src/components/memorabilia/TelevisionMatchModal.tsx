"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ArrowLeft,
  Tv,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Trophy,
  Flame,
  Calendar,
  MapPin,
  Clock,
  Radio,
} from "lucide-react";
import { storyAudio } from "@/components/storybook/StoryAudio";

interface TelevisionMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelevisionMatchModal: React.FC<TelevisionMatchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"broadcast" | "scorecard" | "timeline">("broadcast");
  const [audioCommentaryPlaying, setAudioCommentaryPlaying] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleCommentary = () => {
    if (audioCommentaryPlaying) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setAudioCommentaryPlaying(false);
    } else {
      storyAudio.playClick();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const text =
          "Dhoni finishes off in style! A magnificent strike into the crowd! India lift the World Cup after 28 years! The party has started in the dressing room, and it is an Indian captain who has been absolutely magnificent in the night of the final!";
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        utterance.pitch = 1.1;
        utterance.onend = () => setAudioCommentaryPlaying(false);
        utterance.onerror = () => setAudioCommentaryPlaying(false);
        window.speechSynthesis.speak(utterance);
        setAudioCommentaryPlaying(true);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
      {/* Blue TV Glow in dark room */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/25 via-neutral-950/90 to-black" />

      {/* Main Container */}
      <div className="relative w-full h-full max-w-7xl max-h-[96vh] flex flex-col mx-auto px-4 py-3 sm:px-6 sm:py-4 z-10">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-blue-900/40 pb-3 mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                storyAudio.playClick();
                if (typeof window !== "undefined" && "speechSynthesis" in window) {
                  window.speechSynthesis.cancel();
                }
                onClose();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-blue-500/30 text-blue-300 text-xs tracking-wider uppercase font-mono transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Room</span>
            </button>
            <div className="hidden sm:block h-4 w-px bg-neutral-800" />
            <div>
              <span className="text-[10px] tracking-widest text-blue-400 font-mono uppercase block">
                April 2, 2011 · Wankhede Stadium, Mumbai
              </span>
              <h2 className="text-lg sm:text-xl font-serif text-white flex items-center gap-2 font-bold">
                <Tv className="w-5 h-5 text-blue-400" />
                Live Broadcast: 2011 ICC World Cup Final
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleCommentary}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                audioCommentaryPlaying
                  ? "bg-amber-500 text-neutral-950 font-bold animate-pulse"
                  : "bg-blue-950/80 hover:bg-blue-900 border border-blue-500/30 text-blue-200"
              }`}
            >
              {audioCommentaryPlaying ? <Volume2 className="w-4 h-4" /> : <Radio className="w-4 h-4" />}
              <span>{audioCommentaryPlaying ? "Stop Commentary" : "Play Shastri Commentary"}</span>
            </button>
            <button
              onClick={() => {
                storyAudio.playClick();
                if (typeof window !== "undefined" && "speechSynthesis" in window) {
                  window.speechSynthesis.cancel();
                }
                onClose();
              }}
              className="p-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setActiveTab("broadcast")}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              activeTab === "broadcast"
                ? "bg-blue-600 text-white font-bold"
                : "bg-neutral-900/80 text-neutral-400 hover:text-white"
            }`}
          >
            Match Broadcast & Iconic Six
          </button>
          <button
            onClick={() => setActiveTab("scorecard")}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              activeTab === "scorecard"
                ? "bg-blue-600 text-white font-bold"
                : "bg-neutral-900/80 text-neutral-400 hover:text-white"
            }`}
          >
            Official Final Scorecard
          </button>
          <button
            onClick={() => setActiveTab("timeline")}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              activeTab === "timeline"
                ? "bg-blue-600 text-white font-bold"
                : "bg-neutral-900/80 text-neutral-400 hover:text-white"
            }`}
          >
            Tactical Masterclass (114/3 to 277/4)
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
          {activeTab === "broadcast" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full">
              {/* Television Screen Simulation */}
              <div className="lg:col-span-8 flex flex-col justify-between p-6 rounded-2xl bg-neutral-950 border-4 border-neutral-800 shadow-[0_0_60px_rgba(37,99,235,0.25)] relative overflow-hidden">
                {/* TV Scanlines Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

                {/* Top Broadcast Bar */}
                <div className="flex items-center justify-between text-xs font-mono z-10 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                    <span className="font-bold text-red-500 tracking-wider">LIVE WANKHEDE</span>
                    <span className="text-neutral-400">| 48.2 OVERS</span>
                  </div>
                  <div className="text-amber-400 font-semibold tracking-wider">
                    TARGET: 275 RUNS (4 RUNS NEEDED OFF 11 BALLS)
                  </div>
                </div>

                {/* Stadium Atmosphere & The Six */}
                <div className="my-8 text-center z-10 space-y-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-600/30 border border-blue-400/40 text-blue-300 text-xs font-mono tracking-widest uppercase">
                    Nuwan Kulasekara to MS Dhoni
                  </div>
                  <h3 className="text-4xl sm:text-6xl font-black font-serif text-white tracking-wider drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    91* OFF 79 BALLS
                  </h3>
                  <div className="text-xl sm:text-2xl text-amber-300 font-bold font-sans">
                    “DHONI FINISHES OFF IN STYLE!”
                  </div>
                  <p className="max-w-xl mx-auto text-sm text-neutral-300 leading-relaxed font-sans">
                    With 4 runs needed to win, Dhoni twirled his bat, drove his weight through the front foot, and launched Kulasekara high over wide long-on into the Wankhede night sky. He paused, twirled the willow, and watched the ball sail into eternity.
                  </p>
                </div>

                {/* Scorecard Ticker Bar */}
                <div className="z-10 bg-blue-950/80 rounded-xl p-3 border border-blue-500/30 flex flex-wrap items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold text-sm">INDIA 277/4 (48.2 ov)</span>
                    <span className="text-emerald-400 font-bold">INDIA WON BY 6 WICKETS</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-300">
                    <span>MS Dhoni: 91* (79b, 8x4, 2x6)</span>
                    <span>G Gambhir: 97 (122b)</span>
                    <span>Yuvraj: 21* (24b)</span>
                  </div>
                </div>
              </div>

              {/* Match Insights Sidebar */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4 p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
                    <Trophy className="w-4 h-4" />
                    <span>PLAYER OF THE MATCH IN WORLD CUP FINAL</span>
                  </div>

                  <h4 className="text-xl font-serif font-bold text-white mb-2">
                    The Greatest Captain&apos;s Knock
                  </h4>

                  <p className="text-xs text-neutral-300 leading-relaxed font-sans mb-4">
                    In the highest run chase in World Cup final history (275), India was reeling at 31/2 (Sehwag 0, Tendulkar 18) and later 114/3 when Virat Kohli was dismissed.
                  </p>

                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-2 mb-4">
                    <div className="text-amber-400 font-mono font-semibold">
                      THE CALL AT THE DRESSING ROOM DOOR:
                    </div>
                    <p className="italic">
                      Dhoni went up to coach Gary Kirsten and said: &ldquo;I am going in next.&rdquo; With Muttiah Muralitharan bowling and Sri Lanka operating spinners, Dhoni wanted a right-hander to neutralise the turn, putting his own reputation on the line.
                    </p>
                  </div>

                  {/* Audio Commentary Quote Box */}
                  <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/20 text-xs">
                    <span className="font-mono text-blue-400 font-semibold block mb-1">
                      RAVI SHASTRI&apos;S ON-AIR WORDS:
                    </span>
                    <p className="italic text-blue-100">
                      &ldquo;Dhoni finishes off in style! A magnificent strike into the crowd! India lift the World Cup after 28 years! The party&apos;s started in the dressing room, and it’s an Indian captain who’s been absolutely magnificent in the night of the final!&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Wankhede Stadium, Mumbai</span>
                  <span className="text-amber-400">April 2, 2011</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "scorecard" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                <h3 className="text-base font-serif font-bold text-amber-300 mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  India Innings · 277/4 in 48.2 Overs (Target: 275)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-400">
                        <th className="py-2">Batter</th>
                        <th className="py-2">Dismissal</th>
                        <th className="py-2 text-right">R</th>
                        <th className="py-2 text-right">B</th>
                        <th className="py-2 text-right">4s</th>
                        <th className="py-2 text-right">6s</th>
                        <th className="py-2 text-right">SR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900 text-neutral-200">
                      <tr>
                        <td className="py-2.5 font-bold">Virender Sehwag</td>
                        <td className="text-neutral-500">lbw b Malinga</td>
                        <td className="text-right">0</td>
                        <td className="text-right">2</td>
                        <td className="text-right">0</td>
                        <td className="text-right">0</td>
                        <td className="text-right">0.00</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">Sachin Tendulkar</td>
                        <td className="text-neutral-500">c Sangakkara b Malinga</td>
                        <td className="text-right">18</td>
                        <td className="text-right">14</td>
                        <td className="text-right">2</td>
                        <td className="text-right">0</td>
                        <td className="text-right">128.57</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">Gautam Gambhir</td>
                        <td className="text-neutral-500">b Perera</td>
                        <td className="text-right font-bold text-amber-300">97</td>
                        <td className="text-right">122</td>
                        <td className="text-right">9</td>
                        <td className="text-right">0</td>
                        <td className="text-right">79.50</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">Virat Kohli</td>
                        <td className="text-neutral-500">c & b Dilshan</td>
                        <td className="text-right">35</td>
                        <td className="text-right">49</td>
                        <td className="text-right">4</td>
                        <td className="text-right">0</td>
                        <td className="text-right">71.42</td>
                      </tr>
                      <tr className="bg-amber-500/10 font-bold text-amber-300">
                        <td className="py-2.5">MS Dhoni (c & wk)</td>
                        <td className="text-emerald-400">not out</td>
                        <td className="text-right text-base text-amber-300">91*</td>
                        <td className="text-right">79</td>
                        <td className="text-right">8</td>
                        <td className="text-right">2</td>
                        <td className="text-right">115.18</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">Yuvraj Singh</td>
                        <td className="text-emerald-400">not out</td>
                        <td className="text-right">21*</td>
                        <td className="text-right">24</td>
                        <td className="text-right">2</td>
                        <td className="text-right">0</td>
                        <td className="text-right">87.50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="space-y-3">
              {[
                {
                  overs: "0.2 ov",
                  title: "Disaster Strikes: Sehwag 0 (2)",
                  desc: "Lasith Malinga traps Sehwag in front with a searing inswinger. Silence descends on Wankhede.",
                },
                {
                  overs: "6.1 ov",
                  title: "Tendulkar falls: 31/2",
                  desc: "Malinga induces an edge off Tendulkar. Sri Lanka are in firm command with 244 still needed.",
                },
                {
                  overs: "21.4 ov",
                  title: "Kohli Dismissed: 114/3",
                  desc: "Tillakaratne Dilshan takes a stunning return catch. Gambhir is solid, but India needs an anchor.",
                },
                {
                  overs: "22.0 ov",
                  title: "The Masterstroke: Dhoni promotes himself",
                  desc: "Overriding the established batting order, Dhoni walks out ahead of Player of the Tournament Yuvraj Singh.",
                },
                {
                  overs: "41.2 ov",
                  title: "Gambhir departs for a heroic 97",
                  desc: "Gambhir and Dhoni add 109 runs for the 4th wicket before Gambhir is bowled trying to charge Thisara Perera.",
                },
                {
                  overs: "48.2 ov",
                  title: "The Six into the Mumbai Night Sky",
                  desc: "Dhoni launches Kulasekara over long-on. India becomes World Champions after 28 years.",
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3"
                >
                  <div className="px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs font-bold whitespace-nowrap">
                    {step.overs}
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">{step.title}</h5>
                    <p className="text-xs text-neutral-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
