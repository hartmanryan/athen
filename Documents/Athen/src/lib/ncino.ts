import crypto from "crypto";

export interface NCinoContact {
  first_name?: string;
  last_name?: string;
  full_name?: string;
  name?: string;
  email?: string;
  phone?: string;
  street_address?: string;
  address_line1?: string;
  address_line2?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  postal_code?: string;
}

export interface NCinoMilestonePayload {
  event?: string;
  event_type?: string;
  milestone?: string | { name?: string; status?: string; id?: string };
  loan?: {
    id?: string;
    number?: string;
    stage?: string;
    milestone?: string;
    property_address?: {
      street?: string;
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      zip?: string;
    };
    borrower?: NCinoContact;
    co_borrower?: NCinoContact;
  };
  borrower?: NCinoContact;
  contact?: NCinoContact;
  recipient?: NCinoContact;
  [key: string]: any;
}

export interface ExtractedRecipientData {
  name: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  milestoneName: string;
  loanId?: string;
}

/**
 * Verify nCino webhook payload signature using HMAC SHA-256
 * Signature header format is typically `sha256=<hex>` or direct `<hex>`
 */
export function verifyNcinoSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string
): boolean {
  if (!signatureHeader || !secret) {
    return false;
  }

  // Remove `sha256=` prefix if present
  const cleanedSignature = signatureHeader.replace(/^sha256=/, "").trim();

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(rawBody, "utf8");
  const expectedSignature = hmac.digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(cleanedSignature, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch (err) {
    // If lengths mismatch or invalid hex format
    return false;
  }
}

/**
 * Extract recipient address & milestone name from nCino webhook JSON payload
 */
export function extractRecipientFromPayload(
  payload: NCinoMilestonePayload
): ExtractedRecipientData | null {
  // 1. Identify Milestone Name
  let milestoneName = "";
  if (typeof payload.milestone === "string") {
    milestoneName = payload.milestone;
  } else if (payload.milestone && typeof payload.milestone.name === "string") {
    milestoneName = payload.milestone.name;
  } else if (payload.event) {
    milestoneName = payload.event;
  } else if (payload.event_type) {
    milestoneName = payload.event_type;
  } else if (payload.loan?.stage) {
    milestoneName = payload.loan.stage;
  } else if (payload.loan?.milestone) {
    milestoneName = payload.loan.milestone;
  }

  // 2. Identify Contact / Borrower
  const contact = payload.borrower || payload.contact || payload.recipient || payload.loan?.borrower;

  // 3. Identify Name
  let name = "";
  if (contact?.full_name) {
    name = contact.full_name;
  } else if (contact?.name) {
    name = contact.name;
  } else if (contact?.first_name || contact?.last_name) {
    name = `${contact.first_name || ""} ${contact.last_name || ""}`.trim();
  }

  // 4. Identify Address (Check contact address first, then loan property address)
  const propAddress = payload.loan?.property_address;

  const address =
    contact?.street_address ||
    contact?.address_line1 ||
    contact?.address ||
    propAddress?.street ||
    propAddress?.line1 ||
    "";

  const address2 = contact?.address_line2 || propAddress?.line2 || undefined;

  const city = contact?.city || propAddress?.city || "";
  const state = contact?.state || propAddress?.state || "";
  const zip = contact?.zip || contact?.postal_code || propAddress?.zip || "";

  // Require name and basic address components
  if (!name || !address || !city || !state || !zip) {
    console.warn("[nCino Parser] Incomplete contact details in payload:", {
      name,
      address,
      city,
      state,
      zip,
      milestoneName,
    });
    return null;
  }

  return {
    name,
    address: address2 ? `${address} ${address2}` : address,
    city,
    state,
    zip,
    milestoneName,
    loanId: payload.loan?.id || payload.loan?.number,
  };
}
