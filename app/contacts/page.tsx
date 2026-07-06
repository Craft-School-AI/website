import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { LeadForm } from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Контакты',
  description:
    'Свяжитесь с мастерской Craft-School.ai: Telegram, email или форма заявки. Отвечаем в течение пары часов.',
};

const contacts = [
  {
    label: 'Telegram',
    value: '@craft_school_ai_bot',
    href: 'https://t.me/craft_school_ai_bot',
    note: 'Самый быстрый способ — отвечаем в течение пары часов',
  },
  {
    label: 'Email',
    value: 'craft-school-ai@yandex.ru',
    href: 'mailto:craft-school-ai@yandex.ru',
    note: 'Для подробных вопросов и сотрудничества',
  },
  {
    label: 'Instagram',
    value: '@craft_school_ai',
    href: 'https://www.instagram.com/craft_school_ai',
    note: 'Закулисье мастерской и работы учеников',
  },
  {
    label: 'VK',
    value: 'Сообщество Craft-School.ai',
    href: 'https://vk.ru/club240091437',
    note: 'Новости школы и анонсы потоков',
  },
];

export default function ContactsPage() {
  return (
    <>
      <PageHero
        tag="Контакты"
        title="Дверь в мастерскую открыта"
        subtitle="Напишите нам любым удобным способом — или оставьте заявку, и мастер свяжется сам."
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-5">
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="card block transition-transform duration-200 hover:-translate-y-1"
                >
                  <p className="text-sm font-semibold uppercase tracking-wider text-ink-faint">
                    {contact.label}
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold text-terracotta">
                    {contact.value}
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">{contact.note}</p>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <LeadForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
