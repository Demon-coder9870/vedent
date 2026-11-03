# VEDVET — vedent-v2 (Restructured Codebase)

## What is this?
This is a restructured copy of the original `vedent` project.  
**Same design. Same components. Same pages. Same assets.**  
The only differences are in **how the code is organized** — following Next.js Pages Router best practices.

## What changed vs. the original `vedent`?

| Area | Before (`vedent`) | After (`vedent-v2`) |
|---|---|---|
| **Imports** | Relative paths (`../../components/layout/Header`) | Path aliases (`@/components/layout/Header`) |
| **TypeScript path config** | No `baseUrl` or `paths` in tsconfig | `baseUrl` + `@/*` paths configured |
| **Type definitions** | Scattered inside `lib/products.ts` | Extracted to `src/types/product.ts`, `src/types/contact.ts`, `src/types/navigation.ts` |
| **Empty folders** | `src/components/pages/{home,contact,products}` existed but were empty | Removed entirely |
| **Contact form types** | Inline `useState<'idle' | 'submitting'...>` | Uses `ContactFormStatus` from `@/types/contact` |
| **JSX unescaped entities** | Several raw `'`, `"`, `&` in JSX | All replaced with `&apos;`, `&quot;`, `&amp;` |
| **Form label accessibility** | Labels missing `htmlFor` attributes | All form labels now have proper `htmlFor` linking |
| **Iframe accessibility** | Map iframe missing `title` attribute | Accessible `title="VEDVET Head Office Location"` added |

## Folder Structure

```
vedent-v2/
├── public/                    # Static assets (unchanged)
├── scripts/                   # Build-time scripts (unchanged)
├── src/
│   ├── components/            # UI presentation layer
│   │   ├── layout/            # Header, Footer, PageHeader, EventWidget
│   │   ├── common/            # ErrorBoundary and shared primitives
│   │   ├── homeSection/       # Hero, Counter, CoreCapabilities, Certifications, Commitment
│   │   ├── aboutSection/      # About component
│   │   ├── contactSection/    # Contact, ContactInfo
│   │   ├── ctaSection/        # CtaSection
│   │   ├── faqSection/        # Faq
│   │   ├── innovationSection/ # Innovation
│   │   ├── productDesigns/    # ProductDetail, FeaturedBadge
│   │   ├── products/          # ProductCatalog, ProductCard, ProductGrid, etc.
│   │   ├── sectorsSection/    # Sectors
│   │   ├── servicesSection/   # Services
│   │   ├── testimonialsSection/ # Testimonials
│   │   └── visionSection/     # Vision
│   ├── data/                  # Static datasets & config
│   │   ├── products.json      # 52-product catalogue (unchanged)
│   │   ├── categoryHelpers.ts
│   │   ├── schemaConfig.ts    # JSON-LD schemas
│   │   └── seoConfig.ts
│   ├── lib/                   # Business logic & queries
│   │   └── products.ts        # All catalog helper functions
│   ├── types/                 # NEW: Dedicated TypeScript types layer
│   │   ├── product.ts         # Product, ProductSummary, CategorySEOInfo
│   │   ├── contact.ts         # ContactFormPayload, ContactFormStatus
│   │   └── navigation.ts      # NavItem, NavSubItem, Breadcrumb
│   ├── styles/                # Global CSS (unchanged)
│   └── pages/                 # Next.js routing (Pages Router)
│       ├── _app.tsx
│       ├── _document.tsx
│       ├── index.tsx           # /
│       ├── contact.tsx         # /contact
│       ├── accreditations.tsx  # /accreditations
│       ├── highlights.tsx      # /highlights
│       ├── about/
│       │   ├── who-we-are.tsx  # /about/who-we-are
│       │   └── what-we-do.tsx  # /about/what-we-do
│       ├── products/
│       │   ├── index.tsx       # /products
│       │   └── [category]/
│       │       ├── index.tsx   # /products/:category
│       │       └── [slug].tsx  # /products/:category/:slug
│       └── api/
│           └── contact.ts      # POST /api/contact
├── next.config.js
├── package.json
└── tsconfig.json              # Updated with @/* path aliases
```

## How to run

```bash
cd vedent-v2
npm install
npm run dev        # Development server at http://localhost:3000
npm run build      # Production build
```

## Migration Notes

- **No component logic was changed.** Only import paths were updated.
- **No CSS was changed.** All styling remains identical.
- **No page routes were changed.** All 130 SSG routes are identical.
- After confirming this version works correctly, the original `vedent` folder can be deleted and this folder renamed to `vedent`.