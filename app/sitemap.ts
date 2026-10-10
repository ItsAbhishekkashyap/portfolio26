import { MetadataRoute } from "next";

// Only public pages belong here. /admin is blocked in robots.txt and marked noindex,
// so listing it would show up as an error in Google Search Console.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://abhishekgond.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
