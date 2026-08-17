/**
 * Заголовок списка статей: крупная надпись «БЛОГ».
 *
 * Жёсткая тень со смещением держит квадратный язык сайта, а заливка идёт
 * переливающимся градиентом (.text-iridescent в globals.css).
 */
export function BlogWordmark() {
  return (
    <h1 className="select-none font-display text-6xl font-bold uppercase leading-none tracking-tight text-iridescent drop-shadow-[4px_4px_0_rgb(var(--brand-terracotta))] sm:text-8xl sm:drop-shadow-[6px_6px_0_rgb(var(--brand-terracotta))] lg:text-9xl">
      Блог
    </h1>
  );
}
