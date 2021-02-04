function hideSelf() {
  let buttonElement = document.querySelector('.hide-self-button');

  buttonElement.onclick = makeHidden;

  function makeHidden() {
    buttonElement.hidden = true;
  }
}
