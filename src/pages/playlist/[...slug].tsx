import { zodResolver } from "@hookform/resolvers/zod";
import { type Sync } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { Playlist } from "spotify-web-api-ts/types/types/SpotifyObjects";
import * as z from "zod";
import { Button } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";
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
  const { data: Sync } = api.sync.getSyncsOfPlaylist.useQuery(
    {
      id: id?.[0]!,
    },
    { enabled: !!id?.[0] },
  );
  return (
    <div className="container ">
      {data && Sync && (
        <div className="mt-5 flex flex-col gap-5">
          <PlaylistCard playlist={data?.playlist} />
          <AddSyncTask baseplaylistId={data.playlist.id} />
        </div>
      )}
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
    <Card>
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
export const AddSyncTask = ({ baseplaylistId }: { baseplaylistId: string }) => {
  const utils = api.useUtils();
  const mutation = api.sync.addSyncToPlaylist.useMutation({
    onSuccess: async () => {
      toast({
        title: "Erfolgreich",
        description: "Deine Aufgabe wurde erfolgreich erstellt",
      });
      utils.sync.getSyncsOfPlaylist.invalidate({ id: baseplaylistId });
    },
  });
  const formSchema = z.object({
    id: z.string().min(1, {
      message: "Spotify PlaylistID Muss mindestens 1 Zeichen lang sein",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutation.mutate({
      basePlaylistId: baseplaylistId,
      comparePlaylistId: values.id,
    });

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    console.log(values);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Erstelle eine Syncronisierungs Aufgabe</CardTitle>
        <CardDescription>
          Kopiere die Spotify PlaylistID in das Input Feld und bestätige zum
          Syncronisieren
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Playlist ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Playlist ID" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <>
              <Button>Submit</Button>
            </>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
