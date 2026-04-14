# Implementation Plan - Code_D-F Frontend Build

This plan outlines the steps to build the frontend for the Code_D-F project following the user's specific tech stack and folder structure requirements.

## User Review Required

> [!IMPORTANT]
> - I will initialize the Next.js app in the current directory (`e:\surya\Code_D-F`).
> - I will use `npm` as the package manager as implied by the `npm i` and `npm run dev` instructions.
> - I will assume the backend is running at `http://localhost:5000` as specified.

## Proposed Changes

### 1. Project Initialization
- Run `npx create-next-app@latest ./` with the following flags:
  - `--typescript`
  - `--tailwind`
  - `--eslint`
  - `--app`
  - `--src-dir false` (as per the structure showing `app/` at root)
  - `--import-alias "@/*"`

### 2. Dependency Installation
- Install core dependencies:
  - `zustand`
  - `@tanstack/react-query`
  - `axios`
  - `framer-motion`
  - `lucide-react` (standard icon library for ShadCN)
  - `clsx`, `tailwind-merge` (UI utilities)

### 3. ShadCN UI Setup
- Run `npx shadcn-ui@latest init` to set up the design system.
- Add essential ShadCN components: `button`, `input`, `card`, `forms`, `toast`, `dialog`, `tabs`, `avatar`.

### 4. Folder Structure Setup
- Create the hierarchical structure:
  - `app/(auth)/login`, `app/(auth)/register`, `app/(auth)/forgot-password`
  - `app/(dashboard)/student/`, `app/(dashboard)/hod/`
  - `components/ui`, `components/auth`, `components/student`, `components/hod`, `components/shared`
  - `lib/`, `hooks/`, `store/`, `types/`

### 5. Core Infrastructure Implementation
- **lib**: Set up `api.ts` (axios instance) and `queryClient.ts`.
- **store**: Initialize `authStore.ts` and `uiStore.ts` using Zustand.
- **hooks**: Create `useAuth.ts` for authentication logic.
- **middleware**: Implement `middleware.ts` for route protection (JWT guard).

### 6. UI & Page Implementation
- **Shared Components**: Sidebar, Header, Page wrappers.
- **Auth Flow**: Login and Register pages with form validation (likely using `react-hook-form` and `zod` as they are ShadCN defaults).
- **Dashboards**: 
  - Student Dashboard (Roadmap, Progress, Resume, Recommendations).
  - HOD Dashboard (Students, Rankings, Analytics, Announcements).

### 7. API Wiring
- Connect the frontend to `http://localhost:5000` endpoints using the Axios instance and React Query.

## Verification Plan

### Automated Tests
- Run `npm run lint` to check for TypeScript/ESLint errors.
- Run `npm run build` to ensure the project compiles correctly.

### Manual Verification
- Run `npm run dev` and navigate through the pages.
- Verify the responsive design and animations.
- Check the console for any API connection errors.
