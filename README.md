# Phongphat's Full-Stack Developer Portfolio (Next.js + Supabase)

This is the source code for my personal portfolio website, built from scratch as a full-stack, database-driven application.

It features a public-facing site to showcase my projects and blogs, as well as a complete, secure admin dashboard for managing all content via full CRUD (Create, Read, Update, Delete) operations.

**View the Live Demo:** [Phongphat Portfolio](https://phongphatportfolio.vercel.app/)

## ✨ Features

This project is two applications in one: a dynamic public website and a secure private admin panel.

### 🌎 Public-Facing Site
- **Dynamic Pages:** All projects and blog posts are fetched directly from a Supabase Postgres database.
- **Server Components:** Built with the Next.js App Router, prioritizing fast performance and SEO with Server-Side Rendering (SSR).
- **Dynamic Routing:** Features dynamic routes for individual project pages (`/projects/[slug]`) and blog posts (`/blogs/[slug]`).
- **Tag Filtering:** The blog page can be filtered by tags (e.g., `?tag=React`) with the query handled by the database.
- **Image Slider:** Project detail pages feature a client-side image gallery to browse multiple images.
- **Working Contact Form:** A client-side form that sends emails directly to my inbox using EmailJS.
- **Responsive Design:** A custom, mobile-first design built from my own Figma mockups with Tailwind CSS.
- **Dark Mode:** Full dark/light mode support using `next-themes`.

### 🔒 Admin Panel
- **Secure Authentication:** A private login page that uses Supabase Auth to verify my identity.
- **Full CRUD:** A complete admin dashboard (`/admin/dashboard`) to **C**reate, **R**ead, **U**pdate, and **D**elete both projects and blog posts.
- **Supabase Storage Uploader:** A custom drag-and-drop file uploader component that uploads images directly to a Supabase Storage bucket.
- **Row Level Security (RLS):**
    - The public can **read** all data.
    - Only the authenticated admin (me) has permission to **create**, **update**, or **delete** data.
    - Only the authenticated admin can **upload** to the storage bucket.

## 🚀 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **Backend** | Supabase (PostgreSQL, Auth, Storage, RLS) |
| **Styling** | Tailwind CSS |
| **Icons & UI** | Lucide Icons, React Icons |
| **Components** | Embla Carousel, React Dropzone |
| **Blog Content** | @tailwindcss/typography (`prose`) |
| **Email Service** | EmailJS |

## 🛠️ Running This Project Locally

### 1. Set Up Your Supabase Backend
1.  **Create a Supabase Project:** Go to [Supabase.io](https://supabase.io/) and create a new project.
2.  **Create Database Tables:** Go to the "SQL Editor" and run the SQL scripts from this repo to create the `projects` and `blog_posts` tables.
3.  **Create Storage Bucket:** Go to "Storage" and create a **public** bucket named `public_media`.
4.  **Set Up RLS Policies:** Run the SQL scripts from this repo to set up Row Level Security for your tables and storage bucket.
5.  **Create Admin User:** Go to "Authentication" -> "Users" and "Invite user". Invite yourself, then log in and set a password.
6.  **Get API Keys:** Go to "Project Settings" -> "API". You will need the **Project URL** and the **`anon` public key**.
### 2. Set Up Your Environment Variables
Create a file named .env.local in the root of the project. Paste in your keys:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=YOUR_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_KEY

# EmailJS (for contact form)
NEXT_PUBLIC_EMAILJS_SERVICEID=YOUR_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATEID=YOUR_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLICKEY=YOUR_EMAILJS_PUBLIC_KEY
```

### 3. Configure Next.js for Supabase Images
   To use the Next.js `<Image>` component with Supabase Storage, you must add your storage hostname to `next.config.js`
```bash
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Find this hostname in your Supabase API settings
        hostname: 'YOUR_PROJECT_ID.supabase.co', 
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;
```

### 4. Install Dependencies and Run
```bash
# Install all packages
npm install

# Run the development server
npm run dev
```