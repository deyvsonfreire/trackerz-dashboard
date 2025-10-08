export interface Platform {
  id: string;
  name: string;
  type: string;
  is_active: boolean;
  last_sync_at?: string;
  oauth_config?: {
    accessToken?: string;
    refreshToken?: string;
  };
}

export interface Account {
  id: string;
  name: string;
  platformId: string;
  platforms: Platform;
  accountId: string;
  status: 'active' | 'inactive' | 'suspended';
  isActive: boolean;
  budget: number;
  totalCampaigns: number;
  lastSync: Date;
  createdAt: Date;
  metrics: {
    followers: number;
    engagement: number;
    reach: number;
  };
}

export interface Campaign {
  id: string;
  name: string;
  platformId: string;
  accountId: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  startDate: Date;
  endDate: Date;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
  };
}

export interface DailyMetrics {
  date: Date;
  platformId: string;
  accountId: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: string;
  firstContact: Date;
  lastActivity: Date;
  status: 'lead' | 'customer' | 'inactive';
  lifetime_value: number;
  tags: string[];
}

export interface OrganicContent {
  id: string;
  platformId: string;
  accountId: string;
  content: string;
  mediaType: 'image' | 'video' | 'text' | 'carousel';
  publishedAt: Date;
  metrics: {
    likes: number;
    comments: number;
    shares: number;
    reach: number;
    engagement: number;
  };
}

export interface MarketingIndicator {
  id: string;
  name: string;
  value: number;
  target: number;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  category: 'acquisition' | 'engagement' | 'conversion' | 'retention';
  trend: 'up' | 'down' | 'stable';
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  target: number;
  unit: string;
  change: number;
  changeType: 'increase' | 'decrease';
  category: 'revenue' | 'traffic' | 'conversion' | 'engagement';
}

export interface ChartData {
  [key: string]: string | number | undefined;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface FilterOptions {
  platforms?: string[];
  accounts?: string[];
  dateRange?: DateRange;
  status?: string[];
}