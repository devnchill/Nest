import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ReleasesSection } from 'components/SnapshotReleaseSection'
import { MAX_RELEASES_TO_SHOW } from 'utils/constants'

describe('ReleasesSection', () => {
  const mockReleases = Array.from({ length: MAX_RELEASES_TO_SHOW + 1 }, (_, i) => ({
    id: `release-${i}`,
    name: `Release v${i}`,
    publishedAt: new Date().toISOString(),
    tagName: `v${i}`,
  }))

  it('renders only MAX_RELEASES_TO_SHOW items when showAll is false', () => {
    render(<ReleasesSection releases={mockReleases} showAll={false} onToggle={jest.fn()} />)

    const items = screen.getAllByText(/Release v/)
    expect(items.length).toBe(MAX_RELEASES_TO_SHOW)
  })

  it('renders all releases when showAll is true', () => {
    render(<ReleasesSection releases={mockReleases} showAll={true} onToggle={jest.fn()} />)

    const items = screen.getAllByText(/Release v/)
    expect(items.length).toBe(MAX_RELEASES_TO_SHOW + 1)
  })

  it('button has label `show all` for releases > MAX_RELEASES_TO_SHOW', () => {
    render(<ReleasesSection releases={mockReleases} showAll={false} onToggle={jest.fn()} />)
    expect(screen.getByRole('button', { name: 'show all' })).toBeInTheDocument()
  })

  it('button has label `show less` for releases > MAX_RELEASES_TO_SHOW', () => {
    render(<ReleasesSection releases={mockReleases} showAll={true} onToggle={jest.fn()} />)
    expect(screen.getByRole('button', { name: 'show less' })).toBeInTheDocument()
  })
})
