import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { certificationsData, Certification } from '@/data/certifications';
import { fetchCertifications } from '@/services/portfolioService';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeInUp, staggerContainer } from '@/lib/motion';

export const CertificationsSection: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>(certificationsData);
  const { ref, isInView } = useScrollReveal();

  useEffect(() => {
    // Dynamic query from Supabase with instant fallback
    fetchCertifications().then((data) => {
      if (data && data.length > 0) {
        setCertifications(data);
      }
    });
  }, []);

  const professionalCert = certifications.find((c) => c.isProfessional);
  const otherCerts = certifications.filter((c) => !c.isProfessional);

  return (
    <SectionWrapper id="certifications" className="border-t border-brand-border/80 bg-white">
      <div ref={ref}>
        {/* Section Header with Centered CREDENTIALS Watermark Backdrop (as in frame_07.jpg) */}
        <SectionHeader
          watermark="CREDENTIALS"
          title="/CERTIFICATIONS"
          category="Verified Qualifications"
        >
          <div className="flex justify-center">
            <span className="text-xs font-mono px-4 py-1.5 rounded-full bg-brand-surface text-brand-secondary border border-zinc-200/80">
              1 Professional · 3 Specializations
            </span>
          </div>
        </SectionHeader>

        {/* Featured Professional Certification Card (AWS Certified Cloud Practitioner) */}
        {professionalCert && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-8 rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-brand-card via-zinc-900 to-black text-white shadow-card border border-zinc-800 relative overflow-hidden"
          >
            {/* Subtle glow accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Badge Icon / Logo */}
              <div className="lg:col-span-3 flex justify-center lg:justify-start">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center justify-center backdrop-blur-md shadow-2xl">
                  {professionalCert.badgeUrl ? (
                    <img 
                      src={professionalCert.badgeUrl} 
                      alt={professionalCert.name}
                      className="w-full h-full object-contain filter drop-shadow-lg"
                      loading="lazy"
                    />
                  ) : (
                    <Award className="w-16 h-16 text-emerald-400" />
                  )}
                </div>
              </div>

              {/* Certification Details */}
              <div className="lg:col-span-9 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                    Professional Certification
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Issued: {professionalCert.issueDate}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                  {professionalCert.name}
                </h3>

                <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                  {professionalCert.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {professionalCert.skills.map((s) => (
                    <span 
                      key={s}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-zinc-200 border border-white/10"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <a
                    href="https://www.linkedin.com/in/kevin-naufal-dany/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <span>Verify Credential on LinkedIn</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Recognized Specializations & Academies */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {otherCerts.map((cert) => (
            <GlowCard
              key={cert.id}
              customSize
              glowColor="zinc"
              className="p-6 rounded-2xl bg-white border border-brand-border/80 hover:border-brand-primary/40 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-brand-secondary">
                  <span>{cert.issuer}</span>
                  <span>{cert.issueDate}</span>
                </div>
                <h4 className="text-lg font-bold text-brand-dark tracking-tight leading-snug">
                  {cert.name}
                </h4>
                <p className="text-xs text-brand-secondary leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-zinc-200/60">
                {cert.skills.map((s) => (
                  <span 
                    key={s}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-zinc-50 border border-zinc-200 text-brand-secondary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </GlowCard>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default CertificationsSection;
