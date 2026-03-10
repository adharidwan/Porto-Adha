import { createFileRoute } from "@tanstack/react-router";
import { AllBlogs } from "../../components/AllBlogs";

export const Route = createFileRoute("/blogs/")({
  component: AllBlogs,
});

