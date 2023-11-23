import { createTRPCRouter } from "~/server/api/trpc";
import { spotifyRouter } from "./routers/spotify";
import { syncRouter } from "./routers/syncRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  spotify: spotifyRouter,
  sync: syncRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
