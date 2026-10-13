"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  Maximize2,
  Volume2,
  VolumeX,
  Play,
  BookOpen,
  X,
  ShieldCheck,
  ExternalLink,
  Film,
} from "lucide-react";
import type { StoryEntry } from "@/types/storybook";
import { MAHI_STORY_LIBRARY } from "@/data/mahiStoryLibrary";
import { storyAudio } from "./StoryAudio";
import { StoryVideoPlayer } from "./StoryVideoPlayer";
import { cn } from "@/lib/utils";

// Hindi transliterations / poetic couplets for all 36 moments matching Pusho.fun style
const PUSHO_HINDI_QUOTES: Record<string, { hindi: string; attribution: string }> = {
  "ranchi-goalkeeper-origins": {
    hindi: "मैदान चाहे फुटबॉल का हो या क्रिकेट का,\nनज़र हमेशा गेंद पर और कदम ज़मीन पर होने चाहिए।",
    attribution: "— धोनी",
  },
  "kharagpur-ticket-collector": {
    hindi: "कांटों का क्या कसूर था?\nजब कांटों पे पैर मैंने खुद रखा था।",
    attribution: "— धोनी (खड़गपुर संस्मरण)",
  },
  "kenya-tri-series-breakthrough": {
    hindi: "जब प्रतिभा को मौका मिलता है,\nतो गेंद स्टेडियम के बाहर ही गिरती है।",
    attribution: "— नैरोबी डायरी",
  },
  "chittagong-debut-runout": {
    hindi: "जब शुरुआत ही शून्य से हो,\nतो आगे का हर कदम सिर्फ बुलंदी की ओर जाता है।",
    attribution: "— धोनी",
  },
  "vizag-148-unleashed": {
    hindi: "आँखों में डर नहीं, इरादों में आग थी।\nविजाग ने देखा कि एक नया तूफान आया है।",
    attribution: "— विजाग २००५",
  },
  "jaipur-183-destruction": {
    hindi: "मुश्किल लक्ष्य सिर्फ हौसलों की आज़माइश हैं,\nअगर इरादा अटल हो तो पहाड़ भी झुक जाते हैं।",
    attribution: "— जयपुर १८४*",
  },
  "kingsmead-bowl-out-instinct": {
    hindi: "तैयारी किताबों से नहीं, अभ्यास से साबित होती है।\nजो स्टंप्स पर मार सके, गेंद उसी के हाथ में होनी चाहिए।",
    attribution: "— किंग्समीड २००७",
  },
  "johannesburg-joginder-final-over": {
    hindi: "परिणाम की चिंता मत करो जोगिंदर,\nअगर हारे तो ज़िम्मेदारी मेरी, जीते तो देश का गौरव।",
    attribution: "— जोहान्सबर्ग अंतिम ओवर",
  },
  "shirtless-trophy-handover": {
    hindi: "ट्रॉफी उनकी है जिन्होंने पसीना बहाया।\nहमारा काम तो बस रास्ते आसान करना था।",
    attribution: "— धोनी",
  },
  "cb-series-silent-celebration": {
    hindi: "जीत को आदत बनाओ, कोई चमत्कार नहीं।\nशोर मचाने से जीत बड़ी नहीं होती, खामोशी से डर बैठता है।",
    attribution: "— सिडनी २००८",
  },
  "process-over-result-doctrine": {
    hindi: "परिणाम केवल प्रक्रिया का प्रतिफल है।\nप्रक्रिया संभालो, परिणाम खुद संभल जाएगा।",
    attribution: "— धोनी वचन",
  },
  "press-box-composure-wit": {
    hindi: "जब आप खुद पर भरोसा रखते हैं,\nतो दूसरों के सवालों में ही उनके जवाब छिपे होते हैं।",
    attribution: "— वानखेड़े २०१६",
  },
  "dharamsala-helmet-punch-2010": {
    hindi: "शांत समंदर के नीचे भी कभी-कभी\nज्वालामुखी धड़कता है।",
    attribution: "— धर्मशाला २०१०",
  },
  "promoting-ahead-of-yuvraj": {
    hindi: "इतिहास गवाह है, सबसे बड़ा संकट\nसबसे बड़े निर्णय की मांग करता है।",
    attribution: "— २ अप्रैल २०११",
  },
  "wankhede-kulasekara-winning-six": {
    hindi: "धोनी फ़िनिशेज़ ऑफ़ इन स्टाइल!\nएक शॉट, अट्ठाईस साल का इंतज़ार, और एक अरब आँसू।",
    attribution: "— रवि शास्त्री (वानखेड़े २०११)",
  },
  "test-mace-brabourne-2009": {
    hindi: "सफ़ेद जर्सी में सबसे ऊपर पहुँचना,\nसालों के अनुशासन और त्याग का परिणाम है।",
    attribution: "— ब्रेबोर्न २००९",
  },
  "chepauk-double-hundred-2013": {
    hindi: "जब मुश्किल पिच पर परीक्षा हो,\nतो पलटवार ही सबसे सुरक्षित ढाल बनता है।",
    attribution: "— चेपॉक २२४",
  },
  "edgbaston-rain-champions-trophy": {
    hindi: "मैदान पर १३० रन हैं। भगवान बचाने नहीं आएगा,\nअगर नंबर एक टीम हो, तो लड़कर दिखाओ।",
    attribution: "— एजबेस्टन २०१३",
  },
  "honorary-lt-col-commission": {
    hindi: "वर्दी कोई पोशाक नहीं है,\nयह मातृभूमि के प्रति आजीवन निष्ठा और कर्तव्य है।",
    attribution: "— ले. कर्नल एम. एस. धोनी",
  },
  "balidan-maroon-wings-jumps": {
    hindi: "हवा में कूदते वक्त डर सबको लगता है,\nफर्क सिर्फ इतना है कि पैराट्रूपर डर को मात देता है।",
    attribution: "— आगरा २०१५",
  },
  "victor-force-kashmir-patrol": {
    hindi: "शौहरत चाहे जितनी मिले,\nसच्चा सुकून देश की सीमा पर खड़े पहरेदार के साथ है।",
    attribution: "— कश्मीर २०१९",
  },
  "the-first-rajdoot-restoration": {
    hindi: "पुरानी चीज़ों में एक रूह होती है,\nजब अपने हाथों से संवारो तो वो कभी धोखा नहीं देतीं।",
    attribution: "— राजदूत संस्मरण",
  },
  "glass-garage-hellcat-sanctuary": {
    hindi: "मशीनें कभी झूठ नहीं बोलतीं।\nइंजन की आवाज़ में एक सच्ची खामोशी होती है।",
    attribution: "— रांची गैराज",
  },
  "midnight-solo-ranchi-rides": {
    hindi: "जब हेलमेट पहनते हो, तो कोई नहीं जानता तुम कौन हो।\nतुम बस सड़क और हवा के बीच एक मुसाफ़िर हो।",
    attribution: "— धोनी",
  },
  "stump-mic-chronicles": {
    hindi: "ओए श्री इधर देख, गर्लफ्रेंड नहीं है उधर,\nइधर देख ले!",
    attribution: "— स्टंप माइक संवाद",
  },
  "point-zero-eight-second-stumping": {
    hindi: "पलक झपकने में दशमलव दस सेकंड लगते हैं,\nऔर स्टंप की गिल्लियां उड़ने में केवल शून्य दशमलव शून्य आठ।",
    attribution: "— ०.०८ सेकंड की बाजीगरी",
  },
  "the-open-hotel-room-protocol": {
    hindi: "कमरे का दरवाज़ा हमेशा खुला रहता था,\nताकि कोई नया लड़का अपने कप्तान से डरना भूल जाए।",
    attribution: "— कमरा नं. ७०७",
  },
  "csk-first-ipl-crown-2010": {
    hindi: "ताकत के सामने चालाकी और सब्र,\nटी-२० क्रिकेट का सबसे बड़ा मंत्र है।",
    attribution: "— डी.वाई. पाटिल २०१०",
  },
  "the-2018-comeback-tears": {
    hindi: "जो रिश्ता दिल से जुड़ा हो,\nवो दो साल के वनवास से और भी गहरा हो जाता है।",
    attribution: "— चेन्नई २०१८",
  },
  "lifting-jadeja-at-3am-2023": {
    hindi: "रात के तीन बजे, जब सब थम गया,\nतो पीले समंदर ने फिर से साबित कर दिया कि जादू सच होता है।",
    attribution: "— अहमदाबाद २०२३",
  },
  "nineteen-twenty-nine-retirement": {
    hindi: "पल दो पल का शायर हूँ, पल दो पल मेरी कहानी है...\n१९२९ बजे से मुझे रिटायर्ड समझें।",
    attribution: "— १५ अगस्त २०२०",
  },
  "mcg-2014-silent-test-exit": {
    hindi: "अलविदा कहने के लिए तालियों की ज़रूरत नहीं होती,\nजब समय आए, तो सम्मान से कलम रख देनी चाहिए।",
    attribution: "— मेलबर्न २०१४",
  },
  "the-mentor-silhouette": {
    hindi: "सच्चा मार्गदर्शक वही है\nजो पर्दे के पीछे रहकर नई पीढ़ी को चमकने दे।",
    attribution: "— दुबई २०२१",
  },
  "bengaluru-sprint-single-glove": {
    hindi: "एक दस्ताना पहले ही उतार दिया था,\nक्योंकि मुझे पता था कि दौड़ने में मैं उससे तेज़ हूँ।",
    attribution: "— बेंगलुरु २०१६",
  },
  "stepping-out-of-trophy-frame": {
    hindi: "ट्रॉफी नए लड़कों के हाथों में दो और पीछे हट जाओ,\nकप्तान का काम जीतना है, तस्वीर खिंचवाना नहीं।",
    attribution: "— नेतृत्व दर्शन",
  },
  "solitary-walk-ranchi-outfield": {
    hindi: "कुछ सफर रनों और ट्रॉफियों में गिने जाते हैं,\nऔर कुछ सिर्फ उन लम्हों में जो कभी भुलाए नहीं जा सकते।",
    attribution: "— रांची २०१९ (उपसंहार)",
  },
  "play-your-game-backing": {
    hindi: "अपना स्वाभाविक खेल खेलो, मैं तुम्हारे पीछे खड़ा हूँ।\nस्कोरबोर्ड या अख़बारों की चिंता छोड़ो, बस खुद को व्यक्त करो।",
    attribution: "— धोनी (युवा बल्लेबाजों को भरोसा)",
  },
  "cb-series-proving-cricinfo-wrong": {
    hindi: "शुरू करने से पहले बता दूँ, मैंने क्रिकइन्फो पर आपका लेख पढ़ा था।\nआपने ऑस्ट्रेलिया को प्रबल दावेदार बताया था,\nआज मुझे लगता है कि मैंने और मेरे लड़कों ने आपको गलत साबित कर दिया।",
    attribution: "— धोनी (इयान चैपल को सीधा जवाब, सिडनी २००८)",
  },
  "kishore-kumar-to-sean-paul": {
    hindi: "किशोर कुमार से अब हम सीन पॉल तक पहुँच चुके हैं।\nड्रेसिंग रूम का संगीत बदल गया, ऊर्जा बदल गई, और विकेटों के बीच की दौड़ भी।",
    attribution: "— धोनी (पीढ़ीगत बदलाव पर)",
  },
  "helicopter-stool-bouncers-quip": {
    hindi: "बाउंसर पर मैं हेलीकॉप्टर शॉट तब तक नहीं खेल सकता,\nजब तक कि मुझे अपने साथ एक स्टूल न मिल जाए।",
    attribution: "— धोनी (प्रेस कॉन्फ्रेंस चुटकुला)",
  },
  "duckworth-lewis-deadpan-quip": {
    hindi: "साफ़ कहूँ तो मुझे डकवर्थ-लुईस नियम कभी समझ नहीं आता,\nमैं तो बस अंपायर के फ़ैसले का इंतज़ार करता हूँ।",
    attribution: "— धोनी (प्रेस वार्ता)",
  },
  "ask-physio-press-release-quip": {
    hindi: "शायद आपको उनके फ़िज़ियो से कहना चाहिए\nकि वो इस पर एक प्रेस विज्ञप्ति जारी कर दें।",
    attribution: "— धोनी (सटीक हाज़िरजवाबी)",
  },
  "not-here-to-prove-champions-trophy": {
    hindi: "मैं यहाँ किसी को यह साबित करने नहीं आया कि मैं कितना अच्छा हूँ।\nअगर मैं लोगों को साबित करने में लग गया,\nतो जो असली काम है, उससे मेरा ध्यान भटक जाएगा।",
    attribution: "— धोनी (चैंपियंस ट्रॉफी जीत, बर्मिंघम २०१३)",
  },
  "you-want-me-to-retire-sam-ferris": {
    hindi: "क्या आप चाहते हैं कि मैं संन्यास ले लूँ?\nक्या आपको लगता है मैं अनफ़िट हूँ?\nक्या मैं २०१९ विश्व कप तक खेल सकता हूँ?\n...तो फिर आपने खुद ही अपने सवाल का जवाब दे दिया!",
    attribution: "— धोनी (सैम फेरिस से सीधा संवाद, २०१६)",
  },
  "dont-ride-all-bikes-at-a-time": {
    hindi: "गैराज में कई सारी मोटरसाइकिलें हैं मेरे पास,\nलेकिन मैं एक समय में सारी गाड़ियाँ एक साथ नहीं चलाता।",
    attribution: "— धोनी (टीम रोटेशन पर मशहूर मिसाल)",
  },
};

interface StPageFlipBookProps {
  onOpenDrawer: () => void;
}

export const StPageFlipBook: React.FC<StPageFlipBookProps> = ({ onOpenDrawer }) => {
  const bookContainerRef = useRef<HTMLDivElement | null>(null);
  const pageFlipInstanceRef = useRef<any>(null);

  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [activeModalStory, setActiveModalStory] = useState<StoryEntry | null>(null);
  const [modalMode, setModalMode] = useState<"media" | "context">("media");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const totalPages = MAHI_STORY_LIBRARY.length * 2; // Each story is 2 pages (Left + Right)

  // Initialize StPageFlip on client
  useEffect(() => {
    let pageFlip: any = null;

    const initBook = async () => {
      if (!bookContainerRef.current) return;

      try {
        const { PageFlip } = await import("page-flip");
        if (!bookContainerRef.current) return;

        // Clean any existing canvas if re-initializing
        const container = bookContainerRef.current;
        container.innerHTML = "";

        // Build HTML pages dynamically inside container
        const pagesWrapper = document.createElement("div");
        pagesWrapper.className = "st-pages-wrapper";

        // Create DOM pages for each story (Left page, then Right page)
        MAHI_STORY_LIBRARY.forEach((story, idx) => {
          const hindiData = PUSHO_HINDI_QUOTES[story.id] || {
            hindi: story.quote.text || story.subtitle,
            attribution: "— धोनी",
          };

          // LEFT PAGE
          const leftPage = document.createElement("div");
          leftPage.className = "st-page pusho-parchment select-none text-[#2b241b] flex flex-col justify-between p-6 sm:p-8 border-r border-[#cfbfa8] relative shadow-[inset_-25px_0_35px_-15px_rgba(80,50,20,0.18)]";
          leftPage.setAttribute("data-density", "soft");
          leftPage.innerHTML = `
            <!-- Top Header -->
            <div class="flex items-center justify-between pb-3 border-b border-[#c4b39b]/60 text-[11px] font-serif tracking-widest text-[#7a6449] uppercase">
              <span>मही ज्ञान पीठ • भाग ${story.chapterNumber}</span>
              <span class="font-bold tracking-wider text-[#543d26]">LORD MAHI</span>
            </div>

            <!-- Center Visual Plate -->
            <div class="my-auto py-3 flex flex-col items-center">
              <div class="relative w-[210px] sm:w-[260px] h-[210px] sm:h-[260px] rounded-lg overflow-hidden border-2 border-[#b89758] shadow-[0_12px_30px_rgba(50,30,10,0.25)] group cursor-pointer" id="img-trigger-${idx}">
                <img src="${story.media.posterUrl}" alt="${story.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none"></div>
                <div class="absolute bottom-2 left-2 right-2 text-center">
                  <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-black/80 text-[10px] font-mono text-[#f3ece0] border border-[#b89758]/50 shadow">
                    🔍 चित्र बड़ा करके देखें (Tap to expand)
                  </span>
                </div>
              </div>

              <!-- Voice / Video Pill Button -->
              <button type="button" class="mt-4 px-4 py-2 rounded-full bg-[#3d1313] hover:bg-[#521919] border border-[#b89758]/60 text-[#f5eee2] text-xs font-serif font-semibold tracking-wider flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer" id="media-btn-${idx}">
                <span>🎙️</span>
                <span>LISTEN IN THE VOICE OF MAHI</span>
              </button>
            </div>

            <!-- Footer -->
            <div class="pt-3 border-t border-[#c4b39b]/60 flex items-center justify-between text-[11px] font-serif text-[#7a6449]">
              <span>पृष्ठ ${idx * 2 + 1}</span>
              <span class="tracking-widest">॥ शुभम् ॥</span>
              <span>${story.eventDate}</span>
            </div>
          `;

          // RIGHT PAGE
          const rightPage = document.createElement("div");
          rightPage.className = "st-page pusho-parchment select-none text-[#2b241b] flex flex-col justify-between p-6 sm:p-8 border-l border-[#cfbfa8] relative shadow-[inset_25px_0_35px_-15px_rgba(80,50,20,0.18)]";
          rightPage.setAttribute("data-density", "soft");
          rightPage.innerHTML = `
            <!-- Top Header -->
            <div class="flex items-center justify-between pb-3 border-b border-[#c4b39b]/60 text-[11px] font-serif tracking-widest text-[#7a6449]">
              <span class="tracking-wider font-semibold">॥ श्री माही वचन ॥</span>
              <span class="text-sm cursor-pointer opacity-70 hover:opacity-100" title="Share Moment" id="share-btn-${idx}">🔗</span>
            </div>

            <!-- Center Sacred Poetic Quote -->
            <div class="my-auto py-4 flex flex-col justify-center">
              <div class="border-l-4 border-[#8B1E1E] pl-4 sm:pl-5 py-2 my-2">
                <p class="font-serif text-lg sm:text-xl md:text-2xl font-bold leading-relaxed text-[#1e1710] whitespace-pre-line tracking-wide">
                  ${hindiData.hindi}
                </p>
                <p class="mt-3 font-serif italic text-xs sm:text-sm text-[#5a4835] leading-relaxed">
                  "${story.subtitle}"
                </p>
              </div>

              <div class="text-right mt-3">
                <span class="font-serif font-bold text-base sm:text-lg text-[#8B1E1E] tracking-wider">
                  ${hindiData.attribution}
                </span>
              </div>

              <!-- Context Accordion Trigger -->
              <div class="mt-5 text-center">
                <button type="button" class="px-3.5 py-1.5 rounded-full bg-[#e8ded0] hover:bg-[#ded1c0] border border-[#b89758]/40 text-[#423120] text-[11px] font-serif font-semibold tracking-wider transition-colors cursor-pointer" id="context-btn-${idx}">
                  📖 संदर्भ एवं प्रसंग (Context &amp; Meaning)
                </button>
              </div>
            </div>

            <!-- Footer -->
            <div class="pt-3 border-t border-[#c4b39b]/60 flex items-center justify-between text-[11px] font-serif text-[#7a6449]">
              <span>॥ ॐ तत्सत् ॥</span>
              <span>पृष्ठ ${idx * 2 + 2}</span>
            </div>
          `;

          pagesWrapper.appendChild(leftPage);
          pagesWrapper.appendChild(rightPage);
        });

        container.appendChild(pagesWrapper);

        // Attach StPageFlip
        pageFlip = new PageFlip(container, {
          width: 520,
          height: 720,
          size: "stretch",
          minWidth: 320,
          maxWidth: 620,
          minHeight: 460,
          maxHeight: 880,
          maxShadowOpacity: 0.65,
          showCover: false,
          mobileScrollSupport: false,
          useMouseEvents: true,
          clickEventForward: true,
          usePortrait: true,
          startPage: 0,
          drawShadow: true,
          flippingTime: 750,
        });

        const allDOMElements = container.querySelectorAll(".st-page");
        pageFlip.loadFromHTML(allDOMElements);

        pageFlip.on("flip", (e: any) => {
          storyAudio.playPageTurnSound();
          setCurrentPageIndex(e.data);
        });

        pageFlipInstanceRef.current = pageFlip;
        setIsLoaded(true);

        // Bind click events on pages for expanding media & context modals
        MAHI_STORY_LIBRARY.forEach((story, idx) => {
          const imgTrigger = container.querySelector(`#img-trigger-${idx}`);
          const mediaBtn = container.querySelector(`#media-btn-${idx}`);
          const contextBtn = container.querySelector(`#context-btn-${idx}`);
          const shareBtn = container.querySelector(`#share-btn-${idx}`);

          imgTrigger?.addEventListener("click", () => {
            setActiveModalStory(story);
            setModalMode("media");
          });

          mediaBtn?.addEventListener("click", () => {
            setActiveModalStory(story);
            setModalMode("media");
          });

          contextBtn?.addEventListener("click", () => {
            setActiveModalStory(story);
            setModalMode("context");
          });

          shareBtn?.addEventListener("click", () => {
            if (navigator.share) {
              navigator.share({
                title: story.title,
                text: `${story.title} - MS Dhoni Digital Storybook`,
                url: window.location.href,
              }).catch(() => {});
            }
          });
        });
      } catch (err) {
        console.error("Error initializing StPageFlip:", err);
      }
    };

    initBook();

    return () => {
      if (pageFlip) {
        pageFlip.destroy();
      }
      pageFlipInstanceRef.current = null;
    };
  }, []);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        pageFlipInstanceRef.current?.flipNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        pageFlipInstanceRef.current?.flipPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNext = () => {
    pageFlipInstanceRef.current?.flipNext();
  };

  const handlePrev = () => {
    pageFlipInstanceRef.current?.flipPrev();
  };

  const currentStoryIdx = Math.floor(currentPageIndex / 2);
  const currentStory = MAHI_STORY_LIBRARY[currentStoryIdx] || MAHI_STORY_LIBRARY[0];
  const displayedPages = `${currentPageIndex + 1}–${Math.min(totalPages, currentPageIndex + 2)}`;

  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-between items-center py-4 px-2 sm:px-6 select-none">
      {/* Central 3D Physical Book Area */}
      <div className="relative w-full max-w-5xl flex items-center justify-center my-auto">
        {/* Loading placeholder while StPageFlip boots */}
        {!isLoaded && (
          <div className="w-[500px] h-[680px] rounded-xl bg-[#ede3ce] animate-pulse flex flex-col items-center justify-center text-[#543d26] font-serif text-sm">
            <span>Loading Sacred Pages...</span>
          </div>
        )}

        {/* Real StPageFlip DOM Container */}
        <div
          ref={bookContainerRef}
          className="relative w-full flex items-center justify-center overflow-visible drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
        />
      </div>

      {/* Pusho.fun Bottom Control Strip (Exact match to reference Image 2) */}
      <div className="relative z-30 w-full max-w-4xl mx-auto flex items-center justify-between gap-4 pt-4 pb-2">
        {/* Far Left Circular Prev Button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPageIndex === 0}
          className={cn(
            "w-12 h-12 rounded-full border border-amber-500/40 bg-black/80 flex items-center justify-center text-amber-400 hover:text-amber-300 hover:border-amber-400 hover:scale-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(251,191,36,0.25)] cursor-pointer",
            currentPageIndex === 0 && "opacity-30 cursor-not-allowed hover:scale-100"
          )}
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Center Prompt & Page Counter */}
        <div className="flex flex-col items-center text-center">
          <span className="text-sm sm:text-base font-serif font-bold text-amber-400 tracking-wider">
            Moment {currentStoryIdx + 1} • Page {displayedPages} / {totalPages}
          </span>
          <span className="text-[11px] sm:text-xs font-serif text-stone-400 tracking-wide mt-0.5">
            Page के edge को drag करें या Arrow बटन दबाएँ
          </span>
        </div>

        {/* Far Right Circular Next Button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentPageIndex >= totalPages - 2}
          className={cn(
            "w-12 h-12 rounded-full border border-amber-500/40 bg-black/80 flex items-center justify-center text-amber-400 hover:text-amber-300 hover:border-amber-400 hover:scale-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(251,191,36,0.25)] cursor-pointer",
            currentPageIndex >= totalPages - 2 && "opacity-30 cursor-not-allowed hover:scale-100"
          )}
          aria-label="Next Page"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Modal Lightbox for Media Video Player or Context / Meaning */}
      {activeModalStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#14100c] border border-[#b89758]/50 rounded-2xl p-5 sm:p-7 shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalStory(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer z-20"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {modalMode === "media" ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#b89758]">
                  <Film className="w-3.5 h-3.5" />
                  <span>Archival Visual Plate · {activeModalStory.chapterTitle}</span>
                </div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                  {activeModalStory.title}
                </h3>
                <StoryVideoPlayer
                  media={activeModalStory.media}
                  title={activeModalStory.title}
                  isActivePage={true}
                />
                <p className="text-xs font-serif italic text-stone-300">
                  &ldquo;{activeModalStory.subtitle}&rdquo;
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-[80vh] overflow-y-auto pr-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#b89758]">
                  ऐतिहासिक संदर्भ एवं प्रसंग · CH {activeModalStory.chapterNumber}
                </span>
                <h3 className="font-serif font-bold text-2xl text-white">
                  {activeModalStory.title}
                </h3>
                <div className="p-3 rounded-lg bg-[#b89758]/10 border border-[#b89758]/30 text-xs font-serif text-stone-300 leading-relaxed">
                  <strong className="text-[#b89758] block mb-1">ऐतिहासिक पृष्ठभूमि (Historical Context):</strong>
                  {activeModalStory.historicalContext}
                </div>
                <div className="text-sm font-serif leading-relaxed text-stone-200 space-y-2 mt-2">
                  <p>{activeModalStory.narrative}</p>
                  <p className="italic text-[#d4af37] pt-1">
                    <strong>The Meaning:</strong> {activeModalStory.meaning}
                  </p>
                </div>
                {activeModalStory.quote.text && (
                  <div className="mt-3 p-3 rounded bg-black/60 border border-[#8B1E1E]/50 border-l-4 border-l-[#8B1E1E]">
                    <p className="font-serif italic text-sm text-amber-200">
                      &ldquo;{activeModalStory.quote.text}&rdquo;
                    </p>
                    <span className="block mt-1 text-[11px] font-mono text-stone-400">
                      — {activeModalStory.quote.speaker} ({activeModalStory.quote.sourceTitle})
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
