import './data.js';
import './img-upload.js';
import './img-editor.js';
import { saveData } from './big-pucture.js';
import { setUserFormSubmit, hideModal } from './img-upload.js';
import { renderPictures } from './miniature.js';
import { getData } from './api.js';
import { showAlert } from './alert.js';

getData()
  .then((data) => {
    window.console.log(data);
    renderPictures(data);
    saveData(data);
  })
  .catch((error) => {
    showAlert('data-error');
    window.console.log(error);
  });

setUserFormSubmit(hideModal);
