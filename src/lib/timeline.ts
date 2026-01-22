/**
 * Timeline interaction logic for the experience section
 * Handles expand/collapse functionality for timeline entries
 */

/**
 * Initialize timeline expand/collapse functionality
 * Each timeline entry can be expanded to show details or collapsed to hide them
 */
export function initTimeline(): void {
  document.querySelectorAll('.timeline-entry').forEach((entry) => {
    const commitButton = entry.querySelector('.timeline-commit');

    commitButton?.addEventListener('click', () => {
      const isExpanded = entry.getAttribute('data-expanded') === 'true';
      entry.setAttribute('data-expanded', String(!isExpanded));
      commitButton.setAttribute('aria-expanded', String(!isExpanded));
    });
  });
}

/**
 * Expand a specific timeline entry by its entry ID
 */
export function expandTimelineEntry(entryId: string): void {
  const entry = document.querySelector(`[data-entry="${entryId}"]`);
  if (entry) {
    entry.setAttribute('data-expanded', 'true');
    const commitButton = entry.querySelector('.timeline-commit');
    commitButton?.setAttribute('aria-expanded', 'true');
  }
}

/**
 * Collapse a specific timeline entry by its entry ID
 */
export function collapseTimelineEntry(entryId: string): void {
  const entry = document.querySelector(`[data-entry="${entryId}"]`);
  if (entry) {
    entry.setAttribute('data-expanded', 'false');
    const commitButton = entry.querySelector('.timeline-commit');
    commitButton?.setAttribute('aria-expanded', 'false');
  }
}

/**
 * Toggle a specific timeline entry by its entry ID
 */
export function toggleTimelineEntry(entryId: string): void {
  const entry = document.querySelector(`[data-entry="${entryId}"]`);
  if (entry) {
    const isExpanded = entry.getAttribute('data-expanded') === 'true';
    entry.setAttribute('data-expanded', String(!isExpanded));
    const commitButton = entry.querySelector('.timeline-commit');
    commitButton?.setAttribute('aria-expanded', String(!isExpanded));
  }
}

/**
 * Expand all timeline entries
 */
export function expandAllTimelineEntries(): void {
  document.querySelectorAll('.timeline-entry').forEach((entry) => {
    entry.setAttribute('data-expanded', 'true');
    const commitButton = entry.querySelector('.timeline-commit');
    commitButton?.setAttribute('aria-expanded', 'true');
  });
}

/**
 * Collapse all timeline entries
 */
export function collapseAllTimelineEntries(): void {
  document.querySelectorAll('.timeline-entry').forEach((entry) => {
    entry.setAttribute('data-expanded', 'false');
    const commitButton = entry.querySelector('.timeline-commit');
    commitButton?.setAttribute('aria-expanded', 'false');
  });
}
