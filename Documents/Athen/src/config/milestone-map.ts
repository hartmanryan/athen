export interface MilestoneMapping {
  [milestoneName: string]: string; // Milestone name -> Thanks.io Mailing List ID
}

/**
 * Default fallback milestone mappings if MILESTONE_MAPPING_JSON is not configured in env.
 * Key: nCino Milestone Name (case-insensitive search supported)
 * Value: Thanks.io Mailing List ID
 */
export const DEFAULT_MILESTONE_MAPPINGS: MilestoneMapping = {
  // Example default mappings
  "Application Completed": "DEFAULT_LIST_ID",
  "ApplicationCompleted": "DEFAULT_LIST_ID",
  "Underwriting Approved": "DEFAULT_LIST_ID",
  "UnderwritingApproved": "DEFAULT_LIST_ID",
  "Clear to Close": "DEFAULT_LIST_ID",
  "ClearToClose": "DEFAULT_LIST_ID",
  "Funded": "DEFAULT_LIST_ID",
  "Closed": "DEFAULT_LIST_ID",
};

/**
 * Returns active milestone mapping, prioritizing MILESTONE_MAPPING_JSON env var if present.
 */
export function getActiveMilestoneMappings(): MilestoneMapping {
  const envMapping = process.env.MILESTONE_MAPPING_JSON;
  if (envMapping) {
    try {
      const parsed = JSON.parse(envMapping);
      return { ...DEFAULT_MILESTONE_MAPPINGS, ...parsed };
    } catch (err) {
      console.error("[MilestoneMap] Failed to parse MILESTONE_MAPPING_JSON env var:", err);
    }
  }
  return DEFAULT_MILESTONE_MAPPINGS;
}

/**
 * Given an nCino milestone name or event key, find the corresponding Thanks.io mailing list ID.
 */
export function getMailingListForMilestone(milestoneName: string): string | null {
  if (!milestoneName) return null;

  const mappings = getActiveMilestoneMappings();

  // 1. Direct exact match
  if (mappings[milestoneName]) {
    return mappings[milestoneName];
  }

  // 2. Case-insensitive & sanitized match (remove spaces/dashes)
  const normalizedTarget = milestoneName.toLowerCase().replace(/[^a-z0-9]/g, "");

  for (const [key, listId] of Object.entries(mappings)) {
    const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (normalizedKey === normalizedTarget) {
      return listId;
    }
  }

  // 3. Environment default catch-all list ID (optional)
  if (process.env.THANKS_IO_DEFAULT_MAILING_LIST_ID) {
    return process.env.THANKS_IO_DEFAULT_MAILING_LIST_ID;
  }

  return null;
}
