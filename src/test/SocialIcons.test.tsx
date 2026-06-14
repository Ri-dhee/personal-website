import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import SocialIcons from '../components/SocialIcons'

describe('SocialIcons', () => {
  it('renders all three social links', () => {
    const { getByLabelText } = render(<SocialIcons />)
    expect(getByLabelText('Blog')).toBeInTheDocument()
    expect(getByLabelText('GitHub')).toBeInTheDocument()
    expect(getByLabelText('ORCID')).toBeInTheDocument()
  })

  it('uses hero__social class by default and contact__social for square variant', () => {
    const { container, rerender } = render(<SocialIcons />)
    expect(container.firstChild).toHaveClass('hero__social')
    rerender(<SocialIcons variant="square" />)
    expect(container.firstChild).toHaveClass('contact__social')
  })

  it('opens links in new tab with rel=noopener', () => {
    const { getByLabelText } = render(<SocialIcons />)
    const link = getByLabelText('GitHub') as HTMLAnchorElement
    expect(link.target).toBe('_blank')
    expect(link.rel).toContain('noopener')
  })
})
