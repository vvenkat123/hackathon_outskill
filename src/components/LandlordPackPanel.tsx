import React, { useState } from 'react';
import { Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { RoomDesignResult } from '../types';
import { useRoomStudio } from '../context/RoomStudioContext';
import { sendLandlordPack, landlordPackEnabled } from '../services/landlordPack';

interface LandlordPackPanelProps {
  concept: RoomDesignResult | undefined;
  beforeImage: string;
  roomName: string;
}

export const LandlordPackPanel: React.FC<LandlordPackPanelProps> = ({ concept, beforeImage, roomName }) => {
  const { placedItems, budgetCap } = useRoomStudio();
  const [email, setEmail] = useState('');
  const [renterName, setRenterName] = useState('');
  const [landlordName, setLandlordName] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  if (!landlordPackEnabled() || !concept) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setMsg({ ok: false, text: 'Please enter a valid e-mail address.' }); return; }
    if (!placedItems.length) { setMsg({ ok: false, text: 'Place at least one item on the canvas first.' }); return; }
    setBusy(true); setMsg(null);
    try {
      const r = await sendLandlordPack({ renterEmail: email.trim(), renterName, landlordName, roomName, concept, beforeImage, items: placedItems, budgetCap });
      setMsg({ ok: true, text: `Sent to ${r.sent_to}. Check it, then forward it to your landlord.` });
    } catch (err: any) {
      setMsg({ ok: false, text: err?.message || 'Something went wrong.' });
    } finally { setBusy(false); }
  };

  const input = 'w-full px-3 py-2 rounded-lg border border-[#DDD3C2] bg-white text-sm text-[#2D2823] focus:outline-none focus:ring-2 focus:ring-[#C86D51]/40';
  return (
    <section className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-6 sm:p-8">
      <p className="text-xs font-semibold tracking-wider uppercase text-[#8C5D39]">Landlord Approval Pack</p>
      <h2 className="font-serif-display text-2xl font-bold text-[#2D2823] mt-1">Get your landlord's OK in one e-mail</h2>
      <p className="text-sm text-[#6E5D50] mt-1 max-w-2xl">
        We write a friendly letter and list every item on your canvas ({placedItems.length}) – how it's installed and how it comes off again –
        with before/after pictures of “{concept.conceptTitle}”. It goes to <b>you</b> first, so you can check it and forward it.
      </p>
      <form onSubmit={submit} noValidate className="mt-5 grid gap-3 sm:grid-cols-4">
        <input className={input} type="email" placeholder="Your e-mail *" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Your e-mail" />
        <input className={input} placeholder="Your name" value={renterName} onChange={(e) => setRenterName(e.target.value)} aria-label="Your name" />
        <input className={input} placeholder="Landlord's name" value={landlordName} onChange={(e) => setLandlordName(e.target.value)} aria-label="Landlord's name" />
        <button type="submit" disabled={busy} className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#2D2823] hover:bg-black disabled:opacity-60 text-white text-sm font-semibold">
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}{busy ? 'Preparing…' : 'E-mail me the pack'}
        </button>
      </form>
      {msg && <p role="status" className={`mt-3 flex items-center gap-2 text-sm ${msg.ok ? 'text-[#4F6B3F]' : 'text-[#B3452C]'}`}>
        {msg.ok ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}{msg.text}</p>}
      <p className="text-[11px] text-[#9A8878] mt-3">A planning aid, not legal advice – always check your lease.</p>
    </section>
  );
};
