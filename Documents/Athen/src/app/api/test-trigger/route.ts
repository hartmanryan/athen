import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const milestone = body.milestone || "Clear to Close";
    const name = body.name || "Jane Doe";
    const street = body.street || "742 Evergreen Terrace";
    const city = body.city || "Springfield";
    const state = body.state || "IL";
    const zip = body.zip || "62704";
    const listId = body.listId;

    // Construct mock nCino payload
    const mockPayload = {
      event: milestone,
      event_type: "milestone.updated",
      loan: {
        id: `LOAN-${Math.floor(100000 + Math.random() * 900000)}`,
        number: `LN-${Math.floor(100000 + Math.random() * 900000)}`,
        stage: milestone,
        borrower: {
          full_name: name,
          street_address: street,
          city,
          state,
          zip,
          email: "jane.doe@example.com",
          phone: "555-0199",
        },
      },
      milestone: {
        name: milestone,
        status: "Completed",
      },
    };

    const rawBody = JSON.stringify(mockPayload);
    const secret = process.env.NCINO_WEBHOOK_SECRET || "demo-secret-key";

    // Generate HMAC signature
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(rawBody, "utf8");
    const signature = `sha256=${hmac.digest("hex")}`;

    // Host domain calculation
    const host = req.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const targetUrl = `${protocol}://${host}/api/webhooks/ncino`;

    // Forward to internal webhook endpoint
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hub-signature-256": signature,
      },
      body: rawBody,
    });

    const result = await response.json();

    return NextResponse.json({
      testTriggered: true,
      targetUrl,
      sentPayload: mockPayload,
      receivedStatusCode: response.status,
      webhookResponse: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Test execution failed", details: error.message },
      { status: 500 }
    );
  }
}
