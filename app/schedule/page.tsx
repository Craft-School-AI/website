import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { ScheduleView } from '@/components/ScheduleView';
import { getCohorts, getNearestCohortId } from '@/lib/cohorts';

export const metadata: Metadata = {
  title: 'Расписание',
  description:
    'Расписание потоков Craft School. Новый поток стартует в первый понедельник месяца. Августовский поток — бесплатный обкаточный, с сентября — платные. Записывайтесь в удобный поток.',
};

export default function SchedulePage() {
  const cohorts = getCohorts();
  const nearestCohortId = getNearestCohortId();

  return (
    <>
      <PageHero
        tag="Старты каждый месяц"
        title="Расписание потоков"
        subtitle="Новый поток стартует в первый понедельник каждого месяца по МСК. Выберите удобный старт и запишитесь прямо из календаря."
      />
      <ScheduleView cohorts={cohorts} defaultCohortId={nearestCohortId} />
    </>
  );
}
