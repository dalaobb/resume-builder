import type { ContactKind } from './shared'

const paths: Record<ContactKind, React.ReactNode> = {
  email: (
    <>
      <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
      <path d="m2.5 5.5 5.5 3.7 5.5-3.7" />
    </>
  ),
  phone: (
    <path d="M3.5 2.5h2.2l1.3 3.3-1.8 1.5a9.5 9.5 0 0 0 4.5 4.5l1.5-1.8 3.3 1.3v2.2a1.7 1.7 0 0 1-1.9 1.7A12 12 0 0 1 1.8 4.4 1.7 1.7 0 0 1 3.5 2.5Z" />
  ),
  location: (
    <>
      <circle cx="8" cy="6" r="2.6" />
      <path d="M8 14c2.8-3 4.8-5.1 4.8-7.6A4.8 4.8 0 0 0 3.2 6.4C3.2 8.9 5.2 11 8 14Z" />
    </>
  ),
  link: (
    <>
      <path d="M6.5 9.5 9.5 6.5" />
      <path d="M7.2 4.5 8.6 3.1a3 3 0 1 1 4.3 4.3l-1.4 1.4" />
      <path d="M8.8 11.5 7.4 12.9a3 3 0 1 1-4.3-4.3l1.4-1.4" />
    </>
  ),
  gender: (
    <>
      <circle cx="8" cy="5" r="2.4" />
      <path d="M4.5 13.5c.8-2.4 6.2-2.4 7 0" />
    </>
  ),
  birth: (
    <>
      <rect x="3" y="2.5" width="10" height="11" rx="1.5" />
      <path d="M3 6.5h10M6 1.5v2M10 1.5v2" />
    </>
  ),
  native: (
    <>
      <path d="M5.5 14V2.5" />
      <path d="M5.5 2.5h6l-1.6 2.4L11.5 7h-6" />
    </>
  ),
  political: (
    <path d="m8 1.5 2 4.1 4.5.7-3.2 3.1.7 4.5-4-2.1-4 2.1.7-4.5L1.5 6.3l4.5-.7Z" />
  ),
  salary: (
    <>
      <circle cx="8" cy="8" r="6.3" />
      <path d="M5.8 5.6l4.4 4.8M10.2 5.6l-4.4 4.8M6.4 7.8h3.2" />
    </>
  ),
  available: (
    <>
      <circle cx="8" cy="8" r="6.3" />
      <path d="M8 4.2V8l2.6 1.6" />
    </>
  ),
}

export function ContactIcon({ kind }: { kind: ContactKind }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3 w-3 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[kind]}
    </svg>
  )
}
