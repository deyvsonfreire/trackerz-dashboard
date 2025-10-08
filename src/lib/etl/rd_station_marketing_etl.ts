import { createClient } from '@supabase/supabase-js';
import { Database } from '../../../types/supabase';
import fetch from 'node-fetch';

const RD_STATION_MARKETING_API_URL = 'https://api.rd.services/v2';

/**
 * @interface RDStationMarketingETLOptions
 * @description Defines the options for the RD Station Marketing ETL process.
 * @property {string} supabaseUrl - The URL of the Supabase project.
 * @property {string} supabaseKey - The service role or anon key for the Supabase project.
 */
interface RDStationMarketingETLOptions {
  supabaseUrl: string;
  supabaseKey: string;
}


/**
 * @interface Contato
 * @description Defines the structure for an RD Station Marketing contact.
 */
interface Contato {
  id: string;
  email: string;
  // Add other relevant contact properties
}

/**
 * @interface Campanha
 * @description Defines the structure for an RD Station Marketing campaign.
 */
interface Campanha {
  id: string;
  name: string;
  // Add other relevant campaign properties
}

/**
 * @interface Conversao
 * @description Defines the structure for an RD Station Marketing conversion.
 */
interface Conversao {
  id: string;
  email: string;
  // Add other relevant conversion properties
}

/**
 * @interface Interacao
 * @description Defines the structure for an RD Station Marketing interaction.
 */
interface Interacao {
  id: string;
  type: string;
  // Add other relevant interaction properties
}

/**
 * @interface FunilAnalytics
 * @description Defines the structure for RD Station Marketing funnel analytics.
 */
interface FunilAnalytics {
  id: string;
  name: string;
  // Add other relevant funnel analytics properties
}

/**
 * @interface WebhookLog
 * @description Defines the structure for an RD Station Marketing webhook log.
 */
interface WebhookLog {
  id: string;
  url: string;
  // Add other relevant webhook log properties
}

/**
 * @interface RDStationMarketingData
 * @description Defines the structure of the data fetched from the RD Station Marketing API.
 */
interface RDStationMarketingData {
  contatos: Contato[];
  campanhas: Campanha[];
  conversoes: Conversao[];
  interacoes: Interacao[];
  funilAnalytics: FunilAnalytics[];
  webhooksLog: WebhookLog[];
}

interface RDStationMarketingAPIResponse<T> {
  items: T[];
  next_page_url: string | null;
}

async function fetchFromEndpoint<T>(endpoint: string, apiToken: string): Promise<T[]> {
  let allItems: T[] = [];
  let url: string | null = `${RD_STATION_MARKETING_API_URL}/${endpoint}`;

  while (url) {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }
    const data = await response.json() as RDStationMarketingAPIResponse<T> | T[];
    if (Array.isArray(data)) {
      allItems = allItems.concat(data);
      url = null;
    } else {
      allItems = allItems.concat(data.items);
      url = data.next_page_url ? data.next_page_url : null;
    }
  }

  return allItems;
}

async function fetchContatos(apiToken: string): Promise<Contato[]> {
  return fetchFromEndpoint<Contato>('contacts', apiToken);
}

async function fetchCampanhas(apiToken: string): Promise<Campanha[]> {
  return fetchFromEndpoint<Campanha>('campaigns', apiToken);
}

async function fetchConversoes(apiToken: string): Promise<Conversao[]> {
  return fetchFromEndpoint<Conversao>('conversions', apiToken);
}

async function fetchRDStationMarketingData(apiToken: string): Promise<RDStationMarketingData> {
  if (!apiToken) {
    throw new Error('RD Station Marketing API token is required.');
  }

  console.log('Fetching data from RD Station Marketing API...');
  
  const [contatos, campanhas, conversoes] = await Promise.all([
    fetchContatos(apiToken),
    fetchCampanhas(apiToken),
    fetchConversoes(apiToken),
  ]);

  // Placeholder data
  const placeholderData: RDStationMarketingData = {
    contatos,
    campanhas,
    conversoes,
    interacoes: [],
    funilAnalytics: [],
    webhooksLog: [],
  };

  return Promise.resolve(placeholderData);
}

/**
 * Inserts fetched data into the corresponding Supabase tables for RD Station Marketing.
 * @async
 * @param {RDStationMarketingData} data - The data fetched from the RD Station Marketing API.
 * @param {RDStationMarketingETLOptions} options - The options for the ETL process.
 * @returns {Promise<void>} A promise that resolves when the data has been inserted.
 * @throws {Error} If the Supabase client cannot be created or if the data insertion fails.
 */
async function loadDataIntoSupabase(data: RDStationMarketingData, options: RDStationMarketingETLOptions): Promise<void> {
  const supabase = createClient<Database>(options.supabaseUrl, options.supabaseKey);

  console.log('Inserting data into Supabase...');

  try {
    const promises = [];

    if (data.contatos && data.contatos.length > 0) {
      promises.push(supabase.from('rd_marketing_contatos').upsert(data.contatos, { onConflict: 'id' }));
    }
    if (data.campanhas && data.campanhas.length > 0) {
      promises.push(supabase.from('rd_marketing_campanhas').upsert(data.campanhas, { onConflict: 'id' }));
    }
    if (data.conversoes && data.conversoes.length > 0) {
      promises.push(supabase.from('rd_marketing_conversoes').upsert(data.conversoes, { onConflict: 'id' }));
    }
    if (data.interacoes && data.interacoes.length > 0) {
      promises.push(supabase.from('rd_marketing_interacoes').upsert(data.interacoes, { onConflict: 'id' }));
    }
    if (data.funilAnalytics && data.funilAnalytics.length > 0) {
      promises.push(supabase.from('rd_marketing_funil_analytics').upsert(data.funilAnalytics, { onConflict: 'id' }));
    }
    if (data.webhooksLog && data.webhooksLog.length > 0) {
      promises.push(supabase.from('rd_marketing_webhooks_log').upsert(data.webhooksLog, { onConflict: 'id' }));
    }

    const results = await Promise.all(promises);

    results.forEach(result => {
      if (result.error) {
        throw new Error(`Error inserting data: ${result.error.message}`);
      }
    });

    console.log('Data insertion complete.');
  } catch (error) {
    console.error('Error inserting data into Supabase:', error);
    throw error;
  }
}

/**
 * Main function to run the RD Station Marketing ETL process.
 * @async
 * @param {RDStationMarketingETLOptions} options - The options for the ETL process.
 * @param {string} apiToken - The API token for RD Station Marketing.
 */
export async function runRDStationMarketingETL(options: RDStationMarketingETLOptions, apiToken: string): Promise<void> {
  try {
    const data = await fetchRDStationMarketingData(apiToken);
    await loadDataIntoSupabase(data, options);
    console.log('RD Station Marketing ETL process completed successfully.');
  } catch (error) {
    console.error('RD Station Marketing ETL process failed:', error);
  }
}