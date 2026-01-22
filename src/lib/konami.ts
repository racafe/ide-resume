/**
 * Konami Code Easter Egg - Snake Game
 * Detects the Konami code sequence and launches a Snake game modal
 */

/** Konami Code sequence: Up Up Down Down Left Right Left Right B A */
export const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

/** Game configuration */
const GRID_SIZE = 20;
const TILE_COUNT = 20;
const GAME_SPEED = 100; // ms per frame

/** Snake game state */
interface GameState {
  running: boolean;
  loop: number | null;
  snake: { x: number; y: number }[];
  food: { x: number; y: number };
  direction: { x: number; y: number };
  nextDirection: { x: number; y: number };
  score: number;
  highScore: number;
  lastTime: number;
}

/** Konami code detection state */
interface KonamiState {
  index: number;
  achievementTriggered: boolean;
}

let gameState: GameState;
let konamiState: KonamiState;
let gameElements: {
  modal: HTMLElement | null;
  canvas: HTMLCanvasElement | null;
  overlay: HTMLElement | null;
  message: HTMLElement | null;
  scoreEl: HTMLElement | null;
  highScoreEl: HTMLElement | null;
  closeBtn: HTMLElement | null;
  backdrop: Element | null;
};

/** Callback for achievement unlocking */
let onAchievementUnlock: ((achievementId: string) => void) | null = null;

/**
 * Initialize the Konami code listener and game
 */
export function initKonami(achievementCallback?: (achievementId: string) => void): void {
  onAchievementUnlock = achievementCallback || null;

  // Initialize state
  konamiState = {
    index: 0,
    achievementTriggered: false,
  };

  gameState = {
    running: false,
    loop: null,
    snake: [],
    food: { x: 0, y: 0 },
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    score: 0,
    highScore: parseInt(localStorage.getItem('snakeHighScore') || '0', 10),
    lastTime: 0,
  };

  // Get game elements
  gameElements = {
    modal: document.getElementById('game-modal'),
    canvas: document.getElementById('game-canvas') as HTMLCanvasElement | null,
    overlay: document.getElementById('game-overlay'),
    message: document.getElementById('game-message'),
    scoreEl: document.getElementById('game-score'),
    highScoreEl: document.getElementById('game-high-score'),
    closeBtn: document.getElementById('game-close'),
    backdrop: document.getElementById('game-modal')?.querySelector('.game-modal-backdrop') || null,
  };

  // Update high score display on load
  if (gameElements.highScoreEl) {
    gameElements.highScoreEl.textContent = String(gameState.highScore);
  }

  // Set up event listeners
  document.addEventListener('keydown', handleKeyDown);
  gameElements.closeBtn?.addEventListener('click', closeGame);
  gameElements.backdrop?.addEventListener('click', closeGame);
}

/**
 * Handle keydown events for Konami code detection and game controls
 */
function handleKeyDown(e: KeyboardEvent): void {
  // Don't trigger if typing in an input
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
    return;
  }

  // Check for Konami code when game modal is hidden
  if (!gameElements.modal || gameElements.modal.classList.contains('hidden')) {
    if (e.code === KONAMI_CODE[konamiState.index]) {
      konamiState.index++;
      if (konamiState.index === KONAMI_CODE.length) {
        konamiState.index = 0;
        openGame();
        // Unlock KONAMI_MASTER achievement
        if (!konamiState.achievementTriggered && onAchievementUnlock) {
          konamiState.achievementTriggered = true;
          setTimeout(() => {
            onAchievementUnlock?.('KONAMI_MASTER');
          }, 500);
        }
      }
    } else {
      konamiState.index = 0;
    }
    return;
  }

  // Game controls when modal is open
  if (e.key === 'Escape') {
    closeGame();
    return;
  }

  if (e.code === 'Space') {
    e.preventDefault();
    if (!gameState.running) {
      if (gameState.snake.length === 1 || !gameElements.overlay?.classList.contains('hidden')) {
        resetGame();
        startGame();
      }
    }
    return;
  }

  // Arrow keys for direction
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault();
    if (!gameState.running) return;

    switch (e.key) {
      case 'ArrowUp':
        if (gameState.direction.y !== 1) gameState.nextDirection = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
        if (gameState.direction.y !== -1) gameState.nextDirection = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
        if (gameState.direction.x !== 1) gameState.nextDirection = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
        if (gameState.direction.x !== -1) gameState.nextDirection = { x: 1, y: 0 };
        break;
    }
  }
}

/**
 * Open the game modal
 */
export function openGame(): void {
  gameElements.modal?.classList.remove('hidden');
  document.body.classList.add('game-modal-open');
  resetGame();
}

/**
 * Close the game modal
 */
export function closeGame(): void {
  gameElements.modal?.classList.add('hidden');
  document.body.classList.remove('game-modal-open');
  if (gameState.loop !== null) {
    cancelAnimationFrame(gameState.loop);
    gameState.loop = null;
  }
  gameState.running = false;
}

/**
 * Reset the game state
 */
function resetGame(): void {
  gameState.snake = [{ x: 10, y: 10 }];
  gameState.direction = { x: 1, y: 0 };
  gameState.nextDirection = { x: 1, y: 0 };
  gameState.score = 0;
  if (gameElements.scoreEl) gameElements.scoreEl.textContent = '0';
  spawnFood();
  gameElements.overlay?.classList.remove('hidden');
  if (gameElements.message) gameElements.message.textContent = 'Press SPACE to start';
  gameState.running = false;
  if (gameState.loop !== null) {
    cancelAnimationFrame(gameState.loop);
    gameState.loop = null;
  }
  drawGame();
}

/**
 * Spawn food at a random valid position
 */
function spawnFood(): void {
  let validPosition = false;
  while (!validPosition) {
    gameState.food = {
      x: Math.floor(Math.random() * TILE_COUNT),
      y: Math.floor(Math.random() * TILE_COUNT),
    };
    validPosition = !gameState.snake.some(
      (segment) => segment.x === gameState.food.x && segment.y === gameState.food.y
    );
  }
}

/**
 * Draw the game on the canvas
 */
function drawGame(): void {
  if (!gameElements.canvas) return;
  const ctx = gameElements.canvas.getContext('2d');
  if (!ctx) return;

  // Clear canvas with dark background
  ctx.fillStyle = '#1e1e1e';
  ctx.fillRect(0, 0, gameElements.canvas.width, gameElements.canvas.height);

  // Draw grid lines (subtle)
  ctx.strokeStyle = '#2d2d2d';
  ctx.lineWidth = 1;
  for (let i = 0; i <= TILE_COUNT; i++) {
    ctx.beginPath();
    ctx.moveTo(i * GRID_SIZE, 0);
    ctx.lineTo(i * GRID_SIZE, gameElements.canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * GRID_SIZE);
    ctx.lineTo(gameElements.canvas.width, i * GRID_SIZE);
    ctx.stroke();
  }

  // Draw food (VS Code accent color)
  ctx.fillStyle = '#ce9178'; // ide-string color
  ctx.beginPath();
  ctx.arc(
    gameState.food.x * GRID_SIZE + GRID_SIZE / 2,
    gameState.food.y * GRID_SIZE + GRID_SIZE / 2,
    GRID_SIZE / 2 - 2,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Draw snake
  gameState.snake.forEach((segment, index) => {
    // Head is brighter
    if (index === 0) {
      ctx.fillStyle = '#4ec9b0'; // ide-type/success color
    } else {
      ctx.fillStyle = '#007acc'; // ide-accent color
    }
    ctx.fillRect(segment.x * GRID_SIZE + 1, segment.y * GRID_SIZE + 1, GRID_SIZE - 2, GRID_SIZE - 2);
  });
}

/**
 * Update game state
 */
function updateGame(): void {
  if (!gameState.running) return;

  // Apply next direction
  gameState.direction = gameState.nextDirection;

  // Move snake
  const head = {
    x: gameState.snake[0].x + gameState.direction.x,
    y: gameState.snake[0].y + gameState.direction.y,
  };

  // Check wall collision
  if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
    gameOver();
    return;
  }

  // Check self collision
  if (gameState.snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
    gameOver();
    return;
  }

  gameState.snake.unshift(head);

  // Check food collision
  if (head.x === gameState.food.x && head.y === gameState.food.y) {
    gameState.score += 10;
    if (gameElements.scoreEl) gameElements.scoreEl.textContent = String(gameState.score);
    if (gameState.score > gameState.highScore) {
      gameState.highScore = gameState.score;
      localStorage.setItem('snakeHighScore', String(gameState.highScore));
      if (gameElements.highScoreEl) gameElements.highScoreEl.textContent = String(gameState.highScore);
    }
    spawnFood();
  } else {
    gameState.snake.pop();
  }

  drawGame();
}

/**
 * Handle game over
 */
function gameOver(): void {
  gameState.running = false;
  if (gameState.loop !== null) {
    cancelAnimationFrame(gameState.loop);
    gameState.loop = null;
  }
  gameElements.overlay?.classList.remove('hidden');
  if (gameElements.message) {
    gameElements.message.innerHTML = `Game Over!<br><span class="syntax-comment">Score: ${gameState.score}</span><br><span class="text-ide-textMuted text-sm">Press SPACE to retry</span>`;
  }
}

/**
 * Game step for animation loop
 */
function gameStep(timestamp: number): void {
  if (!gameState.running) return;

  if (timestamp - gameState.lastTime >= GAME_SPEED) {
    gameState.lastTime = timestamp;
    updateGame();
  }

  gameState.loop = requestAnimationFrame(gameStep);
}

/**
 * Start the game
 */
function startGame(): void {
  if (gameState.running) return;
  gameState.running = true;
  gameElements.overlay?.classList.add('hidden');
  gameState.lastTime = performance.now();
  gameState.loop = requestAnimationFrame(gameStep);
}
