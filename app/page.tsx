export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          AI Sales Page Generator
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Generate high-converting landing pages instantly
        </p>
        <a
          href="/dashboard"
          className="inline-block px-8 py-3 bg-violet-500 text-white rounded-xl hover:bg-violet-600 active:scale-[0.98] transition-all duration-150 font-semibold"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
