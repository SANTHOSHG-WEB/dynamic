# dynQR - Dynamic QR Code Management Platform

A modern, free-to-use QR code management platform built with Next.js. Create, manage, and track dynamic QR codes without any authentication barriers.

![dynQR Platform](https://img.shields.io/badge/Next.js-15.1.4-black?style=for-the-badge&logo=next.js)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)

## ✨ Features

- 🚀 **Zero Authentication** - Start creating QR codes immediately, no signup required
- 💾 **Local Storage** - All data stored in your browser using LocalDB
- 🎨 **Modern UI** - Beautiful, responsive design with glassmorphism effects
- ⚡ **Instant Updates** - Change QR code destinations without reprinting
- 📊 **Analytics Ready** - Track scan counts and activity
- 🎯 **Full CRUD** - Create, Read, Update, and Delete QR codes seamlessly
- 🌐 **No Backend Required** - Works entirely in the browser

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SANTHOSHG-WEB/dynamic.git
   cd dynamic
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 Usage

### Creating a QR Code

1. Click **"Open Dashboard"** from the landing page
2. Click **"Create New"** in the sidebar
3. Fill in:
   - **QR Code Name** - A descriptive name for your reference
   - **Destination URL** - Where the QR code should redirect
   - **Description** (Optional) - Additional notes
4. Click **"Generate Dynamic QR"**
5. Your QR code is created and stored locally!

### Managing QR Codes

- **View All Codes** - Navigate to "My Codes" in the sidebar
- **Edit** - Click the edit icon on any QR code
- **Delete** - Click the trash icon to remove a QR code
- **Toggle Status** - Click the Active/Paused badge to enable/disable a code
- **Copy Link** - Click the copy icon to get the short link

## 🏗️ Project Structure

```
dynqr/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── dashboard/          # Dashboard pages
│   │   │   ├── codes/          # QR code management
│   │   │   │   ├── new/        # Create new QR code
│   │   │   │   ├── [id]/       # Edit QR code
│   │   │   │   └── page.tsx    # List all codes
│   │   │   └── layout.tsx      # Dashboard layout
│   │   ├── page.tsx            # Landing page
│   │   └── layout.tsx          # Root layout
│   ├── components/             # Reusable components
│   ├── lib/
│   │   ├── db/
│   │   │   └── local-db.ts     # LocalDB utility
│   │   ├── auth/
│   │   │   └── auth-context.tsx # Guest auth context
│   │   └── utils/              # Utility functions
│   └── styles/                 # Global styles
├── public/                     # Static assets
└── package.json
```

## 🛠️ Technology Stack

- **Framework**: [Next.js 15.1.4](https://nextjs.org/)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: Browser LocalStorage
- **Font**: Geist (via next/font)
- **Notifications**: Sonner (Toast notifications)

## 🎨 Design Philosophy

dynQR follows modern web design principles:

- **Glassmorphism** - Frosted glass effects for depth
- **Dark Mode First** - Optimized for dark theme
- **Micro-animations** - Smooth transitions and hover effects
- **Responsive** - Mobile-first design approach
- **Accessibility** - Semantic HTML and ARIA labels

## 📦 LocalDB Storage

All QR codes are stored in your browser's localStorage using our custom LocalDB utility:

```typescript
// Create a QR code
LocalDB.createCode({
  name: 'My QR Code',
  current_url: 'https://example.com',
  description: 'Optional description',
  short_id: 'abc123',
  is_active: true
})

// Get all codes
const codes = LocalDB.getCodes()

// Update a code
LocalDB.updateCode(id, { current_url: 'https://new-url.com' })

// Delete a code
LocalDB.deleteCode(id)
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SANTHOSHG-WEB/dynamic)

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

3. **Or export as static site**
   ```bash
   npm run build
   # Deploy the 'out' directory to any static hosting
   ```

## 🔧 Configuration

### Environment Variables (Optional)

Create a `.env.local` file for optional configurations:

```env
# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase (Optional - for future backend integration)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Note**: The current version works entirely without a backend!

## 📝 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Icons by [Lucide](https://lucide.dev/)
- Font optimization by [Vercel](https://vercel.com/font)

## 📧 Contact

**Santhosh G** - [@SANTHOSHG-WEB](https://github.com/SANTHOSHG-WEB)

Project Link: [https://github.com/SANTHOSHG-WEB/dynamic](https://github.com/SANTHOSHG-WEB/dynamic)

---

<div align="center">
  <strong>Made with ❤️ for the open-source community</strong>
</div>
