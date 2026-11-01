import Loader from "@/components/sections/Loader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Workshop from "@/components/sections/Workshop";
import Work from "@/components/sections/Work";
import Capabilities from "@/components/sections/Capabilities";
import Story from "@/components/sections/Story";
import CreatorCard from "@/components/sections/CreatorCard";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <Workshop />
        <Work />
        <Capabilities />
        <Story />
        <CreatorCard />
        <Contact />
      </main>
      <Footer />
    </>
  );
}