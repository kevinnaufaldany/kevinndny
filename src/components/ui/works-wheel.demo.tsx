"use client";

import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";
import { projectsData } from "@/data/projects";

export default function WorksWheelDemo() {
  const items: WorksWheelItem[] = projectsData.map((project) => ({
    title: project.title,
    image: project.image,
    href: `/project/${project.slug}`,
    category: project.category,
  }));

  return (
    <div className="bg-white text-brand-dark w-full h-[36rem]">
      <WorksWheel items={items} label="Selected '26" action="View Project" />
    </div>
  );
}
