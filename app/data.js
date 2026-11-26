// National statistics dataset: eight countries, headline indicators with source and
// year for every figure, ten-year series for charts, regional breakdowns and age
// structure. Figures are rounded from the named public releases.

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const INDICATORS = [
  { key: 'population', label: 'Population', unit: 'people', format: 'compact', source: 'UN World Population Prospects', year: 2024 },
  { key: 'gdp', label: 'GDP', unit: 'US$', format: 'money', source: 'World Bank WDI', year: 2024 },
  { key: 'gdpPerCapita', label: 'GDP per person', unit: 'US$', format: 'money0', source: 'World Bank WDI', year: 2024 },
  { key: 'lifeExpectancy', label: 'Life expectancy', unit: 'years', format: 'one', source: 'UN World Population Prospects', year: 2024 },
  { key: 'unemployment', label: 'Unemployment rate', unit: '% of labour force', format: 'pct1', source: 'ILO modelled estimates', year: 2024 },
  { key: 'inflation', label: 'Inflation', unit: '% a year', format: 'pct1', source: 'World Bank WDI', year: 2024 },
  { key: 'co2PerCapita', label: 'CO₂ per person', unit: 'tonnes', format: 'one', source: 'Global Carbon Budget', year: 2023 },
  { key: 'internetUse', label: 'Internet users', unit: '% of population', format: 'pct0', source: 'ITU / World Bank WDI', year: 2024 },
  { key: 'urbanShare', label: 'Living in cities', unit: '% of population', format: 'pct0', source: 'UN World Urbanization Prospects', year: 2024 },
  { key: 'medianAge', label: 'Median age', unit: 'years', format: 'one', source: 'UN World Population Prospects', year: 2024 },
  { key: 'fertility', label: 'Births per woman', unit: 'children', format: 'two', source: 'UN World Population Prospects', year: 2024 },
  { key: 'literacy', label: 'Adult literacy', unit: '% of adults', format: 'pct0', source: 'UNESCO UIS', year: 2023 },
];

export const COUNTRIES = [
  {
    id: 'japan', name: 'Japan', region: 'East Asia', capital: 'Tokyo', currency: 'Japanese yen (¥)', languages: 'Japanese',
    areaKm2: 377975,
    values: { population: 124516650, gdp: 4.03e12, gdpPerCapita: 32372, lifeExpectancy: 84.9, unemployment: 2.5, inflation: 2.7, co2PerCapita: 8.0, internetUse: 87, urbanShare: 93, medianAge: 49.9, fertility: 1.23, literacy: 99 },
    populationSeries: [127.5, 127.3, 127.0, 126.5, 126.2, 125.8, 125.5, 125.1, 124.8, 124.5],
    gdpSeries: [4.44, 5.00, 4.94, 4.96, 5.12, 5.06, 5.03, 4.25, 4.21, 4.03],
    ageStructure: [ { label: '0–14', share: 11.4 }, { label: '15–64', share: 58.9 }, { label: '65+', share: 29.7 } ],
    regions: [
      { name: 'Kantō (incl. Tokyo)', population: 43800000, note: 'Largest metropolitan economy; services and manufacturing' },
      { name: 'Kansai (Osaka–Kyoto–Kobe)', population: 22400000, note: 'Second metro cluster; trade and electronics' },
      { name: 'Chūbu (Nagoya)', population: 21400000, note: 'Automotive and precision machinery belt' },
      { name: 'Kyūshū', population: 14300000, note: 'Semiconductors, agriculture and tourism' },
      { name: 'Hokkaidō & Tōhoku', population: 13500000, note: 'Farming, fisheries and winter tourism' },
    ],
    note: 'The world\u2019s oldest large population: nearly three in ten residents are 65 or older, and the population has fallen every year since 2011.',
  },
  {
    id: 'germany', name: 'Germany', region: 'Europe', capital: 'Berlin', currency: 'Euro (€)', languages: 'German',
    areaKm2: 357588,
    values: { population: 84548231, gdp: 4.66e12, gdpPerCapita: 55147, lifeExpectancy: 81.4, unemployment: 3.4, inflation: 2.5, co2PerCapita: 7.2, internetUse: 93, urbanShare: 78, medianAge: 45.5, fertility: 1.46, literacy: 99 },
    populationSeries: [81.7, 82.3, 82.7, 83.0, 83.2, 83.2, 83.2, 84.4, 84.7, 84.5],
    gdpSeries: [3.36, 3.47, 3.69, 3.95, 3.89, 3.94, 4.35, 4.08, 4.52, 4.66],
    ageStructure: [ { label: '0–14', share: 13.9 }, { label: '15–64', share: 64.0 }, { label: '65+', share: 22.1 } ],
    regions: [
      { name: 'North Rhine-Westphalia', population: 17900000, note: 'Most populous state; Ruhr industry and services' },
      { name: 'Bavaria', population: 13100000, note: 'Automotive, tech and brewing; Munich hub' },
      { name: 'Baden-Württemberg', population: 11100000, note: 'Engineering and automotive exports' },
      { name: 'Lower Saxony', population: 8000000, note: 'Agriculture, ports and vehicle plants' },
      { name: 'Berlin', population: 3700000, note: 'Capital city-state; government and start-ups' },
    ],
    note: 'Europe\u2019s largest economy, with exports near 43% of GDP and a working-age share shrinking as the 65+ group grows.',
  },
  {
    id: 'brazil', name: 'Brazil', region: 'South America', capital: 'Brasília', currency: 'Brazilian real (R$)', languages: 'Portuguese',
    areaKm2: 8515767,
    values: { population: 216422446, gdp: 2.17e12, gdpPerCapita: 10044, lifeExpectancy: 76.4, unemployment: 6.6, inflation: 4.4, co2PerCapita: 2.2, internetUse: 84, urbanShare: 88, medianAge: 34.8, fertility: 1.62, literacy: 95 },
    populationSeries: [204.5, 206.1, 207.8, 209.5, 211.0, 212.6, 213.3, 215.3, 216.4, 216.4],
    gdpSeries: [1.80, 1.80, 2.06, 1.92, 1.87, 1.48, 1.67, 1.92, 2.17, 2.17],
    ageStructure: [ { label: '0–14', share: 20.1 }, { label: '15–64', share: 69.3 }, { label: '65+', share: 10.6 } ],
    regions: [
      { name: 'Southeast (São Paulo, Rio)', population: 88700000, note: 'Finance, industry and the largest metros' },
      { name: 'Northeast', population: 54600000, note: 'Agriculture, tourism and growing services' },
      { name: 'South', population: 30100000, note: 'Agribusiness and manufacturing' },
      { name: 'North (Amazon basin)', population: 18600000, note: 'Mining, energy and river trade' },
      { name: 'Centre-West', population: 16700000, note: 'Soy, cattle and the federal capital' },
    ],
    note: 'The demographic window is still open: seven in ten Brazilians are of working age, while fertility has fallen below replacement.',
  },
  {
    id: 'india', name: 'India', region: 'South Asia', capital: 'New Delhi', currency: 'Indian rupee (₹)', languages: 'Hindi, English and 21 other scheduled languages',
    areaKm2: 3287263,
    values: { population: 1450935791, gdp: 3.91e12, gdpPerCapita: 2695, lifeExpectancy: 71.7, unemployment: 4.2, inflation: 4.6, co2PerCapita: 2.0, internetUse: 55, urbanShare: 36, medianAge: 28.8, fertility: 1.98, literacy: 77 },
    populationSeries: [1328.0, 1346.0, 1364.0, 1382.0, 1399.0, 1414.0, 1429.0, 1442.0, 1450.9, 1450.9],
    gdpSeries: [2.10, 2.29, 2.65, 2.70, 2.84, 2.67, 3.15, 3.42, 3.57, 3.91],
    ageStructure: [ { label: '0–14', share: 25.2 }, { label: '15–64', share: 67.7 }, { label: '65+', share: 7.1 } ],
    regions: [
      { name: 'Uttar Pradesh', population: 235700000, note: 'Most populous state; agriculture and textiles' },
      { name: 'Maharashtra (Mumbai)', population: 126400000, note: 'Finance, film and manufacturing hub' },
      { name: 'Bihar', population: 126800000, note: 'Young, fast-growing labour force' },
      { name: 'West Bengal (Kolkata)', population: 99600000, note: 'Port trade, jute and services' },
      { name: 'Tamil Nadu (Chennai)', population: 76900000, note: 'Automotive and electronics manufacturing' },
    ],
    note: 'Now the world\u2019s most populous country, adding roughly 10 million people a year while median age stays under 29.',
  },
  {
    id: 'canada', name: 'Canada', region: 'North America', capital: 'Ottawa', currency: 'Canadian dollar (C$)', languages: 'English and French',
    areaKm2: 9984670,
    values: { population: 41288563, gdp: 2.24e12, gdpPerCapita: 54282, lifeExpectancy: 82.6, unemployment: 6.4, inflation: 2.4, co2PerCapita: 13.6, internetUse: 94, urbanShare: 82, medianAge: 40.9, fertility: 1.26, literacy: 99 },
    populationSeries: [35.9, 36.3, 36.8, 37.3, 37.8, 38.0, 38.3, 38.9, 40.1, 41.3],
    gdpSeries: [1.55, 1.53, 1.65, 1.72, 1.74, 1.65, 1.99, 2.16, 2.14, 2.24],
    ageStructure: [ { label: '0–14', share: 15.4 }, { label: '15–64', share: 66.1 }, { label: '65+', share: 18.5 } ],
    regions: [
      { name: 'Ontario (Toronto)', population: 16000000, note: 'Finance, autos and the largest metro' },
      { name: 'Quebec (Montreal)', population: 9000000, note: 'French-speaking; aerospace and hydro power' },
      { name: 'British Columbia (Vancouver)', population: 5600000, note: 'Pacific trade, forestry and tech' },
      { name: 'Alberta (Calgary, Edmonton)', population: 4800000, note: 'Energy and agriculture' },
      { name: 'Atlantic provinces', population: 2600000, note: 'Fisheries, shipbuilding and tourism' },
    ],
    note: 'Population growth is driven by immigration: the country added about 1.2 million residents in 2024 alone.',
  },
  {
    id: 'australia', name: 'Australia', region: 'Oceania', capital: 'Canberra', currency: 'Australian dollar (A$)', languages: 'English',
    areaKm2: 7692024,
    values: { population: 27136824, gdp: 1.77e12, gdpPerCapita: 65272, lifeExpectancy: 83.9, unemployment: 4.1, inflation: 3.2, co2PerCapita: 14.5, internetUse: 97, urbanShare: 87, medianAge: 38.5, fertility: 1.50, literacy: 99 },
    populationSeries: [23.8, 24.2, 24.6, 24.9, 25.3, 25.6, 25.9, 26.0, 26.5, 27.1],
    gdpSeries: [1.34, 1.26, 1.32, 1.43, 1.39, 1.36, 1.55, 1.70, 1.72, 1.77],
    ageStructure: [ { label: '0–14', share: 18.0 }, { label: '15–64', share: 65.2 }, { label: '65+', share: 16.8 } ],
    regions: [
      { name: 'New South Wales (Sydney)', population: 8200000, note: 'Finance and the largest city' },
      { name: 'Victoria (Melbourne)', population: 6800000, note: 'Services, education and sport' },
      { name: 'Queensland (Brisbane)', population: 5400000, note: 'Tourism, mining and agriculture' },
      { name: 'Western Australia (Perth)', population: 2800000, note: 'Iron ore, gas and lithium exports' },
      { name: 'South Australia (Adelaide)', population: 1800000, note: 'Wine, defence and renewables' },
    ],
    note: 'One of the world\u2019s most urbanised countries: about two-thirds of residents live in the five mainland state capitals.',
  },
  {
    id: 'egypt', name: 'Egypt', region: 'North Africa', capital: 'Cairo', currency: 'Egyptian pound (E£)', languages: 'Arabic',
    areaKm2: 1002450,
    values: { population: 116538258, gdp: 0.35e12, gdpPerCapita: 3027, lifeExpectancy: 71.6, unemployment: 6.8, inflation: 28.3, co2PerCapita: 2.3, internetUse: 72, urbanShare: 43, medianAge: 24.5, fertility: 2.72, literacy: 74 },
    populationSeries: [94.0, 96.4, 98.7, 100.9, 103.1, 105.3, 107.8, 110.6, 113.6, 116.5],
    gdpSeries: [0.33, 0.34, 0.24, 0.26, 0.30, 0.38, 0.42, 0.48, 0.40, 0.35],
    ageStructure: [ { label: '0–14', share: 33.6 }, { label: '15–64', share: 61.0 }, { label: '65+', share: 5.4 } ],
    regions: [
      { name: 'Greater Cairo', population: 22000000, note: 'Capital metro; government and services' },
      { name: 'Nile Delta', population: 48000000, note: 'Farming heartland and dense towns' },
      { name: 'Upper Egypt (Nile valley)', population: 38000000, note: 'Agriculture and heritage tourism' },
      { name: 'Alexandria & coast', population: 5600000, note: 'Mediterranean port and industry' },
      { name: 'Suez Canal zone', population: 4000000, note: 'Shipping, logistics and energy' },
    ],
    note: 'The youngest population in this explorer: a third of Egyptians are under 15, concentrated along the Nile.',
  },
  {
    id: 'sweden', name: 'Sweden', region: 'Europe', capital: 'Stockholm', currency: 'Swedish krona (kr)', languages: 'Swedish',
    areaKm2: 450295,
    values: { population: 10551707, gdp: 0.59e12, gdpPerCapita: 55971, lifeExpectancy: 83.6, unemployment: 8.4, inflation: 1.9, co2PerCapita: 3.4, internetUse: 96, urbanShare: 89, medianAge: 41.2, fertility: 1.45, literacy: 99 },
    populationSeries: [9.8, 10.0, 10.1, 10.2, 10.3, 10.4, 10.5, 10.5, 10.6, 10.6],
    gdpSeries: [0.51, 0.52, 0.54, 0.56, 0.54, 0.54, 0.64, 0.59, 0.59, 0.59],
    ageStructure: [ { label: '0–14', share: 17.3 }, { label: '15–64', share: 62.5 }, { label: '65+', share: 20.2 } ],
    regions: [
      { name: 'Stockholm County', population: 2400000, note: 'Capital; finance and technology' },
      { name: 'Västra Götaland (Gothenburg)', population: 1800000, note: 'Port, vehicles and life sciences' },
      { name: 'Skåne (Malmö)', population: 1400000, note: 'Bridge link to Denmark; food and IT' },
      { name: 'Uppsala & central Sweden', population: 1200000, note: 'Universities and manufacturing' },
      { name: 'Norrland (the north)', population: 1200000, note: 'Mining, forestry and hydropower' },
    ],
    note: 'Low emissions with high incomes: CO₂ per person is about a quarter of Canada\u2019s, helped by hydro and nuclear power.',
  },
];

export const RELEASES = [
  { date: '12 Nov 2025', title: 'Population estimates revised for 2024', detail: 'Canada and Egypt totals updated after new migration and register data; India series extended to 2024.' },
  { date: '28 Oct 2025', title: 'GDP annual accounts, 2024', detail: 'Germany and Japan revised down slightly; Australia per-person GDP now third in this explorer.' },
  { date: '9 Oct 2025', title: 'Labour force update', detail: 'Unemployment for Sweden rises to 8.4%; Japan stays lowest at 2.5%.' },
  { date: '22 Sep 2025', title: 'Energy and emissions note', detail: '2023 CO₂ per person added from the Global Carbon Budget; Australia and Canada remain the highest here.' },
];

export function countryById(id) {
  return COUNTRIES.find((c) => c.id === id) || null;
}

export function indicatorByKey(key) {
  return INDICATORS.find((i) => i.key === key) || INDICATORS[0];
}

export function formatValue(indicator, value) {
  if (value === null || value === undefined) return '—';
  switch (indicator.format) {
    case 'compact':
      if (value >= 1e9) return (value / 1e9).toFixed(2) + ' billion';
      if (value >= 1e6) return (value / 1e6).toFixed(1) + ' million';
      return Math.round(value).toLocaleString('en-US');
    case 'money':
      return 'US$' + (value / 1e12).toFixed(2) + ' trillion';
    case 'money0':
      return 'US$' + Math.round(value).toLocaleString('en-US');
    case 'one':
      return value.toFixed(1);
    case 'two':
      return value.toFixed(2);
    case 'pct1':
      return value.toFixed(1) + '%';
    case 'pct0':
      return Math.round(value) + '%';
    default:
      return String(value);
  }
}
