import type { Metadata } from 'next';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { AskMaster } from '@/components/AskMaster';
import { TelegramIcon } from '@/components/SocialIcons';
import { Button } from '@/components/ui/Button';
import { MASTER_TELEGRAM_CHANNEL_URL, TELEGRAM_CHANNEL_LABEL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'О преподавателе',
  description:
    '10+ лет в разработке сайтов и приложений: Яндекс, Avito, Huntflow, X5, своя студия на заказ. Сам был тем подрядчиком — и лично ведёт каждый поток Craft School.',
};

const facts = [
  { value: '10+ лет', label: 'в разработке сайтов и приложений' },
  { value: '20+', label: 'разработчиков вырастил и вёл в командах' },
  { value: '2 года', label: 'каждый день работаю с ИИ-агентами' },
];

// Узнаваемые компании и продукты — быстрый сигнал доверия
const companies = ['Яндекс', 'Avito', 'Huntflow', 'X5', 'FlowMapp', 'ManyChat'];

const principles = [
  {
    title: 'Код — инструмент, а не цель',
    text: 'Водителю не нужно уметь собирать двигатель, чтобы водить машину. Вам не нужно писать код, чтобы сделать сайт: нужно уметь управлять инструментом, который его пишет.',
  },
  {
    title: 'Практика, а не лекторий',
    text: 'Здесь не слушают — здесь делают. Каждое занятие вы работаете над своим проектом, а я подключаюсь к каждому и помогаю.',
  },
  {
    title: 'Без жаргона',
    text: 'Я перевожу «айтишное» на человеческий. Если после занятия остались непонятные слова — это моя недоработка, а не ваша.',
  },
];

export default function MasterPage() {
  return (
    <>
      {/* Фото + имя преподавателя — уникальная «шапка» профиля прямо в контенте */}
      <section className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-none">
            {/* Тёплое свечение позади — портрет «парит», без жёсткой рамки */}
            <div
              aria-hidden
              className="absolute inset-x-6 bottom-2 top-10 rounded-[3rem] bg-terracotta/20 blur-3xl"
            />
            <Image
              src="/images/master-portrait.webp"
              alt="Роман Бабанов — преподаватель Craft School"
              width={1024}
              height={1404}
              priority
              className="relative h-auto w-full rounded-[2rem] shadow-hover"
              sizes="(min-width: 1024px) 40vw, 24rem"
            />
          </Reveal>

          <Reveal delay={150}>
            <span className="ai-tag">Кто ведёт обучение</span>
            <h1 className="heading-xl mt-4">Роман Бабанов</h1>
            <p className="mt-4 text-lg text-ink-soft">
              Сам был тем подрядчиком, к которому приходят за сайтом, — а теперь
              учу предпринимателей делать это самим, с помощью ИИ-агентов.
            </p>

            {/* Прямой контакт и личный канал преподавателя в Telegram */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <AskMaster />
              <a
                href={MASTER_TELEGRAM_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-terracotta hover:text-terracotta"
              >
                <TelegramIcon className="h-4 w-4" />
                {TELEGRAM_CHANNEL_LABEL}
              </a>
            </div>

            <h2 className="heading-md mt-8">
              Я знаю цену сайта —{' '}
              <span className="text-terracotta">потому что сам их делал на заказ</span>
            </h2>
            <p className="mt-5 text-lg text-ink-soft">
              Несколько лет я владел собственной студией разработки на заказ —{' '}
              <strong className="text-ink">sourcemap.pro</strong>: мы делали сайты
              и приложения для бизнеса из самых разных сфер. А больше десяти лет
              работал и руководил командами в крупных компаниях — делал продукты
              для доставки еды, банков, найма, спорта, кибербезопасности.
            </p>

            <a
              href="https://clutch.co/profile/sourcemappro"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-terracotta/50 bg-terracotta/10 px-4 py-2 text-sm font-semibold text-terracotta transition-colors hover:bg-terracotta/20"
            >
              <Star className="h-4 w-4 fill-amber text-amber" aria-hidden />
              4.9 из 5 · отзывы клиентов студии на Clutch
            </a>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-ink-faint">
              Работал и вёл команды в
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {companies.map((company) => (
                <span
                  key={company}
                  className="rounded-full border border-line bg-surface-soft px-3 py-1 text-sm font-semibold"
                >
                  {company}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Цифры */}
      <section className="pb-4">
        <div className="container-page grid gap-6 sm:grid-cols-3">
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
      </section>

      {/* Развёрнутая история */}
      <section className="section">
        <div className="container-page">
          <Reveal>
            <div className="card mx-auto max-w-3xl">
              <p className="text-lg leading-relaxed text-ink-soft">
                Собственная студия — это не строчка в резюме, а точка зрения. Я и
                есть тот самый «подрядчик», к которому предприниматели приходят за
                сайтом, — и изнутри знаю, сколько это стоит заказчику: деньгами,
                временем и нервами. А ещё знаю, что большую часть этой работы
                теперь можно сделать самому.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                Я не только делал, но и учил: выступал в школах программирования и
                на конференциях, наставлял разработчиков в командах, проводил
                разборы работ. Объяснять сложное простыми словами — то, что я умею
                и люблю.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                Два года назад появились ИИ-агенты, которые пишут код быстрее и
                аккуратнее младшего разработчика. Я перестроил вокруг них свою
                работу — и понял главное:{' '}
                <strong className="text-ink">
                  теперь сайт может сделать сам владелец бизнеса
                </strong>
                . Не «на конструкторе с шаблоном как у всех», а настоящий, свой.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                Так появилась эта мастерская. Я не делаю из предпринимателей
                программистов — я учу их управлять новым инструментом: показываю,
                страхую, отпускаю в самостоятельную работу.
              </p>
              <p className="mt-6 text-sm text-ink-faint">
                Образование: НИЯУ МИФИ, факультет «Кибернетика и безопасность»,
                прикладная математика и информатика.
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
            <h2 className="heading-lg">Приходите — покажу ИИ-агента в деле</h2>
            <div className="mt-8">
              <Button href="/#zayavka" size="lg">
                Записаться в мастерскую
              </Button>
            </div>
            <AskMaster className="mt-6" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
