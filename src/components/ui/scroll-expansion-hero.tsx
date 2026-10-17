"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent,
  type WheelEvent,
} from "react";
import Image from "@/components/ui/next-image-shim";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  firstPart?: string;
  secondPart?: string;
  date?: string;
  scrollToExpand?: string;
  scrollCueText?: string;
  showScrollCue?: boolean;
  textBlend?: boolean;
  children?: ReactNode;
  titleClassName?: string;
  dateClassName?: string;
  hintClassName?: string;
}

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  firstPart,
  secondPart,
  date,
  scrollToExpand,
  scrollCueText,
  showScrollCue = true,
  textBlend,
  children,
  titleClassName,
  dateClassName,
  hintClassName,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1,
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        // Increase sensitivity for mobile, especially when scrolling back
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005; // Higher sensitivity for scrolling back
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1,
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("wheel", handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener("scroll", handleScroll as EventListener);
    window.addEventListener(
      "touchstart",
      handleTouchStart as unknown as EventListener,
      { passive: false },
    );
    window.addEventListener(
      "touchmove",
      handleTouchMove as unknown as EventListener,
      { passive: false },
    );
    window.addEventListener("touchend", handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel as unknown as EventListener,
      );
      window.removeEventListener("scroll", handleScroll as EventListener);
      window.removeEventListener(
        "touchstart",
        handleTouchStart as unknown as EventListener,
      );
      window.removeEventListener(
        "touchmove",
        handleTouchMove as unknown as EventListener,
      );
      window.removeEventListener("touchend", handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  let defaultFirst = "";
  let defaultRest = "";
  if (title) {
    if (title.includes("\n")) {
      const parts = title.split("\n");
      defaultFirst = parts[0]?.trim() || "";
      defaultRest = parts.slice(1).join(" ").trim();
    } else {
      defaultFirst = title.split(" ")[0];
      defaultRest = title.split(" ").slice(1).join(" ");
    }
  }

  const firstWord = firstPart !== undefined ? firstPart : defaultFirst;
  const restOfTitle = secondPart !== undefined ? secondPart : defaultRest;

  return (
    <div
      ref={sectionRef}
      className="transition-colors duration-700 ease-in-out overflow-x-hidden"
    >
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt="Background"
              width={1920}
              height={1080}
              className="w-screen h-screen"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              <div
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl overflow-hidden"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.4)",
                }}
              >
                {mediaType === "video" ? (
                  mediaSrc.includes("youtube.com") ? (
                    <div className="relative w-full h-full pointer-events-none">
                      <iframe
                        width="100%"
                        height="100%"
                        src={
                          mediaSrc.includes("embed")
                            ? mediaSrc +
                              (mediaSrc.includes("?") ? "&" : "?") +
                              "autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1"
                            : mediaSrc.replace("watch?v=", "embed/") +
                              "?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=" +
                              mediaSrc.split("v=")[1]
                        }
                        className="w-full h-full rounded-xl"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div
                        className="absolute inset-0 z-10"
                        style={{ pointerEvents: "none" }}
                      ></div>

                      <motion.div
                        className="absolute inset-0 bg-black/30 rounded-xl"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-full pointer-events-none">
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover rounded-xl"
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div
                        className="absolute inset-0 z-10"
                        style={{ pointerEvents: "none" }}
                      ></div>

                      <motion.div
                        className="absolute inset-0 bg-black/30 rounded-xl"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={mediaSrc}
                      alt={title || "Media content"}
                      width={1280}
                      height={720}
                      className="w-full h-full object-cover rounded-xl"
                      unoptimized
                    />

                    <motion.div
                      className="absolute inset-0 bg-black/40 rounded-xl"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 flex flex-col items-center text-center z-20 pointer-events-none px-4">
                  {date && (
                    <p
                      className={dateClassName || "text-xl text-blue-200"}
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className={hintClassName || "text-blue-200 font-medium text-center"}
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center justify-center text-center gap-2 sm:gap-4 w-full relative z-10 transition-none flex-col ${
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                }`}
              >
                <motion.h1
                  className={`${titleClassName || "text-4xl md:text-5xl lg:text-6xl font-bold text-blue-200"} whitespace-nowrap transition-none`}
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.h1>
                <motion.span
                  className={`${titleClassName || "text-4xl md:text-5xl lg:text-6xl font-bold text-center text-blue-200"} whitespace-nowrap transition-none`}
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </motion.span>
              </div>

              {/* Bottom scroll down option / indicator (CONTINUE TO INVITATION v) */}
              {showScrollCue && (
                <motion.button
                  type="button"
                  onClick={() => {
                    setScrollProgress(1);
                    setMediaFullyExpanded(true);
                    setShowContent(true);
                    const invitationSection = document.getElementById("invitation");
                    if (invitationSection) {
                      invitationSection.scrollIntoView({ behavior: "smooth" });
                    } else {
                      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
                    }
                  }}
                  className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 cursor-pointer opacity-95 hover:opacity-100 transition-opacity focus:outline-none"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{
                    opacity: scrollProgress > 0.6 ? 0 : 1,
                    y: 0,
                    pointerEvents: scrollProgress > 0.6 ? "none" : "auto",
                  }}
                  transition={{ duration: 0.25 }}
                  aria-label="Continue to invitation"
                >
                  <span className="font-sans-ui text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#FDFBF7] font-medium whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                    {scrollCueText || "CONTINUE TO INVITATION"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-[#C9A227] animate-bounce" strokeWidth={2.5} />
                </motion.button>
              )}
            </div>

            <motion.section
              className="flex flex-col w-full px-4 sm:px-8 py-8 md:px-16 lg:py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
