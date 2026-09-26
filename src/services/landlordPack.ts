// RoomMagic → n8n "Landlord Approval Pack" workflow.
// Paste the Production URL of the n8n webhook "Pack request" here
// (or set VITE_N8N_LANDLORD_PACK_URL in Vercel → Settings → Environment Variables).
import type { CanvasPlacedItem, RoomDesignResult } from '../types';

const PACK_URL_FALLBACK = 'https://vasimkaji.app.n8n.cloud/webhook/roommagic-landlord-pack';

const raw = String(import.meta.env.VITE_N8N_LANDLORD_PACK_URL || '').trim() || PACK_URL_FALLBACK;
const PACK_URL = /^https?:\/\//.test(raw) ? raw : undefined;

/** false while no URL is configured → the pack form stays hidden and the app works as before */
export const landlordPackEnabled = () => !!PACK_URL;

/** Any image URL (uploaded data URL or bundled asset) → small JPEG data URL for the e-mail attachments. */
export async function toJpegDataUrl(src: string, maxSide = 1024): Promise<string> {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = src;
  await img.decode();
  const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.85);
}

export async function sendLandlordPack(args: {
  renterEmail: string; renterName?: string; landlordName?: string; roomName: string;
  concept: RoomDesignResult; beforeImage: string; items: CanvasPlacedItem[]; budgetCap: number;
}): Promise<{ ok: true; sent_to: string }> {
  if (!PACK_URL) throw new Error('The landlord pack is not configured yet.');
  const before = await toJpegDataUrl(args.beforeImage).catch(() => '');
  const after = args.concept.imageUrl ? await toJpegDataUrl(args.concept.imageUrl).catch(() => '') : '';
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 90000);
  try {
    const res = await fetch(PACK_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: ctrl.signal,
      body: JSON.stringify({
        renter_email: args.renterEmail, renter_name: args.renterName, landlord_name: args.landlordName, room_name: args.roomName,
        concept: { ...args.concept, imageUrl: after }, before_image: before, budget_cap: args.budgetCap,
        items: args.items.map((i) => ({ name: i.name, category: i.category, removability: i.removability, price: i.price, activeMaterialName: i.activeMaterialName })),
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.ok === false) throw new Error(data.error || `The pack service answered with ${res.status}.`);
    return data;
  } catch (e: any) {
    if (e?.name === 'AbortError') throw new Error('This took too long. Please try again.');
    if (e instanceof TypeError) throw new Error('Could not reach the pack service. Is the n8n workflow active?');
    throw e;
  } finally { clearTimeout(timer); }
}
