import { useState, useRef, useMemo } from 'react';
import { photoSlots, slotGroups } from '../lib/photoSlots';
import {
  usePhotos,
  uploadPhoto,
  deletePhoto,
  type PhotoRecord,
} from '../lib/photos';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function PhotoManager({ open, onClose }: Props) {
  const { photos, loading, reload } = usePhotos();
  const [activeGroup, setActiveGroup] = useState<string>('Cover');
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const slotsInGroup = useMemo(
    () => photoSlots.filter((s) => s.group === activeGroup),
    [activeGroup],
  );

  if (!open) return null;

  const handleFile = async (slot: string, file: File) => {
    setError(null);
    setUploadingSlot(slot);
    const { error: err } = await uploadPhoto(slot, file);
    if (err) {
      setError(err);
    } else {
      await reload();
    }
    setUploadingSlot(null);
  };

  const handleDelete = async (slot: string) => {
    setError(null);
    const { error: err } = await deletePhoto(slot);
    if (err) {
      setError(err);
    } else {
      await reload();
    }
  };

  const uploadedCount = Object.keys(photos).length;
  const totalCount = photoSlots.length;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col anim-fade-in" style={{ background: '#0c0a09' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 flex-shrink-0">
        <div>
          <h2 className="font-serif text-xl text-ivory">Photo Manager</h2>
          <p className="text-xs text-ivory/40 mt-0.5">
            {uploadedCount} of {totalCount} photos uploaded
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-ivory/40 hover:text-ivory text-2xl transition-colors w-10 h-10 flex items-center justify-center"
          aria-label="Close photo manager"
        >
          ×
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="px-6 py-3 bg-burgundy/15 border-b border-burgundy/30 flex items-center justify-between">
          <p className="text-sm text-blush">{error}</p>
          <button onClick={() => setError(null)} className="text-ivory/40 hover:text-ivory text-sm">
            dismiss
          </button>
        </div>
      )}

      {/* Group tabs */}
      <div className="flex gap-1.5 overflow-x-auto px-6 py-3 border-b border-white/5 flex-shrink-0">
        {slotGroups.map((group) => (
          <button
            key={group}
            onClick={() => setActiveGroup(group)}
            className={`text-xs tracking-[0.12em] px-3 py-1.5 border whitespace-nowrap transition-all duration-200 ${
              activeGroup === group
                ? 'border-gold/50 text-gold bg-gold/8'
                : 'border-ivory/10 text-ivory/35 hover:border-ivory/25 hover:text-ivory/55'
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Photo grid for active group */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-ivory/30">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {slotsInGroup.map((slotInfo) => {
              const photo = photos[slotInfo.slot];
              return (
                <PhotoSlotCard
                  key={slotInfo.slot}
                  label={slotInfo.label}
                  photo={photo}
                  uploading={uploadingSlot === slotInfo.slot}
                  onUpload={(file) => handleFile(slotInfo.slot, file)}
                  onDelete={() => handleDelete(slotInfo.slot)}
                  inputRef={(el) => {
                    fileRefs.current[slotInfo.slot] = el;
                  }}
                  onPick={() => fileRefs.current[slotInfo.slot]?.click()}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="px-6 py-3 border-t border-white/5 flex-shrink-0">
        <p className="text-xs text-ivory/30 text-center">
          Upload photos to replace the placeholders. Changes appear instantly on your site.
        </p>
      </div>
    </div>
  );
}

interface CardProps {
  label: string;
  photo: PhotoRecord | undefined;
  uploading: boolean;
  onUpload: (file: File) => void;
  onDelete: () => void;
  inputRef: (el: HTMLInputElement | null) => void;
  onPick: () => void;
}

function PhotoSlotCard({ label, photo, uploading, onUpload, onDelete, inputRef, onPick }: CardProps) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="relative aspect-[3/4] photo-ph cursor-pointer group overflow-hidden"
        onClick={onPick}
      >
        {photo ? (
          <img
            src={photo.url}
            alt={label}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
            <svg
              className="w-6 h-6 opacity-15 text-gold"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="18" height="18" rx="1" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <p className="text-xs font-mono tracking-[0.12em] text-ivory opacity-15">EMPTY</p>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 z-20">
          <p className="text-xs text-ivory/80 tracking-wider">
            {photo ? 'Replace' : 'Upload'}
          </p>
        </div>

        {uploading && (
          <div className="absolute inset-0 bg-charcoal/80 flex items-center justify-center z-30">
            <div className="w-5 h-5 border border-gold/30 border-t-gold rounded-full animate-spin" />
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(file);
            e.target.value = '';
          }}
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-ivory/45 truncate">{label}</p>
        {photo && (
          <button
            onClick={onDelete}
            className="text-xs text-ivory/30 hover:text-blush transition-colors flex-shrink-0"
            aria-label={`Delete ${label}`}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
