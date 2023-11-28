import {photos} from './data.js';
import {renderPictures} from './miniature.js';
import './big-pucture.js';
import './img-upload.js';
import './img-editor.js';

// Вывод массива фотографий
window.console.log(photos);

renderPictures(photos);
