// Inline SVG chart builders. Each returns an SVG string sized by viewBox so the
// charts stay sharp on desktop and phone without any library or image files.

function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function niceMax(value) {
  if (value <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(value)));
  const unit = value / pow;
  const step = unit <= 1 ? 1 : unit <= 2 ? 2 : unit <= 5 ? 5 : 10;
  return step * pow;
}

export function barChart(rows, options = {}) {
  const width = 640;
  const rowH = 34;
  const labelW = 150;
  const valueW = 110;
  const height = rows.length * rowH + 12;
  const max = niceMax(Math.max(...rows.map((r) => r.value)));
  const plotW = width - labelW - valueW;
  let out = `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.title || 'Bar chart')}">`;
  rows.forEach((row, i) => {
    const y = 6 + i * rowH;
    const w = Math.max(2, (row.value / max) * plotW);
    const cls = row.alt ? 'bar alt' : 'bar';
    out += `<text x="${labelW - 8}" y="${y + 17}" text-anchor="end">${esc(row.label)}</text>`;
    out += `<rect class="${cls}" x="${labelW}" y="${y + 4}" width="${w.toFixed(1)}" height="18" rx="3"></rect>`;
    out += `<text x="${labelW + w + 8}" y="${y + 17}">${esc(row.display)}</text>`;
  });
  out += '</svg>';
  return out;
}

export function lineChart(points, labels, options = {}) {
  const width = 640;
  const height = 260;
  const padL = 52;
  const padR = 14;
  const padT = 16;
  const padB = 34;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const lo = min - span * 0.15;
  const hi = max + span * 0.15;
  const x = (i) => padL + (i / (points.length - 1)) * (width - padL - padR);
  const y = (v) => padT + (1 - (v - lo) / (hi - lo)) * (height - padT - padB);
  const coords = points.map((v, i) => [x(i), y(v)]);
  const line = coords.map((c, i) => (i === 0 ? 'M' : 'L') + c[0].toFixed(1) + ',' + c[1].toFixed(1)).join(' ');
  const area = line + ` L${x(points.length - 1).toFixed(1)},${height - padB} L${padL},${height - padB} Z`;
  let out = `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.title || 'Line chart')}">`;
  out += `<path class="area" d="${area}"></path>`;
  out += `<path class="line-path" d="${line}"></path>`;
  out += `<line class="axis" x1="${padL}" y1="${height - padB}" x2="${width - padR}" y2="${height - padB}"></line>`;
  coords.forEach((c, i) => {
    out += `<circle cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" r="3.2" fill="#0b4f4a"></circle>`;
    if (i % 3 === 0 || i === points.length - 1) {
      out += `<text x="${c[0].toFixed(1)}" y="${height - 12}" text-anchor="middle">${esc(labels[i])}</text>`;
    }
  });
  const last = points[points.length - 1];
  out += `<text x="${x(points.length - 1).toFixed(1)}" y="${(y(last) - 10).toFixed(1)}" text-anchor="end">${esc(options.lastLabel || last)}</text>`;
  out += `<text x="6" y="${padT + 4}">${esc(options.unit || '')}</text>`;
  out += '</svg>';
  return out;
}

const DONUT_COLORS = ['#0f766e', '#d97706', '#b23a48', '#3d5a57', '#8a6d3b'];

export function donutChart(slices, options = {}) {
  const size = 240;
  const r = 92;
  const cx = size / 2;
  const cy = size / 2;
  const total = slices.reduce((sum, s) => sum + s.share, 0) || 1;
  let angle = -Math.PI / 2;
  let out = `<svg class="chart" viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(options.title || 'Donut chart')}" style="max-width:280px">`;
  slices.forEach((slice, i) => {
    const sweep = (slice.share / total) * Math.PI * 2;
    const a1 = angle;
    const a2 = angle + sweep;
    const large = sweep > Math.PI ? 1 : 0;
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2);
    const y2 = cy + r * Math.sin(a2);
    out += `<path d="M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large} 1 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${DONUT_COLORS[i % DONUT_COLORS.length]}"></path>`;
    angle = a2;
  });
  out += `<circle cx="${cx}" cy="${cy}" r="52" fill="#fffdf7"></circle>`;
  out += `<text x="${cx}" y="${cy - 2}" text-anchor="middle" style="font-size:15px;font-weight:700;fill:#0b4f4a">${esc(options.centerTop || '')}</text>`;
  out += `<text x="${cx}" y="${cy + 16}" text-anchor="middle">${esc(options.centerBottom || '')}</text>`;
  out += '</svg>';
  return out;
}

export function donutLegend(slices) {
  const items = slices.map((slice, i) => {
    const color = DONUT_COLORS[i % DONUT_COLORS.length];
    return `<span><span class="swatch" style="background:${color}"></span>${esc(slice.label)} — ${slice.share.toFixed(1)}%</span>`;
  });
  return `<div class="legend">${items.join('')}</div>`;
}

export function groupedBars(rows, nameA, nameB) {
  const width = 640;
  const groupH = 52;
  const labelW = 170;
  const valueW = 120;
  const height = rows.length * groupH + 30;
  const plotW = width - labelW - valueW;
  let out = `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Comparison bars">`;
  rows.forEach((row, i) => {
    const y = 8 + i * groupH;
    const max = Math.max(row.a, row.b) || 1;
    const wa = Math.max(2, (row.a / max) * plotW);
    const wb = Math.max(2, (row.b / max) * plotW);
    out += `<text x="${labelW - 8}" y="${y + 26}" text-anchor="end">${esc(row.label)}</text>`;
    out += `<rect class="bar" x="${labelW}" y="${y + 2}" width="${wa.toFixed(1)}" height="13" rx="3"></rect>`;
    out += `<text x="${labelW + wa + 7}" y="${y + 13}">${esc(row.displayA)}</text>`;
    out += `<rect class="bar alt" x="${labelW}" y="${y + 20}" width="${wb.toFixed(1)}" height="13" rx="3"></rect>`;
    out += `<text x="${labelW + wb + 7}" y="${y + 31}">${esc(row.displayB)}</text>`;
  });
  out += `<text x="${labelW}" y="${height - 6}">${esc(nameA)} (teal) vs ${esc(nameB)} (amber), each row scaled to its larger value</text>`;
  out += '</svg>';
  return out;
}
