# Sovereign Revoke (svgn-revoke) - Copilot Instructions

## Project Overview
A **free, privacy-first** Web3 security tool that allows users to connect their wallet, scan for token approvals (allowances), and revoke them to secure their assets.

**Domain:** revoke.svgn.org  
**Brand:** SVGN (Sovereign) - Privacy-first, Minimalist, Dark Mode

## Architecture Philosophy
- **No Login Required**: Wallet connection = User identity
- **No Database**: All data comes from blockchain via indexer APIs
- **Privacy First**: Zero data collection
- **Free Forever**: No user management overhead

## Tech Stack

### Core Framework
- **Next.js:** 14.2.15 (App Router)
- **TypeScript:** 5.5+
- **Node.js:** 20+
- **Package Manager:** npm

### Frontend UI
- **UI Components:** shadcn/ui (Radix UI + Tailwind CSS)
- **CSS Framework:** Tailwind CSS 3.4.3
- **Icons:** Lucide React
- **Theme:** Dark mode default, minimalist, high contrast (Black/White)

### Web3 Integration
- **RainbowKit:** Wallet connection UI
- **Wagmi v2:** React hooks for Ethereum
- **Viem:** Low-level blockchain interactions
- **TanStack Query:** Data fetching (required by Wagmi)

## Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/          # Dashboard page
│   ├── globals.css         # Dark theme CSS
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── web3/               # Web3 specific components
│   └── shared/             # Shared components
├── lib/
│   ├── web3/               # Web3 utilities
│   └── utils.ts            # General utilities
├── providers/              # React context providers
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript types
└── services/               # Business logic services
```

## Development Guidelines

### Styling
- Always use dark mode as default
- Follow minimalist design principles
- Use Tailwind CSS classes
- Prefer shadcn/ui components

### Web3
- Use wagmi hooks for blockchain interactions
- Handle wallet connection states properly
- Show clear transaction status feedback

### Code Style
- Use TypeScript strict mode
- Prefer Server Components when possible
- Keep components focused and reusable
