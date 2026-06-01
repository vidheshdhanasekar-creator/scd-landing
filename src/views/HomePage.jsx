import HeroSection from '../components/HeroSection';
import CountdownSection from '../components/CountdownSection';
import RegisterSection from '../components/RegisterSection';
import TracksSection from '../components/TracksSection';
import SpeakersSection from '../components/SpeakersSection';
import SponsorsSection from '../components/SponsorsSection';
import CallForSpeakers from '../components/CallForSpeakers';
import TeamSection from '../components/TeamSection';
import SponsorshipCTA from '../components/SponsorshipCTA';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CountdownSection />
      <RegisterSection />
      <TracksSection />
      <SpeakersSection />
      <SponsorsSection />
      <CallForSpeakers />
      <TeamSection />
      <SponsorshipCTA />
    </main>
  );
}
