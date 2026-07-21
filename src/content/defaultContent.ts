import {
  certifications,
  currentResearch,
  earlierResearch,
  education,
  enjoyment,
  experiences,
  favorites,
  galleryPhotos,
  glanceStats,
  homeAbout,
  interests,
  projects,
  quickFacts,
  site,
  skillGroups,
  values,
} from '../data/portfolio'

export const defaultPortfolioContent = {
  site,
  glanceStats,
  homeAbout,
  quickFacts,
  experiences,
  education,
  currentResearch,
  earlierResearch,
  projects,
  skillGroups,
  certifications,
  values,
  enjoyment,
  interests,
  galleryPhotos,
  favorites,
}

export type PortfolioContent = typeof defaultPortfolioContent

export function clonePortfolioContent(content: PortfolioContent): PortfolioContent {
  return JSON.parse(JSON.stringify(content)) as PortfolioContent
}

export function isPortfolioContent(value: unknown): value is PortfolioContent {
  if (!value || typeof value !== 'object') return false
  const content = value as Partial<PortfolioContent>
  return Boolean(
    content.site &&
      Array.isArray(content.projects) &&
      Array.isArray(content.experiences) &&
      Array.isArray(content.education) &&
      content.favorites &&
      typeof content.favorites === 'object',
  )
}
