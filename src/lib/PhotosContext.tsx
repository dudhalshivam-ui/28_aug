import { createContext, useContext, type ReactNode } from 'react';
import { usePhotos as usePhotosHook, type PhotoRecord } from '../lib/photos';

interface PhotosContextValue {
  photos: Record<string, PhotoRecord>;
  loading: boolean;
  reload: () => Promise<void>;
}

const PhotosContext = createContext<PhotosContextValue>({
  photos: {},
  loading: false,
  reload: async () => {},
});

export function PhotosProvider({ children }: { children: ReactNode }) {
  const { photos, loading, reload } = usePhotosHook();
  return (
    <PhotosContext.Provider value={{ photos, loading, reload }}>
      {children}
    </PhotosContext.Provider>
  );
}

export function usePhotosContext() {
  return useContext(PhotosContext);
}
