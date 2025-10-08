import { createClient } from '@supabase/supabase-js';
import { Database } from '../../../types/supabase';
import fetch from 'node-fetch';

const API_VERSION = 'v19.0';
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

/**
 * @interface MetaAPIETLOptions
 * @description Defines the options for the Meta API ETL process.
 * @property {string} supabaseUrl - The URL of the Supabase project.
 * @property {string} supabaseKey - The service role or anon key for the Supabase project.
 * @property {string} accessToken - The access token for the Meta API.
 * @property {string} adAccountId - The ID of the Meta Ad Account.
 */
interface MetaAPIETLOptions {
  supabaseUrl: string;
  supabaseKey: string;
  accessToken: string;
  adAccountId: string;
}

/**
 * @interface AdInsights
 * @description Defines the structure for Meta Ad Insights.
 */
interface AdInsights {
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
}

/**
 * @interface AdCreative
 * @description Defines the structure for a Meta Ad Creative.
 */
interface AdCreative {
  id: string;
  name: string;
  body: string;
  image_url: string;
  video_id: string;
  call_to_action_type: string;
}

/**
 * @interface PageInsights
 * @description Defines the structure for Meta Page Insights.
 */
interface PageInsights {
  page_id: string;
  page_fans: number;
  page_engaged_users: number;
  page_impressions: number;
  date: string;
}

/**
 * @interface InstagramInsights
 * @description Defines the structure for Meta Instagram Insights.
 */
interface InstagramInsights {
  instagram_business_account_id: string;
  follower_count: number;
  impressions: number;
  reach: number;
  profile_views: number;
  date: string;
}

/**
 * @interface MetaAPIData
 * @description Defines the structure for the data fetched from the Meta API.
 */
interface MetaAPIData {
  adInsights: AdInsights[];
  adCreatives: AdCreative[];
  pageInsights: PageInsights[];
  instagramInsights: InstagramInsights[];
}

/**
 * Fetches data from a Meta API endpoint with pagination.
 * @async
 * @param {string} url - The URL of the API endpoint.
 * @returns {Promise<T[]>} A promise that resolves with the fetched data.
 */
interface MetaApiResponse<T> {
  data: T[];
  paging?: {
    next?: string;
  };
  error?: {
    message: string;
  };
}

async function fetchFromEndpoint<T>(url: string): Promise<T[]> {
  let data: T[] = [];
  let nextUrl: string | null = url;

  while (nextUrl) {
    const response = await fetch(nextUrl);
    const json: MetaApiResponse<T> = await response.json();

    if (json.error) {
      throw new Error(`Error fetching from Meta API: ${json.error.message}`);
    }

    if (json.data) {
      data = data.concat(json.data);
    }
    
    nextUrl = json.paging?.next || null;
  }

  return data;
}

/**
 * Fetches ad insights from the Meta API.
 * @async
 * @param {string} adAccountId - The ID of the ad account.
 * @param {string} accessToken - The access token for the Meta API.
 * @returns {Promise<AdInsights[]>} A promise that resolves with the ad insights.
 */
async function fetchAdInsights(adAccountId: string, accessToken: string): Promise<AdInsights[]> {
  const url = `${BASE_URL}/${adAccountId}/insights?fields=campaign_id,adset_id,ad_id,impressions,clicks,spend,reach,cpc,cpm,ctr&time_range={'since':'2023-01-01','until':'2023-01-31'}&access_token=${accessToken}`;
  return fetchFromEndpoint(url);
}

/**
 * Fetches ad creatives from the Meta API.
 * @async
 * @param {string} adAccountId - The ID of the ad account.
 * @param {string} accessToken - The access token for the Meta API.
 * @returns {Promise<AdCreative[]>} A promise that resolves with the ad creatives.
 */
async function fetchAdCreatives(adAccountId: string, accessToken: string): Promise<AdCreative[]> {
  const url = `${BASE_URL}/${adAccountId}/adcreatives?fields=id,name,body,image_url,video_id,call_to_action_type&access_token=${accessToken}`;
  return fetchFromEndpoint(url);
}

/**
 * Fetches page insights from the Meta API.
 * @async
 * @param {string} pageId - The ID of the page.
 * @param {string} accessToken - The access token for the Meta API.
 * @returns {Promise<PageInsights[]>} A promise that resolves with the page insights.
 */
async function fetchPageInsights(pageId: string, accessToken: string): Promise<PageInsights[]> {
  const url = `${BASE_URL}/${pageId}/insights?metric=page_fans,page_engaged_users,page_impressions&period=day&since=2023-01-01&until=2023-01-31&access_token=${accessToken}`;
  return fetchFromEndpoint(url);
}

/**
 * Fetches Instagram insights from the Meta API.
 * @async
 * @param {string} instagramId - The ID of the Instagram account.
 * @param {string} accessToken - The access token for the Meta API.
 * @returns {Promise<InstagramInsights[]>} A promise that resolves with the Instagram insights.
 */
async function fetchInstagramInsights(instagramId: string, accessToken: string): Promise<InstagramInsights[]> {
  const url = `${BASE_URL}/${instagramId}/insights?metric=follower_count,impressions,reach,profile_views&period=day&since=2023-01-01&until=2023-01-31&access_token=${accessToken}`;
  return fetchFromEndpoint(url);
}

/**
 * Fetches data from the Meta API.
 * @async
 * @param {MetaAPIETLOptions} options - The options for the ETL process.
 * @returns {Promise<MetaAPIData>} A promise that resolves with the fetched data.
 */
async function fetchMetaAPIData(options: MetaAPIETLOptions): Promise<MetaAPIData> {
  console.log('Fetching data from Meta API...');
  const { adAccountId, accessToken } = options;
  // These IDs should be dynamic, but are hardcoded for this example
  const pageId = 'your-page-id';
  const instagramId = 'your-instagram-id';

  const [adInsights, adCreatives, pageInsights, instagramInsights] = await Promise.all([
    fetchAdInsights(adAccountId, accessToken),
    fetchAdCreatives(adAccountId, accessToken),
    fetchPageInsights(pageId, accessToken),
    fetchInstagramInsights(instagramId, accessToken),
  ]);

  return { adInsights, adCreatives, pageInsights, instagramInsights };
}

/**
 * Inserts fetched data into the corresponding Supabase tables for the Meta API.
 * @async
 * @param {MetaAPIData} data - The data fetched from the Meta API.
 * @param {MetaAPIETLOptions} options - The options for the ETL process.
 * @returns {Promise<void>} A promise that resolves when the data has been inserted.
 */
async function loadDataIntoSupabase(data: MetaAPIData, options: MetaAPIETLOptions): Promise<void> {
  const supabase = createClient<Database>(options.supabaseUrl, options.supabaseKey);
  console.log('Inserting data into Supabase...');

  if (data.adInsights.length > 0) {
    const { error } = await supabase.from('meta_ad_insights').upsert(
      data.adInsights as Database['public']['Tables']['meta_ad_insights']['Insert'][],
      { onConflict: 'ad_id,date_start' }
    );
    if (error) throw new Error(`Error inserting Meta Ad Insights: ${error.message}`);
  }

  if (data.adCreatives.length > 0) {
    const { error } = await supabase.from('ad_creatives').upsert(
      data.adCreatives as Database['public']['Tables']['ad_creatives']['Insert'][],
      { onConflict: 'id' }
    );
    if (error) throw new Error(`Error inserting Ad Creatives: ${error.message}`);
  }

  if (data.pageInsights.length > 0) {
    const { error } = await supabase.from('meta_page_insights').upsert(
      data.pageInsights as Database['public']['Tables']['meta_page_insights']['Insert'][],
      { onConflict: 'page_id,date' }
    );
    if (error) throw new Error(`Error inserting Meta Page Insights: ${error.message}`);
  }

  if (data.instagramInsights.length > 0) {
    const { error } = await supabase.from('meta_instagram_insights').upsert(
      data.instagramInsights as Database['public']['Tables']['meta_instagram_insights']['Insert'][],
      { onConflict: 'instagram_business_account_id,date' }
    );
    if (error) throw new Error(`Error inserting Meta Instagram Insights: ${error.message}`);
  }

  console.log('Data insertion complete.');
}

/**
 * Main function to run the Meta API ETL process.
 * @async
 * @param {MetaAPIETLOptions} options - The options for the ETL process.
 */
export async function runMetaAPIETL(options: MetaAPIETLOptions): Promise<void> {
  try {
    const data = await fetchMetaAPIData(options);
    await loadDataIntoSupabase(data, options);
    console.log('Meta API ETL process completed successfully.');
  } catch (error) {
    console.error('Meta API ETL process failed:', error);
  }
}