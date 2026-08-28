import { Hero } from '@/components/sections/Hero';
import { StudentWorks } from '@/components/sections/StudentWorks';
import { Benefits } from '@/components/sections/Benefits';
import { Audience } from '@/components/sections/Audience';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { PricingTeaser } from '@/components/sections/PricingTeaser';
import { BlogTeaser } from '@/components/sections/BlogTeaser';
import { LeadSection } from '@/components/sections/LeadSection';

// Порядок секций — воронка: ценность → для кого (проблема) → чему научитесь
// (решение) → как устроено → доказательство (сайты учеников) → цена → заявка.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Audience />
      <Benefits />
      <HowItWorks />
      <StudentWorks />
      <PricingTeaser />
      <BlogTeaser />
      <LeadSection />
    </>
  );
}
