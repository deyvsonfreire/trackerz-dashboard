import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

/**
 * @interface ThreeCXETLOptions
 * @description Defines the options for the 3CX ETL process.
 * @property {string} supabaseUrl - The URL of the Supabase project.
 * @property {string} supabaseKey - The service role or anon key for the Supabase project.
 */
interface ThreeCXETLOptions {
  supabaseUrl: string;
  supabaseKey: string;
}

/**
 * Fetches data from the 3CX API.
 * This is a placeholder and should be implemented to fetch data from the actual API.
 * @async
 * @param {string} apiToken - The API token for 3CX.
 * @returns {Promise<any>} A promise that resolves with the fetched data.
 * @throws {Error} If the API token is not provided or if the fetch operation fails.
 */
interface ThreeCXData {
  callRecords: any[];
  contacts: any[];
  extensions: any[];
  callAnalytics: any[];
}

async function fetchThreeCXData(apiToken: string): Promise<ThreeCXData> {
  if (!apiToken) {
    throw new Error('3CX API token is required.');
  }

  console.log('Fetching data from 3CX API...');
  // TODO: Implement the actual API call to 3CX

  // Placeholder data
  const placeholderData: ThreeCXData = {
    callRecords: [],
    contacts: [],
    extensions: [],
    callAnalytics: [],
  };

  return Promise.resolve(placeholderData);
}

/**
 * Inserts fetched data into the corresponding Supabase tables for 3CX.
 * @async
 * @param {ThreeCXData} data - The data fetched from the 3CX API.
 * @param {ThreeCXETLOptions} options - The options for the ETL process.
 * @returns {Promise<void>} A promise that resolves when the data has been inserted.
 * @throws {Error} If the Supabase client cannot be created or if the data insertion fails.
 */
async function loadDataIntoSupabase(data: ThreeCXData, options: ThreeCXETLOptions): Promise<void> {
  const supabase = createClient<Database>(options.supabaseUrl, options.supabaseKey);

  console.log('Inserting data into Supabase...');

  try {
    if (data.callRecords && data.callRecords.length > 0) {
      const { error } = await supabase.from('3cx_call_records').insert(data.callRecords);
      if (error) throw new Error(`Error inserting call records: ${error.message}`);
    }

    // TODO: Implement insertion for other tables

    console.log('Data insertion complete.');
  } catch (error) {
    console.error('Error inserting data into Supabase:', error);
    throw error;
  }
}

/**
 * Main function to run the 3CX ETL process.
 * @async
 * @param {ThreeCXETLOptions} options - The options for the ETL process.
 * @param {string} apiToken - The API token for 3CX.
 */
export async function runThreeCXETL(options: ThreeCXETLOptions, apiToken: string): Promise<void> {
  try {
    const data = await fetchThreeCXData(apiToken);
    await loadDataIntoSupabase(data, options);
    console.log('3CX ETL process completed successfully.');
  } catch (error) {
    console.error('3CX ETL process failed:', error);
  }
}