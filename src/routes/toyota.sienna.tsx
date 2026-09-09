import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/toyota/sienna")({ component: () => <Outlet /> });
