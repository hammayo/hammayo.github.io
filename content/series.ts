// content/series.ts
// Flagship series config. The name here must match the `series.name`
// frontmatter value in each post — renaming the series is a one-file edit
// here plus the frontmatter of tagged posts.

export const series = {
  slug:    'spec-driven',
  name:    'Spec-Driven',
  title:   'Spec-Driven: AI development that actually ships',
  tagline: 'Using AI coding tools with twenty years of engineering judgement.',
  description: [
    'Most AI-coding content is written by people who have never had to live with software for a decade. This series is the other perspective: what changes — and what absolutely does not — when an engineer with twenty years across payment systems, prison software, and retail infrastructure hands the typing over to a machine.',
    'Specs before prompts. Review gates before merges. Evidence before claims. The tools are new; the judgement is not.',
  ],
};
