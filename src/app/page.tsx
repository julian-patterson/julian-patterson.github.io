import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MetroDivider from "@/components/MetroDivider";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import SkillsGraph from "@/components/SkillsGraph";
import GitHubActivity from "@/components/GitHubActivity";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <MetroDivider />
        <Experience />
        <Projects />
        <SkillsGraph />
        <GitHubActivity />
        <Contact />
      </main>
    </>
  );
}
