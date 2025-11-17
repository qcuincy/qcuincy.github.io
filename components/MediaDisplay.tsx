'use client';

import { MediaContent } from '@/lib/types';
import ImageGallery from './ImageGallery';
import VideoEmbed from './VideoEmbed';
import IframeEmbed from './IframeEmbed';
import ImageGrid from './ImageGrid';

interface MediaDisplayProps {
  media: MediaContent;
  title: string;
}

const MediaDisplay = ({ media, title }: MediaDisplayProps) => {
  switch (media.type) {
    case 'gallery':
      if (!media.images || media.images.length === 0) return null;
      return <ImageGallery images={media.images} alt={title} />;

    case 'video':
      if (!media.videoUrl || !media.platform) return null;
      return (
        <VideoEmbed
          url={media.videoUrl}
          platform={media.platform}
          title={title}
        />
      );

    case 'iframe':
      if (!media.iframeUrl) return null;
      return (
        <IframeEmbed
          url={media.iframeUrl}
          title={title}
          aspectRatio={media.aspectRatio}
          height={media.height}
        />
      );

    case 'grid':
      if (!media.images || media.images.length === 0) return null;
      return <ImageGrid images={media.images} alt={title} />;

    default:
      return null;
  }
};

export default MediaDisplay;