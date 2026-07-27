export interface DownloadItem {
  name: string
  url: string
}

export interface ProductDownloadsProps {
  downloads: DownloadItem[]
}

export function ProductDownloads({ downloads }: ProductDownloadsProps) {
  if (!downloads || downloads.length === 0) return null

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {downloads.map((download, index) => (
        <a
          key={index}
          href={download.url}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {download.name}
        </a>
      ))}
    </div>
  )
}
