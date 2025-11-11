"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogoutButton } from "./api/logout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Page = () => { 
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const {data} = useQuery(trpc.getWorkflows.queryOptions());
 
  const create = useMutation(trpc.createWorkflow.
    mutationOptions({
    onSuccess: () => {
      // Invalidate queries or perform other side effects
      toast.success("Job queued");
    }
  }));

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      protected server component
      <div>
        {JSON.stringify(data, null, 2)}
      </div>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>Create Workflow</Button>
      <LogoutButton />
    </div>
  );
}

export default Page;
