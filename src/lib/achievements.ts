/**
 * Achievement system for the IDE portfolio
 * Tracks and displays unlocked achievements/easter eggs
 */

export interface Achievement {
  id: string;
  name: string;
  description: string;
  points: number;
  hint?: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'SECRET_HUNTER', name: 'Secret Hunter', description: 'Found the .secrets folder', points: 100 },
  {
    id: 'KONAMI_MASTER',
    name: 'Konami Master',
    description: 'Entered the legendary code',
    points: 500,
    hint: '↑ ↑ ↓ ↓ ← → ← → B A',
  },
  { id: 'CONFIG_READER', name: 'Config Reader', description: 'Read rafael.config.js', points: 50 },
  { id: 'CAREER_ARCHAEOLOGIST', name: 'Career Archaeologist', description: 'Read the career debug logs', points: 75 },
  { id: 'TAB_HOARDER', name: 'Tab Hoarder', description: 'Open all files at once', points: 150 },
  { id: 'NIGHT_OWL', name: 'Night Owl', description: 'Visit the site between 2-4 AM', points: 200 },
];

export const TOTAL_POINTS = ACHIEVEMENTS.reduce((sum, a) => sum + a.points, 0);

export const ALL_FILES = [
  'README.md',
  'about.md',
  'skills.ts',
  'contact.tsx',
  'education.yaml',
  'experience.json',
  'entity-framework-mysql.md',
  'other-projects.md',
  'rafael.config.js',
  'konami.md',
  'achievements.unlock',
  'career.log',
];

/** Module state */
let unlockedAchievements: Set<string>;

export function getUnlockedAchievements(): Set<string> {
  if (unlockedAchievements) return unlockedAchievements;
  try {
    const stored = localStorage.getItem('unlockedAchievements');
    if (stored) {
      unlockedAchievements = new Set(JSON.parse(stored));
      return unlockedAchievements;
    }
  } catch {
    /* ignore */
  }
  unlockedAchievements = new Set();
  return unlockedAchievements;
}

export function saveUnlockedAchievements(unlocked: Set<string>): void {
  localStorage.setItem('unlockedAchievements', JSON.stringify([...unlocked]));
}

export function showAchievementToast(achievement: Achievement, isAllComplete = false): void {
  const container = document.getElementById('achievement-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'achievement-toast';
  toast.innerHTML = `
    <div class="achievement-toast-icon${isAllComplete ? ' all-complete' : ''}">
      ${
        isAllComplete
          ? `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`
          : `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>`
      }
    </div>
    <div class="achievement-toast-content">
      <div class="achievement-toast-label">${isAllComplete ? 'All Achievements Unlocked!' : 'Achievement Unlocked'}</div>
      <div class="achievement-toast-title">${achievement.name}</div>
      <div class="achievement-toast-description">${achievement.description}</div>
      <div class="achievement-toast-points">+${achievement.points} pts</div>
    </div>
  `;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(
    () => {
      toast.classList.remove('show');
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 400);
    },
    isAllComplete ? 6000 : 4000
  );
}

export function updateAchievementsDisplay(): void {
  const achievementsContent = document.querySelector('[data-content="achievements.unlock"]');
  if (!achievementsContent) return;
  const codeBlock = achievementsContent.querySelector('.code-block code');
  if (!codeBlock) return;

  const unlocked = getUnlockedAchievements();
  const currentScore = [...unlocked].reduce((sum, id) => {
    const achievement = ACHIEVEMENTS.find((a) => a.id === id);
    return sum + (achievement?.points || 0);
  }, 0);

  let lineNum = 1;
  let html = '';
  const addLine = (content: string) => {
    html += `<span class="line"><span class="line-number">${String(lineNum).padStart(2, ' ')}</span>${content}</span>\n`;
    lineNum++;
  };

  addLine('<span class="syntax-comment">// achievements.unlock - Hidden Features Registry</span>');
  addLine('<span class="syntax-comment">// Status: CLASSIFIED</span>');
  addLine('');
  addLine('<span class="syntax-type">ACHIEVEMENT_LIST</span> = &#123;');
  addLine('');
  addLine('  <span class="syntax-comment">// ══════════════════════════════════════════════</span>');
  addLine('  <span class="syntax-comment">//  DISCOVERABLE EASTER EGGS</span>');
  addLine('  <span class="syntax-comment">// ══════════════════════════════════════════════</span>');
  addLine('');

  ACHIEVEMENTS.forEach((achievement, index) => {
    const isUnlocked = unlocked.has(achievement.id);
    const status = isUnlocked ? '[UNLOCKED]' : '[LOCKED]';
    const statusClass = isUnlocked ? 'syntax-type' : 'syntax-error';
    addLine(`  <span class="syntax-string">"${achievement.id}"</span>: &#123;`);
    addLine(`    <span class="syntax-variable">name</span>: <span class="syntax-string">"${achievement.name}"</span>,`);
    addLine(
      `    <span class="syntax-variable">description</span>: <span class="syntax-string">"${achievement.description}"</span>,`
    );
    if (achievement.hint)
      addLine(
        `    <span class="syntax-variable">hint</span>: <span class="syntax-string">"${achievement.hint}"</span>,`
      );
    addLine(`    <span class="syntax-variable">status</span>: <span class="${statusClass}">"${status}"</span>,`);
    addLine(
      `    <span class="syntax-variable">points</span>: <span class="syntax-number">${achievement.points}</span>,`
    );
    addLine(`  &#125;${index < ACHIEVEMENTS.length - 1 ? ',' : ''}`);
    addLine('');
  });

  addLine('  <span class="syntax-comment">// ══════════════════════════════════════════════</span>');
  addLine(`  <span class="syntax-comment">//  TOTAL POINTS AVAILABLE: ${TOTAL_POINTS}</span>`);
  addLine(`  <span class="syntax-comment">//  YOUR SCORE: ${currentScore}</span>`);
  addLine('  <span class="syntax-comment">// ══════════════════════════════════════════════</span>');
  addLine('');
  addLine('&#125;;');
  codeBlock.innerHTML = html.trim();
}

export function unlockAchievement(achievementId: string): void {
  const unlocked = getUnlockedAchievements();
  if (unlocked.has(achievementId)) return;

  const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
  if (!achievement) return;

  unlocked.add(achievementId);
  saveUnlockedAchievements(unlocked);
  showAchievementToast(achievement);

  if (unlocked.size === ACHIEVEMENTS.length) {
    setTimeout(() => {
      showAchievementToast(
        {
          id: 'ALL_COMPLETE',
          name: 'Completionist',
          description: 'You found all the secrets! You are a true explorer.',
          points: TOTAL_POINTS,
        },
        true
      );
    }, 1000);
  }
  updateAchievementsDisplay();
}

export function checkNightOwl(): void {
  const hour = new Date().getHours();
  if (hour >= 2 && hour < 4) unlockAchievement('NIGHT_OWL');
}

export function checkTabHoarder(): void {
  const tabBar = document.getElementById('tab-bar');
  if (!tabBar) return;
  const openTabs = new Set(
    Array.from(tabBar.querySelectorAll('.tab'))
      .map((tab) => tab.getAttribute('data-file'))
      .filter(Boolean)
  );
  if (ALL_FILES.every((file) => openTabs.has(file))) {
    unlockAchievement('TAB_HOARDER');
  }
}

export function initAchievements(): void {
  checkNightOwl();
  updateAchievementsDisplay();
}
