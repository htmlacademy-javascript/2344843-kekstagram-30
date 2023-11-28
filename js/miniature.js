const picturesContainerElement = document.querySelector('.pictures');

const renderPictures = (data) => {
  const miniatures = picturesContainerElement.querySelectorAll('.picture');
  miniatures.forEach((element) => {
    element.remove();
  });
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  data.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.setAttribute('id', picture.id);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').alt = picture.description;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

export { renderPictures };
