'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Handshake } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';

type LeadFormValues = {
  name: string;
  phone: string;
  email: string;
  comment: string;
  consent: boolean;
};

type SubmitState = 'idle' | 'success' | 'error';

const inputClasses =
  'w-full rounded-xl border border-line bg-surface px-4 py-3 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-terracotta';

export function LeadForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    defaultValues: { name: '', phone: '', email: '', comment: '', consent: false },
  });

  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [serverError, setServerError] = useState('');

  const onSubmit = async (values: LeadFormValues) => {
    setSubmitState('idle');
    setServerError('');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setServerError(data.error ?? 'Что-то пошло не так. Попробуйте позже.');
        setSubmitState('error');
        return;
      }

      setSubmitState('success');
      reset();
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
          Мастер свяжется с вами в ближайшее время — обычно в течение пары часов.
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
        <label htmlFor="lead-phone" className="mb-1.5 block text-sm font-semibold">
          Телефон
        </label>
        <input
          id="lead-phone"
          type="tel"
          placeholder="+7 900 000-00-00"
          autoComplete="tel"
          className={inputClasses}
          aria-invalid={Boolean(errors.phone)}
          {...register('phone', {
            required: 'Укажите телефон',
            pattern: {
              value: /^[+]?[\d\s()-]{10,18}$/,
              message: 'Похоже, в номере опечатка',
            },
          })}
        />
        {errors.phone && (
          <p role="alert" className="mt-1 text-sm text-terracotta">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lead-email" className="mb-1.5 block text-sm font-semibold">
          Email
        </label>
        <input
          id="lead-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          className={inputClasses}
          aria-invalid={Boolean(errors.email)}
          {...register('email', {
            required: 'Укажите email',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
              message: 'Похоже, в адресе опечатка',
            },
          })}
        />
        {errors.email && (
          <p role="alert" className="mt-1 text-sm text-terracotta">
            {errors.email.message}
          </p>
        )}
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
