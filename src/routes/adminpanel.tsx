import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/adminpanel")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "لوحة التحكم — تطبيق لمحة" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "لوحة تحكم محتوى موقع تطبيق لمحة." },
    ],
  }),
  component: AdminPanel,
});

const AdminWorkspace = lazy(() => import("@/components/AdminWorkspace"));

function AdminPanel() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-secondary/40 text-sm text-muted-foreground">
          جارٍ تحميل لوحة التحكم…
        </div>
      }
    >
      <AdminWorkspace />
    </Suspense>
  );
}
