interface YouTubeEmbedProps {
  videoId: string;
}

const YouTubeEmbed = ({ videoId }: YouTubeEmbedProps) => {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute left-0 top-0 size-full border-0"
      />
    </div>
  );
};

export default YouTubeEmbed;
