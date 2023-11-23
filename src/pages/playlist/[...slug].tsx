import { type Sync } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { Playlist } from "spotify-web-api-ts/types/types/SpotifyObjects";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/utils/api";

type Props = {};

const Playlist = (props: Props) => {
  const router = useRouter();
  const id = router.query.slug;

  const { data, isError, isLoading } = api.spotify.getPlaylist.useQuery(
    {
      id: id?.[0]!,
    },
    { enabled: !!id?.[0] },
  );
  /*  const { data: Sync } = api.sync.getSyncsOfPlaylist.useQuery(
    {
      id: id?.[0]!,
    },
    { enabled: !!id?.[0] },
  ); */
  return (
    <div className="container ">
      {data && <PlaylistCard playlist={data?.playlist} />}
    </div>
  );
};

export default Playlist;

type PlaylistCardProps = {
  playlist: Playlist;
  sync?: Sync[];
};

export function PlaylistCard(props: PlaylistCardProps) {
  const { playlist, sync } = props;
  return (
    <Card className="mt-5">
      <CardHeader></CardHeader>
      <CardContent>
        <div className=" flex gap-2">
          <Image
            alt={playlist.images?.[0]?.url ?? ""}
            src={playlist.images?.[0]?.url ?? ""}
            width={50}
            height={50}
            style={{
              width: "50px",
              height: "auto",
              backgroundSize: "cover",
            }}
          />
          <div className="flex flex-col gap-2">
            <CardTitle>{playlist.name} </CardTitle>
            <CardDescription>{playlist.tracks.total} Titel</CardDescription>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
