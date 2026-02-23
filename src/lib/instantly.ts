const INSTANTLY_API_KEY = process.env.INSTANTLY_API_KEY || "";
const BASE_URL = "https://api.instantly.ai/api/v2";

export interface Lead {
  email: string;
  first_name: string;
  company_name: string;
  status: string;
  campaign_id: string;
  custom_variables: Record<string, string>;
  timestamp?: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: string;
  created_at: string;
}

export interface CampaignAnalytics {
  campaign_id: string;
  campaign_name: string;
  total_leads: number;
  contacted: number;
  emails_sent: number;
  emails_read: number;
  replied: number;
  bounced: number;
  unsubscribed: number;
  new_leads: number;
}

async function fetchInstantly(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${INSTANTLY_API_KEY}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
  });
  return res.json();
}

export async function getCampaigns(): Promise<Campaign[]> {
  const data = await fetchInstantly("/campaigns");
  return data || [];
}

export async function getCampaignAnalytics(campaignId: string): Promise<CampaignAnalytics | null> {
  const data = await fetchInstantly(`/campaigns/${campaignId}/analytics`);
  return data || null;
}

export async function getLeads(campaignId: string, limit = 100): Promise<Lead[]> {
  const data = await fetchInstantly("/leads/list", {
    method: "POST",
    body: JSON.stringify({ campaign_id: campaignId, limit }),
  });
  return data?.items || data || [];
}

export async function getCampaignSummary(campaignId: string) {
  const [analytics, leads] = await Promise.all([
    getCampaignAnalytics(campaignId),
    getLeads(campaignId, 500),
  ]);
  return { analytics, leads };
}
