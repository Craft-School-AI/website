import { Check } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { LeadForm } from '@/components/LeadForm';

export function LeadSection() {
  return (
    <section id="zayavka" className="section scroll-mt-24">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <h2 className="heading-lg">
            Запишитесь в мастерскую — <br />
            <span className="text-terracotta">
              места в потоке ограничены
            </span>
          </h2>
          <p className="mt-4 max-w-md text-ink-soft">
            Оставьте заявку — мастер лично свяжется с вами, расспросит про ваш
            бизнес и подскажет, какой формат подойдёт. Это ни к чему не обязывает.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-ink-soft">
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden />
              Небольшие группы — мастер успевает уделить время каждому
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden />
              Первый результат — уже на первой неделе
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden />
              Работаем на вашем реальном проекте, а не на учебных примерах
            </li>
          </ul>
        </Reveal>

        <Reveal delay={150}>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
