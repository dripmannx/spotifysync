import { customAlphabet, nanoid } from "nanoid";
import { number, string, z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { useAuth } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import axios from "axios";
import { privateDecrypt } from "crypto";
import dayjs from "dayjs";
import { AwardIcon } from "lucide-react";
import { copyTracedFiles } from "next/dist/build/utils";
import { useState } from "react";
import { SpotifyWebApi } from "spotify-web-api-ts";
import { PlaylistItem } from "spotify-web-api-ts/types/types/SpotifyObjects";
import { type GetPlaylistItemsResponse } from "spotify-web-api-ts/types/types/SpotifyResponses";
import superjson from "superjson";
import { useImmer } from "use-immer";

export const spotifyRouter = createTRPCRouter({
  getUsersPlaylist: privateProcedure.query(async ({ ctx, input }) => {
    const playlists = await ctx.spotify.playlists.getMyPlaylists();
    //const spotify_token = resp.map((item: any) => item.token)

    return { playlists };
  }),
  getTracksOfPlaylist: privateProcedure
    .input(
      z.object({
        id: string(),
        offset: z.number().optional(),
        limit: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const tracks: GetPlaylistItemsResponse =
        await ctx.spotify.playlists.getPlaylistItems(input.id, {
          offset: input.offset,
          limit: input.limit,
        });
      //const spotify_token = resp.map((item: any) => item.token)

      return { tracks };
    }),
  comparePlaylists: privateProcedure
    .input(
      z.object({
        id1: string(),
        id2: string(),
        offset: z.number().optional(),
        limit: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      async function getAllTracksFromPlaylistWithOffset(id: string) {
        const limit = 100; // Number of tracks to retrieve per request
        let offset = 0;
        let allTracks: any[] = [];

        try {
          while (true) {
            const response = await ctx.spotify.playlists.getPlaylistItems(id, {
              offset: offset,
              limit: limit,
            });
            allTracks = allTracks.concat(
              response.items.map((track) => track.track),
            );

            // If there are more tracks to fetch, increment the offset
            if (response.next) {
              offset += limit;
            } else {
              // No more tracks to fetch, break out of the loop
              break;
            }
          }
        } catch (error) {
          console.error("Error fetching playlist tracks:", error);
          return [];
        }

        return allTracks;
      }

      const playlist1Tracks = await getAllTracksFromPlaylistWithOffset(
        input.id1,
      ).then((tracks) => tracks);

      const playlist2Tracks = await getAllTracksFromPlaylistWithOffset(
        input.id2,
      ).then((tracks) => tracks);

      console.log(playlist1Tracks, playlist2Tracks);
      return { playlist1Tracks, playlist2Tracks };
    }),
});
