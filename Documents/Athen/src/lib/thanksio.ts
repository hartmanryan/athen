export interface ThanksIORecipientPayload {
  name: string;
  address: string; // Full formatted address string or street address
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  mailing_list_id: string;
  email?: string;
  phone?: string;
  custom_fields?: Record<string, any>;
}

export interface ThanksIOResponse {
  success: boolean;
  data?: any;
  error?: string;
  statusCode?: number;
}

/**
 * Add a recipient contact to a specified Thanks.io mailing list
 */
export async function addRecipientToThanksIO(
  recipient: ThanksIORecipientPayload
): Promise<ThanksIOResponse> {
  const apiKey = process.env.THANKS_IO_API_KEY;

  if (!apiKey) {
    console.error("[Thanks.io Client] THANKS_IO_API_KEY is not set in environment variables.");
    return {
      success: false,
      error: "THANKS_IO_API_KEY environment variable missing",
    };
  }

  // Format single address string if city/state/zip provided separately
  let fullAddress = recipient.address;
  if (recipient.city && recipient.state && recipient.zip) {
    if (!fullAddress.toLowerCase().includes(recipient.city.toLowerCase())) {
      fullAddress = `${recipient.address}, ${recipient.city}, ${recipient.state} ${recipient.zip}`;
    }
  }

  const payload = {
    name: recipient.name,
    address: fullAddress,
    mailing_list_id: recipient.mailing_list_id,
    ...(recipient.email && { email: recipient.email }),
    ...(recipient.phone && { phone: recipient.phone }),
    ...(recipient.custom_fields && { custom_fields: recipient.custom_fields }),
  };

  try {
    const isTestMode = process.env.THANKS_IO_TEST_MODE === "true";

    console.log(`[Thanks.io Client] Sending recipient to list ${recipient.mailing_list_id}:`, {
      name: payload.name,
      address: payload.address,
      testMode: isTestMode,
    });

    const response = await fetch("https://api.thanks.io/api/v2/recipients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[Thanks.io API Error]", response.status, data);
      return {
        success: false,
        statusCode: response.status,
        error: data.message || data.error || `Thanks.io API returned HTTP ${response.status}`,
        data,
      };
    }

    return {
      success: true,
      statusCode: response.status,
      data,
    };
  } catch (err: any) {
    console.error("[Thanks.io Client Exception]", err);
    return {
      success: false,
      error: err.message || "Network exception while contacting Thanks.io API",
    };
  }
}
