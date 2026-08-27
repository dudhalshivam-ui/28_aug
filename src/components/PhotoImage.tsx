import { usePhotosContext } from '../lib/PhotosContext';

interface Props {
  slot: string;
  className?: string;
  imgClassName?: string;
  fallback: React.ReactNode;
}

/**
 * Shows an uploaded photo for a given slot, or falls back to the placeholder content.
 */
export default function PhotoImage({ slot, className = '', imgClassName = '', fallback }: Props) {
  const { photos, loading } = usePhotosContext();
  const photo = photos[slot];

  return (
    <div className={`relative ${className}`}>
      {photo && !loading ? (
        <img
          src={photo.url}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover ${imgClassName}`}
        />
      ) : (
        fallback
      )}
    </div>
  );
}
