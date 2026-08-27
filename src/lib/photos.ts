import { useState, useEffect, useCallback } from 'react';
import { supabase, PHOTOS_BUCKET } from './supabase';

export interface PhotoRecord {
  slot: string;
  url: string;
  caption: string | null;
}

export function usePhotos() {
  const [photos, setPhotos] = useState<Record<string, PhotoRecord>>({});
  const [loading, setLoading] = useState(true);

  const loadPhotos = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('photos').select('slot, storage_path, caption');
    if (error) {
      console.error('Failed to load photos:', error.message);
      setLoading(false);
      return;
    }

    const map: Record<string, PhotoRecord> = {};
    for (const row of data ?? []) {
      const { data: urlData } = supabase.storage
        .from(PHOTOS_BUCKET)
        .getPublicUrl(row.storage_path);
      map[row.slot] = {
        slot: row.slot,
        url: urlData.publicUrl,
        caption: row.caption,
      };
    }
    setPhotos(map);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  return { photos, loading, reload: loadPhotos };
}

export async function uploadPhoto(
  slot: string,
  file: File,
): Promise<{ url: string; error: string | null }> {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const storagePath = `${slot}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(PHOTOS_BUCKET)
    .upload(storagePath, file, { upsert: true });

  if (uploadError) {
    return { url: '', error: uploadError.message };
  }

  const { error: dbError } = await supabase
    .from('photos')
    .upsert(
      { slot, storage_path: storagePath, updated_at: new Date().toISOString() },
      { onConflict: 'slot' },
    );

  if (dbError) {
    return { url: '', error: dbError.message };
  }

  const { data: urlData } = supabase.storage
    .from(PHOTOS_BUCKET)
    .getPublicUrl(storagePath);

  return { url: urlData.publicUrl, error: null };
}

export async function deletePhoto(slot: string): Promise<{ error: string | null }> {
  const { data: row } = await supabase
    .from('photos')
    .select('storage_path')
    .eq('slot', slot)
    .maybeSingle();

  if (row?.storage_path) {
    await supabase.storage.from(PHOTOS_BUCKET).remove([row.storage_path]);
  }

  const { error } = await supabase.from('photos').delete().eq('slot', slot);
  return { error: error?.message ?? null };
}

export async function updateCaption(
  slot: string,
  caption: string,
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('photos')
    .update({ caption, updated_at: new Date().toISOString() })
    .eq('slot', slot);
  return { error: error?.message ?? null };
}
