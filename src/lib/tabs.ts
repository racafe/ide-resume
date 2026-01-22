/**
 * Tab management utilities for the IDE-style interface
 * Handles tab switching, status bar updates, and content visibility
 */

/** Language mode mapping based on file extension */
export const languageModeMap: Record<string, string> = {
  md: 'Markdown',
  json: 'JSON',
  ts: 'TypeScript',
  tsx: 'TypeScript React',
  js: 'JavaScript',
  jsx: 'JavaScript React',
  yaml: 'YAML',
  yml: 'YAML',
  txt: 'Plain Text',
  html: 'HTML',
  css: 'CSS',
  astro: 'Astro',
  log: 'Log',
  unlock: 'Unlock File',
};

/**
 * Get the language mode for a given filename
 */
export function getLanguageMode(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  return languageModeMap[ext] || 'Plain Text';
}

/**
 * Update status bar based on active file
 */
export function updateStatusBar(filename: string): void {
  const language = getLanguageMode(filename);

  // Update language mode
  const statusLanguage = document.getElementById('status-language');
  if (statusLanguage) {
    statusLanguage.textContent = language;
    statusLanguage.setAttribute('title', `Select Language Mode (${language})`);
  }

  // Update file type indicator
  const statusFileType = document.getElementById('status-file-type');
  const statusFileTypeText = document.getElementById('status-file-type-text');
  if (statusFileType && statusFileTypeText) {
    statusFileTypeText.textContent = language;
    statusFileType.setAttribute('title', `File type: ${language}`);
  }

  // Reset line/col for new file
  const statusLineCol = document.getElementById('status-line-col');
  if (statusLineCol) {
    statusLineCol.textContent = 'Ln 1, Col 1';
  }
}

/**
 * Switch visible content based on active file
 */
export function switchContent(filename: string): void {
  // Hide all file content sections
  document.querySelectorAll('.file-content').forEach((content) => {
    content.classList.remove('active');
  });

  // Show the content for the active file
  const activeContent = document.querySelector(`[data-content="${filename}"]`);
  if (activeContent) {
    activeContent.classList.add('active');
  }
}

/**
 * Activate an existing tab or create a new one
 */
export function activateTab(filename: string, getFileIconHTML: (filename: string) => string): void {
  const tabBar = document.getElementById('tab-bar');
  if (!tabBar) return;

  // Check if tab already exists
  const existingTab = tabBar.querySelector(`[data-file="${filename}"]`);
  if (existingTab) {
    // Activate existing tab
    tabBar.querySelectorAll('.tab').forEach((tab) => tab.classList.remove('active'));
    existingTab.classList.add('active');
    updateStatusBar(filename);
    switchContent(filename);
    return;
  }

  // Remove active class from all tabs
  tabBar.querySelectorAll('.tab').forEach((tab) => tab.classList.remove('active'));

  // Create new tab with icon based on file extension
  const newTab = document.createElement('div');
  newTab.className = 'tab active';
  newTab.setAttribute('data-file', filename);
  newTab.innerHTML = `
    ${getFileIconHTML(filename)}
    <span class="truncate">${filename}</span>
    <button class="tab-close" aria-label="Close tab">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6L18 18"></path>
      </svg>
    </button>
  `;

  // Add close button functionality
  const closeBtn = newTab.querySelector('.tab-close');
  closeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    newTab.remove();
    // If this was the active tab, activate the first remaining tab
    const remainingTabs = tabBar.querySelectorAll('.tab');
    if (remainingTabs.length > 0) {
      remainingTabs[0].classList.add('active');
      const activeFile = remainingTabs[0].getAttribute('data-file');
      if (activeFile) {
        updateStatusBar(activeFile);
        switchContent(activeFile);
      }
    }
  });

  // Add click to activate
  newTab.addEventListener('click', () => {
    tabBar.querySelectorAll('.tab').forEach((tab) => tab.classList.remove('active'));
    newTab.classList.add('active');
    updateStatusBar(filename);
    switchContent(filename);
  });

  tabBar.appendChild(newTab);
  updateStatusBar(filename);
  switchContent(filename);
}

/**
 * Initialize tab close button handlers for existing tabs
 */
export function initExistingTabCloseButtons(): void {
  document.querySelectorAll('.tab-close').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const tab = btn.closest('.tab');
      if (tab) {
        const tabBar = tab.parentElement;
        tab.remove();
        const remainingTabs = tabBar?.querySelectorAll('.tab');
        if (remainingTabs && remainingTabs.length > 0) {
          remainingTabs[0].classList.add('active');
          const activeFile = remainingTabs[0].getAttribute('data-file');
          if (activeFile) {
            updateStatusBar(activeFile);
            switchContent(activeFile);
          }
        }
      }
    });
  });
}

/**
 * Initialize tab click handlers for existing tabs
 */
export function initExistingTabClickHandlers(): void {
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabBar = tab.parentElement;
      tabBar?.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const filename = tab.getAttribute('data-file');
      if (filename) {
        updateStatusBar(filename);
        switchContent(filename);
      }
    });
  });
}
