export default function Footer() {
  const links = [
    {name: 'Twitter', href: 'https://x.com/Benuoa'},
    {name: 'GitHub', href: 'https://github.com/benjaminv'},
  ]

  return (
    <footer className="border-t border-gray-200">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
          <p className="text-sm text-gray-500 font-mono">
            Built with <span className="text-brand">&hearts;</span> by Ben
          </p>
          <nav className="flex gap-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-black font-mono transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
