var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');

function openCreatePostModal() {
  createPostArea.style.display = 'block';
  if (window.defferPropmt) {
    window.defferPropmt.prompt();
    window.defferPropmt.userChoice.then(choiceRes => {
      console.log(choiceRes);
      if (choiceRes.outcome === 'dismissed') {
        console.log('the fucking user canclled the propmt');
      } else {
        console.log('installed');
      }
    });
    window.defferPropmt = null;
  }
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);
