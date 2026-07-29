type JsonLdProps = {
  /** Один объект Schema.org или массив объектов. */
  data: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * Рендерит structured data (JSON-LD) для поисковиков.
 * Скрипт попадает в серверный HTML, поэтому виден роботам сразу.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Данные формируем сами (не пользовательский ввод) — безопасно.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
