import './img-upload.js';
import './img-editor.js';
import { saveData } from './big-pucture.js';
import { setUserFormSubmit, hideModal } from './img-upload.js';
import { renderPictures } from './miniature.js';
import { getData } from './api.js';
import { showAlert } from './alert.js';
import { showFilters } from './filter.js';

getData()
  .then((data) => {
    renderPictures(data);
    showFilters();
    saveData(data);
  })
  .catch(() => {
    showAlert('data-error');
  });

setUserFormSubmit(hideModal);
