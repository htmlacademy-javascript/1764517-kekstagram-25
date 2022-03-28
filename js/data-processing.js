import {renderMiniatures} from './miniature.js';

fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((miniatures) => {
    renderMiniatures(miniatures);
  });
