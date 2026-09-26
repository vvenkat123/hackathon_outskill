import React, { useState } from 'react';
import { Mail, ShieldCheck, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { RoomDesignResult } from '../types';
import { useRoomStudio } from '../context/RoomStudioContext';
import { landlordPackEnabled, sendLandlordPack } from '../services/landlordPack';

interface LandlordPackPanelProps {
  concept?: RoomDesignResult;
  beforeImage: string;
  roomName: string;
}

export const LandlordPackPanel: React.FC<LandlordPackPanelProps> = ({
  concept,
  beforeImage,
  roomName,
}) => {
  const { placedItems, budgetCap } = useRoomStudio();

  const [renterEmail, setRenterEmail] = useState('');
  const [renterName, setRenterName] = useState('');
  const [landlordName, setLandlordName] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [sentTo, setSentTo] = useState('');

  if (!landlordPackEnabled() || !concept) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!renterEmail) {
      setErrorMessage('Please provide your email address.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await sendLandlordPack({
        renterEmail,
        renterName,
        landlordName,
        roomName,
        concept,
        beforeImage,
        items: placedItems,
        budgetCap,
      });

      setStatus('success');
      setSentTo(res.sent_to || renterEmail);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to send landlord approval pack.');
    }
  };

  return (
    <section id="landlord-pack-section" className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E1D5]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif-display text-xs tracking-wider uppercase text-[#8C5D39] font-semibold">
              Deposit Protection
            </span>
            <span className="text-[#C4B7A6]">·</span>
            <span className="text-xs text-[#7A6B5F]">Automated Approval Pack</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2D2823] mt-1">
            Generate Landlord Approval Pack
          </h2>
          <p className="text-sm text-[#6E5D50] mt-1 max-w-2xl">
            Get an official, lease-safe documentation package sent to your inbox. Features your before & after renderings, 0% wall alteration proofs, and zero deposit risk guarantee to share directly with your landlord or property manager.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto text-xs bg-[#EAF2E3] text-[#345229] px-3.5 py-2 rounded-xl border border-[#BBD4B0]">
          <ShieldCheck className="w-4 h-4 shrink-0 text-[#5C704C]" />
          <span className="font-semibold">Pre-Formatted for Property Managers</span>
        </div>
      </div>

      {status === 'success' ? (
        <div className="mt-6 p-6 bg-[#EAF2E4] border border-[#BBD4B0] rounded-xl flex items-start gap-4">
          <CheckCircle2 className="w-6 h-6 text-[#4E6B41] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-serif-display text-base font-bold text-[#2D2823]">
              Landlord Approval Pack Dispatched!
            </h4>
            <p className="text-xs text-[#556948] leading-relaxed">
              We have generated your customized non-permanent decor pack for <strong className="text-[#2D2823]">{concept.conceptTitle}</strong> and sent the complete PDF package with before/after documentation to <strong className="text-[#2D2823]">{sentTo}</strong>.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus('idle');
                setRenterEmail('');
              }}
              className="mt-3 text-xs font-semibold text-[#8C5D39] hover:underline cursor-pointer"
            >
              Send to another email address
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-[#4A3B32] mb-1.5">
              Your Email Address <span className="text-[#BD5843]">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={renterEmail}
                onChange={(e) => setRenterEmail(e.target.value)}
                placeholder="renter@example.com"
                className="w-full px-3.5 py-2.5 pl-9 text-xs rounded-xl border border-[#DFD6C7] bg-[#FAF8F5] focus:outline-none focus:border-[#8C5D39] focus:ring-1 focus:ring-[#8C5D39]"
              />
              <Mail className="w-4 h-4 text-[#8C7A6E] absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A3B32] mb-1.5">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={renterName}
              onChange={(e) => setRenterName(e.target.value)}
              placeholder="e.g. Alex Miller"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#DFD6C7] bg-[#FAF8F5] focus:outline-none focus:border-[#8C5D39] focus:ring-1 focus:ring-[#8C5D39]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A3B32] mb-1.5">
              Landlord / Property Manager Name (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={landlordName}
                onChange={(e) => setLandlordName(e.target.value)}
                placeholder="e.g. Oakwood Properties"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#DFD6C7] bg-[#FAF8F5] focus:outline-none focus:border-[#8C5D39] focus:ring-1 focus:ring-[#8C5D39]"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-5 py-2.5 text-xs font-semibold text-[#FAF7F2] bg-[#4A3B32] hover:bg-[#342720] active:scale-95 disabled:opacity-50 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-2xs whitespace-nowrap"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Pack</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {status === 'error' && (
            <div className="md:col-span-3 p-3 bg-[#FBEBE8] border border-[#E8BAB0] text-[#A83824] text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>
      )}
    </section>
  );
};
