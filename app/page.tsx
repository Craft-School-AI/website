import { Hero } from '@/components/sections/Hero';
import { StudentWorks } from '@/components/sections/StudentWorks';
import { Benefits } from '@/components/sections/Benefits';
import { Audience } from '@/components/sections/Audience';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { BlogTeaser } from '@/components/sections/BlogTeaser';
import { LeadSection } from '@/components/sections/LeadSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StudentWorks />
      <Benefits />
      <Audience />
      <HowItWorks />
      <BlogTeaser />
      <LeadSection />
    </>
  );
}
