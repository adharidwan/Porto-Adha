import { createFileRoute } from "@tanstack/react-router";
import { AllProjects } from "../../components/AllProjects";

export const Route = createFileRoute("/projects/")({
  component: AllProjects,
});
