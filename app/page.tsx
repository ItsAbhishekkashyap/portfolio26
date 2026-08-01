import React from "react";
import { getProjects } from "@/lib/actions";
import MainClientWrapper from "@/components/MainClientWrapper";

export const revalidate = 60; // Incremental Static Regeneration every 60s

export default async function HomePage() {
  const initialProjects = await getProjects();

  return <MainClientWrapper projects={initialProjects} />;
}
