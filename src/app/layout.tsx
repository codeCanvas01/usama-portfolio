import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usamadevstudio.com"),
  title: {
    default: "Usama | Expert Shopify Developer & Liquid Theme Architect",
    template: "%s | Usama Dev Studio",
  },
  description:
    "Hire an expert Shopify developer & Liquid 2.0 theme architect. Specializing in bespoke storefronts, 98+ PageSpeed optimization, custom 3D WebGL previews, subscription flows, and high-converting checkout UX.",
  keywords: [
    "Shopify Developer",
    "Expert Shopify Developer",
    "Shopify Liquid 2.0 Theme Developer",
    "Shopify Store Speed Optimization",
    "Custom Shopify Theme Development",
    "Shopify 3D WebGL Previews",
    "Shopify App Integrations Developer",
    "Shopify Conversion Rate Optimization CRO",
    "DTC E-Commerce Architect",
    "Shopify Checkout UI Extensibility",
    "Shopify Bug Fix & Maintenance",
    "Recharge Subscriptions Shopify",
  ],
  authors: [{ name: "Usama", url: "https://usamadevstudio.com" }],
  creator: "Usama",
  publisher: "Usama Dev Studio",
  alternates: {
    canonical: "https://usamadevstudio.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://usamadevstudio.com",
    siteName: "Usama Dev Studio - Shopify Engineering",
    title: "Usama | Expert Shopify Developer & Liquid Theme Architect",
    description:
      "Bespoke Shopify 2.0 themes, sub-second PageSpeed optimization, custom 3D WebGL experiences, and high-velocity DTC e-commerce architecture.",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Usama - Expert Shopify Developer & Liquid Architect Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Usama | Expert Shopify Developer & Liquid Theme Architect",
    description:
      "Bespoke Shopify 2.0 themes, sub-second PageSpeed optimization, custom 3D WebGL experiences, and high-velocity DTC e-commerce architecture.",
    images: ["/images/og-preview.png"],
    creator: "@usamadev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-icon.png",
  },
  category: "Technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://usamadevstudio.com/#person",
      "name": "Usama",
      "jobTitle": "Lead Shopify Developer & E-Commerce Architect",
      "url": "https://usamadevstudio.com",
      "image": "https://usamadevstudio.com/images/usama-avatar.png",
      "sameAs": [
        "https://github.com/codeCanvas01",
        "https://wa.me/923455152512"
      ],
      "knowsAbout": [
        "Shopify Liquid 2.0",
        "Shopify Store Speed Optimization",
        "Shopify Theme Architecture",
        "Custom Checkout UI Extensibility",
        "Shopify App Embeds & Custom Integrations",
        "3D WebGL Product Previews",
        "Recharge Subscriptions Integration",
        "Conversion Rate Optimization (CRO)",
        "Mobile-First E-Commerce Engineering"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://usamadevstudio.com/#service",
      "name": "Usama Dev Studio - Shopify Engineering",
      "url": "https://usamadevstudio.com",
      "logo": "https://usamadevstudio.com/icon.svg",
      "image": "https://usamadevstudio.com/images/og-preview.png",
      "priceRange": "$$$$",
      "telephone": "+923455152512",
      "founder": { "@id": "https://usamadevstudio.com/#person" },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Worldwide"
      },
      "knowsLanguage": ["en"]
    }
  ]
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
