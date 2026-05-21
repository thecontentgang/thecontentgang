export default function Footer() {
  return (
    <footer className="w-full border-t border-white/8 bg-[#060606]">
      <div className="max-w-[1080px] mx-auto px-6 sm:px-10 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <img
          src="/Content-LOGO.png"
          alt="The Content Gang"
          className="h-20 w-auto object-contain"
        />

        <p className="text-gray-500 text-[12px] font-medium tracking-wide">
          © {new Date().getFullYear()} The Content Gang. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          {['Instagram', 'LinkedIn', 'Twitter'].map((platform) => (
            <a
              key={platform}
              href="#"
              className="text-gray-500 hover:text-[#D1513B] text-[12px] font-medium tracking-wide transition-colors duration-200"
            >
              {platform}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}