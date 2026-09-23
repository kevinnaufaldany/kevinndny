import React, { useState } from 'react';
import { servicesData } from '@/data/services';
import { ServiceAccordionItem } from '@/components/cards/ServiceAccordionItem';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const ServicesSection: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string | null>('uiux');
  const { ref } = useScrollReveal();

  const handleToggle = (id: string) => {
    setActiveServiceId(activeServiceId === id ? null : id);
  };

  return (
    <SectionWrapper id="services" className="border-t border-brand-border/80 bg-brand-surface/40">
      <div ref={ref}>
        {/* Section Header with SERVICES Watermark Backdrop (Frame 07 style) */}
        <SectionHeader
          watermark="SERVICES"
          title="/SERVICES"
          category="Capabilities & Focus"
        />

        {/* Accordion List */}
        <div className="divide-y divide-zinc-200 border-y border-zinc-200 max-w-5xl mx-auto">
          {servicesData.map((service) => (
            <ServiceAccordionItem
              key={service.id}
              service={service}
              isOpen={activeServiceId === service.id}
              onToggle={() => handleToggle(service.id)}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ServicesSection;
