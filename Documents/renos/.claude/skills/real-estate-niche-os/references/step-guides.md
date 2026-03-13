# Step-by-Step Implementation Guides

## Table of Contents
- [Step 1: Niche Selection + Lead Magnet](#step-1)
- [Step 2: Facebook Lead Form Ad](#step-2)
- [Step 3: Email Delivery via Gmail](#step-3)
- [Step 4: Recurring Property List Delivery](#step-4)
- [Step 5: Text Message Follow-Up](#step-5)
- [Step 6: thanks.io Postcard Campaign](#step-6)

---

## Step 1: Niche Selection + Lead Magnet {#step-1}

### Choosing a Niche

The more specific the niche, the more powerful the system. Generic "homes for sale" gets ignored. "Waterfront homes on Lake Norman with private docks" gets clicked.

Proven niche examples:
- Waterfront and lakefront homes
- Horse properties with acreage
- Luxury homes ($1M+)
- New construction communities
- 55+ and active adult communities
- Golf course communities
- Homes with large garages / car enthusiast properties
- Investment and multi-family properties

The best niche is one the agent is personally connected to or knowledgeable about. Authenticity makes ads and conversations more credible.

### Lead Magnet Formats

The asset is what you trade for contact info. It must deliver immediate, specific value.

| Format | Example | Best For |
|--------|---------|----------|
| Niche Property List | "All Waterfront Homes Under $800K in [City]" | Most niches — high demand, easy to create |
| Market Report / Video | 5-10 min video on current values and trends | Agents who are comfortable on camera |
| Buyer's Guide | PDF on permits, inspections, what to watch for | Complex niches (horse property, investment) |
| Webinar / Training | "How to Buy a Horse Property Without Getting Burned" | Agents who want to establish deep expertise |

### Hosting the Asset

Upload somewhere accessible with a shareable link:
- **Google Drive** — set to "Anyone with the link can view"
- **IDX saved search link** (BoldTrail/kvCORE) — ideal for property lists because it auto-updates
- **YouTube / Loom** — for video content
- **Website page** — if the agent has one

For property lists, an IDX saved search link is strongly recommended because new matching properties appear automatically without manual updates.

---

## Step 2: Facebook Lead Form Ad {#step-2}

Facebook Lead Form ads let prospects opt in without leaving Facebook, which dramatically increases conversion rates versus external landing pages.

### Campaign Setup in Facebook Ads Manager

1. Go to ads.facebook.com and click **Create**
2. Choose **Leads** as campaign objective
3. At the **Ad Set** level:
   - Geographic targeting: agent's market area (city, zip code, or radius)
   - Age range: 28-65+ (adjust for niche — horse property skews older, new construction skews younger)
   - Detailed targeting: add interests like "Real Estate", "Zillow", "waterfront properties", or lifestyle interests matching the niche
   - Budget: **$5-$10/day** to start. Scale up once quality leads are confirmed.
   - Placements: Advantage+ placements OR manually select Facebook Feed + Instagram Feed

### Ad Creative Best Practices

- Use a high-quality photo of a property in the niche (agent's own listing photos are ideal)
- Headline: Keep it specific — e.g., "See All Waterfront Homes for Sale in [City]"
- Primary text: Speak directly to the niche buyer's desires and pain points
- Call to Action button: "Get Quote", "Learn More", or "Sign Up"

### Lead Form Configuration

When creating the Instant Form:
- **Form Type**: "More Volume" for lower friction (recommended) or "Higher Intent" for more qualified leads
- **Intro section**: Brief headline + description reinforcing the offer
- **Questions**: Full Name, Email Address, Phone Number (all three — do not skip phone)
- **Privacy Policy**: Link to agent's website privacy policy (required by Facebook)
- **Thank You Screen**: Message confirming info was received and asset is on its way

Important: Download leads from Ads Manager daily, or connect to a CRM via Facebook's native integration. Stale leads go cold fast.

---

## Step 3: Email Delivery via Gmail {#step-3}

Speed-to-lead matters enormously. The goal is to deliver the asset immediately, establish a human connection, and open a dialogue.

### Setup

Use personal Gmail or Google Workspace email. A personal-looking email with conversational tone dramatically outperforms branded HTML templates.

### Automation Options

To send automatically when a Facebook lead comes in:
- **Zapier**: Trigger "New Lead from Facebook Lead Ads" → Action "Send Email in Gmail"
- **Make (Integromat)**: Same workflow with more flexibility
- **CRM forwarding**: Forward leads to BoldTrail, Follow Up Boss, etc. which can trigger automated emails

### Using Gmail MCP Tools

When helping the agent draft their delivery email, use `gmail_create_draft` with:
- **to**: The lead's email (or a test address for setup)
- **subject**: Use the template subject line from templates.md
- **body**: Personalized version of the delivery email template

See `templates.md` for the full email template.

### Why Conversational Tone Works

- Delivers the asset immediately, fulfilling the ad promise
- First-person, casual language feels like a real human sent it
- Open-ended question at the end invites a reply, converting leads to conversations
- Getting replies trains email servers that this is wanted email (improves deliverability)

---

## Step 4: Recurring Property List Delivery {#step-4}

Most leads won't buy today. The agent who stays consistently in front of them with relevant content earns the business when they're ready.

### Option A: Manual Email Updates

Simplest approach — periodically email the same IDX link (it auto-updates with fresh results):
- Set a reminder to email niche list every 2-4 weeks
- Keep emails short and conversational (same tone as initial email)
- Vary subject lines: "New listings added this week!", "3 new waterfront homes just listed"

### Option B: BoldTrail / kvCORE Auto-Alerts (Recommended)

1. In BoldTrail, create a **Saved Search** for niche criteria (property type, location, price range)
2. Add each lead as a contact to this saved search
3. Enable **Auto-Email Alerts** — BoldTrail emails the lead every time a new matching property is listed
4. Leads can click properties, triggering activity notifications back to the agent

Setup path: Contacts > [Contact] > Searches > New Search > Set criteria > Enable email alerts

### Option C: Other CRM / IDX Systems

Most CRMs with IDX integration support saved search + auto-alert workflows:
- Follow Up Boss + IDX
- Sierra Interactive
- Lofty
- Check CRM documentation for setup

---

## Step 5: Text Message Follow-Up {#step-5}

Text messages have 90%+ open rates versus 20-30% for email. A simple, conversational text within minutes of lead opt-in can turn a cold form submission into a live conversation.

### Option A: Manual Text

For low lead volume or personal outreach preference, text every lead manually when they come in. Use the template from `templates.md`.

### Option B: Blutext.com Automation (Recommended for Scale)

1. Sign up at blutext.com
2. Connect Facebook Lead Ads account
3. Create a Text Campaign for the niche funnel
4. Set trigger: "New Facebook Lead Submitted" → Send Text
5. Write initial text template with first name personalization
6. Optionally set up follow-up sequences (Day 1, Day 3, Day 7)
7. All replies come into Blutext's inbox — respond from app or phone

### Text Follow-Up Sequence

| Day | Message Purpose |
|-----|----------------|
| Day 1 | Initial text delivering asset + asking for engagement |
| Day 3 | Check-in: "Did you get a chance to look at the list?" |
| Day 7 | New listings nudge: "A couple new properties just hit the market" |
| Day 14+ | Monthly check-in texts (can be batched and semi-personalized) |

---

## Step 6: thanks.io Postcard Campaign {#step-6}

A monthly market update postcard mailed to every lead's home builds lasting, physical presence that digital channels cannot replicate. This is the step most agents skip — and it's the differentiator.

### What to Send

Monthly market update postcard for the niche. Example: "[City] Waterfront Market Update — [Month] [Year]" showing recent sales, current inventory, and average days on market. This positions the agent as the niche expert.

### Account Setup

1. Create account at thanks.io
2. Design monthly market update postcard using card builder
3. Recommended size: **6x9** (good balance of visibility and cost)
4. Use a template from the Real Estate Postcards library as starting point
5. Save design as a reusable template

### Create a Mailing List

1. In thanks.io dashboard, go to **Mailing Lists**
2. Create new list (e.g., "Waterfront Buyers - [City]")
3. This list serves as the audience for the recurring campaign
4. Every new lead gets added to this list

### Set Up Recurring Campaign

1. Go to **Campaigns** in thanks.io
2. Create new campaign linked to the Mailing List
3. Set send schedule to **monthly** (select day of month)
4. Attach market update postcard template
5. thanks.io automatically mails a postcard to everyone on the list each month
6. New people added to the list get their first card on the next scheduled send

### Adding New Leads to the Mailing List

| Method | How |
|--------|-----|
| Manual | Log into thanks.io, open Mailing List, add recipient with name + address |
| Zapier | Facebook Lead Ads → thanks.io (native Zapier integration) |
| BoldTrail | Native BoldTrail/kvCORE integration — contacts sync directly |
| API | Use thanks.io's API for programmatic addition |

### The Mailing Address Gap

Facebook Lead Forms only collect name, email, and phone — not a mailing address. Solutions:
- Ask for address in a follow-up email or text: "I'd love to send you our monthly market update — what address should I use?"
- Use thanks.io's **address lookup feature** (attempts to find mailing address from email for a small fee)
