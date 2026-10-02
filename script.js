// Keep the native, keyboard-accessible language menu tidy.
const languageMenu = document.querySelector('.language');
document.addEventListener('click', (event) => {
  if (languageMenu && !languageMenu.contains(event.target)) languageMenu.open = false;
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && languageMenu?.open) {
    languageMenu.open = false;
    languageMenu.querySelector('summary').focus();
  }
});
