/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { UploadBox } from './components/UploadBox';
import { StyleChooseBox } from './components/StyleChooseBox';
import { ResultsGrid } from './components/ResultsGrid';
import { RenterStagingStudio } from './components/RenterStagingStudio';
import { RenterGuaranteeCard } from './components/RenterGuaranteeCard';
import { RenterRulebookModal } from './components/RenterRulebookModal';
import { LandlordPackPanel } from './components/LandlordPackPanel';
import { RoomStudioProvider } from './context/RoomStudioContext';
import { STYLE_VIBES, COLOR_PALETTES, BASE_BEFORE_IMAGE, getThreeDesignResults } from './data/mockRooms';
import { StyleVibe, ColorPalette, RoomDesignResult } from './types';
import { downloadDesignImage } from './utils/downloadImage';
import { generateRoomTransformation } from './utils/roomTransformEngine';
import { CheckCircle2, ShieldCheck, Sparkles, Download, Heart, ArrowDown, Eye, Check } from 'lucide-react';

export default function App() {
  return (
    <RoomStudioProvider>
      <AppContent />
    </RoomStudioProvider>
  );
}

function AppContent() {
  // 1. Uploaded Room State (Step 1)
  const [currentRoomImage, setCurrentRoomImage] = useState<string>(BASE_BEFORE_IMAGE);
  const [roomName, setRoomName] = useState<string>('Builder-Grade Studio (Demo)');

  // 2. Style & Palette State (Step 2)
  const [selectedVibe, setSelectedVibe] = useState<StyleVibe>(STYLE_VIBES[0]);
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette>(COLOR_PALETTES[0]);

  // Transformed Room Images (Directly derived from Step 1's room image!)
  const [transformedImages, setTransformedImages] = useState<Record<string, string>>({});
  const [isTransforming, setIsTransforming] = useState<boolean>(false);

  // 3. Favorite Design Selection (Step 3)
  const [favoriteIndex, setFavoriteIndex] = useState<number>(0);

  // 4. Modal and feedback states
  const [isRulebookOpen, setIsRulebookOpen] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize Step 2 and Step 3 with Step 1 whenever the room, vibe, or palette changes
  useEffect(() => {
    let isCancelled = false;
    setIsTransforming(true);

    async function syncRoomTransformations() {
      try {
        const [img1, img2, img3] = await Promise.all([
          generateRoomTransformation({
            baseImageUrl: currentRoomImage,
            vibe: selectedVibe,
            palette: selectedPalette,
            conceptIndex: 0,
          }),
          generateRoomTransformation({
            baseImageUrl: currentRoomImage,
            vibe: selectedVibe,
            palette: selectedPalette,
            conceptIndex: 1,
          }),
          generateRoomTransformation({
            baseImageUrl: currentRoomImage,
            vibe: selectedVibe,
            palette: selectedPalette,
            conceptIndex: 2,
          }),
        ]);

        if (!isCancelled) {
          setTransformedImages({
            'concept-1': img1,
            'concept-2': img2,
            'concept-3': img3,
          });
        }
      } catch (err) {
        console.error('Error generating synchronized room transformations:', err);
      } finally {
        if (!isCancelled) {
          setIsTransforming(false);
        }
      }
    }

    syncRoomTransformations();

    return () => {
      isCancelled = true;
    };
  }, [currentRoomImage, selectedVibe, selectedPalette]);

  // Compute 3 makeover results side-by-side using the transformed images of the Step 1 room
  const designResults: RoomDesignResult[] = useMemo(() => {
    return getThreeDesignResults(selectedVibe.id, selectedPalette, transformedImages, roomName);
  }, [selectedVibe.id, selectedPalette, transformedImages, roomName]);

  // Handle room upload / change in Step 1
  const handleImageSelected = (imgUrl: string, name: string) => {
    setCurrentRoomImage(imgUrl);
    setRoomName(name);
    showToast(`Loaded "${name}". Steps 2 & 3 synced to this room!`);
  };

  // Handle Style Vibe Selection in Step 2
  const handleSelectVibe = (vibe: StyleVibe) => {
    setSelectedVibe(vibe);
    // Find matching recommended palette if available
    const recId = vibe.recommendedPalettes[0];
    const recPalette = COLOR_PALETTES.find((p) => p.id === recId);
    if (recPalette) {
      setSelectedPalette(recPalette);
    }
    showToast(`Style updated to ${vibe.name}. Transformed room synchronized!`);
  };

  // Handle Palette Selection in Step 2
  const handleSelectPalette = (palette: ColorPalette) => {
    setSelectedPalette(palette);
    showToast(`Color palette changed to ${palette.name}. Makeover updated!`);
  };

  // Handle Download Picture / Design Package in Step 3
  const handleDownload = async (design: RoomDesignResult) => {
    setIsDownloading(true);
    try {
      await downloadDesignImage(design, selectedPalette, currentRoomImage);
      showToast(`Downloaded "${design.conceptTitle}" directly to your computer!`);
    } catch (err) {
      console.error(err);
      showToast('Download completed.');
    } finally {
      setIsDownloading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Reset to initial demo
  const handleResetDemo = () => {
    setCurrentRoomImage(BASE_BEFORE_IMAGE);
    setRoomName('Builder-Grade Studio (Demo)');
    setSelectedVibe(STYLE_VIBES[0]);
    setSelectedPalette(COLOR_PALETTES[0]);
    setFavoriteIndex(0);
    showToast('Demo reset to initial baseline state.');
  };

  return (
    <div className="min-h-screen linen-pattern flex flex-col justify-between">
      {/* Top Bar Header */}
      <Header
        onResetToDemo={handleResetDemo}
        onOpenRules={() => setIsRulebookOpen(true)}
      />

      {/* Main Studio Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 w-full">
        {/* Hero Banner with Warm Editorial Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFE8DC] border border-[#DDD3C2] rounded-full text-xs font-semibold text-[#5A4537]">
            <Sparkles className="w-3.5 h-3.5 text-[#8C5D39]" />
            <span>Contest Demonstration Edition · Renter Vibe Transformer</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#2D2823] leading-tight">
            Transform Your Rental Vibe Without Risking Your Deposit
          </h1>

          <p className="text-sm sm:text-base text-[#6E5D50] leading-relaxed">
            Zero wall demolition. Zero window alterations. 100% renter-safe warmth using peel-and-stick color accents, layered area rugs, tactile woods, and movable furniture.
          </p>
        </div>

        {/* STEP-BY-STEP SYNCHRONIZATION PIPELINE TRACKER */}
        <nav aria-label="Transformation Progress" className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-3 sm:p-4 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Step 1 Pill */}
            <a
              href="#upload-section"
              className="p-3 rounded-xl border border-[#DFD6C7] bg-[#F4EFE6] hover:border-[#8C5D39] transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span className="w-7 h-7 rounded-full bg-[#4A3B32] text-white flex items-center justify-center text-xs font-bold shrink-0">
                1
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C5D39]">
                    Step 1 · Room Uploaded
                  </span>
                  <Check className="w-3.5 h-3.5 text-[#5C704C]" />
                </div>
                <p className="text-xs font-semibold text-[#2D2823] truncate">
                  {roomName}
                </p>
              </div>
            </a>

            {/* Step 2 Pill */}
            <a
              href="#style-section"
              className="p-3 rounded-xl border border-[#DFD6C7] bg-[#F4EFE6] hover:border-[#8C5D39] transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span className="w-7 h-7 rounded-full bg-[#8C5D39] text-white flex items-center justify-center text-xs font-bold shrink-0">
                2
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C5D39]">
                    Step 2 · Style Direction
                  </span>
                  <Check className="w-3.5 h-3.5 text-[#5C704C]" />
                </div>
                <p className="text-xs font-semibold text-[#2D2823] truncate">
                  {selectedVibe.name} · {selectedPalette.name}
                </p>
              </div>
            </a>

            {/* Step 3 Pill */}
            <a
              href="#results-section"
              className="p-3 rounded-xl border border-[#DFD6C7] bg-[#F4EFE6] hover:border-[#8C5D39] transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span className="w-7 h-7 rounded-full bg-[#2D2823] text-white flex items-center justify-center text-xs font-bold shrink-0">
                3
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C5D39]">
                    Step 3 · Makeovers
                  </span>
                  <span className="text-[10px] text-[#5C704C] font-semibold bg-[#EAF2E3] px-1.5 py-0.5 rounded">
                    Synced
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#2D2823] truncate">
                  3 Concepts Rendered on Your Room
                </p>
              </div>
            </a>
          </div>
        </nav>

        {/* STEP 1: UPLOAD BOX */}
        <UploadBox
          currentRoomImage={currentRoomImage}
          roomName={roomName}
          onImageSelected={handleImageSelected}
        />

        {/* STEP 2: STYLE CHOOSE BOX (SYNCED WITH STEP 1) */}
        <StyleChooseBox
          selectedVibe={selectedVibe}
          selectedPalette={selectedPalette}
          currentRoomImage={currentRoomImage}
          roomName={roomName}
          transformedPreviewUrl={transformedImages['concept-1']}
          isTransforming={isTransforming}
          onSelectVibe={handleSelectVibe}
          onSelectPalette={handleSelectPalette}
        />

        {/* STEP 3: RESULTS GRID WITH SLIDER & SAVE BUTTON (SYNCED WITH STEP 1 & 2) */}
        <ResultsGrid
          options={designResults}
          favoriteIndex={favoriteIndex}
          onSelectFavorite={setFavoriteIndex}
          onDownloadOption={handleDownload}
          selectedPalette={selectedPalette}
          beforeImageUrl={currentRoomImage}
          roomName={roomName}
          isDownloading={isDownloading}
        />

        {/* INTERACTIVE ROOM CANVAS & RIGHT SIDEBAR BUDGET TRACKER */}
        <RenterStagingStudio roomImageUrl={currentRoomImage} />

        {/* LANDLORD APPROVAL PACK – n8n workflow (hidden until the webhook URL is set in src/services/landlordPack.ts) */}
        <LandlordPackPanel
          concept={designResults[favoriteIndex]}
          beforeImage={currentRoomImage}
          roomName={roomName}
        />

        {/* Renter Guarantee & Architectural Rules */}
        <RenterGuaranteeCard />
      </main>

      {/* Renter Non-Permanent Rulebook Modal */}
      <RenterRulebookModal
        isOpen={isRulebookOpen}
        onClose={() => setIsRulebookOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D2823] text-[#FAF7F2] text-xs font-medium px-4 py-3 rounded-xl shadow-xl border border-white/10 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#A1B88D] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Quiet Footer */}
      <footer className="mt-16 border-t border-[#E6DFD5] bg-[#FAF7F2] py-8 text-xs text-[#7A6B5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif-display font-bold text-[#2D2823] text-sm">RoomMagic MVP</span>
            <span>·</span>
            <span>Non-Permanent Renter Decor Engine</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setIsRulebookOpen(true)}
              className="hover:text-[#2D2823] transition-colors cursor-pointer"
            >
              Deposit Protection Policy
            </button>
            <button
              type="button"
              onClick={handleResetDemo}
              className="hover:text-[#2D2823] transition-colors cursor-pointer"
            >
              Reset Contest State
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
