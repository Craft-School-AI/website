/**
 * Заголовок списка статей: крупная надпись «ИИ БЛОГ».
 *
 * Переливается только «ИИ»: по нему едет серо-белый градиент, обрезанный по
 * форме букв (.text-iridescent в globals.css). Слово «БЛОГ» остаётся сплошным.
 * Жёсткая тень со смещением держит квадратный язык сайта.
 */
export function BlogWordmark() {
  return (
    <h1 className="select-none font-display text-6xl font-bold uppercase leading-none tracking-tight drop-shadow-[4px_4px_0_rgb(var(--brand-terracotta))] sm:text-8xl sm:drop-shadow-[6px_6px_0_rgb(var(--brand-terracotta))] lg:text-9xl">
      <span className="text-iridescent">ИИ</span>{' '}
      <span className="text-ink">блог</span>
    </h1>
  );
}
