import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import fetch from 'node-fetch';

/**
 * @interface ThreeCXETLOptions
 * @description Defines the options for the 3CX ETL process.
 * @property {string} accessToken - The OAuth2 access token for the 3CX API.
 */
export interface ThreeCXETLOptions {
  accessToken: string;
}

/**
 * @interface CallRecord
 * @description Represents a call record from the 3CX API.
 */
export interface CallRecord {
  // Define properties based on 3cx_call_records table
  id?: number;
  history_id: string;
  call_id: string;
  duration: number;
  time_start: string;
  time_answered: string;
  time_end: string;
  reason_terminated: string;
  from_number: string;
  to_number: string;
  from_dn: string;
  to_dn: string;
  dial_number: string;
  final_number: string;
  bill_cost: number;
  from_type: string;
  to_type: string;
  from_display_name: string;
  to_display_name: string;
  final_display_name: string;
  direction: string;
  was_answered: boolean;
}

/**
 * @interface Contact
 * @description Represents a contact from the 3CX API.
 */
export interface Contact {
  // Define properties based on 3cx_contacts table
  id?: number;
  contact_id: string;
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  phone_primary: string;
  phone_mobile: string;
  phone_home: string;
  phone_business: string;
  crm_contact_data: string;
}

/**
 * @interface Extension
 * @description Represents an extension from the 3CX API.
 */
export interface Extension {
  // Define properties based on 3cx_extensions table
  id?: number;
  extension_number: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  department: string;
  enabled: boolean;
  status: string;
  last_status_update: string;
}

/**
 * @interface CallAnalytics
 * @description Represents call analytics data.
 */
export interface CallAnalytics {
    // Define properties based on 3cx_call_analytics table
    id?: number;
    date_period: string;
    extension_number: string;
    total_calls: number;
    answered_calls: number;
    missed_calls: number;
    outbound_calls: number;
    inbound_calls: number;
    total_talk_time: number;
    average_call_duration: number;
    answer_rate: number;
}


/**
 * @interface ThreeCXData
 * @description Represents the consolidated data fetched from the 3CX API.
 * @property {CallRecord[]} callRecords - An array of call records.
 * @property {Contact[]} contacts - An array of contacts.
 * @property {Extension[]} extensions - An array of extensions.
 * @property {CallAnalytics[]} callAnalytics - An array of call analytics.
 */
export interface ThreeCXData {
  callRecords: CallRecord[];
  contacts: Contact[];
  extensions: Extension[];
  callAnalytics: CallAnalytics[];
}

const THREE_CX_API_URL = process.env.THREE_CX_API_URL;

/**
 * Defines the structure of the 3CX API response.
 */
interface ThreeCXApiResponse<T> {
  list: T[];
  nextPage: string | null;
}

/**
 * Fetches data from a 3CX API endpoint with pagination support.
 * @param endpoint - The API endpoint to fetch data from.
 * @param accessToken - The OAuth2 access token.
 * @returns A promise that resolves to an array of data.
 */
async function fetchFromEndpoint<T>(endpoint: string, accessToken: string): Promise<T[]> {
  let allData: T[] = [];
  let url: string | null = `${THREE_CX_API_URL}/${endpoint}`;

  while (url) {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch 3CX data from ${endpoint}: ${response.statusText}`);
    }

    const data = await response.json() as ThreeCXApiResponse<T>;
    allData = allData.concat(data.list);
    url = data.nextPage;
  }

  return allData;
}

/**
 * Fetches call records from the 3CX API.
 * @param accessToken - The OAuth2 access token.
 * @returns A promise that resolves to an array of call records.
 */
async function fetchCallRecords(accessToken: string): Promise<CallRecord[]> {
  return fetchFromEndpoint<CallRecord>('CallLog', accessToken);
}

/**
 * Fetches contacts from the 3CX API.
 * @param accessToken - The OAuth2 access token.
 * @returns A promise that resolves to an array of contacts.
 */
async function fetchContacts(accessToken: string): Promise<Contact[]> {
  return fetchFromEndpoint<Contact>('ContactList', accessToken);
}

/**
 * Fetches extensions from the 3CX API.
 * @param accessToken - The OAuth2 access token.
 * @returns A promise that resolves to an array of extensions.
 */
async function fetchExtensions(accessToken: string): Promise<Extension[]> {
  return fetchFromEndpoint<Extension>('ExtensionList', accessToken);
}


/**
 * Fetches all data from the 3CX API.
 * @param options - The options for the ETL process.
 * @returns A promise that resolves to the fetched 3CX data.
 */
export async function fetchThreeCXData(options: ThreeCXETLOptions): Promise<ThreeCXData> {
    const { accessToken } = options;

    const [callRecords, contacts, extensions] = await Promise.all([
        fetchCallRecords(accessToken),
        fetchContacts(accessToken),
        fetchExtensions(accessToken),
    ]);

    return {
        callRecords,
        contacts,
        extensions,
        callAnalytics: [], // Placeholder for now
    };
}

/**
 * Loads the fetched 3CX data into the Supabase database.
 * @param data - The 3CX data to load.
 * @param supabase - The Supabase client instance.
 */
export async function loadDataIntoSupabase(data: ThreeCXData, supabase: ReturnType<typeof createClient<Database>>) {
  const { callRecords, contacts, extensions, callAnalytics } = data;

  if (callRecords.length > 0) {
    const { error } = await supabase.from('3cx_call_records').upsert(callRecords as Database['public']['Tables']['3cx_call_records']['Insert'][]);
    if (error) throw new Error(`Error upserting 3CX call records: ${error.message}`);
  }

  if (contacts.length > 0) {
    const { error } = await supabase.from('3cx_contacts').upsert(contacts as Database['public']['Tables']['3cx_contacts']['Insert'][]);
    if (error) throw new Error(`Error upserting 3CX contacts: ${error.message}`);
  }

  if (extensions.length > 0) {
    const { error } = await supabase.from('3cx_extensions').upsert(extensions as Database['public']['Tables']['3cx_extensions']['Insert'][]);
    if (error) throw new Error(`Error upserting 3CX extensions: ${error.message}`);
  }

  if (callAnalytics.length > 0) {
    const { error } = await supabase.from('3cx_call_analytics').upsert(callAnalytics as Database['public']['Tables']['3cx_call_analytics']['Insert'][]);
    if (error) throw new Error(`Error upserting 3CX call analytics: ${error.message}`);
  }
}