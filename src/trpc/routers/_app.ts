import { inngest } from '@/inngest/client';
import { prisma } from '@/lib/db';
import { createTRPCRouter, protectedProcedure, premiumProcedure } from '../init';
import { TRPCError } from '@trpc/server';


export const appRouter = createTRPCRouter({
  testAi: premiumProcedure.mutation(async () => {
    // throw new TRPCError({code: "BAD_REQUEST", message: "Testing error handling"});

    await inngest.send({
      name: 'execute/ai',
    });

    return { success: true, message: "Job queued." };
  }),

  getWorkflows: protectedProcedure.query(({ ctx }) => {
      return prisma.workflow.findMany();
    }),
  createWorkflow: protectedProcedure.mutation(async() => {
    await inngest.send({
      name: 'test/hello.world',
      data: {
        email: "jo@mail.com",
      },
    });

    return { success: true, message: "Job queued." };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter; 