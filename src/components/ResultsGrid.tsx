import React from 'react';
import { Download, Star, Check, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { RoomDesignResult, ColorPalette } from '../types';
import { CompareSlider } from './CompareSlider';

interface ResultsGridProps {
  options: RoomDesignResult[];
  favoriteIndex: number;
  onSelectFavorite: (index: number) => void;
  onDownloadOption: (option: RoomDesignResult) => void;
  selectedPalette: ColorPalette;
  beforeImageUrl: string;
  roomName?: string;
  isDownloading: boolean;
}

export const ResultsGrid: React.FC<ResultsGridProps> = ({
  options,
  favoriteIndex,
  onSelectFavorite,
  onDownloadOption,
  selectedPalette,
  beforeImageUrl,
  roomName = 'Your Rental Room',
  isDownloading,
}) => {
  const favoriteOption = options[favoriteIndex] || options[0];

  return (
    <section id="results-section" className="space-y-8">
      {/* Section Title Header */}
      <div className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E1D5]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-display text-xs tracking-wider uppercase text-[#8C5D39] font-semibold">
                Step 3 of 3
              </span>
              <span className="text-[#C4B7A6]">·</span>
              <span className="text-xs text-[#7A6B5F]">Instant Transformation Results</span>
              <span className="text-[#C4B7A6]">·</span>
              <span className="text-xs text-[#5C704C] font-medium bg-[#EBF2E4] px-2 py-0.5 rounded">
                Rendered on {roomName}
              </span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2D2823] mt-1">
              3 Renter-Friendly Makeover Concepts
            </h2>
            <p className="text-sm text-[#6E5D50] mt-1 max-w-2xl">
              Compare 3 distinct atmosphere variations side-by-side, all generated directly on your uploaded room ({roomName}) with zero wall or window changes.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs bg-[#EFE9DF] px-3.5 py-2 rounded-xl border border-[#DDD3C4]">
            <span className="w-2 h-2 rounded-full bg-[#4E6B41] animate-pulse" />
            <span className="font-semibold text-[#3D322A]">
              Option {favoriteIndex + 1} Selected as Favorite
            </span>
          </div>
        </div>

        {/* 3 SIDE-BY-SIDE RESULT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 items-start">
          {options.map((option, index) => {
            const isFavorite = favoriteIndex === index;
            return (
              <div
                key={option.id}
                onClick={() => onSelectFavorite(index)}
                className={`group rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between ${
                  isFavorite
                    ? 'bg-[#F4EFE6] border-[#8C5D39] shadow-md ring-2 ring-[#8C5D39]/20'
                    : 'bg-[#FAF8F5] border-[#DFD6C7] hover:border-[#B5A593] hover:shadow-xs'
                }`}
              >
                <div>
                  {/* Card Image with Badges */}
                  <div className="relative aspect-4/3 overflow-hidden bg-[#E8E1D3]">
                    <img
                      src={option.imageUrl}
                      alt={option.conceptTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                    />

                    {/* Pill-free simple badge */}
                    <div className="absolute top-3 left-3 bg-[#2D2823]/80 backdrop-blur-xs text-[#FAF7F2] text-[11px] font-semibold px-2.5 py-1 rounded">
                      Option {index + 1}
                    </div>

                    {isFavorite && (
                      <div className="absolute top-3 right-3 bg-[#8C5D39] text-[#FAF7F2] text-[11px] font-bold px-2.5 py-1 rounded flex items-center gap-1 shadow-xs">
                        <Star className="w-3 h-3 fill-current" />
                        Favorite Pick
                      </div>
                    )}

                    {/* Landlord friendly tag */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#FAF7F2]/95 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] text-[#4A3B32] font-medium flex items-center justify-between border border-black/5">
                      <span>0% Wall Demolition</span>
                      <span className="text-[#3C572D] font-bold">100% Removable</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#8C5D39] uppercase tracking-wider">
                        {option.vibeName}
                      </span>
                      {/* Favorite radio toggle */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectFavorite(index);
                        }}
                        className={`text-xs flex items-center gap-1 font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                          isFavorite
                            ? 'bg-[#4A3B32] text-white'
                            : 'bg-[#EAE2D5] text-[#5C4C40] hover:bg-[#DDD3C2]'
                        }`}
                      >
                        {isFavorite ? (
                          <>
                            <Check className="w-3 h-3 stroke-[3]" />
                            Favorite
                          </>
                        ) : (
                          'Select'
                        )}
                      </button>
                    </div>

                    <h3 className="font-serif-display text-lg font-bold text-[#2D2823] mt-1">
                      {option.conceptTitle}
                    </h3>
                    <p className="text-xs text-[#6E5D50] mt-1.5 leading-relaxed line-clamp-2">
                      {option.atmosphereDescription}
                    </p>

                    {/* Applied Color Swatches */}
                    <div className="mt-4 pt-3 border-t border-[#E6DDD0]">
                      <div className="flex items-center justify-between text-[11px] text-[#7A6B5F] mb-1.5">
                        <span className="font-semibold text-[#4A3B32]">Palette:</span>
                        <span>{selectedPalette.name}</span>
                      </div>
                      <div className="flex gap-1.5">
                        {selectedPalette.colors.map((c, i) => (
                          <div
                            key={i}
                            className="flex-1 h-3.5 rounded-sm border border-black/10"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Non-Permanent Renter Checklist */}
                    <div className="mt-4 pt-3 border-t border-[#E6DDD0] space-y-2">
                      <div className="text-[11px] font-bold text-[#4A3B32] uppercase tracking-wide flex items-center gap-1">
                        <Layers className="w-3 h-3 text-[#8C5D39]" />
                        Renter Changes Included:
                      </div>
                      <ul className="space-y-1.5 text-[11px] text-[#5A4B40]">
                        {option.renterChanges.slice(0, 3).map((change, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#5C704C] shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-[#2D2823]">{change.title}</span>
                              <span className="text-[#8C7A6E]"> · {change.removability}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Individual card action footer */}
                <div className="p-5 pt-0">
                  {isFavorite ? (
                    <div className="mt-2 text-center text-xs font-semibold text-[#8C5D39] py-1 bg-[#EAE0D3]/60 rounded-lg">
                      ★ Active Favorite Concept
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectFavorite(index);
                      }}
                      className="w-full mt-2 py-2 text-xs font-medium text-[#6B5A4E] hover:text-[#2D2823] bg-[#EAE2D5]/50 hover:bg-[#EAE2D5] rounded-lg transition-colors cursor-pointer"
                    >
                      Make This Option Favorite
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* PRIMARY SAVE BUTTON DIRECTLY UNDER FAVORITE OPTION */}
        <div className="mt-10 p-6 sm:p-8 bg-[#F4EFE6] border-2 border-[#8C5D39]/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8C5D39]" />
              <span className="text-xs uppercase tracking-wider font-bold text-[#8C5D39]">
                Ready to Save Your Favorite Design
              </span>
            </div>
            <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#2D2823]">
              {favoriteOption.conceptTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#6E5D50] max-w-xl">
              Save or download this high-resolution room transformation photo along with its 100% renter-friendly decor list and color swatch palette.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Clear prominent save button */}
            <button
              type="button"
              disabled={isDownloading}
              onClick={() => onDownloadOption(favoriteOption)}
              className="px-6 py-3.5 text-sm font-bold text-[#FAF7F2] bg-[#4A3B32] hover:bg-[#342720] active:scale-98 disabled:opacity-50 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2.5 whitespace-nowrap"
            >
              <Download className="w-4 h-4 stroke-[2.2]" />
              {isDownloading ? 'Preparing High-Res File...' : 'Save & Download Chosen Picture'}
            </button>
          </div>
        </div>

        {/* INTERACTIVE SLIDER BAR UNDERNEATH THE RESULTS */}
        <CompareSlider
          options={options}
          selectedIndex={favoriteIndex}
          onSelectIndex={onSelectFavorite}
          beforeImageUrl={beforeImageUrl}
        />
      </div>
    </section>
  );
};
