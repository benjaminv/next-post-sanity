import Link from 'next/link'

type SectionHeadingProps = {
  eyebrow: string
  heading: string
  description?: string
  action?: {label: string; href: string}
}

export default function SectionHeading({eyebrow, heading, description, action}: SectionHeadingProps) {
  return (
    <div className="mb-8">
      <p className="text-brand font-mono text-sm uppercase tracking-wider mb-3">{eyebrow}</p>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold">
            <span className="decoration-brand underline decoration-3 underline-offset-6">
              {heading}
            </span>
          </h2>
          {description && (
            <p className="mt-3 text-gray-500 text-base max-w-xl">{description}</p>
          )}
        </div>
        {action && (
          <Link
            href={action.href}
            className="text-brand font-mono text-sm whitespace-nowrap hover:underline"
          >
            {action.label} &rarr;
          </Link>
        )}
      </div>
    </div>
  )
}
