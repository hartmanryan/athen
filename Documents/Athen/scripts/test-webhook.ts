import crypto from "crypto";
import { verifyNcinoSignature, extractRecipientFromPayload } from "../src/lib/ncino";
import { getMailingListForMilestone } from "../src/config/milestone-map";

console.log("=== Testing nCino Webhook Bridge Utilities ===");

const secret = "test-secret-12345";

const samplePayload = {
  event: "Clear to Close",
  event_type: "milestone.updated",
  loan: {
    id: "LN-992811",
    number: "992811",
    stage: "Clear to Close",
    borrower: {
      first_name: "Robert",
      last_name: "Johnson",
      street_address: "456 Oak Avenue Suite 200",
      city: "Austin",
      state: "TX",
      zip: "78701",
      email: "robert.j@example.com",
    },
  },
  milestone: {
    name: "Clear to Close",
    status: "Completed",
  },
};

const rawBody = JSON.stringify(samplePayload);

// 1. Generate HMAC signature
const hmac = crypto.createHmac("sha256", secret);
hmac.update(rawBody, "utf8");
const validSignature = `sha256=${hmac.digest("hex")}`;

// 2. Test Verification
const isVerified = verifyNcinoSignature(rawBody, validSignature, secret);
console.log(`\n1. Signature Verification Test: ${isVerified ? "PASSED ✅" : "FAILED ❌"}`);

// 3. Test Invalid Signature
const isInvalidBlocked = !verifyNcinoSignature(rawBody, "sha256=invalidhex", secret);
console.log(`2. Invalid Signature Rejection Test: ${isInvalidBlocked ? "PASSED ✅" : "FAILED ❌"}`);

// 4. Test Recipient Extraction
const extracted = extractRecipientFromPayload(samplePayload);
console.log("\n3. Extracted Recipient Data:", extracted);

if (extracted && extracted.name === "Robert Johnson" && extracted.state === "TX") {
  console.log("   Payload Parser Test: PASSED ✅");
} else {
  console.log("   Payload Parser Test: FAILED ❌");
}

// 5. Test Milestone Mapping Lookup
const mappedListId = getMailingListForMilestone("Clear to Close");
console.log(`\n4. Milestone Mapping Test for 'Clear to Close': List ID = '${mappedListId}'`);

console.log("\n=== All Local Unit Verification Checks Complete ===");
