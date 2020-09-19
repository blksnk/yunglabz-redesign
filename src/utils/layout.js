import LS from 'locomotive-scroll';

export const wHeight = (val = 100) => (window.innerHeight / 100) * val;
export const wWidth = (val = 100) => (window.innerWidth / 100) * val;
export const rem = (val = 1) =>
  parseInt(
    window.getComputedStyle(document.documentElement).fontSize.split('px')[0],
  ) * val;

export const transform = (obj) => {
  return Object.keys(obj)
    .map((key) => {
      const val = obj[key];
      return `${key}(${val})`;
    })
    .join(' ');
};

export const formatParagraphs = (paragraph) =>
  paragraph.split('\n').filter((item) => item !== '');

export const replaceEmDash = (string) => string.split('&mdash;').join('\u2014');

export function getCurrentScrollY(el) {
  const { y, top } = el.getBoundingClientRect();
  return Math.max(y, top);
}

export function initLS(el, options = {}) {
  const ls = new LS({
    el,
    smooth: true,
    smoothMobile: true,
    lerp: 0.075,
    touchMultiplier: 2,
    getSpeed: true,
    ...options,
  });
  return ls;
}

export function getPos(el) {
  const pos = el.getBoundingClientRect();
  return {
    pos,
    centerX: pos.width / 2 + pos.x,
    centerY: pos.height / 2 + pos.y,
  };
}

export function getDimensions(el) {
  return el.getBoundingClientRect();
}

export function numToUnit(num, unit = 'px') {
  return `${String(num)}${unit}`;
}
