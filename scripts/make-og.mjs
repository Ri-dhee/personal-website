import sharp from 'sharp'

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0b1121"/>
  <text x="80" y="260" font-family="Arial" font-size="64" font-weight="700" fill="#f1f5f9">Rinzin Dorji</text>
  <text x="80" y="340" font-family="Arial" font-size="40" fill="#22c55e">Research, Agriculture &amp; Practical Digital Tools</text>
  <text x="80" y="420" font-family="Arial" font-size="26" fill="#94a3b8">Organic Agriculture graduate · Field researcher · Bhutan</text>
</svg>`

await sharp(Buffer.from(svg)).png().toFile('public/og-image.png')
console.log('ok')