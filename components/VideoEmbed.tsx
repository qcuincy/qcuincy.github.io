'use client';

interface VideoEmbedProps {
  url: string;
  platform: 'youtube' | 'vimeo';
  title: string;
}

const VideoEmbed = ({ url, platform, title }: VideoEmbedProps) => {
  // Extract video ID from URL
  const getEmbedUrl = () => {
    if (platform === 'youtube') {
      const videoId = url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
      )?.[1];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (platform === 'vimeo') {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  return (
    <div className="relative bg-gray-900 aspect-video">
      <iframe
        src={getEmbedUrl()}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoEmbed;