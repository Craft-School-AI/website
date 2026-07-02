import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page flex flex-col items-center text-center">
        <p className="font-display text-8xl font-bold text-terracotta">404</p>
        <h1 className="heading-lg mt-4">Такой страницы в мастерской нет</h1>
        <p className="mt-3 max-w-md text-ink-soft">
          Возможно, ссылка устарела. Вернитесь на главную — там всё на месте.
        </p>
        <div className="mt-8">
          <Button href="/" size="lg">
            На главную
          </Button>
        </div>
      </div>
    </section>
  );
}
