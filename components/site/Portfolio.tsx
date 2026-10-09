"use client";

import React, { useEffect } from "react";
import { gsap, canHover, prefersReducedMotion } from "@/lib/motion";
import type { Project } from "@/lib/content";
import SiteProvider from "./SiteProvider";
import { Preloader, Header, MenuNav } from "./Chrome";
import Hero from "./Hero";
import { Intro, Proof, Journey, Recognition, Toolkit } from "./Sections";
import Work from "./Work";
import Footer, { Curve } from "./Footer";
import Drawers from "./Drawers";
import AskChat from "./AskChat";

/** Elements marked .magnetic lean toward the cursor and spring back on leave. */
function useMagnetic() {
  useEffect(() => {
    if (!canHover() || prefersReducedMotion()) return;
    const cleanups: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>(".magnetic").forEach((el) => {
      const strength = el.classList.contains("burger") || el.querySelector(".circle-btn") ? 0.4 : 0.3;
      const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1,0.3)" });
      const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1,0.3)" });
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => { xTo(0); yTo(0); };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      cleanups.push(() => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); });
    });
    return () => cleanups.forEach((c) => c());
  }, []);
}

function Page({ projects, also }: { projects: Project[]; also: Project[] }) {
  useMagnetic();
  return (
    <>
      <Preloader />
      <Header />
      <MenuNav />
      <main id="top">
        <Hero />
        <Intro />
        <Work projects={projects} also={also} />
        <Proof />
        <Journey />
        <Recognition />
        <Toolkit />
        <Curve />
      </main>
      <Footer />
      <AskChat />
      <Drawers all={[...projects, ...also]} />
    </>
  );
}

export default function Portfolio(props: { projects: Project[]; also: Project[] }) {
  return (
    <SiteProvider>
      <Page {...props} />
    </SiteProvider>
  );
}
