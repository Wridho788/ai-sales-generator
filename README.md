# AI Sales Page Generator

Generate high-converting sales/landing pages instantly using AI. This project leverages OpenAI/Groq LLMs to create persuasive marketing copy and page sections based on your product, audience, and tone.

## Features
- ✨ Generate complete sales pages with AI
- 🎯 Customizable: input product name, description, audience, and tone
- 🔄 Regenerate specific sections (hero, benefits) on demand
- 🌗 Light/Dark mode toggle
- 📝 History of generated pages
- ⚡ Modern UI with Tailwind CSS and React 19
- 🔒 Data saved securely with Supabase

## Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `GROQ_API_KEY` (or OpenAI key if using OpenAI)

3. **Run the development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Usage
- Fill out the form with your product details.
- Click **Generate Page** to create a new sales page.
- Use the **Template Switcher** and **Theme Toggle** for customization.
- View and manage your generated pages in the **History** section.

## Tech Stack
- [Next.js App Router](https://nextjs.org/docs/app)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [OpenAI/Groq LLM](https://platform.openai.com/)
- [Zod](https://zod.dev/) for validation

## Project Structure
- `app/` — Next.js app directory (API routes, pages)
- `components/` — UI and form components
- `features/generator/` — AI logic, prompt building, types
- `lib/` — API clients (OpenAI, Supabase, session utils)
- `store/` — Zustand state management

## License
MIT

---
Built with ❤️ by your team.
