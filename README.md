# Sovereign Revoke

🛡️ **Free, privacy-first token approval manager. Scan & revoke risky approvals to protect your Web3 assets.**

[![Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1089632&theme=light&t=1773305952077)](https://www.producthunt.com/products/sovereign-revoke?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-sovereign-revoke)

<a href="https://peerpush.net/p/sovereign-revoke" target="_blank" rel="noopener noreferrer">
  <img src="https://peerpush.net/p/sovereign-revoke/badge.png" alt="Sovereign Revoke badge" width="230" />
</a>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-blue)](https://www.typescriptlang.org/)

🌐 **Live:** [revoke.svgn.org](https://revoke.svgn.org)

## ✨ Features

- 🔍 **Scan Approvals** - View all token approvals for your connected wallet
- ⚠️ **Risk Assessment** - Identify high-risk unlimited approvals automatically
- 🚫 **One-Click Revoke** - Revoke any approval with a single transaction
- 🔒 **Privacy First** - No login, no database, zero data collection
- 💸 **Free Forever** - No fees, wallet connection = identity
- 🌙 **Dark Mode** - Minimalist, high-contrast dark theme
- 🔗 **Multi-Chain** - Ethereum, Polygon, Arbitrum, Optimism, Base, Sepolia

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.5+ |
| Styling | Tailwind CSS + shadcn/ui |
| Web3 | RainbowKit + Wagmi v2 + Viem |
| Data | GoldRush API (formerly Covalent) |

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/wangyuanchen/sovereign-revoke.git
cd svgn-revoke

# Install
npm install

# Configure (optional)
cp .env.example .env.local
# Add your WalletConnect Project ID and GoldRush API key

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | [Reown Dashboard](https://dashboard.reown.com/) | Recommended |
| `NEXT_PUBLIC_GOLDRUSH_API_KEY` | [GoldRush](https://goldrush.dev/) - Free 100k credits/month | Optional |

> Without GoldRush API key, the app uses demo data for testing.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── web3/               # WalletButton, ApprovalTable
│   └── shared/             # Header, Footer, Logo
├── hooks/                  # useApprovals, useRevokeApproval
├── services/               # GoldRush API integration
└── providers/              # Web3Provider
```

## 🤝 Why No Login / No Database?

This is intentionally a **stateless, privacy-first** tool:

- **Wallet = Identity** - Your wallet address is your identity
- **Data from Chain** - All data comes from blockchain via indexer APIs
- **Zero Storage** - We don't store any user data
- **Free Forever** - No user management overhead = Free for everyone

## 📜 Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint
```

## 📄 License

[MIT](LICENSE) - Free to use, modify, and distribute.

---

Built with ❤️ by [SVGN](https://svgn.org)
