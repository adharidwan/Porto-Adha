import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/Hero";
import { Projects } from "../components/Projects";
import { Blogs } from  "../components/Blogs"; 
import { HonorsAwards } from "../components/HonorsAwards";
import { Experiences } from "../components/Experiences";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <Hero />
      <Projects />
      <Blogs />
      <HonorsAwards />
      <Experiences />
    </main>
  );
}
