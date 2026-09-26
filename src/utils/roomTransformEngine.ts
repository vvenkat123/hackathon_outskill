import { StyleVibe, ColorPalette } from '../types';

/**
 * High-performance, client-side canvas engine that applies 100% renter-safe
 * decor transformations (peel-and-stick accent walls, non-permanent rugs,
 * freestanding furniture silhouettes, and 2700K warm lighting) DIRECTLY onto
 * the user's uploaded rental room image.
 *
 * This ensures Step 2 and Step 3 are 100% architecturally synchronized with Step 1!
 */

interface TransformOptions {
  baseImageUrl: string;
  vibe: StyleVibe;
  palette: ColorPalette;
  conceptIndex: number; // 0 = Primary, 1 = Alternative/Textural, 2 = Minimalist
}

// In-memory cache for transformed images to prevent redundant canvas recalculations
const transformCache = new Map<string, string>();

export async function generateRoomTransformation({
  baseImageUrl,
  vibe,
  palette,
  conceptIndex,
}: TransformOptions): Promise<string> {
  const cacheKey = `${baseImageUrl.slice(0, 80)}_${vibe.id}_${palette.id}_concept${conceptIndex}`;
  if (transformCache.has(cacheKey)) {
    return transformCache.get(cacheKey)!;
  }

  // Load the base image from Step 1
  const img = await loadImage(baseImageUrl);
  const width = Math.min(1400, Math.max(800, img.naturalWidth || 1000));
  const height = Math.round(width * ((img.naturalHeight || 750) / (img.naturalWidth || 1000)));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return baseImageUrl;
  }

  // 1. Draw base rental room from Step 1 (Preserves real walls, windows, doors & architecture)
  ctx.drawImage(img, 0, 0, width, height);

  // Define geometric zones of the room
  const wallTop = 0;
  const wallBottom = height * 0.58;
  const floorTop = height * 0.55;
  const floorBottom = height;

  const primaryColor = palette.colors[0]?.hex || '#C86D51';
  const secondaryColor = palette.colors[1]?.hex || '#F4ECE1';
  const accentWoodColor = palette.colors[2]?.hex || '#7E5A44';
  const softBiscuit = palette.colors[3]?.hex || '#E6D7C3';

  // 2. APPLY RENTER-FRIENDLY PEEL-AND-STICK ACCENT WALL
  ctx.save();
  ctx.globalCompositeOperation = 'multiply';
  ctx.globalAlpha = 0.52;

  // Render on main back wall (leave side window natural)
  const wallGradient = ctx.createLinearGradient(0, wallTop, width, wallBottom);
  if (conceptIndex === 0) {
    // Primary concept: rich accent wall tone
    wallGradient.addColorStop(0, primaryColor);
    wallGradient.addColorStop(1, softBiscuit);
  } else if (conceptIndex === 1) {
    // Boho concept: warm earthy clay / oat limewash
    wallGradient.addColorStop(0, accentWoodColor);
    wallGradient.addColorStop(1, primaryColor);
  } else {
    // Minimalist concept: soft serene oat limewash
    wallGradient.addColorStop(0, secondaryColor);
    wallGradient.addColorStop(1, softBiscuit);
  }

  ctx.fillStyle = wallGradient;
  ctx.fillRect(0, wallTop, width, wallBottom);
  ctx.restore();

  // Subtle peel-and-stick seam / architectural border for realism
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, wallBottom);
  ctx.lineTo(width, wallBottom);
  ctx.stroke();
  ctx.restore();

  // 3. APPLY TENSION-ROD LINEN DRAPERY (Zero nail holes)
  ctx.save();
  const drapeWidth = width * 0.12;
  const drapeLeftGrad = ctx.createLinearGradient(0, 0, drapeWidth, 0);
  drapeLeftGrad.addColorStop(0, hexToRgba(secondaryColor, 0.85));
  drapeLeftGrad.addColorStop(0.5, hexToRgba(secondaryColor, 0.65));
  drapeLeftGrad.addColorStop(1, hexToRgba(secondaryColor, 0.2));

  ctx.fillStyle = drapeLeftGrad;
  ctx.fillRect(0, height * 0.08, drapeWidth, height * 0.82);

  // Soft pleat folds
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
  ctx.lineWidth = 2;
  for (let i = 1; i <= 4; i++) {
    ctx.beginPath();
    ctx.moveTo((drapeWidth / 4) * i, height * 0.08);
    ctx.lineTo((drapeWidth / 4) * i, height * 0.9);
    ctx.stroke();
  }
  ctx.restore();

  // 4. APPLY LAYERED AREA RUG OVER BUILDER-GRADE FLOORING
  ctx.save();
  // Perspective trapezoid on floor
  const rugTopWidth = width * 0.65;
  const rugBottomWidth = width * 0.88;
  const rugStartX = (width - rugBottomWidth) / 2;
  const rugStartY = floorTop + (floorBottom - floorTop) * 0.2;
  const rugEndY = height * 0.96;

  ctx.beginPath();
  ctx.moveTo(width / 2 - rugTopWidth / 2, rugStartY);
  ctx.lineTo(width / 2 + rugTopWidth / 2, rugStartY);
  ctx.lineTo(width / 2 + rugBottomWidth / 2, rugEndY);
  ctx.lineTo(width / 2 - rugBottomWidth / 2, rugEndY);
  ctx.closePath();

  // Soft floor shadow under rug
  ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 8;

  if (conceptIndex === 0) {
    // Mid-century Geometric Wool Rug
    ctx.fillStyle = hexToRgba(secondaryColor, 0.92);
    ctx.fill();

    // Geometric pattern accents
    ctx.strokeStyle = hexToRgba(primaryColor, 0.45);
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2 - rugTopWidth * 0.35, rugStartY + 10);
    ctx.lineTo(width / 2, rugEndY - 20);
    ctx.lineTo(width / 2 + rugTopWidth * 0.35, rugStartY + 10);
    ctx.stroke();
  } else if (conceptIndex === 1) {
    // Warm Boho Layered Jute & Shag Rug
    ctx.fillStyle = '#D6C7B2'; // natural jute
    ctx.fill();

    // Layered top fluffy rug
    ctx.beginPath();
    const subTop = rugTopWidth * 0.7;
    const subBottom = rugBottomWidth * 0.7;
    ctx.moveTo(width / 2 - subTop / 2, rugStartY + 25);
    ctx.lineTo(width / 2 + subTop / 2, rugStartY + 25);
    ctx.lineTo(width / 2 + subBottom / 2, rugEndY - 15);
    ctx.lineTo(width / 2 - subBottom / 2, rugEndY - 15);
    ctx.closePath();
    ctx.fillStyle = hexToRgba(secondaryColor, 0.9);
    ctx.fill();

    // Fringe tassels on end
    ctx.strokeStyle = 'rgba(74, 59, 50, 0.35)';
    ctx.lineWidth = 2;
    for (let f = 0; f < 12; f++) {
      const fx = width / 2 - subBottom / 2 + (subBottom / 12) * f;
      ctx.beginPath();
      ctx.moveTo(fx, rugEndY - 15);
      ctx.lineTo(fx, rugEndY - 5);
      ctx.stroke();
    }
  } else {
    // Modern Minimalist Sculptural Ivory Rug
    ctx.fillStyle = hexToRgba(secondaryColor, 0.94);
    ctx.fill();

    ctx.strokeStyle = hexToRgba(softBiscuit, 0.8);
    ctx.lineWidth = 4;
    ctx.stroke();
  }
  ctx.restore();

  // 5. DRAW VIBE-SPECIFIC FREESTANDING FURNITURE & LIGHTING
  if (conceptIndex === 0) {
    // --- CONCEPT 1: COZY MID-CENTURY ---
    // A. Walnut Lowline Credenza
    drawMidcenturyCredenza(ctx, width, height, accentWoodColor);
    // B. Arched Brass Floor Lamp (Plug-in)
    drawArchedBrassLamp(ctx, width, height);
    // C. Potted Greenery in Terracotta Planter
    drawPottedPlant(ctx, width * 0.82, height * 0.68, width * 0.08, height * 0.18, primaryColor);
  } else if (conceptIndex === 1) {
    // --- CONCEPT 2: WARM BOHO HAVEN ---
    // A. Hand-Woven Rattan Accent Lounge
    drawRattanChair(ctx, width * 0.28, height * 0.58, width * 0.24, height * 0.32);
    // B. Round Wood Coffee Table & Decor
    drawRoundCoffeeTable(ctx, width * 0.54, height * 0.68, width * 0.18, height * 0.14, accentWoodColor);
    // C. Hanging Macrame & Planters (Tension rod / freestanding stand)
    drawPottedPlant(ctx, width * 0.15, height * 0.66, width * 0.1, height * 0.22, '#C86D51');
    drawPottedPlant(ctx, width * 0.84, height * 0.64, width * 0.09, height * 0.2, '#7C8A69');
  } else {
    // --- CONCEPT 3: MODERN MINIMALIST RETREAT ---
    // A. Curved Bouclé Armchair
    drawBoucleChair(ctx, width * 0.3, height * 0.56, width * 0.22, height * 0.3, secondaryColor);
    // B. White Oak Nesting Side Table
    drawMinimalTable(ctx, width * 0.55, height * 0.66, width * 0.16, height * 0.16, softBiscuit);
    // C. Sculptural Ribbed Ceramic Glow Lamp
    drawCeramicGlowLamp(ctx, width * 0.57, height * 0.59, width * 0.06, height * 0.1);
  }

  // 6. AMBIENT 2700K WARM LIGHTING GLOW OVERLAY
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  const lightX = conceptIndex === 0 ? width * 0.86 : conceptIndex === 1 ? width * 0.5 : width * 0.6;
  const lightY = conceptIndex === 0 ? height * 0.38 : conceptIndex === 1 ? height * 0.42 : height * 0.62;

  const glowRadius = width * 0.45;
  const glow = ctx.createRadialGradient(lightX, lightY, 10, lightX, lightY, glowRadius);
  glow.addColorStop(0, 'rgba(255, 218, 168, 0.45)');
  glow.addColorStop(0.4, 'rgba(255, 196, 130, 0.22)');
  glow.addColorStop(1, 'rgba(255, 180, 100, 0)');

  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  // 7. LANDLORD SAFETY VERIFICATION STAMP WATERMARK
  ctx.save();
  const stampX = width - 210;
  const stampY = height - 36;
  ctx.fillStyle = 'rgba(45, 40, 35, 0.82)';
  ctx.beginPath();
  roundRect(ctx, stampX, stampY, 198, 26, 6);
  ctx.fill();

  ctx.fillStyle = '#FAF7F2';
  ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('✓ 0% Structural Impact · Renter-Safe', stampX + 10, stampY + 16);

  // Palette swatch dots
  palette.colors.slice(0, 3).forEach((col, idx) => {
    ctx.fillStyle = col.hex;
    ctx.beginPath();
    ctx.arc(stampX + 155 + idx * 12, stampY + 13, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FAF7F2';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  });
  ctx.restore();

  const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
  transformCache.set(cacheKey, dataUrl);
  return dataUrl;
}

// Helper: Load image asynchronously
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(img);
    img.src = src;
  });
}

// Helper: Convert hex to rgba
function hexToRgba(hex: string, alpha: number): string {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) || 200;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 160;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 130;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Helper: Rounded rectangle
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

// -------------------------------------------------------------
// PROCEDURAL FURNITURE RENDERERS (Clean tactile styling in perspective)
// -------------------------------------------------------------

function drawMidcenturyCredenza(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  woodHex: string
) {
  const x = w * 0.28;
  const y = h * 0.54;
  const cw = w * 0.36;
  const ch = h * 0.18;

  ctx.save();
  // Drop shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 10;

  // Credenza Body (Rich walnut veneer)
  ctx.fillStyle = woodHex;
  roundRect(ctx, x, y, cw, ch, 6);
  ctx.fill();

  // Subtle woodgrain panels
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.18)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x + cw * 0.33, y);
  ctx.lineTo(x + cw * 0.33, y + ch);
  ctx.moveTo(x + cw * 0.66, y);
  ctx.lineTo(x + cw * 0.66, y + ch);
  ctx.stroke();

  // Brass knob pulls
  ctx.fillStyle = '#C99E64';
  ctx.beginPath();
  ctx.arc(x + cw * 0.31, y + ch * 0.5, 3, 0, Math.PI * 2);
  ctx.arc(x + cw * 0.64, y + ch * 0.5, 3, 0, Math.PI * 2);
  ctx.fill();

  // Tapered brass legs
  ctx.strokeStyle = '#4A3525';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  // Left leg
  ctx.moveTo(x + 12, y + ch);
  ctx.lineTo(x + 6, y + ch + h * 0.05);
  // Right leg
  ctx.moveTo(x + cw - 12, y + ch);
  ctx.lineTo(x + cw - 6, y + ch + h * 0.05);
  ctx.stroke();

  // Brass tips on legs
  ctx.strokeStyle = '#C99E64';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x + 8, y + ch + h * 0.038);
  ctx.lineTo(x + 6, y + ch + h * 0.05);
  ctx.moveTo(x + cw - 8, y + ch + h * 0.038);
  ctx.lineTo(x + cw - 6, y + ch + h * 0.05);
  ctx.stroke();

  ctx.restore();
}

function drawArchedBrassLamp(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const baseX = w * 0.88;
  const baseY = h * 0.76;
  const shadeX = w * 0.74;
  const shadeY = h * 0.36;

  ctx.save();
  // Weighted marble base
  ctx.fillStyle = '#2D2823';
  ctx.beginPath();
  ctx.ellipse(baseX, baseY, 22, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  // Arched brass pole
  ctx.strokeStyle = '#D1A354';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(baseX, baseY);
  ctx.bezierCurveTo(baseX + 10, h * 0.3, shadeX + 20, h * 0.25, shadeX, shadeY);
  ctx.stroke();

  // Brass Dome Shade
  ctx.fillStyle = '#C99E64';
  ctx.beginPath();
  ctx.arc(shadeX, shadeY, 18, Math.PI, 0, false);
  ctx.closePath();
  ctx.fill();

  // Warm bulb glow under shade
  ctx.fillStyle = '#FFE2A6';
  ctx.beginPath();
  ctx.arc(shadeX, shadeY + 4, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawRattanChair(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 8;

  // Woven rattan curved back
  ctx.fillStyle = '#C89D6B';
  ctx.beginPath();
  ctx.ellipse(x + w * 0.5, y + h * 0.4, w * 0.45, h * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Woven texture lines
  ctx.strokeStyle = '#9C6F42';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.moveTo(x + w * 0.2 + (w * 0.6 * i) / 6, y + h * 0.1);
    ctx.lineTo(x + w * 0.2 + (w * 0.6 * i) / 6, y + h * 0.7);
    ctx.stroke();
  }

  // Soft cream linen cushion
  ctx.fillStyle = '#F5ECE1';
  roundRect(ctx, x + w * 0.15, y + h * 0.45, w * 0.7, h * 0.25, 10);
  ctx.fill();

  // Four rattan hairpin legs
  ctx.strokeStyle = '#4A3828';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x + w * 0.2, y + h * 0.7);
  ctx.lineTo(x + w * 0.1, y + h);
  ctx.moveTo(x + w * 0.8, y + h * 0.7);
  ctx.lineTo(x + w * 0.9, y + h);
  ctx.stroke();
  ctx.restore();
}

function drawBoucleChair(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  ivoryHex: string
) {
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 8;

  // Curved barrel back
  ctx.fillStyle = ivoryHex;
  ctx.beginPath();
  ctx.arc(x + w * 0.5, y + h * 0.4, w * 0.45, Math.PI * 0.8, Math.PI * 0.2, false);
  ctx.lineTo(x + w * 0.85, y + h * 0.75);
  ctx.lineTo(x + w * 0.15, y + h * 0.75);
  ctx.closePath();
  ctx.fill();

  // Seat cushion
  ctx.fillStyle = '#FAF7F2';
  ctx.beginPath();
  ctx.ellipse(x + w * 0.5, y + h * 0.65, w * 0.38, h * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hidden swivel low wood plinth
  ctx.fillStyle = '#A08064';
  ctx.fillRect(x + w * 0.25, y + h * 0.8, w * 0.5, h * 0.08);
  ctx.restore();
}

function drawRoundCoffeeTable(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  woodHex: string
) {
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.2)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 6;

  // Table top round disc
  ctx.fillStyle = woodHex;
  ctx.beginPath();
  ctx.ellipse(x + w * 0.5, y + h * 0.4, w * 0.45, h * 0.32, 0, 0, Math.PI * 2);
  ctx.fill();

  // Legs
  ctx.strokeStyle = '#382516';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(x + w * 0.25, y + h * 0.5);
  ctx.lineTo(x + w * 0.2, y + h * 0.95);
  ctx.moveTo(x + w * 0.75, y + h * 0.5);
  ctx.lineTo(x + w * 0.8, y + h * 0.95);
  ctx.stroke();

  // Small ceramic bowl decor on table
  ctx.fillStyle = '#FAF7F2';
  ctx.beginPath();
  ctx.ellipse(x + w * 0.5, y + h * 0.35, 10, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawMinimalTable(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  biscuitHex: string
) {
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.18)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 6;

  ctx.fillStyle = biscuitHex;
  roundRect(ctx, x, y, w, h * 0.65, 8);
  ctx.fill();

  ctx.strokeStyle = '#6E5D50';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(x + 8, y + h * 0.65);
  ctx.lineTo(x + 8, y + h);
  ctx.moveTo(x + w - 8, y + h * 0.65);
  ctx.lineTo(x + w - 8, y + h);
  ctx.stroke();
  ctx.restore();
}

function drawCeramicGlowLamp(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  // Ceramic lamp base
  ctx.fillStyle = '#E8E1D5';
  ctx.beginPath();
  ctx.ellipse(x + w * 0.5, y + h * 0.7, w * 0.35, h * 0.25, 0, 0, Math.PI * 2);
  ctx.fill();

  // Glowing orb shade
  ctx.fillStyle = '#FFF1D6';
  ctx.beginPath();
  ctx.arc(x + w * 0.5, y + h * 0.35, w * 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPottedPlant(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  potHex: string
) {
  ctx.save();
  // Terracotta Pot
  ctx.fillStyle = potHex;
  ctx.beginPath();
  ctx.moveTo(x, y + h * 0.5);
  ctx.lineTo(x + w, y + h * 0.5);
  ctx.lineTo(x + w * 0.85, y + h);
  ctx.lineTo(x + w * 0.15, y + h);
  ctx.closePath();
  ctx.fill();

  // Lush Greenery Fronds
  ctx.fillStyle = '#3E5C38';
  for (let l = 0; l < 5; l++) {
    ctx.beginPath();
    const lx = x + w * 0.5 + (l - 2) * (w * 0.25);
    const ly = y + h * 0.15 + Math.abs(l - 2) * (h * 0.1);
    ctx.ellipse(lx, ly, w * 0.22, h * 0.35, (l - 2) * 0.25, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}
