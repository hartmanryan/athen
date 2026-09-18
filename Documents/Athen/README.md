# nCino Mortgage to Thanks.io Webhook Bridge

An event-driven serverless bridge that automatically listens for milestone updates from **nCino Mortgage** (e.g. *Application Completed*, *Clear to Close*, *Funded*) and triggers physical print mailings by adding contacts directly into **Thanks.io** mailing lists.

Designed for seamless zero-configuration deployment on **Vercel**.

---

## 🚀 Features

- **Real-Time Event Processing**: Instant delivery when loan milestones change.
- **HMAC Signature Validation**: Verifies incoming `x-hub-signature-256` signatures against your nCino webhook secret to block unauthorized requests.
- **Dynamic Milestone Mapping**: Easily map nCino milestone names to specific Thanks.io Mailing List IDs via environment variables.
- **Address Normalization**: Parses complex or varied nCino borrower JSON payloads into clean Thanks.io recipient address schemas.
- **Vercel Serverless Native**: Built on Next.js 14 App Router for optimal serverless execution.
- **Built-in Interactive Dashboard & Simulator**: Monitor active webhook URLs and test milestone triggers directly from the web dashboard.

---

## 🛠️ Step-by-Step Setup Guide

### 1. Deploy to Vercel

1. Push this repository to GitHub / GitLab.
2. Import the repository into [Vercel](https://vercel.com).
3. Add the following **Environment Variables** in Vercel project settings:

| Variable | Required | Description |
| :--- | :--- | :--- |
| `NCINO_WEBHOOK_SECRET` | **Yes** | Webhook secret generated in nCino Mortgage. |
| `THANKS_IO_API_KEY` | **Yes** | Your API token from Thanks.io (*Account Settings > API Access*). |
| `THANKS_IO_TEST_MODE` | No | Set to `true` during testing to prevent triggering paid mailers. |
| `MILESTONE_MAPPING_JSON` | No | JSON string mapping nCino milestones to Thanks.io List IDs. |

#### Example `MILESTONE_MAPPING_JSON`:
```json
{
  "Application Completed": "LIST_ID_101",
  "Underwriting Approved": "LIST_ID_102",
  "Clear to Close": "LIST_ID_103",
  "Funded": "LIST_ID_104"
}
```

---

### 2. Configure Webhook in nCino Mortgage

1. Log into your nCino Mortgage admin portal.
2. Navigate to **Company Settings > API Management > Webhooks**.
3. Click **Add Webhook**.
4. Enter the details:
   - **Name**: Thanks.io Direct Mail Bridge
   - **Callback URL**: `https://YOUR-VERCEL-DOMAIN.vercel.app/api/webhooks/ncino`
   - **Events**: Select your target loan milestone events (e.g. `Milestone Updated`).
5. Copy the generated **Webhook Secret** and save it to `NCINO_WEBHOOK_SECRET` in Vercel.

---

### 3. Local Development & Testing

Run unit & signature verification tests locally:
```bash
npm install
npm run test:webhook
```

Start the local development server and dashboard:
```bash
npm run dev
```

Open `http://localhost:3000` to view the interactive dashboard and test payload simulator.
