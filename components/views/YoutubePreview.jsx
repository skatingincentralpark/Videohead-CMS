import React from "react";
import getYouTubeID from "get-youtube-id";

export const YoutubePreview = ({ value }) => {
  const id = getYouTubeID(value.url);
  const url = `https://www.youtube.com/embed/${id}`;

  if (!id) return <div>Missing Youtube URL</div>;

  return (
    <iframe
      width="560"
      height="315"
      src={url}
      title="YouTube Video Player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    />
  );
};
