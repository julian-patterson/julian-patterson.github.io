import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Stats from "@/components/Stats";
import SkillsGraph from "@/components/SkillsGraph";
import FreightExplainer from "@/components/FreightExplainer";
import Journey from "@/components/Journey";
import Now from "@/components/Now";
import Reading from "@/components/Reading";
import GitHubActivity from "@/components/GitHubActivity";
import FreightNetwork from "@/components/FreightNetwork";
import Marathon from "@/components/Marathon";
import Terminal from "@/components/Terminal";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Stats />
        <SkillsGraph />
        
        {/* New sections */}
        <FreightExplainer />
        <Journey />
        <Now />
        <Reading />
        <GitHubActivity />

        {/* ── Template sections for evaluation ── */}
        <FreightNetwork />
        <Marathon />
        <Terminal />
        <Contact />
      </main>
    </>
  );
}
