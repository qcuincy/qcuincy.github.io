'use client';

interface IframeEmbedProps {
  url: string;
  title: string;
  aspectRatio?: string;
  height?: string;
}

const IframeEmbed = ({
  url,
  title,
  aspectRatio = '16/9',
  height,
}: IframeEmbedProps) => {
  // Convert aspectRatio string to percentage for padding-bottom
  const getPaddingBottom = () => {
    const [width, h] = aspectRatio.split('/').map(Number);
    return `${(h / width) * 100}%`;
  };

  if (height) {
    return (
      <div className="relative bg-gray-100" style={{ height }}>
        <iframe
          src={url}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="relative bg-gray-100">
      <div
        className="relative w-full"
        style={{ paddingBottom: getPaddingBottom() }}
      >
        <iframe
          src={url}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default IframeEmbed;