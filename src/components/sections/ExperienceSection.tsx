import React from 'react';
import { Timeline } from '@/components/ui/timeline';

export const ExperienceSection: React.FC = () => {
  return (
    <Timeline
      id="experience"
      title="Key Milestones"
      periodLabel="2023 — Present"
      activeColor="#10b981"
      backgroundColor="#111111"
      textColor="#ffffff"
      mutedTextColor="#a1a1aa"
    />
  );
};

export default ExperienceSection;
