import { useEffect, useState } from 'react';

const STORAGE_KEY = 'motocross-lap-timer';

function createInitialTimer() {
  return {
    racerName: '',
    elapsedMs: 0,
    startedAt: null,
    laps: [],
  };
}

function loadTimer() {
  try {
    const savedTimer = localStorage.getItem(STORAGE_KEY);
    if (!savedTimer) return { timer: createInitialTimer(), error: '' };

    const timer = JSON.parse(savedTimer);
    const isValidTimer =
      typeof timer.racerName === 'string' &&
      Number.isFinite(timer.elapsedMs) &&
      timer.elapsedMs >= 0 &&
      (timer.startedAt === null ||
        (Number.isFinite(timer.startedAt) && timer.startedAt > 0)) &&
      Array.isArray(timer.laps) &&
      timer.laps.every(
        (lap) =>
          Number.isFinite(lap.elapsedMs) &&
          lap.elapsedMs >= 0 &&
          Number.isFinite(lap.splitMs) &&
          lap.splitMs >= 0,
      );

    if (!isValidTimer) {
      return {
        timer: createInitialTimer(),
        error: 'Saved timer data was invalid, so a new timer was started.',
      };
    }

    return { timer, error: '' };
  } catch {
    return {
      timer: createInitialTimer(),
      error: 'Could not load the saved timer. A new timer was started.',
    };
  }
}

function getElapsedMs(timer, now) {
  return timer.elapsedMs + (timer.startedAt === null ? 0 : now - timer.startedAt);
}

function formatTime(milliseconds) {
  const totalHundredths = Math.floor(milliseconds / 10);
  const hundredths = totalHundredths % 100;
  const totalSeconds = Math.floor(totalHundredths / 100);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(hundredths).padStart(2, '0')}`;
}

export default function LapTimerApp() {
  const [initialState] = useState(loadTimer);
  const [timer, setTimer] = useState(initialState.timer);
  const [storageError, setStorageError] = useState(initialState.error);
  const [now, setNow] = useState(() => Date.now());
  const isRunning = timer.startedAt !== null;
  const elapsedMs = getElapsedMs(timer, now);

  useEffect(() => {
    if (!isRunning) return undefined;

    const intervalId = window.setInterval(() => setNow(Date.now()), 50);
    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  const updateTimer = (nextTimer) => {
    setTimer(nextTimer);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTimer));
      setStorageError('');
    } catch {
      setStorageError('Could not save your timer in this browser.');
    }
  };

  const handleStartPause = () => {
    const currentTime = Date.now();
    setNow(currentTime);

    if (isRunning) {
      updateTimer({
        ...timer,
        elapsedMs: getElapsedMs(timer, currentTime),
        startedAt: null,
      });
      return;
    }

    updateTimer({ ...timer, startedAt: currentTime });
  };

  const handleLap = () => {
    const currentTime = Date.now();
    setNow(currentTime);
    const currentElapsed = getElapsedMs(timer, currentTime);
    const lastLapElapsed = timer.laps.at(-1)?.elapsedMs ?? 0;

    updateTimer({
      ...timer,
      laps: [
        ...timer.laps,
        {
          elapsedMs: currentElapsed,
          splitMs: currentElapsed - lastLapElapsed,
        },
      ],
    });
  };

  const handleReset = () => {
    setNow(Date.now());
    updateTimer({
      ...createInitialTimer(),
      racerName: timer.racerName,
    });
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 font-sans text-slate-900">
      <section className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <header className="bg-slate-900 px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <span className="text-3xl" aria-hidden="true">🏍️💨</span>
            <div>
              <h1 className="text-xl font-bold">Motocross Lap Timer</h1>
              <p className="mt-1 text-sm text-slate-300">
                Your timer and laps are saved on this device.
              </p>
            </div>
          </div>
        </header>

        <div className="space-y-6 p-6">
          <div>
            <label
              htmlFor="racer-name"
              className="mb-1 block text-xs font-bold uppercase text-slate-600"
            >
              Racer&apos;s name
            </label>
            <input
              id="racer-name"
              type="text"
              placeholder="e.g. Ace"
              value={timer.racerName}
              onChange={(event) =>
                updateTimer({
                  ...timer,
                  racerName: event.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <section
            className="rounded-xl bg-slate-950 px-4 py-6 text-center text-white"
            aria-label="Lap timer"
          >
            <p className="text-sm font-semibold text-slate-300">
              {timer.racerName.trim() || 'Ready to ride'}
            </p>
            <p className="mt-2 font-mono text-5xl font-bold tabular-nums tracking-tight">
              {formatTime(elapsedMs)}
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-slate-400">
              {isRunning ? 'Timer running' : 'Timer paused'}
            </p>
          </section>

          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={handleStartPause}
              className={`rounded-lg px-3 py-3 text-sm font-bold text-white transition ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button
              type="button"
              onClick={handleLap}
              disabled={!isRunning}
              className="rounded-lg bg-sky-600 px-3 py-3 text-sm font-bold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Lap
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={elapsedMs === 0 && timer.laps.length === 0 && !isRunning}
              className="rounded-lg bg-slate-200 px-3 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Reset
            </button>
          </div>

          {storageError && (
            <p role="alert" className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
              {storageError}
            </p>
          )}

          <section aria-labelledby="laps-heading">
            <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 id="laps-heading" className="font-bold">Lap times</h2>
              <span className="text-xs text-slate-500">{timer.laps.length} laps</span>
            </div>
            {timer.laps.length === 0 ? (
              <p className="py-2 text-sm text-slate-500">
                Start the timer, then tap Lap to record a lap.
              </p>
            ) : (
              <ol className="max-h-64 divide-y divide-slate-100 overflow-y-auto">
                {timer.laps
                  .map((lap, index) => ({ ...lap, number: index + 1 }))
                  .reverse()
                  .map((lap) => (
                    <li
                      key={lap.number}
                      className="flex items-center justify-between py-3 text-sm"
                    >
                      <span className="font-semibold text-slate-700">Lap {lap.number}</span>
                      <span className="flex gap-4 font-mono tabular-nums">
                        <span className="text-slate-500">{formatTime(lap.splitMs)}</span>
                        <span className="font-bold text-slate-900">
                          {formatTime(lap.elapsedMs)}
                        </span>
                      </span>
                    </li>
                  ))}
              </ol>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
