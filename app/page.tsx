import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Categories from "@/components/Categories";
import Collaborate from "@/components/Collaborate";
import Social from "@/components/Social";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Categories />
        <Collaborate />
        <Social />
        <Contact />
      </main>
    </>
  );
}
