import { createFileRoute } from "@tanstack/react-router";
import { HomeOverview } from "@/components/home-overview";

export const Route = createFileRoute("/")({ component: HomeOverview });
