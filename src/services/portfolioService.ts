import { supabase } from '@/utils/supabase';
import { Project, Service, Experience } from '@/types';
import { Certification, certificationsData } from '@/data/certifications';
import { projectsData } from '@/data/projects';
import { servicesData } from '@/data/services';
import { experiencesData } from '@/data/experiences';

function parseJsonArray<T = string>(val: any): T[] {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return [];
    }
  }
  return [];
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn('Supabase projects fallback to local data:', error);
      return projectsData;
    }

    return data.map((item) => ({
      slug: item.slug,
      title: item.title,
      category: item.category as 'Real Project' | 'Exploration',
      tags: parseJsonArray<string>(item.tags),
      image: item.image,
      gallery: parseJsonArray<string>(item.gallery),
      summary: item.summary,
      description: item.description,
      service: item.service,
      timeline: item.timeline,
      tools: parseJsonArray<string>(item.tools),
      client: item.client,
      liveUrl: item.live_url,
      metrics: parseJsonArray<{ label: string; value: string }>(item.metrics),
    }));
  } catch (err) {
    console.warn('fetchProjects error, using fallback:', err);
    return projectsData;
  }
}

export async function fetchProjectBySlug(slug: string): Promise<Project | undefined> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) {
      return projectsData.find((p) => p.slug === slug);
    }

    return {
      slug: data.slug,
      title: data.title,
      category: data.category as 'Real Project' | 'Exploration',
      tags: parseJsonArray<string>(data.tags),
      image: data.image,
      gallery: parseJsonArray<string>(data.gallery),
      summary: data.summary,
      description: data.description,
      service: data.service,
      timeline: data.timeline,
      tools: parseJsonArray<string>(data.tools),
      client: data.client,
      liveUrl: data.live_url,
      metrics: parseJsonArray<{ label: string; value: string }>(data.metrics),
    };
  } catch (err) {
    console.warn('fetchProjectBySlug error, using fallback:', err);
    return projectsData.find((p) => p.slug === slug);
  }
}

export async function fetchServices(): Promise<Service[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return servicesData;
    }

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      tags: parseJsonArray<string>(item.tags),
      mockupImages: parseJsonArray<string>(item.mockup_images),
    }));
  } catch (err) {
    console.warn('fetchServices error, using fallback:', err);
    return servicesData;
  }
}

export async function fetchExperiences(): Promise<Experience[]> {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return experiencesData;
    }

    return data.map((item) => ({
      company: item.company,
      role: item.role,
      period: item.period,
      current: item.current,
      location: item.location,
      description: item.description,
    }));
  } catch (err) {
    console.warn('fetchExperiences error, using fallback:', err);
    return experiencesData;
  }
}

export async function fetchCertifications(): Promise<Certification[]> {
  try {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return certificationsData;
    }

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      issuer: item.issuer,
      issueDate: item.issue_date,
      credentialId: item.credential_id || undefined,
      isProfessional: item.is_professional,
      badgeUrl: item.badge_url || undefined,
      description: item.description,
      skills: parseJsonArray<string>(item.skills),
      credentialUrl: item.credential_url || undefined,
    }));
  } catch (err) {
    console.warn('fetchCertifications error, using fallback:', err);
    return certificationsData;
  }
}
