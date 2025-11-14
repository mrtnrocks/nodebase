import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { WorkflowsList } from "@/features/workflows/components/workflows";


const Page = async () => {
  await requireAuth(); 

  prefetchWorkflows();

  return(
    <HydrateClient>
      <ErrorBoundary fallback={<p>Error loading workflows.</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <WorkflowsList />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
};

export default Page;
