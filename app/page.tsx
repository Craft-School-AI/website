import { Hero } from '@/components/sections/Hero';
import { Benefits } from '@/components/sections/Benefits';
import { Audience } from '@/components/sections/Audience';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { LeadSection } from '@/components/sections/LeadSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Audience />
      <HowItWorks />
      <LeadSection />
    </>
  );
}
