# OnlineBaithak 📹

OnlineBaithak is a modern, full-stack video conferencing application that enables seamless, real-time communication. Designed with a clean, responsive user interface and powered by robust third-party services, this platform allows users to host, schedule, and join video meetings effortlessly. "Baithak" translates to an informal meeting or gathering, reflecting the app's mission to bring people together virtually.

## 🚀 Key Features

- **Secure Authentication:** User sign-up, sign-in, and session management handling via Clerk.
- **Real-Time Video Meetings:** Instant, high-quality video and audio calls powered by the Stream Video SDK.
- **Meeting Management:** Schedule future meetings, view upcoming/past meetings, and record meeting sessions.
- **Join via Link/ID:** Easily shareable meeting links and access codes for quick participant onboarding.
- **Comprehensive Meeting Controls:** Screen sharing, audio/video toggles, grid layout, speaker view, and an end-call mechanism.
- **Responsive & Modern UI:** A beautifully designed interface using Tailwind CSS and Radix UI components, ensuring a great experience across all devices.
- **Dark Mode Support:** Built-in seamless theme switching.
- **Interactive UX:** Smooth animations with Framer Motion and elegant toast notifications with Sonner.

## 💻 Tech Stack

### Frontend
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) Primitives, Lucide React (Icons)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Date Utilities:** `date-fns`, React Datepicker
- **Notifications:** Sonner

### Third-Party APIs & Integrations
This project heavily leverages specialized third-party services to handle complex infrastructure securely and efficiently:

1. **[Clerk](https://clerk.com/):** 
   - Used for end-to-end user authentication and authorization.
   - Provides pre-built components for sign-in/sign-up flows and secures protected routes.
2. **[Stream Video & Audio API](https://getstream.io/video/):** 
   - Handles the core video conferencing infrastructure via `@stream-io/video-react-sdk` and `@stream-io/node-sdk`.
   - Manages WebRTC connections, media routing, meeting recordings, and participant state management.

## ⚙️ Getting Started

### Prerequisites
Make sure you have Node.js and `npm` (or `yarn`/`pnpm`/`bun`) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd OnlineBaithak
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add the required keys for Clerk and Stream:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
   STREAM_SECRET_KEY=your_stream_secret_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

- `/app`: Contains Next.js App Router pages, layouts, and API routes.
- `/components`: Reusable UI components (Navbar, Sidebar, Meeting cards, Video controls).
- `/hooks`: Custom React hooks.
- `/providers`: Context providers for Stream Video and Theme management.
- `/actions`: Server actions for secure backend logic.
- `/constants`: Global static constants and configuration data.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
