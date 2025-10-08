export type Json = | string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      ad_sets: {
        Row: {
          id: number;
          campaign_id: number;
          ad_set_id: number;
          ad_set_name: string;
          status: string | null;
          daily_budget: number | null;
          lifetime_budget: number | null;
          start_time: string | null;
          end_time: string | null;
          targeting: Json | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          campaign_id: number;
          ad_set_id: number;
          ad_set_name: string;
          status?: string | null;
          daily_budget?: number | null;
          lifetime_budget?: number | null;
          start_time?: string | null;
          end_time?: string | null;
          targeting?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          campaign_id?: number;
          ad_set_id?: number;
          ad_set_name?: string;
          status?: string | null;
          daily_budget?: number | null;
          lifetime_budget?: number | null;
          start_time?: string | null;
          end_time?: string | null;
          targeting?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      irroba_daily_reports: {
        Row: {
          store_id: string;
          date: string;
          revenue: number;
          orders_count: number;
          visitors_count: number;
          conversion_rate: number;
          average_ticket: number;
          returns_count: number;
          returns_value: number;
        };
        Insert: {
          store_id: string;
          date: string;
          revenue?: number;
          orders_count?: number;
          visitors_count?: number;
          conversion_rate?: number;
          average_ticket?: number;
          returns_count?: number;
          returns_value?: number;
        };
        Update: {
          store_id?: string;
          date?: string;
          revenue?: number;
          orders_count?: number;
          visitors_count?: number;
          conversion_rate?: number;
          average_ticket?: number;
          returns_count?: number;
          returns_value?: number;
        };
      };
      irroba_products_performance: {
        Row: {
          store_id: string;
          product_id: string;
          product_name: string | null;
          category: string | null;
          abc_curve: string | null;
          date: string;
          sales_quantity: number;
          sales_revenue: number;
          stock_quantity: number;
          views_count: number;
          conversion_rate: number;
        };
        Insert: {
          store_id: string;
          product_id: string;
          product_name?: string | null;
          category?: string | null;
          abc_curve?: string | null;
          date: string;
          sales_quantity?: number;
          sales_revenue?: number;
          stock_quantity?: number;
          views_count?: number;
          conversion_rate?: number;
        };
        Update: {
          store_id?: string;
          product_id?: string;
          product_name?: string | null;
          category?: string | null;
          abc_curve?: string | null;
          date?: string;
          sales_quantity?: number;
          sales_revenue?: number;
          stock_quantity?: number;
          views_count?: number;
          conversion_rate?: number;
        };
      };
      irroba_customers_data: {
        Row: {
          store_id: string;
          customer_id: string;
          customer_name: string | null;
          email: string | null;
          phone: string | null;
          state: string | null;
          city: string | null;
          registration_date: string | null;
          last_purchase_date: string | null;
          total_orders: number;
          total_spent: number;
          average_ticket: number;
        };
        Insert: {
          store_id: string;
          customer_id: string;
          customer_name?: string | null;
          email?: string | null;
          phone?: string | null;
          state?: string | null;
          city?: string | null;
          registration_date?: string | null;
          last_purchase_date?: string | null;
          total_orders?: number;
          total_spent?: number;
          average_ticket?: number;
        };
        Update: {
          store_id?: string;
          customer_id?: string;
          customer_name?: string | null;
          email?: string | null;
          phone?: string | null;
          state?: string | null;
          city?: string | null;
          registration_date?: string | null;
          last_purchase_date?: string | null;
          total_orders?: number;
          total_spent?: number;
          average_ticket?: number;
        };
      };
      meta_ad_insights: {
        Row: {
          campaign_id: string;
          adset_id: string;
          ad_id: string;
          impressions: number;
          clicks: number;
          spend: number;
          reach: number;
          cpc: number;
          cpm: number;
          ctr: number;
          date_start: string;
          date_stop: string;
        };
        Insert: {
          campaign_id: string;
          adset_id: string;
          ad_id: string;
          impressions: number;
          clicks: number;
          spend: number;
          reach: number;
          cpc: number;
          cpm: number;
          ctr: number;
          date_start: string;
          date_stop: string;
        };
        Update: {
          campaign_id?: string;
          adset_id?: string;
          ad_id?: string;
          impressions?: number;
          clicks?: number;
          spend?: number;
          reach?: number;
          cpc?: number;
          cpm?: number;
          ctr?: number;
          date_start?: string;
          date_stop?: string;
        };
      };
      meta_page_insights: {
        Row: {
          page_id: string;
          page_fans: number;
          page_engaged_users: number;
          page_impressions: number;
          date: string;
        };
        Insert: {
          page_id: string;
          page_fans: number;
          page_engaged_users: number;
          page_impressions: number;
          date: string;
        };
        Update: {
          page_id?: string;
          page_fans?: number;
          page_engaged_users?: number;
          page_impressions?: number;
          date?: string;
        };
      };
      meta_instagram_insights: {
        Row: {
          instagram_business_account_id: string;
          follower_count: number;
          impressions: number;
          reach: number;
          profile_views: number;
          date: string;
        };
        Insert: {
          instagram_business_account_id: string;
          follower_count: number;
          impressions: number;
          reach: number;
          profile_views: number;
          date: string;
        };
        Update: {
          instagram_business_account_id?: string;
          follower_count?: number;
          impressions?: number;
          reach?: number;
          profile_views?: number;
          date?: string;
        };
      };
      rd_crm_deals: {
        Row: {
          id: string;
          name: string;
          amount: number;
          pipeline_id: string;
          pipeline_stage_id: string;
        };
        Insert: {
          id: string;
          name: string;
          amount: number;
          pipeline_id: string;
          pipeline_stage_id: string;
        };
        Update: {
          id?: string;
          name?: string;
          amount?: number;
          pipeline_id?: string;
          pipeline_stage_id?: string;
        };
      };
      rd_crm_contacts: {
        Row: {
          id: string;
          name: string;
          email: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
        };
      };
      rd_crm_organizations: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
      };
      rd_crm_activities: {
        Row: {
          id: string;
          type: string;
        };
        Insert: {
          id: string;
          type: string;
        };
        Update: {
          id?: string;
          type?: string;
        };
      };
      rd_crm_pipelines: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
      };
      rd_crm_pipeline_stages: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
      };
      rd_crm_products: {
        Row: {
          id: string;
          name: string;
          price: number;
        };
        Insert: {
          id: string;
          name: string;
          price: number;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
        };
      };
      rd_marketing_contatos: {
        Row: {
          id: string;
          email: string;
        };
        Insert: {
          id: string;
          email: string;
        };
        Update: {
          id?: string;
          email?: string;
        };
      };
      rd_marketing_campanhas: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
      };
      rd_marketing_conversoes: {
        Row: {
          id: string;
          email: string;
        };
        Insert: {
          id: string;
          email: string;
        };
        Update: {
          id?: string;
          email?: string;
        };
      };
      rd_marketing_interacoes: {
        Row: {
          id: string;
          type: string;
        };
        Insert: {
          id: string;
          type: string;
        };
        Update: {
          id?: string;
          type?: string;
        };
      };
      rd_marketing_funil_analytics: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
      };
      rd_marketing_webhooks_log: {
        Row: {
          id: string;
          url: string;
        };
        Insert: {
          id: string;
          url: string;
        };
        Update: {
          id?: string;
          url?: string;
        };
      };
      "3cx_call_records": {
        Row: {
          id: string;
          caller: string;
          callee: string;
          duration: number;
          call_date: string;
        };
        Insert: {
          id: string;
          caller: string;
          callee: string;
          duration: number;
          call_date: string;
        };
        Update: {
          id?: string;
          caller?: string;
          callee?: string;
          duration?: number;
          call_date?: string;
        };
      };
      "3cx_contacts": {
        Row: {
          id: string;
          name: string;
          phone_number: string;
        };
        Insert: {
          id: string;
          name: string;
          phone_number: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone_number?: string;
        };
      };
      "3cx_extensions": {
        Row: {
          id: string;
          name: string;
          number: string;
        };
        Insert: {
          id: string;
          name: string;
          number: string;
        };
        Update: {
          id?: string;
          name?: string;
          number?: string;
        };
      };
      "3cx_call_analytics": {
        Row: {
          id: string;
          call_id: string;
          metric: string;
          value: string;
        };
        Insert: {
          id: string;
          call_id: string;
          metric: string;
          value: string;
        };
        Update: {
          id?: string;
          call_id?: string;
          metric?: string;
          value?: string;
        };
      };
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> = Database["public"]["Enums"][T];