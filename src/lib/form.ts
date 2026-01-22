/**
 * Contact form validation and submission handling
 * TypeScript-style validation messages for the IDE-themed contact form
 */

/**
 * Validate a name field value
 * Returns error message or null if valid
 */
export function validateName(value: string): string | null {
  if (!value.trim()) {
    return "Argument of type 'undefined' is not assignable to parameter of type 'string'";
  }
  if (value.trim().length < 2) {
    return "Property 'name' must have at least 2 characters";
  }
  return null;
}

/**
 * Validate an email field value
 * Returns error message or null if valid
 */
export function validateEmail(value: string): string | null {
  if (!value.trim()) {
    return "Argument of type 'undefined' is not assignable to parameter of type 'string'";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Type 'string' is not assignable to type 'Email'";
  }
  return null;
}

/**
 * Validate a message field value
 * Returns error message or null if valid
 */
export function validateMessage(value: string): string | null {
  if (!value.trim()) {
    return "Argument of type 'undefined' is not assignable to parameter of type 'string'";
  }
  if (value.trim().length < 10) {
    return "Property 'message' must have at least 10 characters";
  }
  return null;
}

/**
 * Show or clear an error message for a form field
 */
export function showError(
  element: HTMLElement | null,
  input: HTMLInputElement | HTMLTextAreaElement | null,
  message: string | null
): void {
  if (element && input) {
    element.textContent = message || '';
    if (message) {
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  }
}

/**
 * Form element references for the contact form
 */
export interface ContactFormElements {
  contactForm: HTMLElement | null;
  nameInput: HTMLInputElement | null;
  emailInput: HTMLInputElement | null;
  messageInput: HTMLTextAreaElement | null;
  submitBtn: HTMLButtonElement | null;
  successDiv: HTMLElement | null;
  resetBtn: HTMLElement | null;
  codeContent: Element | null;
  nameError: HTMLElement | null;
  emailError: HTMLElement | null;
  messageError: HTMLElement | null;
}

/**
 * Get all contact form element references
 */
export function getContactFormElements(): ContactFormElements {
  const contactForm = document.getElementById('contact-editor');
  return {
    contactForm,
    nameInput: document.getElementById('contact-name') as HTMLInputElement | null,
    emailInput: document.getElementById('contact-email') as HTMLInputElement | null,
    messageInput: document.getElementById('contact-message') as HTMLTextAreaElement | null,
    submitBtn: document.getElementById('contact-submit') as HTMLButtonElement | null,
    successDiv: document.getElementById('contact-success'),
    resetBtn: document.getElementById('contact-reset'),
    codeContent: contactForm?.querySelector('.code-content') || null,
    nameError: document.getElementById('name-error'),
    emailError: document.getElementById('email-error'),
    messageError: document.getElementById('message-error'),
  };
}

/**
 * Initialize contact form validation and submission handlers
 */
export function initContactForm(): void {
  const elements = getContactFormElements();
  const {
    nameInput,
    emailInput,
    messageInput,
    submitBtn,
    successDiv,
    resetBtn,
    codeContent,
    nameError,
    emailError,
    messageError,
  } = elements;

  // Real-time validation on blur
  nameInput?.addEventListener('blur', () => {
    showError(nameError, nameInput, validateName(nameInput.value));
  });

  emailInput?.addEventListener('blur', () => {
    showError(emailError, emailInput, validateEmail(emailInput.value));
  });

  messageInput?.addEventListener('blur', () => {
    showError(messageError, messageInput, validateMessage(messageInput.value));
  });

  // Clear error on input
  nameInput?.addEventListener('input', () => {
    if (nameInput.classList.contains('error')) {
      showError(nameError, nameInput, validateName(nameInput.value));
    }
  });

  emailInput?.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
      showError(emailError, emailInput, validateEmail(emailInput.value));
    }
  });

  messageInput?.addEventListener('input', () => {
    if (messageInput.classList.contains('error')) {
      showError(messageError, messageInput, validateMessage(messageInput.value));
    }
  });

  // Form submission
  submitBtn?.addEventListener('click', (e) => {
    e.preventDefault();

    // Validate all fields
    const nameErr = validateName(nameInput?.value || '');
    const emailErr = validateEmail(emailInput?.value || '');
    const messageErr = validateMessage(messageInput?.value || '');

    showError(nameError, nameInput, nameErr);
    showError(emailError, emailInput, emailErr);
    showError(messageError, messageInput, messageErr);

    if (nameErr || emailErr || messageErr) {
      return;
    }

    // Show loading state
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    if (btnText) btnText.classList.add('hidden');
    if (btnLoading) btnLoading.classList.remove('hidden');
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      // Hide form, show success
      if (codeContent) (codeContent as HTMLElement).classList.add('hidden');
      if (successDiv) successDiv.classList.remove('hidden');

      // Reset button state
      if (btnText) btnText.classList.remove('hidden');
      if (btnLoading) btnLoading.classList.add('hidden');
      submitBtn.disabled = false;
    }, 1500);
  });

  // Reset form
  resetBtn?.addEventListener('click', () => {
    if (codeContent) (codeContent as HTMLElement).classList.remove('hidden');
    if (successDiv) successDiv.classList.add('hidden');

    // Clear form fields
    if (nameInput) nameInput.value = '';
    if (emailInput) emailInput.value = '';
    if (messageInput) messageInput.value = '';

    // Clear errors
    showError(nameError, nameInput, null);
    showError(emailError, emailInput, null);
    showError(messageError, messageInput, null);
  });
}
