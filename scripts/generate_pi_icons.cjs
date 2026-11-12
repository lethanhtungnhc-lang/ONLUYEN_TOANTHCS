const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  chunk.writeUInt32BE(crc32(typeAndData), 8 + len);
  return chunk;
}

function encodePNG(width, height, rgba) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdr = createChunk('IHDR', ihdrData);

  const scanlines = Buffer.alloc(height * (1 + width * 4));
  let srcOffset = 0;
  let dstOffset = 0;
  for (let y = 0; y < height; y++) {
    scanlines[dstOffset++] = 0;
    rgba.copy(scanlines, dstOffset, srcOffset, srcOffset + width * 4);
    dstOffset += width * 4;
    srcOffset += width * 4;
  }

  const idatData = zlib.deflateSync(scanlines, { level: 9 });
  const idat = createChunk('IDAT', idatData);
  const iend = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

// 7x9 Crisp Font Matrix for "ToánTHCS"
const GLYPHS = {
  'T': [
    "1111111",
    "0001000",
    "0001000",
    "0001000",
    "0001000",
    "0001000",
    "0001000",
    "0001000",
    "0001000"
  ],
  'o': [
    "0000000",
    "0000000",
    "0111110",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "0111110",
    "0000000"
  ],
  'a': [
    "0000010",
    "0000100",
    "0111110",
    "0000001",
    "0111111",
    "1000001",
    "1000001",
    "0111111",
    "0000000"
  ],
  'n': [
    "0000000",
    "0000000",
    "1011110",
    "1100001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "0000000"
  ],
  'H': [
    "1000001",
    "1000001",
    "1000001",
    "1111111",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001"
  ],
  'C': [
    "0111110",
    "1000001",
    "1000000",
    "1000000",
    "1000000",
    "1000000",
    "1000000",
    "1000001",
    "0111110"
  ],
  'S': [
    "0111111",
    "1000000",
    "1000000",
    "0111110",
    "0000001",
    "0000001",
    "0000001",
    "1000001",
    "0111110"
  ]
};

function renderPiIcon(size, isMaskable = false) {
  const buffer = Buffer.alloc(size * size * 4);

  const setPixel = (x, y, r, g, b, a) => {
    if (x < 0 || x >= size || y < 0 || y >= size) return;
    const idx = (y * size + x) * 4;
    const currentA = buffer[idx + 3] / 255;
    const newA = a / 255;
    const outA = newA + currentA * (1 - newA);
    if (outA > 0) {
      buffer[idx] = Math.round((r * newA + buffer[idx] * currentA * (1 - newA)) / outA);
      buffer[idx + 1] = Math.round((g * newA + buffer[idx + 1] * currentA * (1 - newA)) / outA);
      buffer[idx + 2] = Math.round((b * newA + buffer[idx + 2] * currentA * (1 - newA)) / outA);
      buffer[idx + 3] = Math.round(outA * 255);
    }
  };

  const cornerRadius = isMaskable ? 0 : size * 0.22;
  const cx = size / 2;
  const cy = size * 0.44;

  // Background Gradient with rounded corners
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!isMaskable) {
        let dx = 0;
        let dy = 0;
        if (x < cornerRadius) dx = cornerRadius - x;
        else if (x > size - cornerRadius) dx = x - (size - cornerRadius);
        if (y < cornerRadius) dy = cornerRadius - y;
        else if (y > size - cornerRadius) dy = y - (size - cornerRadius);

        if (dx > 0 && dy > 0 && (dx * dx + dy * dy > cornerRadius * cornerRadius)) {
          continue;
        }
      }

      // Royal deep sapphire to cyber cyan gradient
      const gradT = (x * 0.5 + y) / (1.5 * size);
      const r = Math.round(10 * (1 - gradT) + 30 * gradT);
      const g = Math.round(18 * (1 - gradT) + 110 * gradT);
      const b = Math.round(55 * (1 - gradT) + 245 * gradT);
      setPixel(x, y, r, g, b, 255);
    }
  }

  // Draw circular coordinate orbit
  const orbitR = size * 0.38;
  const orbitThick = Math.max(1.5, size * 0.007);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const d = Math.hypot(x - cx, y - cy);
      if (Math.abs(d - orbitR) < orbitThick) {
        const angle = Math.atan2(y - cy, x - cx);
        if (Math.sin(angle * 12) > -0.25) {
          setPixel(x, y, 125, 211, 252, 90);
        }
      }
    }
  }

  // DRAW MATHEMATICAL PI (π) SYMBOL
  const isInsidePi = (u, v) => {
    // 1. Horizontal crossbar (v: 0.24 to 0.33, u: 0.20 to 0.80)
    if (v >= 0.24 && v <= 0.32) {
      if (u >= 0.22 && u <= 0.78) return true;
      if (u >= 0.18 && u < 0.22 && v >= 0.27 && v <= 0.32) return true; // left serif
      if (u > 0.78 && u <= 0.82 && v >= 0.24 && v <= 0.30) return true; // right curl
    }
    if (v >= 0.22 && v <= 0.24 && u >= 0.32 && u <= 0.68) return true;

    // 2. Left vertical leg:
    if (u >= 0.33 && u <= 0.42 && v >= 0.32 && v <= 0.64) return true;
    if (v >= 0.61 && v <= 0.68) {
      const legBend = 0.33 - (v - 0.61) * 0.9;
      if (u >= legBend && u <= legBend + 0.09) return true;
    }

    // 3. Right vertical leg:
    if (u >= 0.58 && u <= 0.67 && v >= 0.32 && v <= 0.61) return true;
    if (v >= 0.60 && v <= 0.69) {
      const rightBend = 0.58 + (v - 0.60) * 0.95;
      if (u >= rightBend && u <= rightBend + 0.09) return true;
    }

    return false;
  };

  // Render Pi glyph with glowing halo and shadow
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;

      if (isInsidePi(u, v - 0.02)) {
        setPixel(x, y, 0, 0, 0, 95);
      }
      if (isInsidePi(u, v)) {
        const piShade = 255 - Math.round((v - 0.2) * 55);
        setPixel(x, y, 255, 255, Math.max(225, piShade), 255);
      }
    }
  }

  // Golden Starlight Sparkle at top right
  const starX = Math.round(size * 0.79);
  const starY = Math.round(size * 0.18);
  const starR = Math.max(2, size * 0.018);
  for (let dy = -starR * 2; dy <= starR * 2; dy++) {
    for (let dx = -starR * 2; dx <= starR * 2; dx++) {
      const dist = Math.hypot(dx, dy);
      if (dist <= starR) {
        setPixel(starX + dx, starY + dy, 254, 240, 138, 255);
      } else if (dist <= starR * 2.2) {
        setPixel(starX + dx, starY + dy, 245, 158, 11, 140);
      }
    }
  }

  // ========================================================
  // RENDER "ToánTHCS" PILL BADGE AT BOTTOM
  // ========================================================
  const badgeY1 = Math.round(size * 0.77);
  const badgeY2 = Math.round(size * 0.91);
  const badgeX1 = Math.round(size * 0.12);
  const badgeX2 = Math.round(size * 0.88);
  const badgeRadius = (badgeY2 - badgeY1) / 2;

  // Draw pill background
  for (let y = badgeY1; y <= badgeY2; y++) {
    for (let x = badgeX1; x <= badgeX2; x++) {
      // Rounded pill caps check
      let inPill = false;
      const leftCenterX = badgeX1 + badgeRadius;
      const rightCenterX = badgeX2 - badgeRadius;
      const badgeMidY = (badgeY1 + badgeY2) / 2;

      if (x < leftCenterX) {
        if (Math.hypot(x - leftCenterX, y - badgeMidY) <= badgeRadius) inPill = true;
      } else if (x > rightCenterX) {
        if (Math.hypot(x - rightCenterX, y - badgeMidY) <= badgeRadius) inPill = true;
      } else {
        inPill = true;
      }

      if (inPill) {
        // Deep obsidian-indigo pill fill
        setPixel(x, y, 15, 23, 42, 235);

        // Gold border edge
        const distToEdge = Math.min(
          y - badgeY1,
          badgeY2 - y,
          x < leftCenterX ? badgeRadius - Math.hypot(x - leftCenterX, y - badgeMidY) : 999,
          x > rightCenterX ? badgeRadius - Math.hypot(x - rightCenterX, y - badgeMidY) : 999
        );
        if (distToEdge <= Math.max(1.5, size * 0.007)) {
          setPixel(x, y, 245, 158, 11, 240); // Gold border
        }
      }
    }
  }

  // Draw text "ToánTHCS"
  // Text string: T, o, a, n, T, H, C, S
  const textChars = ['T', 'o', 'a', 'n', 'T', 'H', 'C', 'S'];
  const charPixelW = Math.max(2, Math.round(size * 0.024)); // Each font block width
  const charSpacing = Math.max(1, Math.round(size * 0.008));
  const singleCharTotalW = 7 * charPixelW;
  const totalTextW = textChars.length * (singleCharTotalW + charSpacing) - charSpacing;
  const startTextX = Math.round((size - totalTextW) / 2);
  const startTextY = Math.round(((badgeY1 + badgeY2) / 2) - (4.5 * charPixelW));

  textChars.forEach((ch, charIdx) => {
    const glyph = GLYPHS[ch] || GLYPHS['T'];
    const curCharX = startTextX + charIdx * (singleCharTotalW + charSpacing);

    for (let row = 0; row < 9; row++) {
      const line = glyph[row];
      for (let col = 0; col < 7; col++) {
        if (line[col] === '1') {
          for (let py = 0; py < charPixelW; py++) {
            for (let px = 0; px < charPixelW; px++) {
              const drawX = curCharX + col * charPixelW + px;
              const drawY = startTextY + row * charPixelW + py;
              // White text with slight gold tint for 'THCS'
              if (charIdx >= 4) {
                setPixel(drawX, drawY, 254, 240, 138, 255); // Gold for THCS
              } else {
                setPixel(drawX, drawY, 255, 255, 255, 255); // Crisp White for Toán
              }
            }
          }
        }
      }
    }
  });

  return encodePNG(size, size, buffer);
}

// Generate all target icon files
const publicDir = path.resolve(__dirname, '../public');

const pwa192 = renderPiIcon(192, false);
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), pwa192);

const pwa512 = renderPiIcon(512, false);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), pwa512);

const pwaMaskable = renderPiIcon(512, true);
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), pwaMaskable);

const appleTouch = renderPiIcon(180, false);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouch);

console.log('Successfully generated all PWA icons with artistic Pi (π) and "ToánTHCS" text!');
