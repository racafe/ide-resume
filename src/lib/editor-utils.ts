/**
 * Shared editor utilities for the IDE-style interface
 * Common functions used across multiple components
 */

/** Color map for file icons based on extension */
export const FILE_ICON_COLORS: Record<string, string> = {
  md: 'text-ide-accent',
  json: 'text-ide-warning',
  ts: 'text-ide-keyword',
  tsx: 'text-ide-type',
  js: 'text-ide-warning',
  yaml: 'text-ide-error',
  yml: 'text-ide-error',
  txt: 'text-ide-textMuted',
  log: 'text-ide-string',
  unlock: 'text-ide-number',
};

/**
 * Get the color class for a file icon based on filename extension
 */
export function getFileIconColor(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  return FILE_ICON_COLORS[ext] || 'text-ide-text';
}

/**
 * Generate HTML for a file icon based on filename
 */
export function getFileIconHTML(filename: string): string {
  const color = getFileIconColor(filename);

  return `<svg class="w-4 h-4 ${color}" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8" fill="none" stroke="currentColor" stroke-width="1"></polyline>
  </svg>`;
}

/**
 * Generate a line number span with consistent padding
 */
export function formatLineNumber(lineNum: number, padLength = 2): string {
  return String(lineNum).padStart(padLength, ' ');
}

/**
 * Create a code line with line number for syntax-highlighted code blocks
 */
export function createCodeLine(lineNum: number, content: string, padLength = 2): string {
  return `<span class="line"><span class="line-number">${formatLineNumber(lineNum, padLength)}</span>${content}</span>`;
}

/**
 * Escape HTML entities in a string for safe rendering
 */
export function escapeHtml(str: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

/**
 * Wrap text in a syntax highlighting span
 */
export function syntaxHighlight(
  text: string,
  type: 'keyword' | 'string' | 'number' | 'type' | 'function' | 'variable' | 'comment'
): string {
  return `<span class="syntax-${type}">${escapeHtml(text)}</span>`;
}
