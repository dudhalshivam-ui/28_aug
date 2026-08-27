export interface PhotoSlot {
  slot: string;
  label: string;
  group: string;
}

export const photoSlots: PhotoSlot[] = [
  { slot: 'cover', label: 'Cover Portrait', group: 'Cover' },
  { slot: 'hero', label: 'Birthday Hero Photo', group: 'Hero' },
  ...Array.from({ length: 10 }, (_, chapterIdx) => {
    const chapterNum = String(chapterIdx + 1).padStart(2, '0');
    return Array.from({ length: 3 }, (_, photoIdx) => ({
      slot: `chapter-${chapterNum}-${photoIdx}`,
      label: `Chapter ${chapterNum} · Photo ${photoIdx + 1}`,
      group: `Chapter ${chapterNum}`,
    }));
  }).flat(),
  ...Array.from({ length: 18 }, (_, i) => ({
    slot: `gallery-${i + 1}`,
    label: `Gallery Photo ${i + 1}`,
    group: 'Gallery',
  })),
  { slot: 'final', label: 'Final Photo', group: 'Final' },
];

export const slotGroups = Array.from(new Set(photoSlots.map((s) => s.group)));

export function getSlotPhotoUrl(slot: string, photos: Record<string, string>): string | null {
  return photos[slot] ?? null;
}

export function slotToStoragePath(slot: string, fileExt: string): string {
  return `${slot}.${fileExt}`;
}
