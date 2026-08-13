'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Handshake } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import type { Cohort } from '@/lib/cohorts';
import {
  TARIFFS,
  DEFAULT_TARIFF_ID,
  findTariff,
  tariffLabel,
  tariffLabelDiscounted,
  isPromoValid,
  PROMO_CODE,
  PROMO_LABEL,
} from '@/lib/tariffs';

type LeadFormValues = {
  name: string;
  social: string;
  cohort: string;
  tariff: string;
  promo: string;
  comment: string;
  consent: boolean;
};

type SubmitState = 'idle' | 'success' | 'error';

type LeadFormProps = {
  /** Доступные потоки для выбора. */
  cohorts?: Cohort[];
  /** Выбранный поток (id) — управляется извне, напр. из календаря. */
  cohortId?: string;
  /** Синхронизация выбора потока обратно наверх. */
  onCohortChange?: (id: string) => void;
};

const inputClasses =
  'w-full rounded-xl border border-line bg-surface px-4 py-3 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-terracotta';

export function LeadForm({ cohorts = [], cohortId, onCohortChange }: LeadFormProps) {
  const defaultCohort = cohortId ?? cohorts[0]?.id ?? '';

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    defaultValues: {
      name: '',
      social: '',
      cohort: defaultCohort,
      tariff: DEFAULT_TARIFF_ID,
      promo: '',
      comment: '',
      consent: false,
    },
  });

  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [serverError, setServerError] = useState('');

  // Все потоки платные — тариф показываем и требуем в форме записи.
  const showTariff = cohorts.length > 0;

  // Промокод: если введён валидный — показываем цены со скидкой.
  const promoValue = watch('promo') ?? '';
  const promoApplied = promoValue.trim() !== '' && isPromoValid(promoValue);

  // Выбор потока извне (клик «Записаться» в календаре) — подставляем в селект.
  useEffect(() => {
    if (cohortId) {
      setValue('cohort', cohortId);
    }
  }, [cohortId, setValue]);

  const onSubmit = async (values: LeadFormValues) => {
    setSubmitState('idle');
    setServerError('');

    // В заявку кладём читаемые названия потока и тарифа, а не технические id.
    const cohort = cohorts.find((c) => c.id === values.cohort);
    // Тариф есть только в форме записи (со списком потоков).
    const tariff = cohorts.length > 0 ? findTariff(values.tariff) : undefined;
    // Валидный промокод — в заявку кладём цену со скидкой.
    const promoOk = isPromoValid(values.promo ?? '');
    const tariffText = tariff
      ? promoOk
        ? tariffLabelDiscounted(tariff)
        : tariffLabel(tariff)
      : '';
    const payload = {
      ...values,
      cohort: cohort ? cohort.selectLabel : '',
      tariff: tariffText,
    };

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setServerError(data.error ?? 'Что-то пошло не так. Попробуйте позже.');
        setSubmitState('error');
        return;
      }

      setSubmitState('success');
      reset({
        name: '',
        social: '',
        cohort: defaultCohort,
        tariff: DEFAULT_TARIFF_ID,
        promo: '',
        comment: '',
        consent: false,
      });
    } catch {
      setServerError('Нет соединения. Проверьте интернет и попробуйте снова.');
      setSubmitState('error');
    }
  };

  if (submitState === 'success') {
    return (
      <div className="card text-center">
        <span
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green/15 text-green"
          aria-hidden
        >
          <Handshake className="h-7 w-7" strokeWidth={1.75} />
        </span>
        <h3 className="heading-md mt-4">Заявка принята!</h3>
        <p className="mt-2 text-ink-soft">
          Преподаватель свяжется с вами в ближайшее время — обычно в течение пары часов.
        </p>
        <div className="mt-6">
          <Button variant="outline" onClick={() => setSubmitState('idle')}>
            Отправить ещё одну заявку
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card space-y-4">
      <div>
        <label htmlFor="lead-name" className="mb-1.5 block text-sm font-semibold">
          Имя
        </label>
        <input
          id="lead-name"
          type="text"
          placeholder="Как к вам обращаться"
          autoComplete="name"
          className={inputClasses}
          aria-invalid={Boolean(errors.name)}
          {...register('name', {
            required: 'Укажите имя',
            minLength: { value: 2, message: 'Имя слишком короткое' },
          })}
        />
        {errors.name && (
          <p role="alert" className="mt-1 text-sm text-terracotta">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lead-social" className="mb-1.5 block text-sm font-semibold">
          Ссылка на соцсеть
        </label>
        <input
          id="lead-social"
          type="text"
          inputMode="url"
          placeholder="https://t.me/username, vk.com/… или @ник"
          autoComplete="url"
          className={inputClasses}
          aria-invalid={Boolean(errors.social)}
          {...register('social', {
            required: 'Оставьте ссылку на соцсеть — так преподаватель напишет вам напрямую',
            pattern: {
              value: /(https?:\/\/|t\.me\/|vk\.com\/|@|\.[a-z]{2,})/i,
              message: 'Вставьте ссылку на профиль или @ник (Telegram, VK, Instagram)',
            },
          })}
        />
        <p className="mt-1.5 text-xs text-ink-faint">
          Telegram, VK или Instagram — куда вам удобнее ответить. Сюда преподаватель
          напишет по заявке.
        </p>
        {errors.social && (
          <p role="alert" className="mt-1 text-sm text-terracotta">
            {errors.social.message}
          </p>
        )}
      </div>

      {cohorts.length > 0 && (
        <div>
          <label htmlFor="lead-cohort" className="mb-1.5 block text-sm font-semibold">
            Поток
          </label>
          <select
            id="lead-cohort"
            className={`${inputClasses} cursor-pointer appearance-none bg-[right_1rem_center] bg-no-repeat pr-10`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
            }}
            aria-invalid={Boolean(errors.cohort)}
            {...register('cohort', {
              required: 'Выберите поток',
              onChange: (event) => onCohortChange?.(event.target.value),
            })}
          >
            {cohorts.map((cohort) => (
              <option key={cohort.id} value={cohort.id}>
                {cohort.selectLabel}
              </option>
            ))}
          </select>
          {errors.cohort && (
            <p role="alert" className="mt-1 text-sm text-terracotta">
              {errors.cohort.message}
            </p>
          )}
        </div>
      )}

      {/* Тариф — обязателен в форме записи (со списком потоков). На общей
          форме контактов потоков нет, поэтому поле не показываем. */}
      {showTariff && (
        <div>
          <label htmlFor="lead-tariff" className="mb-1.5 block text-sm font-semibold">
            Тариф
          </label>
          <select
            id="lead-tariff"
            className={`${inputClasses} cursor-pointer appearance-none bg-[right_1rem_center] bg-no-repeat pr-10`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
            }}
            aria-invalid={Boolean(errors.tariff)}
            {...register('tariff', { required: 'Выберите тариф' })}
          >
            {TARIFFS.map((tariff) => (
              <option key={tariff.id} value={tariff.id}>
                {promoApplied ? tariffLabelDiscounted(tariff) : tariffLabel(tariff)}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-ink-faint">
            {promoApplied
              ? `Цены показаны со скидкой ${PROMO_LABEL} по промокоду.`
              : 'Точный тариф подтвердите с преподавателем — он подскажет, какой формат подойдёт вашему проекту.'}
          </p>
          {errors.tariff && (
            <p role="alert" className="mt-1 text-sm text-terracotta">
              {errors.tariff.message}
            </p>
          )}
        </div>
      )}

      <div>
        <label htmlFor="lead-promo" className="mb-1.5 block text-sm font-semibold">
          Промокод <span className="font-normal text-ink-faint">(если есть)</span>
        </label>
        <input
          id="lead-promo"
          type="text"
          placeholder="Введите промокод"
          autoCapitalize="characters"
          className={inputClasses}
          aria-invalid={Boolean(errors.promo)}
          {...register('promo', {
            maxLength: { value: 40, message: 'Слишком длинный промокод' },
            // Пустой — ок (поле необязательное). Непустой должен совпасть с промокодом.
            validate: (value) =>
              !value.trim() ||
              isPromoValid(value) ||
              'Такого промокода нет — проверьте написание',
          })}
        />
        {errors.promo ? (
          <p role="alert" className="mt-1 text-sm text-terracotta">
            {errors.promo.message}
          </p>
        ) : promoApplied ? (
          <p className="mt-1.5 text-sm font-semibold text-green">
            Промокод {PROMO_CODE} применён — скидка {PROMO_LABEL} на любой тариф.
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="lead-comment" className="mb-1.5 block text-sm font-semibold">
          Комментарий <span className="font-normal text-ink-faint">(необязательно)</span>
        </label>
        <textarea
          id="lead-comment"
          rows={3}
          placeholder="Расскажите пару слов о вашем бизнесе"
          className={inputClasses}
          {...register('comment', {
            maxLength: { value: 1000, message: 'Максимум 1000 символов' },
          })}
        />
        {errors.comment && (
          <p role="alert" className="mt-1 text-sm text-terracotta">
            {errors.comment.message}
          </p>
        )}
      </div>

      {submitState === 'error' && serverError && (
        <p role="alert" className="rounded-xl bg-terracotta/10 px-4 py-3 text-sm text-terracotta">
          {serverError}
        </p>
      )}

      {/* Явное согласие на обработку ПДн — без галочки форма не уходит */}
      <div>
        <label
          htmlFor="lead-consent"
          className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 transition-colors ${
            errors.consent
              ? 'border-red-500 bg-red-500/10'
              : 'border-transparent'
          }`}
        >
          <input
            id="lead-consent"
            type="checkbox"
            aria-invalid={Boolean(errors.consent)}
            className={`mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[rgb(var(--brand-terracotta))] ${
              errors.consent ? 'outline outline-2 outline-red-500' : ''
            }`}
            {...register('consent', {
              required: 'Отметьте согласие — без него мы не имеем права обработать заявку',
            })}
          />
          <span className={`text-xs ${errors.consent ? 'text-red-500' : 'text-ink-faint'}`}>
            Я принимаю условия{' '}
            <Link
              href="/oferta"
              className="underline underline-offset-2 hover:text-terracotta"
            >
              Публичной оферты
            </Link>{' '}
            и даю согласие на обработку персональных данных в соответствии с{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-terracotta"
            >
              Политикой конфиденциальности
            </Link>
          </span>
        </label>
        {errors.consent && (
          <p role="alert" className="mt-1 px-3 text-sm text-red-500">
            {errors.consent.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Отправляем…' : 'Записаться в мастерскую'}
      </Button>
    </form>
  );
}
