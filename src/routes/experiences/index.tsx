import { createFileRoute } from "@tanstack/react-router";
import { AllExperiences } from "../../components/AllExperiences";

export const Route = createFileRoute("/experiences/")({
  component: AllExperiences,
});