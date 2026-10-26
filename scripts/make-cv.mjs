import { writeFileSync } from 'fs'

const lines = [
  'Rinzin Dorji',
  'Research, Agriculture & Practical Digital Tools',
  '',
  'Organic Agriculture graduate (College of Natural Resources, Royal University of Bhutan).',
  'Field researcher and AI-assisted developer based in Thimphu, Bhutan.',
  '',
  'Experience:',
  '- Field Enumerator, WERELIS-Bhutan (ICIMOD & Dept. of Energy), Apr-Jul 2025',
  '- Pelsung (2nd Cohort), Gelephu Mindfulness City, 2025-present',
  '- Youth Co:Lab ELEVATE Fellow (UNDP & Citi Foundation), Sep-Nov 2024',
  '- Undergraduate thesis: bioplastic from potato peel, Sep 2023-May 2024',
  '',
  'Contact: rdorji878@gmail.com',
  'ORCID: 0009-0006-0258-3213',
  'GitHub: https://github.com/Ri-dhee',
]

const content = lines.map((l, i) => `100 ${700 - i * 16} Td (${l.replace(/[()\\]/g, (c) => '\\' + c)}) Tj T*`).join('\n')

const objects = []
objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj')
objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj')
objects.push('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj')
objects.push('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj')
objects.push(`5 0 obj\n<< /Length ${content.length + 20} >>\nstream\nBT\n/F1 11 Tf\n1 0 0 1 0 0 Tm\n${content}\nET\nendstream\nendobj`)

let pdf = '%PDF-1.4\n'
const offsets = [0]
for (const o of objects) {
  offsets.push(pdf.length)
  pdf += o + '\n'
}
const xrefOffset = pdf.length
pdf += `xref\n0 ${objects.length + 1}\n`
pdf += '0000000000 65535 f \n'
for (let i = 1; i <= objects.length; i++) {
  pdf += String(offsets[i]).padStart(10, '0') + ' 00000 n \n'
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`

writeFileSync('public/cv.pdf', pdf)
console.log('ok')