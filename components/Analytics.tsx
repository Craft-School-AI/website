'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'craft-school-cookie-consent';

type Consent = 'accepted' | 'declined' | null;

/**
 * Яндекс.Метрика + баннер согласия на cookie.
 *
 * Компонент монтируется только если задана переменная YANDEX_METRIKA_ID
 * (см. app/layout.tsx). Сам счётчик загружается только после того, как
 * посетитель нажал «Принимаю» — до согласия никакие cookie аналитики
 * не ставятся, как того требует практика Роскомнадзора по 152-ФЗ.
 * Выбор запоминается в localStorage и повторно баннер не показывается.
 */
export function Analytics({ metrikaId }: { metrikaId: string }) {
  const [consent, setConsent] = useState<Consent>(null);
  // Баннер рисуем только после гидратации, чтобы не разъезжались
  // серверный и клиентский HTML
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'accepted' || stored === 'declined') {
      setConsent(stored);
    }
    setMounted(true);
  }, []);

  const choose = (value: Exclude<Consent, null>) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // приватный режим — выбор проживёт до конца сессии
    }
    setConsent(value);
  };

  return (
    <>
      {consent === 'accepted' && (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${metrikaId}', 'ym');

            ym(${metrikaId}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
          `}
        </Script>
      )}

      {mounted && consent === null && (
        <div
          role="dialog"
          aria-label="Согласие на использование cookie"
          className="fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-surface/95 backdrop-blur-md"
        >
          <div className="container-page flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-soft sm:max-w-3xl">
              Мы используем cookie и Яндекс.Метрику, чтобы понимать, как
              посетители пользуются сайтом, и делать его удобнее. Если
              откажетесь — сайт продолжит работать как обычно, просто без
              аналитики. Подробнее — в{' '}
              <Link
                href="/privacy"
                className="text-terracotta underline underline-offset-2 hover:no-underline"
              >
                Политике конфиденциальности
              </Link>
              .
            </p>
            {/* Нейтральные кнопки — намеренно не как CTA в Hero (без зелёных/
                терракотовых пилюль): тёмная сплошная + текстовая */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => choose('declined')}
                className="rounded-lg px-4 py-2 text-sm font-medium text-ink-soft underline underline-offset-4 transition-colors hover:text-ink"
              >
                Отказаться
              </button>
              <button
                type="button"
                onClick={() => choose('accepted')}
                className="rounded-lg bg-ink px-5 py-2 text-sm font-semibold text-surface transition-opacity hover:opacity-90"
              >
                Принимаю
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
