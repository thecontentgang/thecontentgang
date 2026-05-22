export default function Footer() {
  return (
    <footer className="w-full border-t border-white/8 bg-[#060606] max-w-[100vw] overflow-hidden">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        
        <img
          src="/Content-LOGO.png"
          alt="The Content Gang"
          className="h-16 sm:h-20 w-auto object-contain"
        />

        <p className="text-gray-500 text-[10px] sm:text-xs font-medium tracking-wide text-center">
          © {new Date().getFullYear()} The Content Gang. All rights reserved.
        </p>

        <div className="flex items-center gap-4 sm:gap-6">
          {['Instagram'].map((platform) => (
            <a
              key={platform}
              href="https://www.instagram.com/the.contentgang/"
              className="text-gray-500 hover:text-[#D1513B] text-[10px] sm:text-xs font-medium tracking-wide transition-colors duration-200"
            >
              {platform}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}