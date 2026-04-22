import { MAX_RELEASES_TO_SHOW } from 'utils/constants'
import Release from 'components/Release'
import type { Release as ReleaseType } from 'types/release'

type ReleasesSectionProps = {
  releases: ReleaseType[]
  showAll: boolean
  onToggle: () => void
}

export const ReleasesSection = ({ releases, showAll, onToggle }: ReleasesSectionProps) => {
  const showButton = {
    label: showAll ? 'show less' : 'show all',
    classname:
      'dark:hover:text-white rounded-md border-1 font-light border-blue-400 p-2 text-blue-400 hover:bg-blue-500 hover:text-white',
  }

  const visibleReleases = showAll ? releases : releases.slice(0, MAX_RELEASES_TO_SHOW)
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visibleReleases.map((release, index) => {
          return (
            <Release
              key={
                release.id || `${release.tagName}-${release.repositoryName ?? 'unknown'}-${index}`
              }
              release={release as unknown as ReleaseType}
              showAvatar={true}
              index={index}
            />
          )
        })}
      </div>
      {releases.length > MAX_RELEASES_TO_SHOW && (
        <div className="flex w-full justify-center">
          <button className={showButton.classname} type="button" onClick={onToggle}>
            {showButton.label}
          </button>
        </div>
      )}
    </>
  )
}
