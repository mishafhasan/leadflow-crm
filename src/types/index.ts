export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Lead {
  id: string;
  lead_name: string;
  company_name: string;
  email: string;
  phone: string;
  lead_source: string;
  assigned_to: string;
  status: string;
  deal_value: number;
  created_at: string;
  updated_at: string;
  assigned_to_name?: string;
}

export interface Note {
  id: string;
  lead_id: string;
  content: string;
  created_by: string;
  created_at: string;
  created_by_name?: string;
}

export interface DashboardStats {
  total_leads: number;
  new_leads: number;
  contacted_leads: number;
  qualified_leads: number;
  proposal_sent: number;
  won_leads: number;
  lost_leads: number;
  total_pipeline_value: number;
  total_won_value: number;
}

export interface PipelineItem {
  status: string;
  count: number;
}
