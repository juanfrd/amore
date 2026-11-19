'use strict';

const feedbackScenes = {
  dove: `
    <g class="dove">
      <path class="traced" pathLength="1" d="M48 111c16-6 25-14 33-24-18-7-30-23-33-45 12 12 24 20 42 23-8-13-9-28-3-44 8 17 18 29 34 36 10-10 23-14 33-7l12 1-9 7c-7 22-22 34-44 39l-19 19-7-13c-13 6-26 9-39 8Z"/>
      <circle cx="148" cy="55" r="2" fill="currentColor" stroke="none"/>
    </g>
    <path class="traced accent-line" pathLength="1" d="M30 137c14-1 27-5 40-13m-31 26 13-4"/>
  `,
  knot: `
    <path class="traced knot-loop" pathLength="1" d="M22 112c39 3 54-12 72-35 15-20 42-40 61-27 14 10 5 26-16 31-29 7-64-18-80-8-20 13-4 33 18 29 31-6 38-28 61-22 15 4 27 20 50 19"/>
    <path class="knot-free" pathLength="1" d="M22 112c30 8 53-20 78-32 28-14 53-10 88 19"/>
  `,
  heart: `
    <g class="heart-left">
      <path class="traced" pathLength="1" d="M105 56C76 14 37 35 37 66c0 30 36 59 68 80"/>
    </g>
    <g class="heart-right">
      <path class="traced" pathLength="1" d="M105 146c32-21 68-50 68-80 0-31-39-52-68-10"/>
    </g>
    <path class="traced heart-crack" pathLength="1" d="m105 56-10 28 17 10-14 23 7 29"/>
  `,
};

const feedbackSequence = ['dove', 'knot', 'heart', 'dove', 'heart'];
