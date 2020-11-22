console.log('start')
fetch('menu.json')
  .then(response => response.json())
  .then(data => {
   // Do something with your data
   console.log(data);
  });


const ulEl = document.querySelector('.gallery.js-gallery');
const modalWindow = document.querySelector('.lightbox.js-lightbox');
const modalImg = document.querySelector('.lightbox__image');
const modalCloseBtn = document.querySelector('.lightbox__button');
const modalOverlay = document.querySelector('.lightbox__overlay');
const bodyEl = document.querySelector('body');

function closeModal(event) {
  modalImg.src = '';
  modalImg.alt = '';
  modalWindow.classList.remove('is-open');
}

function switchImg(side) {
  if (side.includes('Left')) {
    for (let i in galleryItems) {
      i = Number(i);
      const currentValue = galleryItems[i];
      if (currentValue.original === modalImg.src) {
        if (!i) {
          modalImg.src = galleryItems[galleryItems.length - 1].original;
          modalImg.alt = galleryItems[galleryItems.length - 1].description;
        } else {
          modalImg.src = galleryItems[i - 1].original;
          modalImg.alt = galleryItems[i - 1].description;
        }
        break;
      }
    }
  } else {
    for (let i in galleryItems) {
      i = Number(i);
      const currentValue = galleryItems[i];
      if (currentValue.original === modalImg.src) {
        if (i === galleryItems.length - 1) {
          modalImg.src = galleryItems[0].original;
          modalImg.alt = galleryItems[0].description;
        } else {
          modalImg.src = galleryItems[i + 1].original;
          modalImg.alt = galleryItems[i + 1].description;
        }
        break;
      }
    }
  }
}

function keyPress(event) {
  if (event.key === 'Escape') {
    closeModal(event);
  } else if (['ArrowLeft', 'ArrowRight'].includes(event.key) && modalImg.src) {
    switchImg(event.key);
  }
}

modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
bodyEl.addEventListener('keyup', keyPress);

function renderGalleryItems(items) {
  const result = [];
  for (let item of items) {
    const liEl = document.createElement('li');
    liEl.classList.add('gallery__item');

    const aEl = document.createElement('a');
    aEl.classList.add('gallery__link');
    aEl.href = item.preview;

    const imgEl = document.createElement('img');
    imgEl.classList.add('gallery__image');
    imgEl.src = item.preview;
    imgEl.dataset.source = item.original;
    imgEl.alt = item.description;

    aEl.appendChild(imgEl);
    liEl.appendChild(aEl);
    aEl.addEventListener('click', event => {
      event.preventDefault();
      modalImg.src = imgEl.dataset.source;
      modalImg.alt = imgEl.alt;
      modalWindow.classList.add('is-open');
    });

    result.push(liEl);
  }

  ulEl.append(...result);
}

renderGalleryItems(galleryItems);
