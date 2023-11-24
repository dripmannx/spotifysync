-- CreateTable
CREATE TABLE "Playlist" (
    "playlistId" TEXT NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("playlistId")
);

-- CreateTable
CREATE TABLE "Sync" (
    "basePlaylistId" TEXT NOT NULL,
    "comparePlaylistId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sync_pkey" PRIMARY KEY ("basePlaylistId","comparePlaylistId")
);

-- CreateIndex
CREATE INDEX "Sync_basePlaylistId_comparePlaylistId_idx" ON "Sync"("basePlaylistId", "comparePlaylistId");

-- AddForeignKey
ALTER TABLE "Sync" ADD CONSTRAINT "Sync_basePlaylistId_fkey" FOREIGN KEY ("basePlaylistId") REFERENCES "Playlist"("playlistId") ON DELETE RESTRICT ON UPDATE CASCADE;
