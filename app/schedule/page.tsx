import type { Metadata } from 'next';
import { ScheduleView } from '@/components/ScheduleView';
import { getAllCohorts, getNearestCohortId } from '@/lib/cohorts';

export const metadata: Metadata = {
  title: 'Расписание',
  description:
    'Расписание потоков Craft School. Новый поток стартует в первый вторник каждого месяца. Небольшие группы, места ограничены — выберите удобный старт и запишитесь.',
};

export default function SchedulePage() {
  // Календарю отдаём все потоки (прошедшие показываем закрытыми),
  // форма внутри берёт только открытые для записи.
  const cohorts = getAllCohorts();
  const nearestCohortId = getNearestCohortId();

  return <ScheduleView cohorts={cohorts} defaultCohortId={nearestCohortId} />;
}
