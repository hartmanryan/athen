---
name: real-estate-niche-os
description: |
  Real Estate Niche Operating System — builds a complete lead generation funnel for real estate agents targeting niche property buyers. Walks agents through choosing a niche, creating lead magnets, setting up Facebook Lead Form ads, sending automated delivery emails via Gmail, configuring recurring property alerts, automating text follow-ups via Blutext, and setting up monthly postcard mailings via thanks.io. Use this skill whenever a real estate agent asks about lead generation funnels, niche marketing systems, property buyer pipelines, Facebook lead ads for real estate, automated follow-up sequences, direct mail campaigns for leads, or building a real estate marketing operating system. Also trigger when the user mentions thanks.io postcards, Blutext texting, BoldTrail/kvCORE saved searches, or wants to combine email + text + direct mail for real estate leads.
---

# Real Estate Niche Operating System

You are helping a real estate agent build a complete lead generation funnel that attracts niche property buyers, nurtures them automatically, and stays top-of-mind every month — using email, text, and physical direct mail.

## What You're Building

The system has six components that work together:

1. **Niche Selection + Lead Magnet** — Choose a property niche and create an asset to trade for contact info
2. **Facebook Lead Form Ad** — Run ads that capture leads without leaving Facebook
3. **Email Delivery** — Send the asset immediately via Gmail with a conversational tone
4. **Recurring Property Alerts** — Keep leads warm with auto-updating property lists
5. **Text Message Follow-Up** — High-open-rate texts via Blutext or manual outreach
6. **Monthly Postcard Mailings** — Physical market update postcards via thanks.io

## Tools Integration

This skill uses these MCP tools when available:
- **Gmail tools** (`gmail_create_draft`, `gmail_search_messages`) — for drafting and sending delivery emails
- **thanks.io tools** (`search_thanks_io_direct_mail`) — for setting up postcard campaigns and mailing lists
- **Google Calendar tools** — for scheduling follow-up reminders if needed

For tools without MCP integration (Facebook Ads Manager, BoldTrail/kvCORE, Blutext), provide step-by-step setup guidance the agent can follow manually.

## How to Use This Skill

When the user asks to set up this system, walk them through each step in order. At each step:

1. Explain what they're setting up and why it matters
2. Ask for any information you need (their niche, market area, asset type, etc.)
3. Take action where possible (draft emails, search thanks.io docs, etc.)
4. Provide clear manual instructions for steps requiring external tools

Read `references/step-guides.md` for detailed implementation instructions for each step.
Read `references/templates.md` for all email, text, and ad copy templates.
Read `references/checklist.md` for the complete launch checklist.

## Workflow

### Step 1: Choose Niche + Create Lead Magnet

Ask the user what property niche they serve. If they're unsure, suggest proven niches:
- Waterfront / lakefront homes
- Horse properties with acreage
- Luxury homes ($1M+)
- New construction communities
- 55+ / active adult communities
- Golf course communities
- Car enthusiast properties (large garages)
- Investment / multi-family properties

Then help them choose a lead magnet format:
- **Niche Property List** (most common — a curated list of available properties)
- **Market Report or Video** (trends, values, inventory data)
- **Buyer's Guide** (PDF specific to buying in that niche)
- **Webinar / Training** (recorded session on niche-specific topics)

For property lists, recommend an IDX saved search link from BoldTrail/kvCORE because it auto-updates as new listings match the criteria.

### Step 2: Facebook Lead Form Ad Setup

Provide the user with complete ad setup instructions from `references/step-guides.md`. Key points to cover:
- Campaign objective: **Leads**
- Geographic targeting to their market area
- Age range and interest-based targeting for their niche
- Budget recommendation: $5–$10/day to start
- Lead form fields: Full Name, Email, Phone (all three required)
- Provide the ad copy template from `references/templates.md`

### Step 3: Email Delivery

This is where Gmail MCP tools come in. When the user is ready:

1. Use `gmail_create_draft` to draft the initial delivery email using the template from `references/templates.md`
2. Personalize it with the user's niche, market area, and asset link
3. Explain how to connect Facebook Lead Ads to Gmail via Zapier for automation

The email tone is critical — it must feel like a real person wrote it, not a corporate newsletter. Casual, first-person, with an open-ended question at the end to invite replies.

### Step 4: Recurring Property List Delivery

Guide the user through setting up auto-updating property alerts:
- **BoldTrail/kvCORE**: Create a Saved Search with niche criteria, add leads as contacts, enable Auto-Email Alerts
- **Manual fallback**: Set reminders to email the same IDX link every 2–4 weeks (the link auto-updates)
- **Other CRMs**: Follow Up Boss, Sierra Interactive, Lofty all support similar saved search + auto-alert workflows

### Step 5: Text Message Follow-Up

Every lead should get a text. Walk the user through:
- **Manual option**: Text template from `references/templates.md` — simple and always works
- **Blutext.com**: Connect to Facebook Lead Ads for automated first-text + drip sequence
- Provide the follow-up sequence (Day 1, Day 3, Day 7, Day 14+)

### Step 6: thanks.io Postcard Campaign

Use the thanks.io MCP tools to help research setup, then guide the user:

1. **Design a monthly market update postcard** (6x9 recommended)
2. **Create a Mailing List** for their niche (e.g., "Waterfront Buyers - [City]")
3. **Set up a recurring Campaign** linked to the mailing list (monthly send)
4. **Automate lead addition** via Zapier (Facebook Lead → thanks.io Mailing List)

Address the mailing address gap: Facebook forms don't collect addresses, so the user needs to either ask in follow-up conversations or use thanks.io's email-to-address lookup.

Use `search_thanks_io_direct_mail` to find relevant thanks.io documentation for campaigns, mailing lists, and integrations.

## Important Principles

- **Speed-to-lead matters**: The faster leads get their asset and first text, the higher the conversion rate. Emphasize automation for the initial touchpoints.
- **Conversational tone beats corporate**: Every template in this system is written in first-person, casual language. This is intentional — it dramatically outperforms branded HTML templates for lead nurture.
- **Consistency wins**: The agent who stays in front of leads monthly (via property alerts + postcards) earns the business when they're ready to buy. Most leads won't buy today.
- **The postcard is the differentiator**: Most agents skip physical mail. A monthly market update postcard builds lasting presence that digital channels can't replicate.
