# Modern Portfolio Website

A highly interactive and visually engaging portfolio website built with modern web technologies. This project showcases advanced animations, responsive design, and a seamless user experience.

## 🚀 Features

-   **Immersive User Experience**:
    -   **Custom Cursor**: Context-aware cursor that adapts to interactive elements.
    -   **Smooth Scrolling**: Lenis-based smooth scrolling for a fluid navigation feel.
    -   **Particle Background**: Interactive particle grid that responds to mouse movement.
    -   **Preloader**: Cinematic intro animation to load assets gracefully.

-   **Dynamic Sections**:
    -   **Hero Section**: Stunning landing area with scrambled text effects and 3D interactions.
    -   **Design Process**: Visual breakdown of the creative workflow.
    -   **Projects Showcase**: Interactive grid displaying detailed case studies.
    -   **Tech Stack**: Infinite scrolling loop of skill logos.
    -   **Experience**: Timeline view of professional history.
    -   **Community**: Highlights of community involvement and contributions.

-   **Technical Excellence**:
    -   **Responsive Design**: Fully optimized for all device sizes (Mobile, Tablet, Desktop).
    -   **Performance**: Optimized assets and lazy loading for fast initial paint.
    -   **Accessibility**: Built with semantic HTML and ARIA standards in mind.

## 🛠️ Tech Stack

### Core Frameworks
-   **[Next.js 15](https://nextjs.org/)**: React framework for the App Router architecture.
-   **[TypeScript](https://www.typescriptlang.org/)**: Type-safe development.
-   **[React 19](https://react.dev/)**: Latest React features including Server Components.

### Styling & Design
-   **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework.
-   **[Radix UI](https://www.radix-ui.com/)**: Unstyled, accessible UI primitives for interactive components.
-   **[Lucide React](https://lucide.dev/)** & **[React Icons](https://react-icons.github.io/react-icons/)**: Comprehensive icon libraries.

### Animation & Interaction
-   **[Framer Motion](https://www.framer.com/motion/)**: Powerful animation library for React.
-   **[GSAP](https://greensock.com/gsap/)** (via dependencies/hooks): Advanced animation sequencing.
-   **embla-carousel**: Touch-enabled carousel slider.

### Forms & Validation
-   **[React Hook Form](https://react-hook-form.com/)**: Performant form handling.
-   **[Zod](https://zod.dev/)**: Schema validation for form inputs.

## 📂 Project Structure

```bash
Portfolio/
├── app/                              # Next.js App Router
│   ├── api/                          # API routes
│   ├── globals.css                   # Global styles & Tailwind directives
│   ├── layout.tsx                    # Root layout (metadata, providers)
│   └── page.tsx                      # Main entry point (Landing Page)
│
├── components/                       # React Components
│   ├── ui/                           # Base UI Elements (Radix UI wrappers)
│   │   ├── accordion.tsx             # Collapsible accordion component
│   │   ├── alert-dialog.tsx          # Modal alert dialogs
│   │   ├── alert.tsx                 # Inline alert messages
│   │   ├── aspect-ratio.tsx          # Aspect ratio container
│   │   ├── avatar.tsx                # User avatar component
│   │   ├── badge.tsx                 # Status/label badges
│   │   ├── breadcrumb.tsx            # Navigation breadcrumbs
│   │   ├── button-group.tsx          # Grouped button actions
│   │   ├── button.tsx                # Primary button component
│   │   ├── calendar.tsx              # Date picker calendar
│   │   ├── card.tsx                  # Content card container
│   │   ├── carousel.tsx              # Image/content carousel (Embla)
│   │   ├── chart.tsx                 # Data visualization (Recharts)
│   │   ├── checkbox.tsx              # Checkbox input
│   │   ├── collapsible.tsx           # Collapsible content section
│   │   ├── command.tsx               # Command palette (cmdk)
│   │   ├── context-menu.tsx          # Right-click context menu
│   │   ├── dialog.tsx                # Modal dialog component
│   │   ├── drawer.tsx                # Slide-out drawer (Vaul)
│   │   ├── dropdown-menu.tsx         # Dropdown menu component
│   │   ├── empty.tsx                 # Empty state placeholder
│   │   ├── field.tsx                 # Form field wrapper
│   │   ├── form.tsx                  # Form utilities (React Hook Form)
│   │   ├── hover-card.tsx            # Hover preview card
│   │   ├── input-group.tsx           # Input with addons
│   │   ├── input-otp.tsx             # OTP/PIN input
│   │   ├── input.tsx                 # Text input component
│   │   ├── item.tsx                  # List/menu item
│   │   ├── kbd.tsx                   # Keyboard shortcut display
│   │   ├── label.tsx                 # Form label
│   │   ├── magnetic-button.tsx       # Magnetic hover button effect
│   │   ├── menubar.tsx               # Desktop menubar
│   │   ├── navigation-menu.tsx       # Navigation dropdown menu
│   │   ├── pagination.tsx            # Page navigation
│   │   ├── popover.tsx               # Popover tooltip
│   │   ├── progress.tsx              # Progress bar
│   │   ├── radio-group.tsx           # Radio button group
│   │   ├── resizable.tsx             # Resizable panels
│   │   ├── scroll-area.tsx           # Custom scrollbar area
│   │   ├── select.tsx                # Select dropdown
│   │   ├── separator.tsx             # Visual divider
│   │   ├── sheet.tsx                 # Side sheet modal
│   │   ├── sidebar.tsx               # Sidebar navigation
│   │   ├── skeleton.tsx              # Loading skeleton
│   │   ├── slider.tsx                # Range slider
│   │   ├── sonner.tsx                # Toast notifications (Sonner)
│   │   ├── spinner.tsx               # Loading spinner
│   │   ├── switch.tsx                # Toggle switch
│   │   ├── table.tsx                 # Data table
│   │   ├── tabs.tsx                  # Tab navigation
│   │   ├── textarea.tsx              # Multi-line text input
│   │   ├── toast.tsx                 # Toast notification system
│   │   ├── toaster.tsx               # Toast container
│   │   ├── toggle-group.tsx          # Toggle button group
│   │   ├── toggle.tsx                # Toggle button
│   │   ├── tooltip.tsx               # Hover tooltip
│   │   ├── use-mobile.tsx            # Mobile detection hook
│   │   └── use-toast.ts              # Toast hook
│   │
│   ├── about-section.tsx             # About Me section
│   ├── community-section.tsx         # Community involvement section
│   ├── contact-section.tsx           # Contact form section
│   ├── custom-cursor.tsx             # Custom cursor effect
│   ├── design-process-section.tsx    # Design workflow section
│   ├── experience-section.tsx        # Work experience timeline
│   ├── floating-nav.tsx              # Floating navigation bar
│   ├── footer.tsx                    # Site footer
│   ├── hero-section.tsx              # Hero/landing section
│   ├── logo-loop.tsx                 # Infinite logo carousel
│   ├── particle-grid.tsx             # Interactive particle background
│   ├── preloader.tsx                 # Loading animation
│   ├── projects-section.tsx          # Projects showcase grid
│   ├── smooth-scroll.tsx             # Lenis smooth scroll wrapper
│   ├── tech-stack-section.tsx        # Technology stack display
│   ├── theme-provider.tsx            # Theme context provider
│   └── velocity-scroll.tsx           # Velocity-based scroll text
│
├── hooks/                            # Custom React Hooks
│   ├── use-mobile.ts                 # Mobile viewport detection
│   └── use-toast.ts                  # Toast notification hook
│
├── lib/                              # Utility Functions
│   └── utils.ts                      # Tailwind merge utilities (cn)
│
├── public/                           # Static Assets
│   ├── dp.png            # Profile photo
│   ├── meetai-app.png                # Project screenshot
│   ├── resume.pdf                    # Downloadable resume
│   └── skybus-reservation.png        # Project screenshot
│
├── styles/                           # Additional Styles
│   └── globals.css                   # Extra global CSS
│
├── .gitignore                        # Git ignore rules
├── components.json                   # shadcn/ui configuration
├── next-env.d.ts                     # Next.js TypeScript declarations
├── next.config.mjs                   # Next.js configuration
├── package.json                      # Dependencies & scripts
├── postcss.config.mjs                # PostCSS configuration
├── tailwind.config.ts                # Tailwind CSS configuration
└── tsconfig.json                     # TypeScript configuration
```

### Key Directories Explained

| Directory | Purpose |
|-----------|---------|
| `app/` | Next.js 15 App Router - contains pages, layouts, and API routes |
| `components/` | All React components, organized by feature and UI primitives |
| `components/ui/` | Radix UI-based primitives configured via shadcn/ui |
| `hooks/` | Custom React hooks for shared logic |
| `lib/` | Utility functions like `cn()` for class merging |
| `public/` | Static files served directly (images, PDFs) |
| `styles/` | Additional CSS modules and overrides |

## ⚡ Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
-   **Node.js**: version 18.17 or later
-   **npm**, **pnpm**, or **yarn**

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open your browser**:
    Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📜 Scripts

-   `npm run dev`: Starts the development server with hot reloading.
-   `npm run build`: Creates a production-ready build.
-   `npm start`: Runs the production server (requires `npm run build` first).
-   `npm run lint`: Runs ESLint to check for code quality issues.

## 🎨 Customization

### Theming
The project uses Tailwind CSS for styling. You can customize the color palette, fonts, and other design tokens in the `tailwind.config.ts` (or `.js`) file and `app/globals.css`.

### Content
Most content is managed directly within the specific section components in the `components/` directory. For example, to update the projects list, verify the data arrays in `components/projects-section.tsx`.

## 📄 License
[MIT](LICENSE)
