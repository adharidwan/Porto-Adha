import { createFileRoute } from "@tanstack/react-router";
import { AllHonorsAwards } from "../../components/AllHonorsAwards";

export const Route = createFileRoute("/honors/")({
  component: AllHonorsAwards,
});