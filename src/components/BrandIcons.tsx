type IconProps = {
  size?: number
  className?: string
}

export function GitHubIcon({ size = 18, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.85 9.71.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.79.62-3.38-1.22-3.38-1.22-.46-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63 1.02.07 1.55 1.07 1.55 1.07.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.23-.26-4.57-1.14-4.57-5.06 0-1.12.39-2.03 1.04-2.75-.1-.26-.45-1.3.1-2.71 0 0 .85-.28 2.78 1.05A9.37 9.37 0 0 1 12 6.93c.86 0 1.73.12 2.53.34 1.93-1.33 2.78-1.05 2.78-1.05.55 1.41.2 2.45.1 2.71.65.72 1.04 1.63 1.04 2.75 0 3.93-2.35 4.79-4.58 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.1 10.1 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}

export function LinkedInIcon({ size = 18, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3.25 9.72h3.46V21H3.25V9.72Zm5.75 0h3.31v1.54h.05c.46-.88 1.6-1.81 3.29-1.81 3.52 0 4.17 2.32 4.17 5.34V21h-3.45v-5.51c0-1.31-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H9V9.72Z" />
    </svg>
  )
}

export function FacebookIcon({ size = 18, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M14.5 8.25V6.6c0-.78.52-.96.88-.96h2.24V2.1L14.53 2C11.1 2 10.32 4.57 10.32 6.22v2.03H7.62v3.98h2.7V22h4.18v-9.77h3.07l.46-3.98H14.5Z" />
    </svg>
  )
}

export function InstagramIcon({ size = 18, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
