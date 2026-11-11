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
    scanlines[dstOffset++] = 0; // Filter 0
    rgba.copy(scanlines, dstOffset, srcOffset, srcOffset + width * 4);
    dstOffset += width * 4;
    srcOffset += width * 4;
  }

  const idatData = zlib.deflateSync(scanlines, { level: 9 });
  const idat = createChunk('IDAT', idatData);
  const iend = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

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
  const cy = size / 2;

  // Background Gradient with rounded corners
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // Rounded corner distance check
      if (!isMaskable) {
        let dx = 0;
        let dy = 0;
        if (x < cornerRadius) dx = cornerRadius - x;
        else if (x > size - cornerRadius) dx = x - (size - cornerRadius);
        if (y < cornerRadius) dy = cornerRadius - y;
        else if (y > size - cornerRadius) dy = y - (size - cornerRadius);

        if (dx > 0 && dy > 0 && (dx * dx + dy * dy > cornerRadius * cornerRadius)) {
          continue; // Outside rounded corners
        }
      }

      // Linear/radial diagonal gradient from deep navy to blue
      const gradT = (x + y) / (2 * size);
      const r = Math.round(30 * (1 - gradT) + 37 * gradT);
      const g = Math.round(27 * (1 - gradT) + 99 * gradT);
      const b = Math.round(75 * (1 - gradT) + 235 * gradT);
      setPixel(x, y, r, g, b, 255);
    }
  }

  // Draw circular coordinate orbit
  const orbitR = size * 0.41;
  const orbitThick = Math.max(1.5, size * 0.008);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const d = Math.hypot(x - cx, y - cy);
      if (Math.abs(d - orbitR) < orbitThick) {
        const angle = Math.atan2(y - cy, x - cx);
        if (Math.sin(angle * 12) > -0.2) {
          setPixel(x, y, 96, 165, 250, 75); // Soft blue dashed ring
        }
      }
    }
  }

  // DRAW MATHEMATICAL PI (π) SYMBOL
  // Normalized coords [0, 1] relative to size
  const isInsidePi = (u, v) => {
    // 1. Horizontal crossbar:
    // v from 0.31 to 0.39, u from 0.22 to 0.78
    // With curved serifs at left (u: 0.20 to 0.26, curves up) and right (u: 0.75 to 0.80)
    if (v >= 0.31 && v <= 0.39) {
      if (u >= 0.22 && u <= 0.78) return true;
      // Left curl
      if (u >= 0.18 && u < 0.22 && v >= 0.33 && v <= 0.39) return true;
      // Right curl
      if (u > 0.78 && u <= 0.82 && v >= 0.31 && v <= 0.37) return true;
    }
    // Crossbar slight upward curve in center
    if (v >= 0.29 && v <= 0.31 && u >= 0.30 && u <= 0.70) return true;

    // 2. Left vertical leg:
    // u from 0.34 to 0.42, v from 0.38 to 0.69
    // Curves left at the bottom: v 0.65 to 0.72, u from 0.28 to 0.38
    if (u >= 0.34 && u <= 0.42 && v >= 0.38 && v <= 0.68) return true;
    if (v >= 0.65 && v <= 0.72) {
      const legBend = 0.34 - (v - 0.65) * 0.8;
      if (u >= legBend && u <= legBend + 0.08) return true;
    }

    // 3. Right vertical leg:
    // u from 0.58 to 0.66, v from 0.38 to 0.66
    // Curves right at the bottom: v 0.64 to 0.73, u curves right to 0.74
    if (u >= 0.58 && u <= 0.66 && v >= 0.38 && v <= 0.65) return true;
    if (v >= 0.64 && v <= 0.73) {
      const rightBend = 0.58 + (v - 0.64) * 0.9;
      if (u >= rightBend && u <= rightBend + 0.08) return true;
    }

    return false;
  };

  // Render Pi glyph with smooth anti-aliased edge & soft shadow
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;

      // Soft shadow
      if (isInsidePi(u, v - 0.02)) {
        setPixel(x, y, 0, 0, 0, 90);
      }

      // Main Pi Symbol (Pure white to soft silver gradient)
      if (isInsidePi(u, v)) {
        const piShade = 255 - Math.round((v - 0.3) * 60);
        setPixel(x, y, 255, 255, Math.max(220, piShade), 255);
      }
    }
  }

  // Golden accent dot / star
  const starX = Math.round(size * 0.78);
  const starY = Math.round(size * 0.24);
  const starR = Math.max(2, size * 0.016);
  for (let dy = -starR * 2; dy <= starR * 2; dy++) {
    for (let dx = -starR * 2; dx <= starR * 2; dx++) {
      const dist = Math.hypot(dx, dy);
      if (dist <= starR) {
        setPixel(starX + dx, starY + dy, 251, 191, 36, 255);
      } else if (dist <= starR * 1.8) {
        setPixel(starX + dx, starY + dy, 245, 158, 11, 120);
      }
    }
  }

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

console.log('Successfully generated all PWA icons with mathematical symbol Pi (π)!');
