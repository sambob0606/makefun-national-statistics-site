// Page renderers: each returns the HTML for one hash route. Controls are wired in
// main.js after the HTML lands, so every button and select here has a handler.

import { COUNTRIES, INDICATORS, RELEASES, YEARS, countryById, formatValue, indicatorByKey } from './data.js';
import { barChart, donutChart, donutLegend, groupedBars, lineChart } from './charts.js';

function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function countryCard(country) {
  const pop = indicatorByKey('population');
  const gdpPc = indicatorByKey('gdpPerCapita');
  const life = indicatorByKey('lifeExpectancy');
  const co2 = indicatorByKey('co2PerCapita');
  return `
  <a class="country-card" href="#/country/${country.id}">
    <div class="region">${esc(country.region)}</div>
    <h3>${esc(country.name)}</h3>
    <div class="card-stats">
      <div><div class="stat-num">${formatValue(pop, country.values.population)}</div><div class="stat-label">Population, 2024</div></div>
      <div><div class="stat-num">${formatValue(gdpPc, country.values.gdpPerCapita)}</div><div class="stat-label">GDP per person</div></div>
      <div><div class="stat-num">${formatValue(life, country.values.lifeExpectancy)} yrs</div><div class="stat-label">Life expectancy</div></div>
      <div><div class="stat-num">${formatValue(co2, country.values.co2PerCapita)} t</div><div class="stat-label">CO₂ per person</div></div>
    </div>
  </a>`;
}

export function homeView(state) {
  const query = (state.query || '').toLowerCase();
  const region = state.region || 'all';
  const sortKey = state.sort || 'population';
  const regions = ['all', ...new Set(COUNTRIES.map((c) => c.region))];
  const sortIndicator = indicatorByKey(sortKey);
  const shown = COUNTRIES
    .filter((c) => (region === 'all' || c.region === region) && c.name.toLowerCase().includes(query))
    .sort((a, b) => b.values[sortKey] - a.values[sortKey]);
  const totalPop = COUNTRIES.reduce((sum, c) => sum + c.values.population, 0);
  const popRows = [...COUNTRIES]
    .sort((a, b) => b.values.population - a.values.population)
    .map((c) => ({
      label: c.name,
      value: c.values.population / 1e6,
      display: formatValue(indicatorByKey('population'), c.values.population),
    }));
  const regionOptions = regions.map((r) => `<option value="${esc(r)}"${r === region ? ' selected' : ''}>${r === 'all' ? 'All regions' : esc(r)}</option>`).join('');
  const sortOptions = INDICATORS.map((i) => `<option value="${i.key}"${i.key === sortKey ? ' selected' : ''}>${esc(i.label)}</option>`).join('');
  const cards = shown.length
    ? `<div class="card-grid">${shown.map(countryCard).join('')}</div>`
    : '<p class="empty-note">No country matches that search. Clear the search box or pick another region.</p>';
  const releases = RELEASES.map((r) => `<li><strong>${esc(r.date)} — ${esc(r.title)}.</strong> ${esc(r.detail)}</li>`).join('');
  return `
  <section class="hero">
    <h1>National statistics, country by country</h1>
    <p class="lede">Population, economy, health and environment for eight countries, compiled from public statistical releases. Every figure carries its source and year, and every chart is drawn from the same tables you can read below it.</p>
  </section>
  <div class="kpi-strip">
    <div class="kpi"><div class="kpi-num">${COUNTRIES.length}</div><div class="kpi-label">Countries in this explorer</div></div>
    <div class="kpi"><div class="kpi-num">${INDICATORS.length}</div><div class="kpi-label">Headline indicators each</div></div>
    <div class="kpi"><div class="kpi-num">${(totalPop / 1e9).toFixed(2)} billion</div><div class="kpi-label">Combined population, 2024</div></div>
    <div class="kpi"><div class="kpi-num">2015–2024</div><div class="kpi-label">Ten-year series for charts</div></div>
  </div>
  <div class="controls">
    <label>Search countries<input id="search" type="search" placeholder="e.g. Japan" value="${esc(state.query || '')}"></label>
    <label>Region<select id="region">${regionOptions}</select></label>
    <label>Sort cards by<select id="sort">${sortOptions}</select></label>
    <span class="result-count">${shown.length} of ${COUNTRIES.length} countries · sorted by ${esc(sortIndicator.label.toLowerCase())}</span>
  </div>
  ${cards}
  <section class="panel">
    <h2>Population at a glance, 2024</h2>
    ${barChart(popRows, { title: 'Population by country' })}
    <p class="src">Source: UN World Population Prospects, 2024 estimates. India alone accounts for about two-thirds of the people covered here.</p>
  </section>
  <section class="panel">
    <h2>Latest releases</h2>
    <ul class="release-list">${releases}</ul>
  </section>`;
}

export function countryView(id) {
  const country = countryById(id);
  if (!country) {
    return '<p class="empty-note">That country is not in this explorer. <a href="#/">Back to the country list</a>.</p>';
  }
  const rows = INDICATORS.map((ind) => `
    <tr>
      <td>${esc(ind.label)}</td>
      <td class="num"><strong>${formatValue(ind, country.values[ind.key])}</strong></td>
      <td class="src">${esc(ind.source)}, ${ind.year}</td>
    </tr>`).join('');
  const popChart = lineChart(country.populationSeries, YEARS.map(String), {
    title: `Population of ${country.name}, 2015 to 2024`,
    unit: 'millions',
    lastLabel: country.populationSeries[country.populationSeries.length - 1].toFixed(1) + 'm in 2024',
  });
  const gdpRows = YEARS.map((year, i) => ({
    label: String(year),
    value: country.gdpSeries[i],
    display: 'US$' + country.gdpSeries[i].toFixed(2) + 'tn',
    alt: i === YEARS.length - 1,
  }));
  const regionRows = country.regions.map((r) => `
    <tr><td>${esc(r.name)}</td><td class="num">${(r.population / 1e6).toFixed(1)} million</td><td>${esc(r.note)}</td></tr>`).join('');
  return `
  <p><a class="back-link" href="#/">← All countries</a></p>
  <div class="country-head">
    <h1>${esc(country.name)}</h1>
    <span class="fact-line">${esc(country.region)} · Capital ${esc(country.capital)} · ${esc(country.currency)} · ${esc(country.languages)} · Land area ${country.areaKm2.toLocaleString('en-US')} km²</span>
  </div>
  <p class="lede" style="font-size:17px;color:var(--ink-soft);max-width:760px">${esc(country.note)}</p>
  <div class="kpi-strip">
    <div class="kpi"><div class="kpi-num">${formatValue(indicatorByKey('population'), country.values.population)}</div><div class="kpi-label">Population, 2024</div></div>
    <div class="kpi"><div class="kpi-num">${formatValue(indicatorByKey('gdp'), country.values.gdp)}</div><div class="kpi-label">GDP, 2024</div></div>
    <div class="kpi"><div class="kpi-num">${formatValue(indicatorByKey('lifeExpectancy'), country.values.lifeExpectancy)} years</div><div class="kpi-label">Life expectancy, 2024</div></div>
    <div class="kpi"><div class="kpi-num">${formatValue(indicatorByKey('medianAge'), country.values.medianAge)} years</div><div class="kpi-label">Median age, 2024</div></div>
  </div>
  <div class="two-col">
    <section class="panel">
      <h2>Population, 2015–2024</h2>
      ${popChart}
      <p class="src">Source: UN World Population Prospects. Values in millions; 2024 is the latest estimate.</p>
    </section>
    <section class="panel">
      <h2>Age structure, 2024</h2>
      ${donutChart(country.ageStructure, { title: `Age structure of ${country.name}`, centerTop: formatValue(indicatorByKey('medianAge'), country.values.medianAge) + ' yrs', centerBottom: 'median age' })}
      ${donutLegend(country.ageStructure)}
      <p class="src">Source: UN World Population Prospects, 2024. Shares of total population.</p>
    </section>
  </div>
  <section class="panel">
    <h2>Headline indicators</h2>
    <table>
      <thead><tr><th>Indicator</th><th class="num">Latest figure</th><th>Source and year</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </section>
  <section class="panel">
    <h2>GDP by year, US$ trillion</h2>
    ${barChart(gdpRows, { title: `GDP of ${country.name} by year` })}
    <p class="src">Source: World Bank World Development Indicators, current US$. The 2024 bar is highlighted.</p>
  </section>
  <section class="panel">
    <h2>Where people live</h2>
    <table>
      <thead><tr><th>Region</th><th class="num">Population</th><th>What it is known for</th></tr></thead>
      <tbody>${regionRows}</tbody>
    </table>
    <p class="src">Regional populations rounded from national statistical office releases, 2024. Regions shown are the five largest.</p>
  </section>
  <p><a href="#/compare">Compare ${esc(country.name)} with another country →</a></p>`;
}

function countryOptions(selectedId) {
  return COUNTRIES.map((c) => `<option value="${c.id}"${c.id === selectedId ? ' selected' : ''}>${esc(c.name)}</option>`).join('');
}

export function compareView(state) {
  const a = countryById(state.a) || COUNTRIES[0];
  const b = countryById(state.b) || COUNTRIES[3];
  const rows = INDICATORS.map((ind) => {
    const va = a.values[ind.key];
    const vb = b.values[ind.key];
    const aWins = va > vb;
    const bWins = vb > va;
    return `<tr>
      <td>${esc(ind.label)} <span class="src">(${ind.year})</span></td>
      <td class="num${aWins ? ' win' : ''}">${formatValue(ind, va)}</td>
      <td class="num${bWins ? ' win' : ''}">${formatValue(ind, vb)}</td>
    </tr>`;
  }).join('');
  const chartKeys = ['gdpPerCapita', 'lifeExpectancy', 'co2PerCapita', 'internetUse', 'medianAge'];
  const chartRows = chartKeys.map((key) => {
    const ind = indicatorByKey(key);
    return {
      label: ind.label,
      a: a.values[key],
      b: b.values[key],
      displayA: formatValue(ind, a.values[key]),
      displayB: formatValue(ind, b.values[key]),
    };
  });
  return `
  <section class="hero">
    <h1>Compare two countries</h1>
    <p class="lede">Pick any two countries. The higher figure in each row is highlighted — read the label before celebrating: higher is better for life expectancy, worse for inflation.</p>
  </section>
  <div class="controls">
    <label>First country<select id="compare-a">${countryOptions(a.id)}</select></label>
    <label>Second country<select id="compare-b">${countryOptions(b.id)}</select></label>
    <span class="result-count">${esc(a.name)} vs ${esc(b.name)}</span>
  </div>
  <section class="panel">
    <h2>${esc(a.name)} vs ${esc(b.name)} — headline indicators</h2>
    <table>
      <thead><tr><th>Indicator</th><th class="num">${esc(a.name)}</th><th class="num">${esc(b.name)}</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="src">Sources and years are listed per indicator on each country page and the sources page.</p>
  </section>
  <section class="panel">
    <h2>Five indicators side by side</h2>
    ${groupedBars(chartRows, a.name, b.name)}
  </section>`;
}

export function indicatorsView(state) {
  const ind = indicatorByKey(state.indicator || 'lifeExpectancy');
  const ranked = [...COUNTRIES].sort((x, y) => y.values[ind.key] - x.values[ind.key]);
  const rows = ranked.map((c) => ({
    label: c.name,
    value: c.values[ind.key],
    display: formatValue(ind, c.values[ind.key]),
  }));
  const tableRows = ranked.map((c, i) => `
    <tr><td>${i + 1}</td><td><a href="#/country/${c.id}">${esc(c.name)}</a></td><td class="num"><strong>${formatValue(ind, c.values[ind.key])}</strong></td><td>${esc(c.region)}</td></tr>`).join('');
  const options = INDICATORS.map((i) => `<option value="${i.key}"${i.key === ind.key ? ' selected' : ''}>${esc(i.label)}</option>`).join('');
  return `
  <section class="hero">
    <h1>Indicator explorer</h1>
    <p class="lede">One indicator, every country, ranked. Switch the indicator and the chart and table rebuild from the same dataset.</p>
  </section>
  <div class="controls">
    <label>Indicator<select id="indicator">${options}</select></label>
    <span class="result-count">${esc(ind.source)}, ${ind.year} · unit: ${esc(ind.unit)}</span>
  </div>
  <section class="panel">
    <h2>${esc(ind.label)} by country, ${ind.year}</h2>
    ${barChart(rows, { title: `${ind.label} by country` })}
    <p class="src">Source: ${esc(ind.source)}, ${ind.year}. Ranked highest first.</p>
  </section>
  <section class="panel">
    <h2>Ranking table</h2>
    <table>
      <thead><tr><th>Rank</th><th>Country</th><th class="num">${esc(ind.label)}</th><th>Region</th></tr></thead>
      <tbody>${tableRows}</tbody>
    </table>
  </section>`;
}

export function aboutView() {
  const sourceRows = INDICATORS.map((ind) => `
    <tr><td>${esc(ind.label)}</td><td>${esc(ind.unit)}</td><td>${esc(ind.source)}</td><td class="num">${ind.year}</td></tr>`).join('');
  return `
  <section class="hero">
    <h1>Sources and method</h1>
    <p class="lede">Meridian Statistics is an independent explorer built from public statistical releases. It is not an official publication of any government or agency named here.</p>
  </section>
  <section class="panel">
    <h2>Where each figure comes from</h2>
    <table>
      <thead><tr><th>Indicator</th><th>Unit</th><th>Source</th><th class="num">Year</th></tr></thead>
      <tbody>${sourceRows}</tbody>
    </table>
    <p class="src">Regional populations are rounded from national statistical office releases for 2024. Ten-year population and GDP series follow the same sources as the headline figures.</p>
  </section>
  <section class="panel">
    <h2>How to read these pages</h2>
    <h3>Rounding</h3>
    <p>Populations are shown to two decimal places in billions or one in millions; money is in current US dollars, so year-to-year GDP moves mix real growth with prices and exchange rates.</p>
    <h3>Comparisons</h3>
    <p>The compare page highlights the higher number in each row. That is a reading aid, not a verdict: a higher unemployment or inflation rate is not an achievement.</p>
    <h3>Revisions</h3>
    <p>Statistical agencies revise history as better data arrive. When a source revises a series, the tables and charts here are updated together and the change is noted under Latest releases on the home page.</p>
    <h3>Coverage</h3>
    <p>Eight countries are covered in depth rather than every country thinly: two in Europe, and one each from East Asia, South Asia, South America, North America, Oceania and North Africa.</p>
  </section>`;
}
