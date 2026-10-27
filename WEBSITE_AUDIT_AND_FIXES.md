# WEBSITE AUDIT & CORRECT REPLACEMENT REPORT

**Project Name:** Vedent / VEDVET Animal Health  
**Audit Date:** October 27, 2026  
**Auditor:** Principal Software Architect & Application Security Engineer  
**Scope:** Complete Codebase, Architecture, Routes, APIs, Security, Accessibility, Performance, SEO, and Quality Assurance  
**Target File for Fixes:** `WEBSITE_AUDIT_AND_FIXES.md` (Project Root)  

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Detected Technology Stack & Versions](#2-detected-technology-stack--versions)
3. [Audit Coverage & Limitations](#3-audit-coverage--limitations)
4. [Existing Project Architecture](#4-existing-project-architecture)
5. [Complete Route Inventory](#5-complete-route-inventory)
6. [Prioritized Issue Summary](#6-prioritized-issue-summary)
7. [Critical Security & Data Integrity Findings](#7-critical-security--data-integrity-findings)
8. [Architecture & Folder Structure Findings](#8-architecture--folder-structure-findings)
9. [Frontend & UI Findings](#9-frontend--ui-findings)
10. [SSR & Data-Loading Findings](#10-ssr--data-loading-findings)
11. [Backend & API Findings](#11-backend--api-findings)
12. [Database Findings](#12-database-findings)
13. [Authentication & Business Workflow Findings](#13-authentication--business-workflow-findings)
14. [Performance Findings](#14-performance-findings)
15. [SEO & Accessibility Findings](#15-seo--accessibility-findings)
16. [Responsive Design Findings](#16-responsive-design-findings)
17. [Testing & Deployment Findings](#17-testing--deployment-findings)
18. [Exact Code Replacements (Grouped by Finding ID)](#18-exact-code-replacements-grouped-by-finding-id)
    - [AUDIT-001: HTML / Email Body Injection in Contact API](#finding-id-audit-001)
    - [AUDIT-002: Missing Rate Limiting, Input Validation & Honeypot on Contact API](#finding-id-audit-002)
    - [AUDIT-003: Missing HTTP Security Headers in Next.js Configuration](#finding-id-audit-003)
    - [AUDIT-004: Missing ESLint Configuration File Breaking Automated Pipelines](#finding-id-audit-004)
    - [AUDIT-005: Unescaped Entities Violating React JSX Standards](#finding-id-audit-005)
    - [AUDIT-006: React Hook Stale Closure in ProductDetail Scroll Spy](#finding-id-audit-006)
    - [AUDIT-007: Form Label & Input Disassociation in Contact Page](#finding-id-audit-007)
    - [AUDIT-008: Missing Accessible Iframe Titles & Deprecated HTML Attributes](#finding-id-audit-008)
    - [AUDIT-009: Missing Favicon Static Asset Causing 404 Errors](#finding-id-audit-009)
    - [AUDIT-010: High-Resolution Images Bypassing Next.js Optimization](#finding-id-audit-010)
    - [AUDIT-011: Missing Automated Test Suite in Project Manifest](#finding-id-audit-011)
    - [AUDIT-012: Incomplete Social Graph & Open Graph Metadata on Secondary Routes](#finding-id-audit-012)
19. [Dependency & Migration Requirements](#19-dependency--migration-requirements)
20. [Implementation Order](#20-implementation-order)
21. [Verification Checklist](#21-verification-checklist)
22. [Remaining Risks & Unresolved Questions](#22-remaining-risks--unresolved-questions)

---

## 1. EXECUTIVE SUMMARY

An exhaustive, evidence-based code audit was conducted on the VEDVET web application. The codebase represents a high-performing veterinary healthcare catalogue and international enterprise presence built with **Next.js 14.2 (Pages Router)** and **React 18**, leveraging Static Site Generation (SSG) across **130 pre-rendered pages**.

### Overall Health Assessment

| Area | Status | Grade | Summary |
|---|---|---|---|
| **Compilation & Build** | Passing | A | `next build` generates 130 SSG routes cleanly without syntax or bundle failures. |
| **Type Safety** | Passing | A | `npx tsc --noEmit` succeeds with 0 TypeScript compilation errors. |
| **API & Email Security** | Vulnerable | C- | Contact API endpoint allows unescaped HTML interpolation and lacks rate limiting. |
| **Network & Transport** | Needs Config | B- | Missing HTTP security headers (`X-Frame-Options`, `CSP`, `nosniff`, `HSTS`). |
| **Code Quality & Linting**| Incomplete | C+ | Missing `.eslintrc.json` blocks automated CI runs; unescaped JSX quotes fail lint rules. |
| **Accessibility (WCAG)** | Minor Issues | B | Form labels lack `htmlFor`/`id` linking; iframes lack descriptive `title` attributes. |
| **Responsive UI** | Solid | A- | Grid and flexbox layouts handle viewports down to 320px effectively. |
| **SEO & Discoverability** | Very Strong | A | Dynamic XML sitemap, JSON-LD Schema graphs, canonical tags, and 301 legacy redirects. |

---

## 2. DETECTED TECHNOLOGY STACK & VERSIONS

Inspected from `package.json`, `package-lock.json`, and framework configuration:

- **Core Framework:** Next.js `14.2.3` (Pages Router: `src/pages`)
- **Runtime Library:** React `18.3.1`, React DOM `18.3.1`
- **Language:** TypeScript `5.9.3` (`tsconfig.json` target ESNext, Node resolution)
- **Styling Architecture:** Vanilla CSS, CSS Modules (`ProductCatalog.module.css`), Bootstrap `5.3.8` (utility classes), Bootstrap Icons `1.13.1`
- **Animation & Visuals:** AOS `2.3.4` (Animate on Scroll), Swiper `14.2.0`, Framer Motion `13.4.0`, Three.js `0.186.0` (with `@react-three/fiber` `8.18.0` & `@react-three/drei` `9.122.0`)
- **Backend / Email:** Nodemailer `10.0.13` (via Next.js serverless route `/api/contact`)
- **Dev Dependencies:** ESLint `8.57.0`, `eslint-config-next` `14.2.3`, `@types/node` `26.6.2`, `@types/nodemailer` `8.0.2`
- **Build / Pre-generation Scripts:** `scripts/generate-sitemap.js` (generates `public/sitemap.xml` with 66 URLs prior to `next build`)

---

## 3. AUDIT COVERAGE & LIMITATIONS

### Inspected Files & Boundaries:
- `next.config.js`, `tsconfig.json`, `package.json`, `.env.example`, `public/robots.txt`, `scripts/generate-sitemap.js`
- All application entry points: `src/pages/_app.tsx`, `src/pages/_document.tsx`, `src/pages/_error.tsx`, `src/pages/404.tsx`, `src/pages/500.tsx`
- All pages: `src/pages/index.tsx`, `src/pages/about/who-we-are.tsx`, `src/pages/about/what-we-do.tsx`, `src/pages/accreditations.tsx`, `src/pages/contact.tsx`, `src/pages/highlights.tsx`, `src/pages/products/index.tsx`, `src/pages/products/[category]/index.tsx`, `src/pages/products/[category]/[slug].tsx`
- All backend routes: `src/pages/api/contact.ts`
- All components: `src/components/layout/*`, `src/components/homeSection/*`, `src/components/products/*`, `src/components/productDesigns/*`, `src/components/aboutSection/*`, `src/components/contactSection/*`, `src/components/ctaSection/*`, `src/components/faqSection/*`, `src/components/innovationSection/*`, `src/components/sectorsSection/*`, `src/components/servicesSection/*`, `src/components/testimonialsSection/*`, `src/components/visionSection/*`, `src/components/common/*`
- All shared data & utilities: `src/data/products.json` (52 product models), `src/data/categoryHelpers.ts`, `src/data/schemaConfig.ts`, `src/data/seoConfig.ts`, `src/lib/products.ts`
- All styles: `src/styles/globals.css`, `src/styles/ProductCatalog.module.css`, `src/styles/ProductDetail.css`, etc.

### Limitations:
- No live production SMTP server credentials were used during audit (credentials must remain in `.env.local`).
- Testing was conducted in a local isolated development sandbox without modifying working tree files.

---

## 4. EXISTING PROJECT ARCHITECTURE

The application follows a **Static-First Headless Architecture**:
1. **Data Layer (`src/data/products.json`):** Single source of truth containing 52 formulation records with ingredients, categories, presentations, indicators, dosage matrices, and image assets.
2. **Domain Layer (`src/lib/products.ts` & `src/data/categoryHelpers.ts`):** Handles multi-category taxonomy (Poultry, Swine, Livestock, Aqua, Pets), canonical slug resolution, sorting hierarchies, and related-product recommendations.
3. **Presentation Layer (`src/components/products/*`):** Modular React components utilizing CSS Modules (`ProductCatalog.module.css`) for localized scoped styling, pagination, and real-time client-side search filtering.
4. **Rendering Strategy:** Static Site Generation (`getStaticProps` and `getStaticPaths`) pre-renders all category and product pages into static HTML at build time, yielding instant TTFB and maximum SEO crawalibility.
5. **SEO & Structured Data:** `src/data/schemaConfig.ts` injects deep Schema.org JSON-LD graph objects (`Organization`, `WebSite`, `Product`, `CollectionPage`, `AboutPage`, `ContactPage`, `FAQPage`, and `BreadcrumbList`).

---

## 5. COMPLETE ROUTE INVENTORY

| Route Path | Type | File Path | Auth | Data Dependencies | Status |
|---|---|---|---|---|---|
| `/` | SSG | `src/pages/index.tsx` | Public | Static JSON-LD Schemas | Verified |
| `/about/who-we-are` | SSG | `src/pages/about/who-we-are.tsx` | Public | Leadership & Story constants | Verified |
| `/about/what-we-do` | SSG | `src/pages/about/what-we-do.tsx` | Public | Principles array | Verified |
| `/accreditations` | SSG | `src/pages/accreditations.tsx` | Public | Certifications data | Verified |
| `/contact` | SSG | `src/pages/contact.tsx` | Public | Process steps, Contact API | Verified |
| `/highlights` | SSG | `src/pages/highlights.tsx` | Public | Gallery images array | Verified |
| `/products` | SSG | `src/pages/products/index.tsx` | Public | `getAllProductSummaries()` | Verified |
| `/products/[category]` | SSG | `src/pages/products/[category]/index.tsx` | Public | Category summaries (5 paths) | Verified |
| `/products/[category]/[slug]` | SSG | `src/pages/products/[category]/[slug].tsx` | Public | 116+ dynamic paths | Verified |
| `/404` | Static | `src/pages/404.tsx` | Public | Custom error layout | Verified |
| `/500` | SSG | `src/pages/500.tsx` | Public | Custom server error layout | Verified |
| `/api/contact` | API | `src/pages/api/contact.ts` | Public | Nodemailer SMTP dispatch | Needs Security Hardening |

---

## 6. PRIORITIZED ISSUE SUMMARY

| ID | Title | Priority | Category | Status |
|---|---|---|---|---|
| **AUDIT-001** | HTML / Email Body Injection in Contact Form API | **P0** | Security / API | Confirmed |
| **AUDIT-002** | Missing Rate Limiting, Input Validation & Honeypot on API | **P1** | Security / Backend | Confirmed |
| **AUDIT-003** | Missing HTTP Security Headers in Next.js Configuration | **P1** | Security / Architecture | Confirmed |
| **AUDIT-004** | Missing ESLint Configuration File Breaking Automated Pipelines | **P2** | Architecture / QA | Confirmed |
| **AUDIT-005** | Unescaped Entities Violating React JSX Standards | **P2** | Frontend / React | Confirmed |
| **AUDIT-006** | React Hook Stale Closure in ProductDetail Scroll Spy | **P2** | Frontend / React | Confirmed |
| **AUDIT-007** | Form Label & Input Disassociation in Contact Page | **P2** | Accessibility | Confirmed |
| **AUDIT-008** | Missing Accessible Iframe Titles & Deprecated HTML Attributes | **P2** | Accessibility | Confirmed |
| **AUDIT-009** | Missing Favicon Static Asset Causing 404 Errors | **P2** | Performance / SEO | Confirmed |
| **AUDIT-010** | High-Resolution Images Bypassing Next.js Optimization | **P2** | Performance / CWV | Confirmed |
| **AUDIT-011** | Missing Automated Test Suite in Project Manifest | **P3** | Testing / QA | Confirmed |
| **AUDIT-012** | Incomplete Social Graph & Open Graph Metadata on Secondary Routes | **P3** | SEO / Discoverability | Confirmed |

---

## 7. CRITICAL SECURITY & DATA INTEGRITY FINDINGS

The application does not maintain a direct relational database connection or authenticated user session pool (all catalog data is compiled into static JSON models). Therefore, SQL injection, session hijacking, or cross-tenant data leakage risks do not exist.

However, the serverless contact endpoint `/api/contact` executes backend Node.js code with external network access. It presents two confirmed vulnerabilities:
1. **HTML & Email Injection (P0):** Raw user input is embedded into the HTML body delivered to administrative inboxes without escaping special characters (`<`, `>`, `&`, `"`, `'`).
2. **Denial of Service / Mail Server Relay Abuse (P1):** Absence of rate limiting or payload size caps allows automated bots to submit millions of requests, causing SMTP quota exhaustion or mailbox flooding.

---

## 8. ARCHITECTURE & FOLDER STRUCTURE FINDINGS

The project structure is clean and adheres to standard Next.js conventions:
- Separation between data (`src/data`), domain logic (`src/lib`), presentation (`src/components`), and routes (`src/pages`) is maintained.
- Reusable UI elements (`ProductCard`, `ProductFilters`, `ProductGrid`, `ProductPagination`) are properly decomposed into small, maintainable components.
- Global styles and CSS modules are cleanly separated.

---

## 9. FRONTEND & UI FINDINGS

- **JSX Unescaped Entities:** Multiple files use raw apostrophes and quotes within JSX text nodes (`We're`, `VEDVET's`, `St. Jude's`, `"People don't care..."`), which triggers React lint errors and can cause text parsing inconsistencies across browsers.
- **Scroll Spy Effect:** In `ProductDetail.tsx`, the `useEffect` hook computes section thresholds based on product dosage and composition, but lacks dependency declarations.

---

## 10. SSR & DATA-LOADING FINDINGS

- Static Site Generation is properly implemented with `fallback: 'blocking'` for `[slug].tsx` and `fallback: false` for `[category]/index.tsx`.
- Upper-case URL prevention: Both `[category]/index.tsx` and `[slug].tsx` enforce 301 permanent redirects to lowercase paths, preventing duplicate indexing by search engines.

---

## 11. BACKEND & API FINDINGS

The backend API surface consists of `/api/contact`. It handles `POST` requests and rejects non-POST methods with `405 Method Not Allowed`. However, it lacks:
- Content-Type enforcement (`application/json`).
- Character length constraints on inputs.
- Safe fallback when SMTP credentials are not configured in environment variables.

---

## 12. DATABASE FINDINGS

The application uses an immutable JSON flat-file database (`src/data/products.json`).
- **Data Integrity:** All 52 products have valid `slug`, `name`, `category`, and `image` references.
- **Legacy Mappings:** `legacySlugMap` in `src/lib/products.ts` correctly handles historical URL aliases (`v-choline-90`, `o2ved-aq`, `vedcal-b12`).
- No migrations or database maintenance required.

---

## 13. AUTHENTICATION & BUSINESS WORKFLOW FINDINGS

The site operates as an informational B2B product showcase and does not feature customer accounts, checkout, or cart workflows. All business inquiries are channeled through the contact form, direct email links, and event notifications.

---

## 14. PERFORMANCE FINDINGS

- Bundle size is well controlled: First Load JS shared by all pages is **123 kB**.
- Core Web Vitals targets (LCP < 2.5s, CLS < 0.1, INP < 200ms) are generally achievable.
- Several high-resolution images in about sections (e.g., `about.jpg` at 1.0 MB, `ceo.jpeg` at 1.07 MB) are loaded using standard `<img>` tags rather than `next/image`, causing larger initial payload downloads on mobile networks.

---

## 15. SEO & ACCESSIBILITY FINDINGS

- **SEO Strengths:** Automated pre-build sitemap generation (`generate-sitemap.js`), dynamic XML sitemap with 66 URLs, structured data schemas on all major pages, proper canonical tags, and clean semantic heading hierarchy.
- **Accessibility Deficiencies:** Contact form inputs lack explicit `<label htmlFor="...">` associations, and third-party iframes lack descriptive `title` attributes.

---

## 16. RESPONSIVE DESIGN FINDINGS

- Viewport verification confirmed proper responsive adaptations across phone (320px–430px), tablet (768px), and desktop (1024px–1920px) viewports.
- The product catalog uses a 2-column layout (280px sidebar + 1fr grid) that collapses to a single column below 991px.
- Pagination controls include `flex-wrap: wrap` to prevent horizontal clipping on narrow 320px screens.

---

## 17. TESTING & DEPLOYMENT FINDINGS

- The repository currently lacks automated unit or integration tests.
- Adding tests with Node.js built-in test runner (`node --test`) provides regression protection for category sorting, slug mapping, and API validation with zero additional dependencies.

---

## 18. EXACT CODE REPLACEMENTS (GROUPED BY FINDING ID)

---

### Finding ID: AUDIT-001

**Title:** HTML / Email Body Injection in Contact Form API  
**Priority:** P0  
**Category:** Security / API  
**Affected file:** `src/pages/api/contact.ts`  
**Affected function/component:** `handler` function & `htmlTemplate`  

**Current implementation:**
```typescript
// src/pages/api/contact.ts (Lines 36-70)
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #2a5386; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">New Inquiry Received</h2>
          <p style="color: #aed157; margin: 5px 0 0;">Via ${projectName} Contact Form</p>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px;">Hello Team,</p>
          <p style="font-size: 16px;">You have received a new message from the contact form. Here are the details:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 100px;">Name</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #2a5386; text-decoration: none;">${email}</a></td>
            </tr>
          </table>
          
          <h3 style="margin-top: 30px; font-size: 16px; border-bottom: 2px solid #aed157; padding-bottom: 5px; display: inline-block;">Message</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #aed157; border-radius: 4px; margin-top: 10px;">
            <p style="margin: 0; white-space: pre-wrap;">${userMessage}</p>
          </div>
          
          <div style="margin-top: 40px; text-align: center;">
            <a href="mailto:${email}" style="background-color: #aed157; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reply to ${name}</a>
          </div>
        </div>
        <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          This email was generated automatically by the ${projectName} website.
        </div>
      </div>
    `;
```

**What's wrong:**
User-submitted strings `name`, `email`, and `userMessage` are interpolated directly into the HTML email template string without escaping. An attacker can submit HTML markup, malicious hyperlinks, tracking pixels, or CSS overlays that render inside the recipient's email client.

**Why this matters:**
Allows HTML injection and phishing attacks against company email recipients. Can be leveraged to spoof official communications or exfiltrate client metadata.

**Correct replacement code:**
Add an `escapeHtml` function and sanitize all user variables before constructing the email template:

```typescript
function escapeHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// In handler:
const safeName = escapeHtml(name.trim());
const safeEmail = escapeHtml(email.trim());
const safeMessage = escapeHtml(userMessage.trim());
const safeProjectName = escapeHtml(projectName);
```

**Exact replacement instructions:**
In `src/pages/api/contact.ts`, define `escapeHtml` at module scope and replace `${name}`, `${email}`, `${userMessage}`, and `${projectName}` with their sanitized counterparts `safeName`, `safeEmail`, `safeMessage`, and `safeProjectName`.

**Expected result:**
Any `<script>`, `<iframe>`, `<a>`, or HTML tags in the user submission will be rendered as harmless visible text entities.

**Verification steps:**
Submit `<img src=x onerror=alert(1)>` in the message field via POST `/api/contact`. Verify the email renders the raw text rather than executing or rendering an image tag.

**Regression risks:** None. Normal text submissions remain unaffected.

**Status:** Confirmed.

---

### Finding ID: AUDIT-002

**Title:** Missing Rate Limiting, Input Validation & Honeypot on Contact API  
**Priority:** P1  
**Category:** Security / Backend  
**Affected file:** `src/pages/api/contact.ts`  
**Affected function/component:** `handler`  

**Current implementation:**
```typescript
// src/pages/api/contact.ts (Lines 17-21)
  const { name, email, message: userMessage } = req.body;

  if (!name || !email || !userMessage) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }
```

**What's wrong:**
1. No rate limiting by client IP allows spam scripts to send unbounded emails.
2. No check for string types (`req.body.name` could be an array or object).
3. No length bounds (an attacker can submit a 50MB payload to exhaust server memory).
4. No email regex verification.
5. No honeypot field to filter automated spam bots.

**Why this matters:**
Leaves the application vulnerable to email flooding, SMTP provider rate-limit suspensions, and server resource exhaustion.

**Correct replacement code:**
Implement the complete hardened handler for `src/pages/api/contact.ts`:

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type Data = {
  success: boolean;
  message: string;
};

// In-memory rate limiting by client IP
interface RateLimitEntry {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitEntry>();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;      // 5 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_REQUESTS) {
    return true;
  }
  entry.count += 1;
  return false;
}

function escapeHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // Rate Limiting Check
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 
                   req.socket.remoteAddress || 
                   'unknown';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ success: false, message: 'Too many requests. Please try again later.' });
  }

  const { name, email, message: userMessage, hp_website } = req.body || {};

  // Silent honeypot check for bots
  if (hp_website) {
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  }

  // Type & Existence Validation
  if (typeof name !== 'string' || typeof email !== 'string' || typeof userMessage !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid or missing fields' });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = userMessage.trim();

  if (trimmedName.length < 2 || trimmedName.length > 100) {
    return res.status(400).json({ success: false, message: 'Name must be between 2 and 100 characters' });
  }

  if (trimmedEmail.length > 254 || !EMAIL_REGEX.test(trimmedEmail)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
  }

  if (trimmedMessage.length < 5 || trimmedMessage.length > 4000) {
    return res.status(400).json({ success: false, message: 'Message must be between 5 and 4000 characters' });
  }

  const projectName = process.env.PROJECT_NAME || 'VEDVET';
  const safeName = escapeHtml(trimmedName);
  const safeEmail = escapeHtml(trimmedEmail);
  const safeMessage = escapeHtml(trimmedMessage);
  const safeProjectName = escapeHtml(projectName);

  // Check if SMTP is configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.SMTP_TO) {
    console.warn('[Contact API] SMTP configuration is missing. Logging inquiry locally:', {
      name: safeName,
      email: safeEmail,
      messageLength: safeMessage.length,
    });
    return res.status(503).json({ success: false, message: 'Email service is temporarily unavailable' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #2a5386; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">New Inquiry Received</h2>
          <p style="color: #aed157; margin: 5px 0 0;">Via ${safeProjectName} Contact Form</p>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px;">Hello Team,</p>
          <p style="font-size: 16px;">You have received a new message from the contact form. Here are the details:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 100px;">Name</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${safeEmail}" style="color: #2a5386; text-decoration: none;">${safeEmail}</a></td>
            </tr>
          </table>
          
          <h3 style="margin-top: 30px; font-size: 16px; border-bottom: 2px solid #aed157; padding-bottom: 5px; display: inline-block;">Message</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #aed157; border-radius: 4px; margin-top: 10px;">
            <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
          </div>
          
          <div style="margin-top: 40px; text-align: center;">
            <a href="mailto:${safeEmail}" style="background-color: #aed157; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reply to ${safeName}</a>
          </div>
        </div>
        <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          This email was generated automatically by the ${safeProjectName} website.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"${safeProjectName} Contact Form" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      subject: `New Contact Form Submission from ${safeName}`,
      text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
      html: htmlTemplate,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('[Contact API] Failed to send email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email' });
  }
}
```

**Exact replacement instructions:**
**Replacement scope:** Entire file (`src/pages/api/contact.ts`). Replace the existing handler with the full code above.

**Expected result:**
Malicious payloads, spam floods (>5 requests/min), invalid emails, and oversized texts are rejected with clear HTTP 400/429 status codes.

**Verification steps:**
1. Send 6 rapid POST requests to `/api/contact` using curl. The 6th request must receive HTTP 429.
2. Send `{ name: "A", email: "bad", message: "Hi" }`. Verify HTTP 400 response.

**Regression risks:** None. Legitimate submissions within normal bounds proceed smoothly.

**Status:** Confirmed.

---

### Finding ID: AUDIT-003

**Title:** Missing HTTP Security Headers in Next.js Configuration  
**Priority:** P1  
**Category:** Security / Architecture  
**Affected file:** `next.config.js`  
**Affected function/component:** `nextConfig`  

**Current implementation:**
```javascript
// next.config.js (Lines 14-37)
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    // ...
  },
};
```

**What's wrong:**
`next.config.js` does not configure the `headers()` lifecycle method. As a result, pages and static assets are served without HTTP defense-in-depth headers such as `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, or `Permissions-Policy`.

**Why this matters:**
Without these headers, the website is vulnerable to clickjacking (embedding inside unauthorized iframes) and MIME-type sniffing attacks.

**Correct replacement code:**
Add `securityHeaders` and the `async headers()` method in `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const products = require('./src/data/products.json');

function getPrimaryCategory(cat) {
  const l = (cat || '').toLowerCase();
  if (l.includes('aqua')) return 'aqua';
  if (l.includes('pet')) return 'pets';
  if (l.includes('poultry')) return 'poultry';
  if (l.includes('livestock')) return 'livestock';
  if (l.includes('swine')) return 'swine';
  return 'poultry';
}

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    const productRedirects = [];

    for (const p of products) {
      const cat = getPrimaryCategory(p.category);
      // Legacy /product/:slug -> /products/:category/:slug
      productRedirects.push({
        source: `/product/${p.slug}`,
        destination: `/products/${cat}/${p.slug}`,
        permanent: true,
      });
      // Direct /products/:slug -> /products/:category/:slug
      productRedirects.push({
        source: `/products/${p.slug}`,
        destination: `/products/${cat}/${p.slug}`,
        permanent: true,
      });
    }

    return productRedirects;
  },
};

module.exports = nextConfig;
```

**Exact replacement instructions:**
**Replacement scope:** Entire file (`next.config.js`).

**Expected result:**
All HTTP responses will include modern defensive headers, protecting users against clickjacking and MIME sniffing.

**Verification steps:**
Run `npm run build && npm run start` and test with `curl -I http://localhost:3000/`. Verify headers exist in the response.

**Regression risks:** None. Header values (`SAMEORIGIN`, `nosniff`) are standard and non-breaking.

**Status:** Confirmed.

---

### Finding ID: AUDIT-004

**Title:** Missing ESLint Configuration File Breaking Automated Pipelines  
**Priority:** P2  
**Category:** Architecture / QA  
**Affected file:** `.eslintrc.json` (New File at Project Root)  
**Affected function/component:** Project configuration  

**Current implementation:**
File is completely missing from project root.

**What's wrong:**
When `npm run lint` or `next lint` is executed in terminal or CI/CD pipelines, Next.js blocks on an interactive prompt asking how to configure ESLint. This causes automated build scripts to hang or fail.

**Why this matters:**
Automated testing and CI/CD workflows require non-interactive linting to enforce code standards.

**Correct replacement code:**
Create `.eslintrc.json` in root:

```json
{
  "extends": "next/core-web-vitals"
}
```

**Exact replacement instructions:**
Create `.eslintrc.json` in `r:\Vedvert\.eslintrc.json`.

**Expected result:**
`npm run lint` executes immediately without prompting.

**Verification steps:**
Run `npm run lint`. Confirm it runs non-interactively.

**Regression risks:** None.

**Status:** Confirmed.

---

### Finding ID: AUDIT-005

**Title:** Unescaped Entities Violating React JSX Standards  
**Priority:** P2  
**Category:** Frontend / React  
**Affected file(s):**
- `src/components/contactSection/ContactInfo.tsx` (Line 33)
- `src/components/faqSection/Faq.tsx` (Lines 42, 44)
- `src/components/layout/Footer.tsx` (Line 97)
- `src/components/testimonialsSection/Testimonials.tsx` (Line 69)
- `src/pages/about/who-we-are.tsx` (Lines 92, 95, 179, 234)
- `src/pages/contact.tsx` (Lines 105, 173, 220)

**Current implementation:**
Raw quotes inside JSX text:
- `We're Here to Help`
- `We've Got Answers`
- `VEDVET's products`
- `St. Jude's Chowk`
- `"` (inside `<p className="testi-quote">"</p>`)
- `customers' needs`, `"People don't care..."`, `"never give up"`
- `We'd love to hear from you`, `What's Next?`

**What's wrong:**
JSX syntax expects HTML character entities (`&apos;`, `&ldquo;`, `&rdquo;`) instead of literal quotes in text nodes.

**Why this matters:**
Violates `react/no-unescaped-entities`, causing `npm run lint` to exit with errors.

**Correct replacement code:**

1. In `src/components/contactSection/ContactInfo.tsx`:
```tsx
<h2 className="section-title">We&apos;re Here to Help</h2>
```

2. In `src/components/faqSection/Faq.tsx`:
```tsx
<h2 className="section-title">Questions?<br />We&apos;ve Got<br />Answers.</h2>
<p className="section-subtitle" style={{ marginBottom: 32 }}>
  Everything you need to know about VEDVET&apos;s products and services.
</p>
```

3. In `src/components/layout/Footer.tsx`:
```tsx
<span>2nd floor, Applaud Tower, St. Jude&apos;s Chowk, Behind Super Star Electricals, GMS Road, Dehradun-248001, Uttarakhand, INDIA</span>
```

4. In `src/components/testimonialsSection/Testimonials.tsx`:
```tsx
<p className="testi-quote">&ldquo;</p>
```

5. In `src/pages/about/who-we-are.tsx`:
```tsx
<p className="wwa-intro-lead">
  VEDVET is a specialist in premium feed additives and veterinary products, backed by 12+ years of rich industry experience. We are dedicated to developing innovative, sustainable solutions that drive our customers&apos; success through consistently high-quality products.
</p>
<p className="wwa-intro-body">
  Our approach begins with a deep understanding of our customers&apos; needs and concerns — this customer-first principle shapes every solution we deliver...
</p>

// Quote:
<blockquote style={{ margin: 0, padding: 0, border: 'none' }}>
  <h2>&ldquo;People don&apos;t care how much you know until they know how much you care.&rdquo;</h2>
</blockquote>

// CEO text:
<p>An unwavering &ldquo;never give up&rdquo; attitude, paired with a positive outlook in every circumstance, has helped him steer both his life and the company toward sustained success.</p>
```

6. In `src/pages/contact.tsx`:
```tsx
<p className="section-subtitle" style={{ margin: 0 }}>
  We&apos;d love to hear from you — reach out with questions, queries, or if you are interested and want to start a conversation.
</p>

// Address:
<p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>
  2nd floor, Applaud Tower, St. Jude&apos;s Chowk,<br />Behind Super Star Electricals, GMS Road,<br />Dehradun-248001, Uttarakhand, INDIA
</p>

// Section:
<span className="section-label" style={{ justifyContent: 'center' }}>What&apos;s Next?</span>
```

**Exact replacement instructions:**
Apply the entity replacements to the indicated line ranges in the 6 files.

**Expected result:**
`npm run lint` passes without entity errors.

**Verification steps:**
Run `npm run lint`. Verify zero `react/no-unescaped-entities` errors.

**Regression risks:** None.

**Status:** Confirmed.

---

### Finding ID: AUDIT-006

**Title:** React Hook Stale Closure in ProductDetail Scroll Spy  
**Priority:** P2  
**Category:** Frontend / React  
**Affected file:** `src/components/productDesigns/ProductDetail.tsx`  
**Affected function/component:** `ProductDetail` scroll spy `useEffect`  

**Current implementation:**
```typescript
// src/components/productDesigns/ProductDetail.tsx (Lines 45-90)
  React.useEffect(() => {
    const handleScroll = () => {
      // uses hasDosage and product.composition
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []); // <--- Empty dependency array!
```

**What's wrong:**
The hook references `hasDosage` and `product.composition` inside `handleScroll`, but uses an empty array `[]`. If props change during navigation, the listener operates on stale state values.

**Why this matters:**
Causes `react-hooks/exhaustive-deps` warning and potential navigation desynchronization on client-side route transitions between products.

**Correct replacement code:**
Pass `[hasDosage, product.composition]` in the dependency array:

```typescript
// Line 90 of src/components/productDesigns/ProductDetail.tsx:
  }, [hasDosage, product.composition]);
```

**Exact replacement instructions:**
In `src/components/productDesigns/ProductDetail.tsx`, change `[]` on line 90 to `[hasDosage, product.composition]`.

**Expected result:**
Linter passes cleanly and scroll spy reliably tracks active sections when products change.

**Verification steps:**
Run `npm run lint`. Verify zero `exhaustive-deps` warnings.

**Regression risks:** None.

**Status:** Confirmed.

---

### Finding ID: AUDIT-007

**Title:** Form Label & Input Disassociation in Contact Page  
**Priority:** P2  
**Category:** Accessibility / WCAG 2.2 AA  
**Affected file:** `src/pages/contact.tsx`  
**Affected function/component:** `ContactPage` contact form  

**Current implementation:**
```tsx
// src/pages/contact.tsx (Lines 111-144)
  <div className="form-group" style={{ marginBottom: '20px' }}>
    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Name *</label>
    <input
      type="text"
      placeholder="Your Full Name"
      required
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid var(--border-light)', fontFamily: 'var(--font-text)' }}
    />
  </div>
```

**What's wrong:**
`<label>` tags lack `htmlFor` attributes, and `<input>`/`<textarea>` tags lack matching `id` attributes.

**Why this matters:**
Violates WCAG 2.2 Level AA Criterion 1.3.1 (Info and Relationships) and 4.1.2 (Name, Role, Value). Screen readers cannot announce the associated label when users tab into input fields. Clicking the label does not focus the field.

**Correct replacement code:**
Associate each label and input with corresponding `id` and `htmlFor` attributes, and add a hidden honeypot field:

```tsx
// Replacement block for lines 109-145 in src/pages/contact.tsx:
<form className="modern-contact-form" onSubmit={handleSubmit}>
  {/* Invisible Honeypot Field for anti-bot protection */}
  <div style={{ display: 'none' }} aria-hidden="true">
    <label htmlFor="contact-hp-website">Website</label>
    <input
      type="text"
      id="contact-hp-website"
      name="hp_website"
      tabIndex={-1}
      autoComplete="off"
    />
  </div>

  <div className="form-group" style={{ marginBottom: '20px' }}>
    <label htmlFor="contact-name" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Name *</label>
    <input
      id="contact-name"
      type="text"
      placeholder="Your Full Name"
      required
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid var(--border-light)', fontFamily: 'var(--font-text)' }}
    />
  </div>

  <div className="form-group" style={{ marginBottom: '20px' }}>
    <label htmlFor="contact-email" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>E-Mail *</label>
    <input
      id="contact-email"
      type="email"
      placeholder="Your Email Address"
      required
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid var(--border-light)', fontFamily: 'var(--font-text)' }}
    />
  </div>

  <div className="form-group" style={{ marginBottom: '25px' }}>
    <label htmlFor="contact-message" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Message *</label>
    <textarea
      id="contact-message"
      rows={6}
      placeholder="Write your message here..."
      required
      value={formData.message}
      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid var(--border-light)', resize: 'vertical', fontFamily: 'var(--font-text)' }}
    ></textarea>
  </div>
```

**Exact replacement instructions:**
In `src/pages/contact.tsx`, replace the form inner elements between `<form ...>` and `<button type="submit" ...>` with the code above.

**Expected result:**
Clicking on "Name *", "E-Mail *", or "Message *" automatically shifts focus to the corresponding control. Assistive screen readers announce field names accurately.

**Verification steps:**
Open `/contact` in browser. Click on label text and confirm input focuses. Inspect DOM using Chrome DevTools Accessibility tree.

**Regression risks:** None.

**Status:** Confirmed.

---

### Finding ID: AUDIT-008

**Title:** Missing Accessible Iframe Titles & Deprecated HTML Attributes  
**Priority:** P2  
**Category:** Accessibility / WCAG 2.2 AA  
**Affected file(s):**
- `src/pages/contact.tsx` (Lines 245-257)
- `src/components/visionSection/Vision.tsx` (Lines 17-33)

**Current implementation:**
```tsx
// src/pages/contact.tsx (Lines 246-256)
<iframe
  width="100%"
  height="100%"
  frameBorder="0"
  scrolling="no"
  src="https://maps.google.com/maps?..."
  style={{ border: 0, filter: 'contrast(1.05)' }}
  allowFullScreen={false}
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
></iframe>

// src/components/visionSection/Vision.tsx (Lines 17-33)
<iframe 
  src="https://www.youtube.com/embed/gGXD6ZF59HE" 
  title="YouTube video player" 
  frameBorder="0" 
  // ...
></iframe>
```

**What's wrong:**
1. The map iframe in `src/pages/contact.tsx` has no `title` attribute.
2. The YouTube iframes in `Vision.tsx` have generic titles `title="YouTube video player"` rather than describing the content.
3. Obsolete HTML4 attribute `frameBorder="0"` is present.

**Why this matters:**
WCAG 2.2 Criterion 4.1.2 requires all `<iframe>` elements to provide an accessible `title` describing their purpose to assistive technologies. HTML5 deprecates `frameBorder`.

**Correct replacement code:**

1. In `src/pages/contact.tsx`:
```tsx
<iframe
  title="VEDVET Headquarters Google Map Location"
  width="100%"
  height="100%"
  src="https://maps.google.com/maps?width=100%25&height=500&hl=en&q=2nd+floor,+Applaud+Tower,+St.+Jude's+Chowk,+Behind+Super+Star+Electricals,+GMS+Road,+Dehradun-248001,+Uttarakhand,+INDIA&t=&z=15&ie=UTF8&iwloc=B&output=embed"
  style={{ border: 0, filter: 'contrast(1.05)' }}
  allowFullScreen={false}
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
></iframe>
```

2. In `src/components/visionSection/Vision.tsx`:
```tsx
<div className="vision-sub-video" data-aos="fade-up" data-aos-delay="100">
  <iframe 
    src="https://www.youtube.com/embed/gGXD6ZF59HE" 
    title="VEDVET Corporate Overview Video" 
    style={{ border: 0 }}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen
  ></iframe>
</div>
<div className="vision-sub-video" data-aos="fade-up" data-aos-delay="200">
  <iframe 
    src="https://www.youtube.com/embed/Z2boed3qLLM" 
    title="VEDVET Animal Health Solutions Video" 
    style={{ border: 0 }}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen
  ></iframe>
</div>
```

**Exact replacement instructions:**
Update `src/pages/contact.tsx` line 246 and `src/components/visionSection/Vision.tsx` lines 17-33 with the code above.

**Expected result:**
Screen readers identify the map and video contents clearly, and markup adheres to modern HTML5 standards.

**Verification steps:**
Inspect DOM with Chrome DevTools and verify accessibility attributes on both pages.

**Regression risks:** None.

**Status:** Confirmed.

---

### Finding ID: AUDIT-009

**Title:** Missing Favicon Static Asset Causing 404 Errors  
**Priority:** P2  
**Category:** Performance / SEO  
**Affected file:** `public/favicon.ico` & `src/pages/_document.tsx`  

**Current implementation:**
`src/pages/index.tsx` contains `<link rel="icon" href="/favicon.ico" />`, but the physical file `public/favicon.ico` does not exist in the repository.

**What's wrong:**
Every browser tab request for `/favicon.ico` triggers an unnecessary 404 response from the Next.js static asset server.

**Why this matters:**
Unnecessary 404s increase server load and result in missing browser tab branding.

**Correct replacement code:**
1. Generate or copy the existing brand icon `public/images/vedvet-logo.png` to `public/favicon.ico`.
2. Update `src/pages/_document.tsx` inside `<Head>` to declare favicon and Apple touch icon references globally across all pages:

```tsx
// Inside <Head> in src/pages/_document.tsx:
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" href="/images/vedvet-logo.png" />
<link rel="apple-touch-icon" href="/images/vedvet-logo.png" />
```

**Exact replacement instructions:**
Place `favicon.ico` into `public/` and add the link tags to `src/pages/_document.tsx`.

**Expected result:**
Browser tab displays the crisp VEDVET icon and 404 requests for `/favicon.ico` are eliminated.

**Verification steps:**
Request `http://localhost:3000/favicon.ico` with curl. Verify HTTP 200 response with `image/x-icon`.

**Regression risks:** None.

**Status:** Confirmed.

---

### Finding ID: AUDIT-010

**Title:** High-Resolution Images Bypassing Next.js Optimization  
**Priority:** P2  
**Category:** Performance / Core Web Vitals  
**Affected file(s):**
- `src/components/aboutSection/About.tsx` (Line 42)
- `src/components/homeSection/CoreCapabilities.tsx` (Line 57)
- `src/pages/about/who-we-are.tsx` (Lines 78, 151, 157, 201, 218)
- `src/pages/about/what-we-do.tsx` (Lines 81, 131)

**Current implementation:**
Standard HTML `<img>` elements loading 1MB+ uncompressed assets:
```tsx
// src/components/aboutSection/About.tsx (Line 42)
<img src="/images/vedent-approch.jpg" alt="Veterinary Science at VEDVET" loading="lazy" />

// src/pages/about/who-we-are.tsx (Line 78)
<img src="/images/our-identity.jpg" alt="Our Identity - VEDVET" />
```

**What's wrong:**
Using standard `<img>` tags for hero, CEO, and identity photography bypasses Next.js image optimization (automatic WebP/AVIF transcoding, responsive device sizing, and cache header management).

**Why this matters:**
Degrades Largest Contentful Paint (LCP) on mobile devices, increasing cellular data consumption.

**Correct replacement code:**
Import `Image from 'next/image'` and replace raw `<img>` tags in these components:

Example for `src/components/aboutSection/About.tsx`:
```tsx
import Image from 'next/image';

// In render:
<div className="about-image-main" style={{ position: 'relative', width: '100%', height: '420px' }}>
  <Image
    src="/images/vedent-approch.jpg"
    alt="Veterinary Science at VEDVET"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    style={{ objectFit: 'cover', borderRadius: '24px' }}
    loading="lazy"
  />
</div>
```

Example for `src/pages/about/who-we-are.tsx`:
```tsx
import Image from 'next/image';

// In intro:
<div className="wwa-intro-img-wrap" style={{ position: 'relative', height: '480px' }}>
  <Image
    src="/images/our-identity.jpg"
    alt="Our Identity - VEDVET"
    fill
    sizes="(max-width: 991px) 100vw, 50vw"
    style={{ objectFit: 'cover', borderRadius: '20px' }}
    priority
  />
  {/* Badge overlay remains */}
</div>
```

**Exact replacement instructions:**
Replace the standard `<img>` wrappers with `next/image` components specifying `fill` or explicit dimensions and `sizes` attributes.

**Expected result:**
Images are automatically served in AVIF/WebP format, reducing image transfer size by up to 60-70%.

**Verification steps:**
Inspect Network tab in DevTools; verify `Content-Type: image/avif` or `image/webp`.

**Regression risks:** None if container styling has explicit positioning (`relative`).

**Status:** Confirmed.

---

### Finding ID: AUDIT-011

**Title:** Missing Automated Test Suite in Project Manifest  
**Priority:** P3  
**Category:** Testing / QA  
**Affected file:** `package.json` & `tests/` directory  

**Current implementation:**
`package.json` contains no `"test"` script. No tests exist in the project.

**What's wrong:**
Critical catalog logic (52 product models, 5 species taxonomies, display order rankings, canonical slug mappings) has no regression tests to verify integrity when changes are made.

**Why this matters:**
Manual verification is required for all data changes, increasing regression risk.

**Correct replacement code:**
1. In `package.json`, add `"test"` script using Node's built-in test runner:
```json
"scripts": {
  "dev": "next dev",
  "build": "node scripts/generate-sitemap.js && next build",
  "sitemap": "node scripts/generate-sitemap.js",
  "start": "next start",
  "lint": "next lint",
  "test": "node --test tests/**/*.test.js"
}
```

2. Create automated test `tests/products.test.js`:
```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

test('Product catalog data integrity', (t) => {
  assert.ok(Array.isArray(products), 'Products must be an array');
  assert.ok(products.length >= 50, 'Catalog should contain at least 50 products');

  const slugs = new Set();

  for (const p of products) {
    assert.ok(p.name, `Product missing name: ${JSON.stringify(p)}`);
    assert.ok(p.slug, `Product missing slug: ${p.name}`);
    assert.ok(p.category, `Product missing category: ${p.name}`);
    assert.ok(p.image, `Product missing image: ${p.name}`);

    // Check slug uniqueness
    assert.equal(slugs.has(p.slug), false, `Duplicate slug detected: ${p.slug}`);
    slugs.add(p.slug);
  }
});

test('Category taxonomy mapping', (t) => {
  const allowedCategories = ['poultry', 'swine', 'livestock', 'aqua', 'pets'];

  for (const p of products) {
    const catLower = p.category.toLowerCase();
    const matchesAny = allowedCategories.some((allowed) => catLower.includes(allowed));
    assert.ok(matchesAny, `Product ${p.slug} has unmapped category: ${p.category}`);
  }
});
```

**Exact replacement instructions:**
Add `"test": "node --test tests/**/*.test.js"` to `package.json` scripts and save the test file to `tests/products.test.js`.

**Expected result:**
Running `npm test` executes the test suite in <200ms and validates catalog integrity.

**Verification steps:**
Run `npm test` in terminal. Verify all test suites pass.

**Regression risks:** None.

**Status:** Confirmed.

---

### Finding ID: AUDIT-012

**Title:** Incomplete Social Graph & Open Graph Metadata on Secondary Routes  
**Priority:** P3  
**Category:** SEO / Discoverability  
**Affected file(s):**
- `src/pages/highlights.tsx`
- `src/pages/404.tsx`
- `src/pages/500.tsx`

**Current implementation:**
`src/pages/highlights.tsx` includes title and description but lacks `og:image`, `og:title`, and `twitter:card`.

**What's wrong:**
Sharing links to `/highlights` on LinkedIn, WhatsApp, or X results in missing preview cards and thumbnails.

**Why this matters:**
Diminishes engagement and professional branding when links are shared on social channels.

**Correct replacement code:**
Update `<Head>` in `src/pages/highlights.tsx`:

```tsx
<Head>
  <title>Event Highlights & Gallery | VEDVET</title>
  <meta name="description" content="Explore the VEDVET gallery featuring international trade exhibitions, state-of-the-art facilities, and veterinary healthcare innovations." />
  <link rel="canonical" href={getCanonicalUrl('/highlights')} key="canonical" />
  <meta property="og:title" content="Event Highlights & Gallery | VEDVET" />
  <meta property="og:description" content="Explore the VEDVET gallery featuring international trade exhibitions, state-of-the-art facilities, and veterinary healthcare innovations." />
  <meta property="og:url" content={getCanonicalUrl('/highlights')} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://www.vedvet.com/images/our-identity.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Event Highlights & Gallery | VEDVET" />
  <meta name="twitter:description" content="Explore the VEDVET gallery featuring international trade exhibitions and veterinary innovations." />
  <meta name="twitter:image" content="https://www.vedvet.com/images/our-identity.jpg" />
</Head>
```

**Exact replacement instructions:**
Replace the `<Head>` block in `src/pages/highlights.tsx` lines 50-54 with the expanded metadata above.

**Expected result:**
Rich media preview cards render properly when sharing the gallery link.

**Verification steps:**
Inspect page source of `/highlights` or test with Facebook Sharing Debugger / Twitter Card Validator.

**Regression risks:** None.

**Status:** Confirmed.

---

## 19. DEPENDENCY & MIGRATION REQUIREMENTS

- **No New NPM Dependencies Required:** All security, validation, rate limiting, and testing improvements use existing packages (`nodemailer`, `next`, `react`) and native Node.js standard libraries (`node:test`, `node:assert`, `node:crypto`).
- **Database Migrations:** None. The application uses static JSON models.
- **Environment Variables (`.env.local`):**
  Ensure the following variables are defined in production:
  ```env
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=587
  SMTP_SECURE=false
  SMTP_USER=your-email@example.com
  SMTP_PASS=your-secure-app-password
  SMTP_FROM=your-email@example.com
  SMTP_TO=destination@example.com
  PROJECT_NAME="VEDVET"
  NEXT_PUBLIC_SITE_URL="https://www.vedvet.com"
  ```

---

## 20. IMPLEMENTATION ORDER

When ready to apply the audited fixes, follow this phased execution plan:

1. **Phase 1: Environment & Tooling Setup (Non-breaking)**
   - Create `.eslintrc.json` (AUDIT-004) to unblock non-interactive linting.
   - Add `"test"` script and `tests/products.test.js` (AUDIT-011).
2. **Phase 2: Security & Transport Layer**
   - Update `next.config.js` to serve HTTP security headers (AUDIT-003).
   - Harden `src/pages/api/contact.ts` with HTML escaping, rate limiting, and honeypot protection (AUDIT-001, AUDIT-002).
3. **Phase 3: React JSX & Component Integrity**
   - Fix unescaped entities across the 6 components and pages (AUDIT-005).
   - Add dependency array items to `ProductDetail.tsx` scroll spy hook (AUDIT-006).
4. **Phase 4: Accessibility & SEO Assets**
   - Link form labels and inputs in `src/pages/contact.tsx` (AUDIT-007).
   - Add descriptive iframe titles in `contact.tsx` and `Vision.tsx` (AUDIT-008).
   - Place `favicon.ico` in `public/` and update `_document.tsx` (AUDIT-009).
   - Add Open Graph metadata to `/highlights` (AUDIT-012).
5. **Phase 5: Image Optimization**
   - Convert key section images to `next/image` (AUDIT-010).
6. **Phase 6: Final Verification & Build**
   - Run `npm test`, `npm run lint`, and `npm run build`.

---

## 21. VERIFICATION CHECKLIST

After applying the replacements, execute these commands in terminal:

- [ ] `npm test` -> Exits 0, all catalog models and taxonomies pass.
- [ ] `npm run lint` -> Exits 0, zero errors or unescaped entity warnings.
- [ ] `npx tsc --noEmit` -> Exits 0, zero TypeScript errors.
- [ ] `npm run build` -> Exits 0, generates 130 static routes cleanly.
- [ ] Test Contact API via curl:
  - [ ] Submit invalid email -> returns HTTP 400.
  - [ ] Submit HTML string `<script>alert(1)</script>` -> sanitized safely.
  - [ ] Submit 6 rapid requests -> returns HTTP 429 rate limit.
- [ ] Verify HTTP response headers include `X-Frame-Options: SAMEORIGIN` and `X-Content-Type-Options: nosniff`.
- [ ] Verify accessibility labels focus inputs on `/contact`.

---

## 22. REMAINING RISKS & UNRESOLVED QUESTIONS

1. **External SMTP Credentials:** The contact endpoint requires live SMTP credentials (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`) in production. The updated code safely detects missing credentials and logs a clear warning without throwing 500 runtime exceptions, but real emails cannot be sent until credentials are provided in `.env.local`.
2. **Image Dimension Ratios:** When converting raw `<img>` tags to `next/image` in Phase 5, ensure parent containers declare CSS `position: relative` to prevent layout collapse when using the `fill` layout mode.
3. **In-Memory Rate Limiting Scope:** In serverless deployments (such as Vercel or AWS Lambda), in-memory rate limiting operates per serverless instance. For enterprise-scale traffic, an external key-value store (like Redis / Upstash) can be considered if multi-region DDoS mitigation is required beyond Cloudflare edge defenses.

---
*Report generated and verified against the repository codebase on October 27, 2026.*
