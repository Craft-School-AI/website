import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'О мастере',
  description:
    '10 лет в разработке сайтов и сервисов, 2 года ежедневной работы с ИИ-агентами. Мастер лично ведёт каждый поток Craft-School.ai.',
};

const facts = [
  { value: '10 лет', label: 'в разработке сайтов и сервисов' },
  { value: '2 года', label: 'ежедневной работы с ИИ-агентами' },
  { value: '3 недели', label: 'от нуля до сайта у учеников' },
];

const principles = [
  {
    title: 'Код — инструмент, а не цель',
    text: 'Столяру не нужно уметь выплавлять сталь для рубанка. Вам не нужно писать код, чтобы сделать сайт: нужно уметь управлять инструментом, который его пишет.',
  },
  {
    title: 'Мастерская, а не лекторий',
    text: 'Здесь не слушают — здесь делают. Каждое занятие вы работаете руками над своим проектом, а я хожу между станками и помогаю.',
  },
  {
    title: 'Без жаргона',
    text: 'Я перевожу «айтишное» на человеческий. Если после занятия остались непонятные слова — это моя недоработка, а не ваша.',
  },
];

export default function MasterPage() {
  return (
    <>
      <PageHero
        tag="Кто ведёт обучение"
        title="Мастер, который сначала сделал это сам"
        subtitle="10 лет я делал сайты руками — для студий, стартапов и своего бизнеса. Последние 2 года их для меня делают ИИ-агенты."
      />

      <section className="section">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-3">
            {facts.map((fact, index) => (
              <Reveal key={fact.label} delay={index * 100}>
                <div className="card text-center">
                  <p className="font-display text-4xl font-bold text-terracotta">
                    {fact.value}
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">{fact.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="card mx-auto mt-12 max-w-3xl">
              <p className="text-lg leading-relaxed text-ink-soft">
                Десять лет я писал код сам: интернет-магазины, сервисы записи,
                корпоративные сайты. Я знаю, сколько это стоит заказчику — и деньгами,
                и нервами.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                Два года назад всё изменилось: появились ИИ-агенты, которые пишут
                код быстрее и аккуратнее младшего программиста. Я перестроил свою
                работу вокруг них — и понял главное:{' '}
                <strong>
                  теперь сайт может сделать сам владелец бизнеса
                </strong>. Не «на конструкторе с шаблоном как у всех», а настоящий,
                свой.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                Так появилась эта мастерская. Я не делаю из предпринимателей
                программистов — я учу их управлять новым станком. Как мастер учит
                подмастерьев: показываю, страхую, отпускаю в самостоятельную работу.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-surface-soft">
        <div className="container-page">
          <Reveal>
            <h2 className="heading-lg text-center">Мои принципы</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 120}>
                <article className="card h-full">
                  <h3 className="heading-md">{principle.title}</h3>
                  <p className="mt-3 text-ink-soft">{principle.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section text-center">
        <div className="container-page">
          <Reveal>
            <h2 className="heading-lg">Приходите — покажу станок в деле</h2>
            <div className="mt-8">
              <Button href="/#zayavka" size="lg">
                Записаться в мастерскую
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
