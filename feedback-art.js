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
  woman: `
    <path class="traced" pathLength="1" d="M42 143c12-13 30-16 45-25-2-7-4-12-9-17-16-15-22-39-15-57 7-18 24-28 44-28 27 0 46 17 48 40 2 26-15 41-9 65 3 10 9 17 19 22M66 76c-2-16 1-29 8-37 7 12 19 18 33 19 12 1 23 7 30 19-2 16-12 30-24 36-10 4-20 1-28-6m37 4c1 8 5 11 12 15l19 9"/>
    <path class="traced accent-line" pathLength="1" d="M80 77q7-6 15-2m18 1q8-4 14 2m-25 1-4 13 5 1m-11 7q10 7 21-1M53 126c9-17 5-29 3-38m96 3c8 21 2 30 10 42"/>
  `,
  strength: `
    <path class="traced" pathLength="1" d="M16 137 60 93l-2-14c-1-5 4-8 8-5l10 9 24-26c4-4 10 1 7 6l-13 17 14-15c4-4 10 1 7 5L97 93l13-11c4-3 9 1 6 6l-18 17c-6 6-13 9-21 12l-38 38"/>
    <path class="traced" pathLength="1" d="m193 27-42 39 1 15c0 5-5 7-9 4l-10-10-25 24c-4 4-10-1-7-6l14-17-7 7m-11 12-5 6c-4 4-10-1-6-6l19-22-13 11c-4 3-9-2-5-6l18-17c7-6 14-9 22-11l38-37"/>
    <path class="traced accent-line" pathLength="1" d="M71 50 61 38m22 5-2-17m-23 35-16-5m101 54 11 12m-23-5 1 17m23-34 16 6"/>
  `,
};

const feedbackSequence = ['dove', 'knot', 'heart', 'woman', 'strength'];
