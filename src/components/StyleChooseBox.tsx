import React from 'react';
import { Sparkles, Palette, Layers, Check, ArrowRight, ShieldCheck, RefreshCw, Eye } from 'lucide-react';
import { StyleVibe, ColorPalette } from '../types';
import { STYLE_VIBES, COLOR_PALETTES } from '../data/mockRooms';

interface StyleChooseBoxProps {
  selectedVibe: StyleVibe;
  selectedPalette: ColorPalette;
  currentRoomImage: string;
  roomName: string;
  transformedPreviewUrl?: string;
  isTransforming?: boolean;
  onSelectVibe: (vibe: StyleVibe) => void;
  onSelectPalette: (palette: ColorPalette) => void;
}

export const StyleChooseBox: React.FC<StyleChooseBoxProps> = ({
  selectedVibe,
  selectedPalette,
  currentRoomImage,
  roomName,
  transformedPreviewUrl,
  isTransforming = false,
  onSelectVibe,
  onSelectPalette,
}) => {
  return (
    <section id="style-section" className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
      {/* Header with Step 1 Synchronization Indicator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E1D5]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif-display text-xs tracking-wider uppercase text-[#8C5D39] font-semibold">
              Step 2 of 3
            </span>
            <span className="text-[#C4B7A6]">·</span>
            <span className="text-xs text-[#7A6B5F]">Aesthetic Direction</span>
            <span className="text-[#C4B7A6]">·</span>
            <span className="text-xs text-[#5C704C] font-medium bg-[#EBF2E4] px-2 py-0.5 rounded">
              Synced with Step 1 Room
            </span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2D2823] mt-1">
            Pick Style Vibe & Color Combination
          </h2>
          <p className="text-sm text-[#6E5D50] mt-1 max-w-2xl">
            Choose the mood you want to evoke. Each vibe is applied directly onto your uploaded space ({roomName}), preserving all physical walls and windows while adding removable warmth.
          </p>
        </div>

        {/* Sync Room Status Pill */}
        <div className="bg-[#F0EAE0] border border-[#DDD3C4] rounded-xl p-3 flex items-center gap-3 shrink-0 self-start md:self-auto">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#D9CEBF] shrink-0 bg-[#E8E1D3]">
            <img
              src={currentRoomImage}
              alt="Room Thumbnail"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-xs">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8C5D39]">
              Active Styling Target
            </p>
            <p className="font-bold text-[#2D2823] truncate max-w-[150px]">
              {roomName}
            </p>
          </div>
        </div>
      </div>

      {/* LIVE ROOM STYLING SYNC PREVIEW BANNER */}
      <div className="bg-[#F4EFE6] border border-[#DDD3C4] rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#E3DACB]">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#8C5D39]" />
            <h3 className="font-serif-display text-base font-bold text-[#2D2823]">
              Live Room Styling Preview
            </h3>
            <span className="text-xs text-[#7A6B5F]">
              · Direct preview on your Step 1 rental space
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#5C704C] font-semibold bg-[#EAF2E3] px-2.5 py-1 rounded-lg">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>0% Structural Demolition · 100% Removable Decor</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: Original Room Baseline */}
          <div className="md:col-span-4 flex flex-col">
            <div className="relative rounded-xl overflow-hidden border border-[#D9CEBF] bg-[#E8E1D3] aspect-4/3">
              <img
                src={currentRoomImage}
                alt="Original Room from Step 1"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-[#2D2823]/80 backdrop-blur-xs text-[#FAF7F2] text-[10px] font-semibold px-2 py-0.5 rounded">
                Step 1: Baseline Room
              </div>
            </div>
            <div className="mt-2 text-xs text-[#6E5D50] flex items-center justify-between">
              <span className="truncate font-medium">{roomName}</span>
              <span className="text-[11px] text-[#8C7A6E]">Unstyled</span>
            </div>
          </div>

          {/* Center: Transformation Connector Arrow */}
          <div className="md:col-span-2 flex flex-col items-center justify-center text-center py-2 md:py-0">
            <div className="w-9 h-9 rounded-full bg-[#EAE0D3] border border-[#D9CEBF] flex items-center justify-center text-[#5A4537] mb-1.5 shadow-2xs">
              <ArrowRight className="w-4 h-4 stroke-[2.2] hidden md:block" />
              <Layers className="w-4 h-4 stroke-[2.2] md:hidden" />
            </div>
            <span className="text-[11px] font-bold text-[#8C5D39] uppercase tracking-wider">
              {selectedVibe.name}
            </span>
            <span className="text-[10px] text-[#7A6B5F] mt-0.5">
              + {selectedPalette.name}
            </span>
          </div>

          {/* Right: Transformed Room Preview */}
          <div className="md:col-span-6 flex flex-col">
            <div className="relative rounded-xl overflow-hidden border-2 border-[#8C5D39]/60 bg-[#E8E1D3] aspect-4/3 shadow-sm group">
              <img
                src={transformedPreviewUrl || currentRoomImage}
                alt="Transformed Room Preview"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isTransforming ? 'opacity-60' : 'opacity-100'
                }`}
              />
              {isTransforming && (
                <div className="absolute inset-0 bg-black/20 backdrop-blur-2xs flex items-center justify-center">
                  <div className="bg-[#FAF7F2] text-[#2D2823] px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#8C5D39]" />
                    <span>Applying {selectedVibe.name} styling...</span>
                  </div>
                </div>
              )}
              <div className="absolute top-2 left-2 bg-[#8C5D39] text-[#FAF7F2] text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                Step 2 Preview: {selectedVibe.name}
              </div>
              <div className="absolute bottom-2 left-2 right-2 bg-[#FAF7F2]/90 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] text-[#4A3B32] font-medium flex items-center justify-between">
                <span>Peel & stick wall + layered rug</span>
                <span className="font-semibold text-[#5C704C]">Real windows retained</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-[#6E5D50] flex items-center justify-between">
              <span className="font-semibold text-[#2D2823]">
                {selectedVibe.name} Makeover Preview
              </span>
              <span className="text-[11px] text-[#5C704C] font-semibold">
                ✓ 100% Lease-Safe
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Style Vibe Selection Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#4A3B32] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#8C5D39]" />
            Select Style Vibe
          </label>
          <span className="text-xs text-[#8C7A6E]">3 Curated Renter-Friendly Aesthetics</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STYLE_VIBES.map((vibe) => {
            const isSelected = selectedVibe.id === vibe.id;
            return (
              <button
                key={vibe.id}
                type="button"
                onClick={() => onSelectVibe(vibe)}
                className={`text-left p-5 rounded-xl border transition-all duration-200 cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#F2ECE3] border-[#8C5D39] ring-2 ring-[#8C5D39]/20 shadow-sm'
                    : 'bg-[#FAF8F5] border-[#DFD6C7] hover:border-[#B5A593] hover:bg-[#F7F2EB]'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#4A3B32] text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                )}

                <div>
                  <h3 className="font-serif-display text-lg font-bold text-[#2D2823] pr-8">
                    {vibe.name}
                  </h3>
                  <p className="text-xs font-medium text-[#8C5D39] mt-0.5">
                    {vibe.subtitle}
                  </p>
                  <p className="text-xs text-[#6E5D50] mt-3 leading-relaxed">
                    {vibe.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E4DCCF] text-[11px] text-[#7A6B5F]">
                  <span className="font-semibold text-[#4A3B32]">Key Renter Pieces: </span>
                  <span>{vibe.keyElements.slice(0, 2).join(', ')}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Combination Picker */}
      <div className="pt-6 border-t border-[#EAE3D8]">
        <div className="flex items-center justify-between mb-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#4A3B32] flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#8C5D39]" />
            Select Color Combination
          </label>
          <span className="text-xs text-[#8C7A6E]">5 Curated Warm Renter Palettes</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {COLOR_PALETTES.map((palette) => {
            const isSelected = selectedPalette.id === palette.id;
            return (
              <button
                key={palette.id}
                type="button"
                onClick={() => onSelectPalette(palette)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#F2ECE3] border-[#8C5D39] ring-2 ring-[#8C5D39]/20 shadow-xs'
                    : 'bg-[#FAF8F5] border-[#DFD6C7] hover:border-[#B5A593] hover:bg-[#F7F2EB]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif-display text-sm font-bold text-[#2D2823]">
                    {palette.name}
                  </span>
                  {isSelected && (
                    <span className="text-[11px] font-semibold text-[#8C5D39] bg-[#EAE0D3] px-2 py-0.5 rounded">
                      Active
                    </span>
                  )}
                </div>

                {/* Swatches strip */}
                <div className="flex items-center gap-1.5 mt-3">
                  {palette.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="flex-1 h-7 rounded border border-black/10 shadow-2xs relative group"
                      style={{ backgroundColor: color.hex }}
                      title={`${color.name} (${color.hex})`}
                    />
                  ))}
                </div>

                <p className="text-[11px] text-[#7A6B5F] mt-2.5 line-clamp-1">
                  {palette.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Palette Details Bar */}
        <div className="mt-5 p-3.5 bg-[#F2EDE5] border border-[#DDD3C4] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#3D322A]">Chosen Swatch Tones for {roomName}:</span>
            <span className="text-[#6E5D50]">{selectedPalette.name}</span>
          </div>
          <div className="flex items-center gap-3">
            {selectedPalette.colors.map((c, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/20"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-[11px] text-[#5C4C40]">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
