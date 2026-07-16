import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/sections/Hero";
import { About } from "@/components/site/sections/About";
import { ReviewsMarquee } from "@/components/site/sections/ReviewsMarquee";
import { Services } from "@/components/site/sections/Services";
import { WhyUs } from "@/components/site/sections/WhyUs";
import { Industries } from "@/components/site/sections/Industries";
import { Results } from "@/components/site/sections/Results";
import { FAQ } from "@/components/site/sections/FAQ";
import { Contact } from "@/components/site/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexgen — Digital Marketing & Growth Agency in Ahmedabad" },
      {
        name: "description",
        content:
          "Creative digital marketing agency in Ahmedabad. Social media, SEO, Google & Meta ads, websites and branding — all in one growth engine.",
      },
      { property: "og:title", content: "Nexgen — Digital Marketing & Growth Agency" },
      {
        property: "og:description",
        content:
          "We turn ideas into impact. Social media, SEO, ads, websites & apps — engineered to grow your brand.",
      },
      { property: "og:url", content: "/" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ReviewsMarquee />
      <Services />
      <WhyUs />
      <Industries />
      <Results />
      <FAQ />
      <Contact />
    </>
  );
}
