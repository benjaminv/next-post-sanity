export default function Footer() {
  return (
    <footer className="bg-gray-50 relative">
      <div className="absolute inset-0 bg-[url(/images/tile-grid-black.png)] bg-size-[17px] opacity-20 bg-position-[0_1]" />
      <div className="container relative">
        <div className="flex flex-col items-start py-28 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-4 lg:w-1/2 lg:pr-4 mb-10 lg:mb-0">
            <h3 className="tagline text-center lg:text-left text-4xl lg:text-2xl font-mono leading-tight tracking-tighter">Ben does #Shopify and all e-commerce shyt.</h3>
            <div className="social flex gap-3 justify-center lg:justify-start font-mono text-sm mt-2 lg:mt-1">
              <a href="https://x.com/Benuoa" className="inline-flex gap-3 h-5 hover:underline">
                <svg height="16" viewBox="0 0 834.782 853.566" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M496.809 361.241 807.576 0h-73.642L464.095 313.661 248.576 0H0l325.907 474.31L0 853.127h73.646l284.957-331.236 227.604 331.236h248.576L496.791 361.241zM395.941 478.489l-33.022-47.23-262.738-375.82h113.116L425.33 358.737l33.022 47.23L733.97 800.208H620.853L395.941 478.506z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 items-center justify-center lg:justify-start lg:w-1/2 lg:max-w-1/3 lg:pl-4 text-xs">
            <span className="rounded-full flex gap-2 font-mono whitespace-nowrap items-center border border-black hover:bg-shopify hover:cursor-pointer focus:bg-shopify py-2 px-4 hover:text-white transition-colors duration-200" > Shopify </span>
            <span className="rounded-full flex gap-2 font-mono whitespace-nowrap items-center border border-black hover:bg-brand hover:cursor-pointer focus:bg-brand py-2 px-4 hover:text-white transition-colors duration-200" > Headless </span>
            <span className="rounded-full flex gap-2 font-mono whitespace-nowrap items-center border border-black hover:bg-sanity hover:cursor-pointer focus:bg-sanity py-2 px-4 hover:text-white transition-colors duration-200" > Sanity</span>
            <span className="rounded-full flex gap-2 font-mono whitespace-nowrap items-center border border-black hover:bg-storyblok hover:cursor-pointer focus:bg-storyblok py-2 px-4 hover:text-white transition-colors duration-200" > Storyblok </span>
            <span className="rounded-full flex gap-2 font-mono whitespace-nowrap items-center border border-black hover:bg-analytics hover:cursor-pointer focus:bg-analytics py-2 px-4 hover:text-white transition-colors duration-200" > Analytics </span>
            <span className="rounded-full flex gap-2 font-mono whitespace-nowrap items-center border border-black hover:bg-klaviyo-black hover:cursor-pointer focus:bg-klaviyo-black py-2 px-4 hover:text-white transition-colors duration-200" > Klaviyo </span>
            <span className="rounded-full flex gap-2 font-mono whitespace-nowrap items-center border border-black hover:bg-algolia hover:cursor-pointer focus:bg-algolia py-2 px-4 hover:text-white transition-colors duration-200" > Algolia </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
