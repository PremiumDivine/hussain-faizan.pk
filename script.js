/**
 * Copies text to the user's clipboard with fallback support
 * @param {string} text - The value to copy
 * @param {HTMLElement} buttonElement - The clicked button
 */
function copyValue(text, buttonElement) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      handleSuccess(buttonElement);
    }).catch(() => {
      fallbackCopy(text, buttonElement);
    });
  } else {
    fallbackCopy(text, buttonElement);
  }
}

/**
 * Fallback implementation for non-secure contexts or older browsers
 */
function fallbackCopy(text, buttonElement) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    handleSuccess(buttonElement);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
  document.body.removeChild(textArea);
}

/**
 * Visual feedback on button click & toast notification trigger
 */
function handleSuccess(buttonElement) {
  showToast();
  
  const span = buttonElement.querySelector('span');
  const icon = buttonElement.querySelector('i');
  
  if (span && icon) {
    const originalText = span.textContent;
    span.textContent = 'Copied!';
    icon.className = 'fa-solid fa-check';
    buttonElement.style.backgroundColor = '#22c55e';
    buttonElement.style.borderColor = '#22c55e';
    buttonElement.style.color = '#ffffff';

    setTimeout(() => {
      span.textContent = originalText;
      icon.className = 'fa-regular fa-copy';
      buttonElement.style.backgroundColor = '';
      buttonElement.style.borderColor = '';
      buttonElement.style.color = '';
    }, 2000);
  }
}

/**
 * Displays bottom toast popup
 */
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}