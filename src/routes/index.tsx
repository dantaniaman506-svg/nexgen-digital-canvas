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
