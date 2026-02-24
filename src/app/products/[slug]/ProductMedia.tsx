"use client";

import WixImage from "@/components/WixImage";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/wix"; 
import { PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

/* ✅ Correct MediaItem type */
type MediaItem = NonNullable<
  NonNullable<Product["media"]>["items"]
>[number];

interface ProductMediaProps {
  media?: MediaItem[];
}

export default function ProductMedia({ media }: ProductMediaProps) {
  const mediaItems = media ?? [];

  const [selectedMedia, setSelectedMedia] =
    useState<MediaItem | undefined>(mediaItems[0]);

  useEffect(() => {
    setSelectedMedia(mediaItems[0]);
  }, [mediaItems]);

  if (!mediaItems.length) return null;

  const selectedImage = selectedMedia?.image;
  const selectedVideo = selectedMedia?.video?.files?.[0];

  return (
    <div className="h-fit basis-2/5 space-y-5 md:sticky md:top-10">
      <div className="aspect-square rounded-lg border border-border bg-muted/30 p-2">
        {selectedImage?.url ? (
          <Zoom key={selectedImage.url}>
            <WixImage
              mediaIdentifier={selectedImage.url}
              alt={selectedImage.altText || "Product image"}
              width={1000}
              height={1000}
              className="rounded-md object-contain"
            />
          </Zoom>
        ) : selectedVideo?.url ? (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <video controls className="h-full w-full rounded-md">
              <source
                src={selectedVideo.url}
                type={`video/${selectedVideo.format}`}
              />
            </video>
          </div>
        ) : null}
      </div>

      {mediaItems.length > 1 && (
        <div className="flex flex-wrap gap-4">
          {mediaItems.map((mediaItem) => (
            <MediaPreview
              key={mediaItem._id}
              mediaItem={mediaItem}
              isSelected={mediaItem._id === selectedMedia?._id}
              onSelect={() => setSelectedMedia(mediaItem)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface MediaPreviewProps {
  mediaItem: MediaItem;
  isSelected: boolean;
  onSelect: () => void;
}

function MediaPreview({
  mediaItem,
  isSelected,
  onSelect,
}: MediaPreviewProps) {
  const imageUrl = mediaItem.image?.url;
  const videoFile = mediaItem.video?.files?.[0];
  const thumbnailUrl = mediaItem.thumbnail?.url;

  if (!imageUrl && !thumbnailUrl) return null;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative overflow-hidden rounded-md border border-border bg-muted/30 transition-all",
        isSelected && "ring-2 ring-primary"
      )}
    >
      <WixImage
        mediaIdentifier={imageUrl || thumbnailUrl}
        alt={
          mediaItem.image?.altText ||
          videoFile?.altText ||
          "Media preview"
        }
        width={100}
        height={100}
        className="h-24 w-24 object-cover"
      />

      {videoFile && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/40">
          <PlayIcon className="h-5 w-5 text-white" />
        </span>
      )}
    </button>
  );
}