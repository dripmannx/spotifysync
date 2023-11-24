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
  addSyncToPlaylist: privateProcedure
    .input(
      z.object({ basePlaylistId: z.string(), comparePlaylistId: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      const existBasePlaylist = await ctx.db.playlist.findUnique({
        where: { playlistId: input.basePlaylistId },
      });

      if (existBasePlaylist) {
        return await ctx.db.playlist.create({
          data: {
            playlistId: input.basePlaylistId,
            syncs: {
              create: {
                comparePlaylistId: input.comparePlaylistId,
              },
            },
          },
        });
      }
      return await ctx.db.sync.create({
        data: {
          comparePlaylistId: input.comparePlaylistId,
          basePlaylistId: input.basePlaylistId,
        },
      });
    }),
});
