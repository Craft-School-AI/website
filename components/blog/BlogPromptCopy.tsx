'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

type BlogPromptCopyProps = {
  /** Подпись в шапке блока, например «Шаблон рассказа» */
  label: string;
  /** Текст промпта — копируется в буфер обмена как есть */
  text: string;
};

/**
 * Блок с готовым промптом и кнопкой «Скопировать».
 * Текст показывается моноширинным, длинный промпт прокручивается внутри блока,
 * чтобы не растягивать статью на несколько экранов.
 */
export function BlogPromptCopy({ label, text }: BlogPromptCopyProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Старые браузеры и http-окружения: копируем через скрытое поле
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }

    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      aria-label={label}
      className="border-[3px] border-ink bg-surface-soft shadow-[10px_10px_0_0_rgb(var(--brand-terracotta))]"
    >
      <div className="flex items-center justify-between gap-4 border-b-[3px] border-ink px-4 py-3 sm:px-5">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-soft">
          {label}
        </p>
        <button
          type="button"
          onClick={copy}
          className={`inline-flex shrink-0 items-center gap-2 border-2 border-ink px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest transition-colors ${
            copied
              ? 'bg-green text-graphite'
              : 'bg-terracotta text-ivory hover:bg-terracotta/85'
          }`}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
          ) : (
            <Copy className="h-3.5 w-3.5" aria-hidden />
          )}
          {copied ? 'Скопировано' : 'Скопировать'}
        </button>
      </div>

      <pre className="max-h-[26rem] overflow-auto whitespace-pre-wrap bg-surface-deep p-4 font-mono text-[13px] leading-relaxed text-ink sm:p-5">
        {text}
      </pre>
    </section>
  );
}
