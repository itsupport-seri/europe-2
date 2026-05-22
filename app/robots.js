export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://europe-test.vercel.app/sitemap.xml",
  };
}
