'use client';

import { useEffect, useState } from 'react';
import { Check, RotateCcw } from 'lucide-react';

type BlogChecklistProps = {
  /** Уникальный ключ статьи — под ним состояние хранится в localStorage */
  id: string;
  items: string[];
};

/**
 * Чеклист подготовки с сохранением в localStorage.
 * SSR и первый клиентский рендер отдают все пункты невыбранными (совпадают),
 * а сохранённое состояние подтягиваем уже после монтирования — без рассинхрона.
 */
export function BlogChecklist({ id, items }: BlogChecklistProps) {
  const storageKey = `craft-checklist:${id}`;
  const [checked, setChecked] = useState<boolean[]>(() =>
    items.map(() => false),
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (Array.isArray(saved)) {
        setChecked(items.map((_, i) => Boolean(saved[i])));
      }
    } catch {
      // localStorage может быть недоступен (приватный режим) — просто игнорируем
    }
  }, [storageKey, items]);

  const persist = (next: boolean[]) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // тихо игнорируем — чеклист продолжит работать в рамках сессии
    }
  };

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = prev.map((value, i) => (i === index ? !value : value));
      persist(next);
      return next;
    });
  };

  const reset = () => {
    const next = items.map(() => false);
    setChecked(next);
    persist(next);
  };

  const done = checked.filter(Boolean).length;
  const total = items.length;
  const allDone = done === total;
  const progress = total ? Math.round((done / total) * 100) : 0;

  return (
    <section
      aria-label="Чеклист подготовки"
      className="border-[3px] border-ink bg-surface-soft p-6 shadow-[10px_10px_0_0_rgb(var(--brand-terracotta))]"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="heading-md">Чеклист подготовки</h2>
        <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-ink-soft">
          {done} из {total}
        </span>
      </div>

      {/* Полоса прогресса */}
      <div
        className="mt-4 h-3 overflow-hidden border-2 border-ink bg-surface"
        role="progressbar"
        aria-valuenow={done}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        <div
          className={`h-full transition-all duration-300 ${
            allDone ? 'bg-green' : 'bg-terracotta'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <ul className="mt-5 space-y-1">
        {items.map((item, index) => {
          const isChecked = checked[index];
          return (
            <li key={index}>
              <label className="flex cursor-pointer items-center gap-3 px-2 py-2 transition-colors hover:bg-surface/70">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isChecked}
                  onChange={() => toggle(index)}
                />
                <span
                  aria-hidden
                  className={`flex h-6 w-6 shrink-0 items-center justify-center border-2 border-ink transition-colors ${
                    isChecked ? 'bg-green text-graphite' : 'bg-surface'
                  }`}
                >
                  {isChecked && <Check className="h-4 w-4" strokeWidth={3} />}
                </span>
                <span
                  className={`text-base transition-colors ${
                    isChecked
                      ? 'text-ink-faint line-through'
                      : 'text-ink-soft'
                  }`}
                >
                  {item}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex min-h-[1.5rem] items-center justify-between gap-4">
        <p
          className={`text-sm font-medium text-green transition-opacity ${
            allDone ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={!allDone}
        >
          Всё готово, увидимся на занятии.
        </p>
        {done > 0 && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex shrink-0 items-center gap-1.5 text-sm text-ink-faint transition-colors hover:text-terracotta"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            Сбросить
          </button>
        )}
      </div>
    </section>
  );
}
