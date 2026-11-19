import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Work from "@/components/Work";
import Categories from "@/components/Categories";
import Process from "@/components/Process";
import Collaborate from "@/components/Collaborate";
import Social from "@/components/Social";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Categories />
        <Process />
        <Collaborate />
        <Social />
        <Contact />
      </main>
    </>
  );
}
