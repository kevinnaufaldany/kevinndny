import React, { useState, useEffect } from 'react';
import { servicesData } from '@/data/services';
import { Service } from '@/types';
import { fetchServices } from '@/services/portfolioService';
import { ServiceAccordionItem } from '@/components/cards/ServiceAccordionItem';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<Service[]>(servicesData);
  const [activeServiceId, setActiveServiceId] = useState<string | null>('computervision');
  const { ref } = useScrollReveal();

  useEffect(() => {
    // Dynamic query from Supabase with instant fallback
    fetchServices().then((data) => {
      if (data && data.length > 0) {
        setServices(data);
      }
    });
  }, []);

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
          {services.map((service) => (
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
