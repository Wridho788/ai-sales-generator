export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-violet-50 to-blue-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-violet-900 mb-4">
          AI Sales Page Generator
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Generate high-converting landing pages instantly
        </p>
        <a
          href="/dashboard"
          className="inline-block px-8 py-3 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition font-semibold"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
