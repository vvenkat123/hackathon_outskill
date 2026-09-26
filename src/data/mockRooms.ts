import { StyleVibe, ColorPalette, RoomDesignResult, DemoRoom } from '../types';

import beforeRoomImg from '../assets/images/room_base_renter_before_1790411677609.jpg';
import midcenturyImg from '../assets/images/room_style_midcentury_vibe_1790411690216.jpg';
import warmBohoImg from '../assets/images/room_style_warm_boho_vibe_1790411703300.jpg';
import modernMinimalImg from '../assets/images/room_style_modern_minimal_vibe_1790411715734.jpg';

export const BASE_BEFORE_IMAGE = beforeRoomImg;

export const DEMO_ROOMS: DemoRoom[] = [
  {
    id: 'blank-studio',
    name: 'Builder-Grade Studio',
    description: 'Plain beige carpet, basic white drywall, standard rental window',
    imageUrl: beforeRoomImg,
  },
  {
    id: 'neutral-living',
    name: 'Standard 1BR Living Room',
    description: 'Unpainted walls, neutral rental layout, awaiting warm character',
    imageUrl: beforeRoomImg,
  },
  {
    id: 'blank-bedroom',
    name: 'Sunlit Rental Bedroom',
    description: 'Bare rental bedroom walls, generic carpet, seeking cozy warmth',
    imageUrl: beforeRoomImg,
  },
];

export const STYLE_VIBES: StyleVibe[] = [
  {
    id: 'cozy-midcentury',
    name: 'Cozy Mid-Century',
    subtitle: 'Warm wood warmth & retro tactile geometry',
    description: 'Rich walnut tones, brass arc fixtures, warm wool rugs, and removable terracotta accent walls without punching holes in plaster.',
    keyElements: ['Walnut low console', 'Peel-and-stick accent wall', 'Geometric wool rug', 'Brass arc floor lamp'],
    recommendedPalettes: ['terracotta-oat', 'caramel-cream', 'amber-walnut'],
  },
  {
    id: 'warm-boho',
    name: 'Warm Boho',
    subtitle: 'Organic textiles, lush greenery & relaxed ease',
    description: 'Layered jute and Berber rugs over landlord flooring, natural rattan seating, cream linen drapes, and hanging macrame planters on tension poles.',
    keyElements: ['Layered jute & shag rug', 'Rattan armchair', 'Linen curtains (tension rod)', 'Terracotta potted greenery'],
    recommendedPalettes: ['terracotta-oat', 'sage-sand', 'dusty-rose'],
  },
  {
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    subtitle: 'Serene simplicity, soft limewash & sculptural bouclé',
    description: 'Calm oat-toned removable wall mural, curved bouclé accent chair, white oak nesting tables, and soft 2700K ambient paper lamps.',
    keyElements: ['Removable oat limewash wallpaper', 'Bouclé lounge chair', 'High-pile organic wool rug', 'Warm ceramic glow lamp'],
    recommendedPalettes: ['caramel-cream', 'sage-sand', 'amber-walnut'],
  },
];

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'terracotta-oat',
    name: 'Warm Terracotta & Oat',
    description: 'Sun-baked clay, unbleached oat linen, warm roasted pecan, and soft biscuit.',
    colors: [
      { name: 'Sunbaked Clay', hex: '#C86D51' },
      { name: 'Oat Linen', hex: '#F4ECE1' },
      { name: 'Roasted Pecan', hex: '#7E5A44' },
      { name: 'Soft Biscuit', hex: '#E6D7C3' },
    ],
  },
  {
    id: 'caramel-cream',
    name: 'Caramel Wood & Cream',
    description: 'Amber caramel, rich walnut veneer, warm vanilla cream, and soft taupe.',
    colors: [
      { name: 'Warm Caramel', hex: '#B87333' },
      { name: 'Rich Walnut', hex: '#4A301D' },
      { name: 'Vanilla Cream', hex: '#FAF3E8' },
      { name: 'Raw Sisal', hex: '#D6C7B2' },
    ],
  },
  {
    id: 'sage-sand',
    name: 'Sage Green & Sand',
    description: 'Muted olive sage, warm sand dunes, deep forest moss, and unbleached cotton.',
    colors: [
      { name: 'Muted Sage', hex: '#7C8A69' },
      { name: 'Warm Sand', hex: '#EBE4D5' },
      { name: 'Forest Moss', hex: '#3E4F39' },
      { name: 'Linen Flax', hex: '#DFD7C7' },
    ],
  },
  {
    id: 'dusty-rose',
    name: 'Dusty Rose & Linen',
    description: 'Vintage blush clay, warm oat fleece, antique brass, and toasted almond.',
    colors: [
      { name: 'Blush Clay', hex: '#BA857C' },
      { name: 'Oat Fleece', hex: '#F5EFEA' },
      { name: 'Toasted Almond', hex: '#6E4E47' },
      { name: 'Antique Brass', hex: '#C99E64' },
    ],
  },
  {
    id: 'amber-walnut',
    name: 'Amber Gold & Walnut',
    description: 'Golden honey amber, dark walnut grain, soft ecru, and aged bronze.',
    colors: [
      { name: 'Honey Amber', hex: '#D19438' },
      { name: 'Dark Walnut', hex: '#3B2314' },
      { name: 'Ecru Wool', hex: '#FAF6ED' },
      { name: 'Aged Bronze', hex: '#785A3C' },
    ],
  },
];

/**
 * Returns 3 distinct side-by-side makeover concepts
 * based on selected style vibe, color palette, and dynamic room images.
 */
export function getThreeDesignResults(
  selectedVibeId: string,
  selectedPalette: ColorPalette,
  customImages?: Record<string, string>,
  roomName?: string
): RoomDesignResult[] {
  const paletteHexes = selectedPalette.colors.map((c) => c.hex);

  // Concept 1: The Primary Curated Makeover
  const option1: RoomDesignResult = {
    id: 'concept-1',
    vibeId: 'cozy-midcentury',
    vibeName: 'Cozy Mid-Century',
    conceptTitle: 'Option 1: Amber & Walnut Warmth',
    paletteName: selectedPalette.name,
    paletteColors: paletteHexes,
    imageUrl: customImages?.['concept-1'] || midcenturyImg,
    atmosphereDescription: 'Rich tactile warmth with low-slung walnut furniture, warm layered wool rugs, and an effortless removable accent wall.',
    landlordSafetyScore: 100,
    structuralImpact: '0% Structural Changes (Walls & Windows Untouched)',
    renterChanges: [
      {
        category: 'Wall Finish',
        title: 'Peel-and-Stick Accent Wall',
        renterBenefit: 'Zero drywall damage, peels off clean with heat or warm water',
        removability: 'Peel & Stick',
      },
      {
        category: 'Flooring',
        title: 'Geometric Wool Area Rug (8x10)',
        renterBenefit: 'Fully covers generic rental carpet while adding plush step comfort',
        removability: 'Layered',
      },
      {
        category: 'Furniture',
        title: 'Solid Walnut Lowline Credenza',
        renterBenefit: 'Freestanding piece you take with you when your lease is up',
        removability: 'Freestanding',
      },
      {
        category: 'Lighting',
        title: 'Arched Brass Floor Lamp (Plug-in)',
        renterBenefit: 'No electrical wiring or junction box drilling needed',
        removability: 'Plug-in',
      },
    ],
  };

  // Concept 2: Earthy Boho Haven
  const option2: RoomDesignResult = {
    id: 'concept-2',
    vibeId: 'warm-boho',
    vibeName: 'Warm Boho',
    conceptTitle: 'Option 2: Earthy Boho Haven',
    paletteName: selectedPalette.name,
    paletteColors: paletteHexes,
    imageUrl: customImages?.['concept-2'] || warmBohoImg,
    atmosphereDescription: 'Relaxed organic layers featuring woven rattan, lush potted greenery in terracotta, and light-filtering linen drapery.',
    landlordSafetyScore: 100,
    structuralImpact: '0% Structural Changes (Walls & Windows Untouched)',
    renterChanges: [
      {
        category: 'Flooring',
        title: 'Dual-Layered Jute & Moroccan Shag Rug',
        renterBenefit: 'Protects landlord subfloor from wear and softens acoustics',
        removability: 'Layered',
      },
      {
        category: 'Textiles',
        title: 'Flax Linen Floor-to-Ceiling Drapes',
        renterBenefit: 'Mounted on heavy-duty spring tension rod (0 nail holes)',
        removability: 'Tension Rod',
      },
      {
        category: 'Furniture',
        title: 'Hand-Woven Rattan Accent Lounge',
        renterBenefit: 'Lightweight, easily movable seating with organic warmth',
        removability: 'Freestanding',
      },
      {
        category: 'Lighting',
        title: 'Woven Bamboo Pendant on Swag Hook',
        renterBenefit: 'Plugs into standard wall outlet with warm 2700K Edison bulb',
        removability: 'Plug-in',
      },
    ],
  };

  // Concept 3: Modern Minimalist Retreat
  const option3: RoomDesignResult = {
    id: 'concept-3',
    vibeId: 'modern-minimalist',
    vibeName: 'Modern Minimalist',
    conceptTitle: 'Option 3: Serene Bouclé & Oak',
    paletteName: selectedPalette.name,
    paletteColors: paletteHexes,
    imageUrl: customImages?.['concept-3'] || modernMinimalImg,
    atmosphereDescription: 'Tranquil retreat with creamy oat limewash wallpaper, sculptured bouclé seating, and gentle indirect amber lamps.',
    landlordSafetyScore: 100,
    structuralImpact: '0% Structural Changes (Walls & Windows Untouched)',
    renterChanges: [
      {
        category: 'Wall Finish',
        title: 'Removable Limewash Texture Wallpaper',
        renterBenefit: 'Gives high-end plaster feel with 100% renter-safe adhesive',
        removability: 'Peel & Stick',
      },
      {
        category: 'Furniture',
        title: 'Curved Cream Bouclé Armchair',
        renterBenefit: 'Sculptural silhouette that anchors the seating zone effortlessly',
        removability: 'Freestanding',
      },
      {
        category: 'Flooring',
        title: 'High-Pile Ivory Textured Area Rug',
        renterBenefit: 'Adds cozy acoustic dampening and hides standard rental flooring',
        removability: 'Layered',
      },
      {
        category: 'Lighting',
        title: 'Ribbed Ceramic Table Glow Lamp',
        renterBenefit: 'Replaces harsh overhead rental lighting with warm evening glow',
        removability: 'Plug-in',
      },
    ],
  };

  // If the user selected a specific vibe, prioritize that vibe's layout as the first concept
  if (selectedVibeId === 'warm-boho') {
    return [option2, option1, option3];
  } else if (selectedVibeId === 'modern-minimalist') {
    return [option3, option1, option2];
  }
  return [option1, option2, option3];
}
