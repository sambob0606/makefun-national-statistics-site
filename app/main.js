// Router and control wiring for Meridian Statistics. Hash routes keep every page
// reachable from static files with no server rewrites: #/ home, #/country/<id>,
// #/compare, #/indicators and #/about.

import { aboutView, compareView, countryView, homeView, indicatorsView } from './views.js';

const appEl = document.getElementById('app');
const homeState = { query: '', region: 'all', sort: 'population' };
const compareState = { a: 'japan', b: 'india' };
const indicatorState = { indicator: 'lifeExpectancy' };

function setActiveNav(name) {
  document.querySelectorAll('[data-nav]').forEach((link) => {
    link.classList.toggle('active', link.dataset.nav === name);
  });
}

function wireHome() {
  const search = document.getElementById('search');
  const region = document.getElementById('region');
  const sort = document.getElementById('sort');
  if (search) {
    search.addEventListener('input', () => {
      homeState.query = search.value;
      render(false);
      const again = document.getElementById('search');
      if (again) {
        again.focus();
        again.setSelectionRange(again.value.length, again.value.length);
      }
    });
  }
  if (region) {
    region.addEventListener('change', () => {
      homeState.region = region.value;
      render(false);
    });
  }
  if (sort) {
    sort.addEventListener('change', () => {
      homeState.sort = sort.value;
      render(false);
    });
  }
}

function wireCompare() {
  const selA = document.getElementById('compare-a');
  const selB = document.getElementById('compare-b');
  if (selA) {
    selA.addEventListener('change', () => {
      compareState.a = selA.value;
      render(false);
    });
  }
  if (selB) {
    selB.addEventListener('change', () => {
      compareState.b = selB.value;
      render(false);
    });
  }
}

function wireIndicators() {
  const sel = document.getElementById('indicator');
  if (sel) {
    sel.addEventListener('change', () => {
      indicatorState.indicator = sel.value;
      render(false);
    });
  }
}

function render(scrollTop = true) {
  const hash = location.hash || '#/';
  const parts = hash.replace(/^#\//, '').split('/').filter(Boolean);
  if (parts.length === 0) {
    appEl.innerHTML = homeView(homeState);
    setActiveNav('home');
    wireHome();
  } else if (parts[0] === 'country' && parts[1]) {
    appEl.innerHTML = countryView(parts[1]);
    setActiveNav('home');
  } else if (parts[0] === 'compare') {
    appEl.innerHTML = compareView(compareState);
    setActiveNav('compare');
    wireCompare();
  } else if (parts[0] === 'indicators') {
    appEl.innerHTML = indicatorsView(indicatorState);
    setActiveNav('indicators');
    wireIndicators();
  } else if (parts[0] === 'about') {
    appEl.innerHTML = aboutView();
    setActiveNav('about');
  } else {
    appEl.innerHTML = homeView(homeState);
    setActiveNav('home');
    wireHome();
  }
  if (scrollTop) window.scrollTo(0, 0);
}

window.addEventListener('hashchange', () => render(true));
render(true);
