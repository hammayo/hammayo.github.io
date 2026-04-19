// content/cv.ts
// Single source of truth for CV data.
// Phase 2: skills filled in, roles/education scaffolded with placeholders.
// Phase 3+: expand roles and education with real entries.
import { SOCIAL } from '@/lib/constants';

export const cv = {
  linkedIn: SOCIAL.linkedin,
  placeholderText: 'Full CV coming soon — view my LinkedIn profile in the meantime.',

  skills: {
    languages: ['Go', 'C#', '.NET', 'TypeScript', 'SQL', 'Python'],
    platforms: ['Azure', 'Kubernetes', 'Docker', 'GitHub Actions', 'AWS'],
    tools:     ['Kafka', 'Redis', 'PostgreSQL', 'Terraform', 'Grafana'],
  },

  roles: [
    {
      title:   'Senior Backend Engineer', // TODO: replace with real role
      company: 'HMPPS / MoJ',            // TODO: replace with real company
      period:  '2020 – present',          // TODO: replace with real period
      summary: 'Platform infrastructure and microservices.',
      tags:    ['Go', 'Kubernetes', 'Azure'],
    },
  ],

  education: [
    {
      institution:   'TODO: University name',  // TODO: replace
      qualification: 'TODO: Degree',           // TODO: replace
      year:          2004,                     // TODO: replace
    },
  ],
};
