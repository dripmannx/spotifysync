import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

import { z } from "zod";

export const syncRouter = createTRPCRouter({
  getSyncsOfPlaylist: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const playlists = await ctx.db.sync.findMany({
        where: {
          basePlaylistId: input.id,
        },
      });

      return playlists;
    }),
});
