import Image from "next/image";
import { SpeechButton } from "@/components/speech-button";

export default function Home() {
  const pageContent = "這是一個 Vision Bridge 的 TTS 語音測試。";
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Vision Bridge</h1>
          <SpeechButton text={pageContent} />
        </div>
        
        <p className="text-lg mb-4">{pageContent}</p>
        
        <div className="w-full border-b border-gray-200 dark:border-gray-700 my-4"></div>
        
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="#features"
          >
            Explore Features
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="#how-to-use"
          >
            How to use
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#about"
        >
          About
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#accessibility"
        >
          Accessibility
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#contact"
        >
          Contact
        </a>
      </footer>
    </div>
  );
}