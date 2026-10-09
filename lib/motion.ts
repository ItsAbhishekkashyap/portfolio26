"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

const mq = (q: string) => typeof window !== "undefined" && window.matchMedia(q).matches;
export const prefersReducedMotion = () => mq("(prefers-reduced-motion: reduce)");
export const canHover = () => mq("(hover: hover)");
export const isSmall = () => mq("(max-width: 820px)");
export const isPhone = () => mq("(max-width: 560px)");
