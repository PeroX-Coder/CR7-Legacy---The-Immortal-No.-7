import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, RotateCcw, Volume2, Trophy, Flame, Target, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface TargetZone {
  x: number;
  y: number;
  radius: number;
  points: number;
  label: string;
  isMoving?: boolean;
  vx?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

export const GameChallenge: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game UI State
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [goalsScored, setGoalsScored] = useState<number>(0);
  const [shotsTaken, setShotsTaken] = useState<number>(0);
  const [combo, setCombo] = useState<number>(1);
  const [power, setPower] = useState<number>(0);
  const [isCharging, setIsCharging] = useState<boolean>(false);
  const [lastNotification, setLastNotification] = useState<string | null>(null);

  // Mutable Game Loop State (refs to prevent re-rendering during 60 FPS loop)
  const playerRef = useRef({ x: 300, y: 380, speed: 4.5, angle: -Math.PI / 2 });
  const ballRef = useRef({
    x: 300,
    y: 360,
    vx: 0,
    vy: 0,
    inFlight: false,
    radius: 7,
    trail: [] as { x: number; y: number }[]
  });
  const keeperRef = useRef({
    x: 300,
    y: 110,
    width: 38,
    height: 18,
    vx: 2.2,
    diveTimer: 0
  });
  const targetZonesRef = useRef<TargetZone[]>([
    { x: 195, y: 88, radius: 18, points: 300, label: 'TOP 90' },
    { x: 405, y: 88, radius: 18, points: 300, label: 'TOP 90' },
    { x: 215, y: 130, radius: 20, points: 150, label: 'LOW POST' },
    { x: 385, y: 130, radius: 20, points: 150, label: 'LOW POST' },
    { x: 300, y: 92, radius: 16, points: 500, label: 'GOLD TARGET', isMoving: true, vx: 2.5 }
  ]);
  const particlesRef = useRef<Particle[]>([]);
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const chargingRef = useRef<boolean>(false);
  const powerRef = useRef<number>(0);
  const comboRef = useRef<number>(1);
  const scoreRef = useRef<number>(0);
  const goalsRef = useRef<number>(0);
  const shotsRef = useRef<number>(0);

  // Load High Score from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cr7_challenge_highscore');
      if (saved) setHighScore(parseInt(saved, 10));
    } catch {}
  }, []);

  // Save High Score
  const updateHighScore = (finalScore: number) => {
    if (finalScore > highScore) {
      setHighScore(finalScore);
      try {
        localStorage.setItem('cr7_challenge_highscore', finalScore.toString());
      } catch {}
    }
  };

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = true;

      // Prevent scrolling when using arrow keys or space inside the game
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        if (gameState === 'playing') e.preventDefault();
      }

      if (e.code === 'Space' && gameState === 'playing' && !ballRef.current.inFlight && !chargingRef.current) {
        chargingRef.current = true;
        setIsCharging(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;

      if (e.code === 'Space' && gameState === 'playing' && chargingRef.current) {
        triggerShot();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Mobile / Virtual Shoot Action
  const startCharge = () => {
    if (gameState === 'playing' && !ballRef.current.inFlight && !chargingRef.current) {
      chargingRef.current = true;
      setIsCharging(true);
    }
  };

  const endCharge = () => {
    if (gameState === 'playing' && chargingRef.current) {
      triggerShot();
    }
  };

  // Triggering ball shot
  const triggerShot = () => {
    chargingRef.current = false;
    setIsCharging(false);

    const shotPower = Math.max(0.3, powerRef.current);
    powerRef.current = 0;
    setPower(0);

    const player = playerRef.current;
    const ball = ballRef.current;

    // Shot aim angle towards goal net
    // Slight aim skew based on player position relative to center
    const goalTargetX = 300 + (player.x - 300) * 0.75 + (Math.random() - 0.5) * 40;
    const goalTargetY = 85 + (Math.random() - 0.5) * 20;

    const dx = goalTargetX - ball.x;
    const dy = goalTargetY - ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const speed = 12 + shotPower * 14; // Power-scaled speed
    ball.vx = (dx / distance) * speed;
    ball.vy = (dy / distance) * speed;
    ball.inFlight = true;

    shotsRef.current += 1;
    setShotsTaken(shotsRef.current);
    sound.playKick(shotPower);
  };

  // Trigger particle burst
  const triggerParticles = (x: number, y: number, color = '#E42518', count = 25) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
        size: Math.random() * 4 + 2
      });
    }
  };

  // Goal Scored Handler
  const handleGoal = (zone: TargetZone) => {
    const currentCombo = comboRef.current;
    const pts = Math.round(zone.points * currentCombo);

    scoreRef.current += pts;
    goalsRef.current += 1;
    setScore(scoreRef.current);
    setGoalsScored(goalsRef.current);

    // Increase combo up to 3x
    const newCombo = Math.min(3, +(currentCombo + 0.5).toFixed(1));
    comboRef.current = newCombo;
    setCombo(newCombo);

    setLastNotification(`GOAL! ${zone.label} +${pts} PTS! (Combo ${newCombo}x)`);
    setTimeout(() => setLastNotification(null), 1800);

    sound.playGoalCelebration();
    triggerParticles(zone.x, zone.y, '#EAB308', 35);
    triggerParticles(300, 100, '#E42518', 40);

    // Mild celebratory confetti burst
    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}

    // Reset ball back to player feet
    setTimeout(() => {
      resetBall();
    }, 400);
  };

  // Missed shot / Keeper Saved
  const handleMiss = (reason: 'saved' | 'post' | 'wide') => {
    comboRef.current = 1;
    setCombo(1);

    if (reason === 'saved') {
      sound.playKick(0.5);
      setLastNotification('SAVED BY GOALKEEPER!');
    } else if (reason === 'post') {
      sound.playPostHit();
      setLastNotification('WOODWORK! POST HIT!');
    } else {
      setLastNotification('OFF TARGET! WIDE!');
    }

    setTimeout(() => setLastNotification(null), 1400);
    setTimeout(() => {
      resetBall();
    }, 350);
  };

  const resetBall = () => {
    const ball = ballRef.current;
    const player = playerRef.current;
    ball.x = player.x;
    ball.y = player.y - 18;
    ball.vx = 0;
    ball.vy = 0;
    ball.inFlight = false;
    ball.trail = [];
  };

  // Start 60-Second Match Challenge
  const startGame = () => {
    sound.playWhistle(true);
    sound.startStadiumAtmosphere();

    scoreRef.current = 0;
    goalsRef.current = 0;
    shotsRef.current = 0;
    comboRef.current = 1;
    powerRef.current = 0;

    setScore(0);
    setGoalsScored(0);
    setShotsTaken(0);
    setCombo(1);
    setTimeLeft(60);
    setLastNotification('MATCH STARTED! SCORE AS MANY GOALS AS POSSIBLE!');

    playerRef.current.x = 300;
    playerRef.current.y = 380;
    resetBall();

    setGameState('playing');
  };

  // Main 60s Timer Loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing') {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameState('gameover');
            sound.playWhistle(true);
            updateHighScore(scoreRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  // Main 60 FPS Canvas Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const gameLoop = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Football Pitch
      drawPitch(ctx, canvas.width, canvas.height);

      // 2. Draw Target Zones in Goal
      drawTargets(ctx);

      // 3. Draw Goalkeeper
      drawGoalkeeper(ctx);

      // 4. Update and Draw Particles
      updateParticles(ctx);

      if (gameState === 'playing') {
        // Handle Player Movement
        updatePlayer();

        // Charge power if charging
        if (chargingRef.current) {
          powerRef.current = Math.min(1, powerRef.current + 0.035);
          setPower(powerRef.current);
        }

        // Update Ball Physics
        updateBall();

        // Update Moving Targets & Goalkeeper AI
        updateKeeper();
      }

      // 5. Draw Player & Ball
      drawPlayer(ctx);
      drawBall(ctx);

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [gameState]);

  // Update Player coordinates
  const updatePlayer = () => {
    const player = playerRef.current;
    const speed = player.speed;

    if (keysPressed.current['KeyA'] || keysPressed.current['ArrowLeft']) {
      player.x = Math.max(120, player.x - speed);
    }
    if (keysPressed.current['KeyD'] || keysPressed.current['ArrowRight']) {
      player.x = Math.min(480, player.x + speed);
    }
    if (keysPressed.current['KeyW'] || keysPressed.current['ArrowUp']) {
      player.y = Math.max(300, player.y - speed);
    }
    if (keysPressed.current['KeyS'] || keysPressed.current['ArrowDown']) {
      player.y = Math.min(430, player.y + speed);
    }

    // Keep ball with player if not in flight
    if (!ballRef.current.inFlight) {
      ballRef.current.x = player.x;
      ballRef.current.y = player.y - 18;
    }
  };

  // Update Goalkeeper lateral movement
  const updateKeeper = () => {
    const keeper = keeperRef.current;
    keeper.x += keeper.vx;

    // Bounce off goal posts
    if (keeper.x <= 220 || keeper.x >= 380) {
      keeper.vx = -keeper.vx;
    }

    // Update moving gold target
    targetZonesRef.current.forEach((tz) => {
      if (tz.isMoving && tz.vx) {
        tz.x += tz.vx;
        if (tz.x <= 220 || tz.x >= 380) {
          tz.vx = -tz.vx;
        }
      }
    });
  };

  // Update Ball & Collision Detection
  const updateBall = () => {
    const ball = ballRef.current;
    if (!ball.inFlight) return;

    ball.x += ball.vx;
    ball.y += ball.vy;

    // Trail effect
    ball.trail.push({ x: ball.x, y: ball.y });
    if (ball.trail.length > 8) ball.trail.shift();

    // Check collision with goal line area (Y <= 100)
    if (ball.y <= 95) {
      // Check Goalkeeper Save
      const keeper = keeperRef.current;
      const isSaved =
        ball.x >= keeper.x - keeper.width / 2 &&
        ball.x <= keeper.x + keeper.width / 2 &&
        Math.abs(ball.y - keeper.y) < 20;

      if (isSaved) {
        ball.inFlight = false;
        handleMiss('saved');
        return;
      }

      // Check Target Zones Collision
      let hitZone: TargetZone | null = null;
      for (const zone of targetZonesRef.current) {
        const dist = Math.hypot(ball.x - zone.x, ball.y - zone.y);
        if (dist <= zone.radius + ball.radius) {
          hitZone = zone;
          break;
        }
      }

      if (hitZone) {
        ball.inFlight = false;
        handleGoal(hitZone);
      } else if (ball.x >= 180 && ball.x <= 420) {
        // Goal inside net even if not direct center of target!
        ball.inFlight = false;
        handleGoal({ x: ball.x, y: ball.y, points: 100, label: 'GOAL' } as TargetZone);
      } else if (ball.x >= 170 && ball.x <= 430) {
        ball.inFlight = false;
        handleMiss('post');
      } else {
        ball.inFlight = false;
        handleMiss('wide');
      }
    }

    // Out of bounds check
    if (ball.y < 30 || ball.x < 50 || ball.x > 550) {
      ball.inFlight = false;
      handleMiss('wide');
    }
  };

  // Draw Football Pitch Canvas
  const drawPitch = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Grass stripes (Dark green stadium lawn)
    const stripeHeight = 45;
    for (let y = 0; y < height; y += stripeHeight) {
      ctx.fillStyle = (y / stripeHeight) % 2 === 0 ? '#0b381a' : '#0d401e';
      ctx.fillRect(0, y, width, stripeHeight);
    }

    // Pitch Line Markings
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2.5;

    // Goal Box (6-yard area)
    ctx.strokeRect(210, 60, 180, 50);

    // Penalty Area (18-yard box)
    ctx.strokeRect(140, 60, 320, 150);

    // Penalty Spot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(300, 240, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Penalty Arc
    ctx.beginPath();
    ctx.arc(300, 240, 48, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.stroke();

    // Goal Frame / Net
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.strokeRect(180, 45, 240, 35);

    // Net Crosshatch
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 1;
    for (let nx = 185; nx < 420; nx += 12) {
      ctx.beginPath();
      ctx.moveTo(nx, 45);
      ctx.lineTo(nx, 80);
      ctx.stroke();
    }
    for (let ny = 45; ny <= 80; ny += 8) {
      ctx.beginPath();
      ctx.moveTo(180, ny);
      ctx.lineTo(420, ny);
      ctx.stroke();
    }
  };

  // Draw Goal Target Zones
  const drawTargets = (ctx: CanvasRenderingContext2D) => {
    targetZonesRef.current.forEach((tz) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(tz.x, tz.y, tz.radius, 0, Math.PI * 2);

      if (tz.isMoving) {
        ctx.fillStyle = 'rgba(234, 179, 8, 0.35)';
        ctx.strokeStyle = '#EAB308';
        ctx.lineWidth = 2.5;
      } else {
        ctx.fillStyle = 'rgba(228, 37, 24, 0.25)';
        ctx.strokeStyle = '#E42518';
        ctx.lineWidth = 2;
      }
      ctx.fill();
      ctx.stroke();

      // Center Bullseye
      ctx.beginPath();
      ctx.arc(tz.x, tz.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = tz.isMoving ? '#FFF' : '#E42518';
      ctx.fill();

      // Label
      ctx.font = 'bold 9px Montserrat, sans-serif';
      ctx.fillStyle = '#FFF';
      ctx.textAlign = 'center';
      ctx.fillText(`+${tz.points}`, tz.x, tz.y + 14);
      ctx.restore();
    });
  };

  // Draw Goalkeeper
  const drawGoalkeeper = (ctx: CanvasRenderingContext2D) => {
    const k = keeperRef.current;
    ctx.save();
    ctx.fillStyle = '#10b981'; // Goalkeeper neon green jersey
    ctx.strokeStyle = '#047857';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(k.x - k.width / 2, k.y - k.height / 2, k.width, k.height, 6);
    ctx.fill();
    ctx.stroke();

    // Keeper Gloves
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(k.x - k.width / 2 - 5, k.y - 4, 5, 8);
    ctx.fillRect(k.x + k.width / 2, k.y - 4, 5, 8);

    // Number 1 text
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GK', k.x, k.y + 4);
    ctx.restore();
  };

  // Draw Player (CR7 Portugal #7)
  const drawPlayer = (ctx: CanvasRenderingContext2D) => {
    const p = playerRef.current;
    ctx.save();

    // Player Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(p.x, p.y + 10, 16, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Portugal Red Jersey Body
    ctx.fillStyle = '#E42518';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Head
    ctx.fillStyle = '#fbcfe8';
    ctx.beginPath();
    ctx.arc(p.x, p.y - 6, 6, 0, Math.PI * 2);
    ctx.fill();

    // Dark Hair
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.arc(p.x, p.y - 8, 5, Math.PI, 0);
    ctx.fill();

    // Iconic Number 7 on Back
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px Bebas Neue, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('7', p.x, p.y + 4);

    // Aim Guide Line when preparing to shoot
    if (!ballRef.current.inFlight && gameState === 'playing') {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - 20);
      ctx.lineTo(p.x, 90);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.restore();
  };

  // Draw Ball & Knuckleball trail
  const drawBall = (ctx: CanvasRenderingContext2D) => {
    const b = ballRef.current;
    ctx.save();

    // Ball Trail
    if (b.inFlight && b.trail.length > 1) {
      for (let i = 0; i < b.trail.length; i++) {
        const pt = b.trail[i];
        ctx.fillStyle = `rgba(255, 255, 255, ${(i / b.trail.length) * 0.35})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, b.radius * (i / b.trail.length), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Ball Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.beginPath();
    ctx.ellipse(b.x, b.y + 4, b.radius, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ball Sphere
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Ball pentagon pattern
    ctx.fillStyle = '#111827';
    ctx.beginPath();
    ctx.arc(b.x, b.y, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  // Update Particles
  const updateParticles = (ctx: CanvasRenderingContext2D) => {
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      const p = particlesRef.current[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.025;

      if (p.alpha <= 0) {
        particlesRef.current.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };

  // Directional virtual pad handlers for mobile
  const moveDirection = (dir: 'up' | 'down' | 'left' | 'right') => {
    if (gameState !== 'playing') return;
    const player = playerRef.current;
    if (dir === 'left') player.x = Math.max(120, player.x - 20);
    if (dir === 'right') player.x = Math.min(480, player.x + 20);
    if (dir === 'up') player.y = Math.max(300, player.y - 20);
    if (dir === 'down') player.y = Math.min(430, player.y + 20);
    if (!ballRef.current.inFlight) {
      ballRef.current.x = player.x;
      ballRef.current.y = player.y - 18;
    }
  };

  const getRank = (scoreVal: number) => {
    if (scoreVal >= 3500) return { title: 'IMMORTAL NO. 7', color: 'text-amber-400' };
    if (scoreVal >= 2200) return { title: 'MASTER STRIKER', color: 'text-red-400' };
    if (scoreVal >= 1200) return { title: 'SELEÇÃO PRO', color: 'text-emerald-400' };
    return { title: 'PROMISING PRODIGY', color: 'text-zinc-300' };
  };

  return (
    <section id="challenge" className="relative py-20 bg-[#07070b] overflow-hidden border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-950/50 border border-red-500/30 text-red-400 text-xs font-bold tracking-widest uppercase mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>PLAYABLE FOOTBALL CHALLENGE</span>
          </div>
          <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl tracking-wider text-white">
            THE <span className="text-red-500">NO. 7</span> CHALLENGE
          </h2>
          <p className="mt-2 text-zinc-400 text-sm">
            Control Cristiano Ronaldo on the pitch. Reposition, charge power, time your strike, and beat the goalkeeper!
          </p>
        </div>

        {/* Game Main Stage */}
        <div className="relative max-w-[620px] mx-auto rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-4 sm:p-6 overflow-hidden">
          {/* Top Status Cluster Bar */}
          <div className="grid grid-cols-4 gap-2 mb-4 text-center">
            <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <div className="text-[10px] text-zinc-400 font-semibold uppercase">Time Left</div>
              <div
                className={`font-bebas text-2xl tracking-wider ${
                  timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-white'
                }`}
              >
                {timeLeft}s
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <div className="text-[10px] text-zinc-400 font-semibold uppercase">Score</div>
              <div className="font-bebas text-2xl tracking-wider text-amber-400">{score}</div>
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <div className="text-[10px] text-zinc-400 font-semibold uppercase">Goals / Shots</div>
              <div className="font-bebas text-2xl tracking-wider text-white">
                {goalsScored} / {shotsTaken}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <div className="text-[10px] text-zinc-400 font-semibold uppercase">Combo</div>
              <div className="font-bebas text-2xl tracking-wider text-red-400">
                {combo > 1 ? `${combo}x 🔥` : '1.0x'}
              </div>
            </div>
          </div>

          {/* Interactive In-Game Notification Banner */}
          {lastNotification && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 px-5 py-2 rounded-xl bg-red-600/90 text-white font-bebas text-lg tracking-widest shadow-2xl animate-bounce backdrop-blur-md border border-white/20">
              {lastNotification}
            </div>
          )}

          {/* Canvas Viewport */}
          <div className="relative rounded-xl overflow-hidden border border-zinc-800/80 shadow-inner flex justify-center bg-[#072410]">
            <canvas
              ref={canvasRef}
              width={600}
              height={450}
              className="w-full max-w-[600px] h-auto aspect-[4/3] touch-none block"
            />

            {/* Title / Idle Screen Overlay */}
            {gameState === 'idle' && (
              <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
                <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center mb-4">
                  <Flame className="w-8 h-8 text-red-500 animate-pulse" />
                </div>
                <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-widest">
                  THE NO. 7 SKILL CHALLENGE
                </h3>
                <p className="mt-2 text-zinc-400 text-xs sm:text-sm max-w-sm">
                  You have 60 seconds. WASD / Arrows to reposition, Spacebar to charge & strike. Beat the keeper and hit top bins!
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs text-zinc-400 font-mono">
                  <span>🏆 HIGH SCORE: {highScore} PTS</span>
                </div>

                <button
                  onClick={startGame}
                  className="mt-6 px-8 py-3.5 rounded-full bg-gradient-to-r from-red-600 to-red-800 text-white font-bebas text-xl tracking-widest uppercase hover:brightness-110 shadow-xl shadow-red-900/50 cursor-pointer flex items-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>START 60-SEC MATCH</span>
                </button>
              </div>
            )}

            {/* Game Over Screen Overlay */}
            {gameState === 'gameover' && (
              <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
                <div className="text-xs font-bold text-red-400 tracking-widest uppercase mb-1">FINAL WHISTLE</div>
                <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide">
                  MATCH CONCLUDED
                </h3>

                <div className="my-4 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 w-full max-w-xs space-y-2 text-left">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Final Score:</span>
                    <span className="font-bebas text-lg text-amber-400 font-bold">{score} PTS</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Goals Scored:</span>
                    <span className="font-bold text-white">{goalsScored} / {shotsTaken}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Shot Accuracy:</span>
                    <span className="font-bold text-emerald-400">
                      {shotsTaken > 0 ? Math.round((goalsScored / shotsTaken) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between text-xs pt-1 border-t border-zinc-800">
                    <span className="text-zinc-400">Legacy Rank:</span>
                    <span className={`font-bebas text-sm font-bold tracking-wider ${getRank(score).color}`}>
                      {getRank(score).title}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={startGame}
                    className="px-6 py-3 rounded-full bg-red-600 text-white font-bebas text-lg tracking-widest uppercase hover:bg-red-500 shadow-lg shadow-red-900/50 cursor-pointer flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>PLAY AGAIN</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Shooting Power Meter (Real-Time Visual) */}
          <div className="mt-4 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              <span>Shot Power Gauge</span>
              <span className={power > 0.8 ? 'text-red-400 font-bold' : 'text-zinc-400'}>
                {Math.round(power * 100)}% {power > 0.8 && '⚡ MAXIMUM POWER'}
              </span>
            </div>
            <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-zinc-800">
              <div
                className={`h-full rounded-full transition-all duration-75 ${
                  power > 0.75
                    ? 'bg-gradient-to-r from-yellow-500 to-red-600'
                    : 'bg-gradient-to-r from-emerald-500 to-yellow-500'
                }`}
                style={{ width: `${Math.max(5, power * 100)}%` }}
              />
            </div>
          </div>

          {/* Mobile / Touch Responsive Controls */}
          <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* D-Pad on Left */}
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => moveDirection('up')}
                className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center active:bg-red-600 active:text-white"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => moveDirection('left')}
                  className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center active:bg-red-600 active:text-white"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveDirection('down')}
                  className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center active:bg-red-600 active:text-white"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveDirection('right')}
                  className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center active:bg-red-600 active:text-white"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile / Touch Hold to Shoot Button */}
            <div className="flex-1 w-full sm:w-auto">
              <button
                onMouseDown={startCharge}
                onMouseUp={endCharge}
                onTouchStart={startCharge}
                onTouchEnd={endCharge}
                disabled={gameState !== 'playing'}
                className={`w-full py-4 rounded-xl font-bebas text-xl tracking-widest uppercase transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 select-none ${
                  isCharging
                    ? 'bg-red-600 scale-95 shadow-xl shadow-red-600/50 text-white'
                    : 'bg-gradient-to-r from-red-700 to-red-950 text-white hover:brightness-110 border border-red-500/30'
                }`}
              >
                <Target className="w-5 h-5 text-amber-300" />
                <span>{isCharging ? 'HOLDING POWER... RELEASE TO STRIKE!' : 'HOLD TO SHOOT (SPACEBAR)'}</span>
              </button>
              <p className="text-[11px] text-zinc-500 text-center mt-1 font-mono">
                Keyboard: WASD / Arrows to Move · Hold Spacebar to Strike
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
