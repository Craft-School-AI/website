'use client';

import { useRef, useState } from 'react';
import { Check, Gift, Lock, CalendarDays, Clock, Hourglass } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { LeadForm } from '@/components/LeadForm';
import { AskMaster } from '@/components/AskMaster';
import { Button } from '@/components/ui/Button';
import type { Cohort } from '@/lib/cohorts';

type ScheduleViewProps = {
  cohorts: Cohort[];
  /** Ближайший поток — подставляется в форму по умолчанию. */
  defaultCohortId: string;
};

export function ScheduleView({ cohorts, defaultCohortId }: ScheduleViewProps) {
  const [selected, setSelected] = useState(defaultCohortId);
  const formRef = useRef<HTMLDivElement>(null);

  // В форму отдаём только открытые для записи потоки; прошедшие в календаре
  // показываем закрытыми, но записаться на них нельзя.
  const openCohorts = cohorts.filter((cohort) => !cohort.past);

  const handleEnroll = (id: string) => {
    setSelected(id);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <section className="section">
        <div className="container-page">
          <Reveal>
            <h2 className="heading-lg text-center">Расписание потоков</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-ink-soft">
              Новый поток стартует в первый понедельник каждого месяца (по МСК).
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
              Поток открывается в понедельник, первое занятие — в ближайший вторник.
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cohorts.map((cohort, index) => {
              const isSelected = !cohort.past && cohort.id === selected;
              return (
                <Reveal key={cohort.id} delay={index * 100}>
                  <li
                    className={`flex h-full flex-col rounded-2xl border p-6 transition-colors ${
                      cohort.past
                        ? 'border-line bg-surface/40 opacity-60'
                        : isSelected
                          ? 'border-terracotta bg-surface-soft shadow-soft'
                          : 'border-line bg-surface/70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Мини-плитка календаря с датой старта */}
                      <div className="flex flex-col items-center rounded-xl border border-line bg-surface px-4 py-2 text-center leading-none">
                        <span
                          className={`font-display text-3xl font-bold text-terracotta ${
                            cohort.past ? 'line-through decoration-2' : ''
                          }`}
                        >
                          {cohort.day}
                        </span>
                        <span className="mt-1 text-xs uppercase tracking-wide text-ink-faint">
                          {cohort.monthLabel}
                        </span>
                      </div>

                      {cohort.past ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-ink/10 px-3 py-1 text-xs font-semibold text-ink-faint">
                          <Lock className="h-3.5 w-3.5" aria-hidden />
                          Закрыт
                        </span>
                      ) : cohort.free ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green/15 px-3 py-1 text-xs font-semibold text-green">
                          <Gift className="h-3.5 w-3.5" aria-hidden />
                          Бесплатно
                        </span>
                      ) : (
                        <span className="ai-tag">Платный</span>
                      )}
                    </div>

                    <h3
                      className={`heading-md mt-5 ${
                        cohort.past ? 'text-ink-faint line-through' : ''
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
                      ) : isSelected ? (
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta">
                          <Check className="h-4 w-4" aria-hidden />
                          Выбран — заполните форму ниже
                        </span>
                      ) : (
                        <Button
                          variant="outline"
                          size="md"
                          onClick={() => handleEnroll(cohort.id)}
                          className="w-full"
                        >
                          Записаться в этот поток
                        </Button>
                      )}
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
              Оставьте заявку — мастер лично свяжется с вами, расспросит про ваш
              бизнес и подтвердит место в потоке. Это ни к чему не обязывает.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-soft">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden />
                Небольшие группы — мастер успевает уделить время каждому
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
