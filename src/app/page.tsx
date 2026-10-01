import Hero from "@/components/Hero";
import ImpactSection from "@/components/ImpactSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProcessSection from "@/components/ProcessSection";
import WhyChooseMeSection from "@/components/WhyChooseMeSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Hero />
      <ImpactSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <WhyChooseMeSection />
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}





