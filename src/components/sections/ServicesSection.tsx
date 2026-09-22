import React, { useState } from 'react';
import { motion } from 'motion/react';
import { servicesData } from '@/data/services';
import { ServiceAccordionItem } from '@/components/cards/ServiceAccordionItem';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeInUp } from '@/lib/motion';

export const ServicesSection: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string | null>('uiux');
  const { ref, isInView } = useScrollReveal();

  const handleToggle = (id: string) => {
    setActiveServiceId(activeServiceId === id ? null : id);
  };

  return (
    <SectionWrapper id="services" watermark="SERVICE" className="border-t border-brand-border/80 bg-brand-surface/50">
      <div ref={ref}>
        {/* Section Header */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-brand-secondary">
            Capabilities & Focus
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-brand-dark mt-1">
            /SERVICE
          </h2>
        </motion.div>

        {/* Accordion List */}
        <div className="divide-y divide-zinc-200 border-y border-zinc-200">
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
