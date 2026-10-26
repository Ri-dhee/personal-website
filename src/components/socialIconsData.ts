export interface SocialLink {
  id: 'blog' | 'github' | 'orcid'
  href: string
  label: string
}

export const SOCIALS: SocialLink[] = [
  { id: 'blog', href: 'https://abetterlifelearning.blogspot.com', label: 'Reading Venture by Rinzin Dorji' },
  { id: 'github', href: 'https://github.com/Ri-dhee', label: "Link to Rinzin Dorji's GitHub Profile" },
  { id: 'orcid', href: 'https://orcid.org/0009-0006-0258-3213', label: "Link to Rinzin Dorji's ORCID Profile" },
]
