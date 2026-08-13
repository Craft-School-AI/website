'use client';

import { useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import Image from 'next/image';
import { Check, Lock, CalendarDays, Clock, Hourglass } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { LeadForm } from '@/components/LeadForm';
import { AskMaster } from '@/components/AskMaster';
import type { Cohort } from '@/lib/cohorts';

type ScheduleViewProps = {
  cohorts: Cohort[];
  /** Ближайший поток — подставляется в форму по умолчанию. */
  defaultCohortId: string;
};

export function ScheduleView({ cohorts, defaultCohortId }: ScheduleViewProps) {
  const [selected, setSelected] = useState(defaultCohortId);
  const formRef = useRef<HTMLDivElement>(null);

  // В форму отдаём только открытые для записи потоки; прошедшие и уже
  // набранные в календаре показываем закрытыми, но записаться на них нельзя.
  const openCohorts = cohorts.filter((cohort) => !cohort.past && !cohort.closed);

  // В календаре прошедшие потоки не показываем — незачем держать
  // задизейбленную карточку первой. Набранные (closed), но ещё не
  // стартовавшие потоки остаются видимыми со статусом «Мест нет».
  const visibleCohorts = cohorts.filter((cohort) => !cohort.past);

  const handleEnroll = (id: string) => {
    setSelected(id);
    // Скролл ведём через Locomotive (если он активен): нативный scrollIntoView
    // c включённым Lenis не срабатывает. Флаг handled выставляет провайдер;
    // если Locomotive выключен (напр. prefers-reduced-motion) — нативный fallback.
    const detail = { hash: '#zayavka', handled: false };
    window.dispatchEvent(new CustomEvent('craft:scroll-to', { detail }));
    if (!detail.handled) {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <section className="pb-16 pt-10 sm:pb-24 sm:pt-12">
        <div className="container-page">
          <Reveal>
            <h1 className="heading-lg text-center">Расписание потоков</h1>
            <p className="mx-auto mt-4 max-w-2xl text-center text-ink-soft">
              Новый поток стартует в первый вторник каждого месяца (по МСК).
              Выберите удобный старт и запишитесь — места в группах ограничены.
            </p>

            {/* Единый режим занятий для всех потоков */}
            <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-3">
              <li className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-2 text-sm font-medium text-ink-soft">
                <CalendarDays className="h-4 w-4 text-terracotta" aria-hidden />
                Вторник и четверг
              </li>
              <li className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-2 text-sm font-medium text-ink-soft">
                <Clock className="h-4 w-4 text-terracotta" aria-hidden />
                20:00 по МСК
              </li>
              <li className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-2 text-sm font-medium text-ink-soft">
                <Hourglass className="h-4 w-4 text-terracotta" aria-hidden />
                1,5 часа занятие
              </li>
            </ul>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-ink-faint">
              Старт потока — он же день первого занятия.
            </p>
          </Reveal>

          <ol id="potoki" className="mt-12 grid scroll-mt-28 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCohorts.map((cohort, index) => {
              // Записаться нельзя, если поток прошёл или группа уже набрана.
              const enrollClosed = cohort.past || cohort.closed;
              const isSelected = !enrollClosed && cohort.id === selected;
              return (
                <Reveal key={cohort.id} delay={index * 100}>
                  <li
                    {...(!enrollClosed && {
                      role: 'button',
                      tabIndex: 0,
                      // Клик по карточке скроллит к форме и подставляет поток —
                      // работает даже если этот поток уже выбран.
                      onClick: () => handleEnroll(cohort.id),
                      onKeyDown: (event: KeyboardEvent<HTMLLIElement>) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          handleEnroll(cohort.id);
                        }
                      },
                      'aria-label': `Записаться в поток: ${cohort.monthLabel}, старт ${cohort.startLabel}`,
                    })}
                    className={`group flex h-full flex-col overflow-hidden rounded-2xl border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
                      enrollClosed
                        ? 'border-line bg-surface/40 opacity-60'
                        : isSelected
                          ? 'cursor-pointer border-terracotta bg-surface-soft shadow-soft'
                          : 'cursor-pointer border-line bg-surface/70 hover:border-terracotta'
                    }`}
                  >
                    {/* Обложка потока 4:3 на всю ширину карточки */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-deep">
                      <Image
                        src={cohort.image}
                        alt={`Поток ${cohort.monthLabel}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                          cohort.past ? 'grayscale' : ''
                        }`}
                      />
                      {/* Плашка статуса поверх фото */}
                      <div className="absolute right-3 top-3">
                        {cohort.past ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold text-ivory backdrop-blur">
                            <Lock className="h-3.5 w-3.5" aria-hidden />
                            Закрыт
                          </span>
                        ) : cohort.closed ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold text-ivory backdrop-blur">
                            <Lock className="h-3.5 w-3.5" aria-hidden />
                            Мест нет
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-terracotta px-3 py-1 text-xs font-semibold text-ivory">
                            Платный
                          </span>
                        )}
                      </div>
                      {/* Мини-плитка календаря с датой старта */}
                      <div className="absolute left-3 top-3 flex flex-col items-center rounded-xl border border-white/40 bg-surface/90 px-3 py-1.5 text-center leading-none shadow-soft backdrop-blur">
                        <span
                          className={`font-display text-2xl font-bold text-terracotta ${
                            cohort.past ? 'line-through decoration-2' : ''
                          }`}
                        >
                          {cohort.day}
                        </span>
                        <span className="mt-1 text-[10px] uppercase tracking-wide text-ink-faint">
                          {cohort.monthLabel}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3
                        className={`heading-md ${
                          cohort.past
                            ? 'text-ink-faint line-through'
                            : cohort.closed
                              ? 'text-ink-faint'
                              : ''
                        }`}
                      >
                        {cohort.monthLabel} · старт {cohort.startLabel}
                      </h3>

                      {/* Даты занятий: вт и чт */}
                      <div className="mt-3">
                        <p className="text-sm text-ink-soft">
                          <span className="font-semibold text-ink">Занятия:</span>{' '}
                          {cohort.sessions.join(', ')}
                          {cohort.moreSessions ? ' …' : ''}
                        </p>
                        <p className="mt-1 text-xs text-ink-faint">
                          вт и чт · 20:00 МСК · 1,5 часа
                        </p>
                      </div>

                      <p className="mt-3 flex-1 text-sm text-ink-soft">{cohort.note}</p>

                      <div className="mt-6">
                        {cohort.past ? (
                          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-faint">
                            <Lock className="h-4 w-4" aria-hidden />
                            Регистрация закрыта
                          </span>
                        ) : cohort.closed ? (
                          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-faint">
                            <Lock className="h-4 w-4" aria-hidden />
                            Регистрация закрыта — группа набрана
                          </span>
                        ) : (
                          // Явная кнопка «Записаться». Карточка тоже кликабельна
                          // (role=button на li), поэтому гасим всплытие, чтобы
                          // не сработал двойной переход к форме.
                          <button
                            type="button"
                            onClick={(event: MouseEvent<HTMLButtonElement>) => {
                              event.stopPropagation();
                              handleEnroll(cohort.id);
                            }}
                            className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors sm:text-base ${
                              isSelected
                                ? 'bg-terracotta text-ivory'
                                : 'border-2 border-terracotta text-terracotta group-hover:bg-terracotta group-hover:text-ivory'
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <Check className="h-4 w-4" aria-hidden />
                                Выбран — заполните форму
                              </>
                            ) : (
                              'Записаться'
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <section id="zayavka" ref={formRef} className="section scroll-mt-24 bg-surface-deep">
        <div className="container-page grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="heading-lg">
              Запишитесь в{' '}
              <span className="text-terracotta">выбранный поток</span>
            </h2>
            <p className="mt-4 max-w-md text-ink-soft">
              Оставьте заявку — преподаватель лично свяжется с вами, расспросит про ваш
              бизнес и подтвердит место в потоке. Это ни к чему не обязывает.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-soft">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden />
                Небольшие группы — преподаватель успевает уделить время каждому
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden />
                Можно сменить поток в селекте — старт удобен именно вам
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden />
                Работаем на вашем реальном проекте, а не на учебных примерах
              </li>
            </ul>
            <AskMaster className="mt-6" />
          </Reveal>

          <Reveal delay={150}>
            <LeadForm
              cohorts={openCohorts}
              cohortId={selected}
              onCohortChange={setSelected}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
