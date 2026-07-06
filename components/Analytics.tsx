'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

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
          className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-xl rounded-2xl border border-line bg-surface p-5 shadow-hover"
        >
          <p className="text-sm text-ink-soft">
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
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button onClick={() => choose('accepted')} className="sm:flex-1">
              Принимаю
            </Button>
            <Button
              variant="outline"
              onClick={() => choose('declined')}
              className="sm:flex-1"
            >
              Отказаться
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
