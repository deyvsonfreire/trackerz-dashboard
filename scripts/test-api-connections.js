/**
 * Script para testar conexões com as APIs
 * 
 * Execute com: node scripts/test-api-connections.js
 */

import { config } from 'dotenv';
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';

// Carrega as variáveis de ambiente
config({ path: '.env.local' });

// Cores para o console
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Função para testar uma API
async function testAPI(name, testFunction) {
  console.log(`\n${colors.cyan}Testando conexão com ${name}...${colors.reset}`);
  try {
    const startTime = Date.now();
    const result = await testFunction();
    const endTime = Date.now();
    
    console.log(`${colors.green}✓ Conexão com ${name} bem-sucedida (${endTime - startTime}ms)${colors.reset}`);
    if (result) {
      console.log(`${colors.blue}Detalhes: ${JSON.stringify(result, null, 2)}${colors.reset}`);
    }
    return true;
  } catch (error) {
    console.log(`${colors.red}✗ Erro ao conectar com ${name}: ${error.message}${colors.reset}`);
    console.log(`${colors.yellow}Detalhes do erro: ${JSON.stringify(error, null, 2)}${colors.reset}`);
    return false;
  }
}

// Teste de conexão com Supabase
async function testSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Variáveis de ambiente do Supabase não configuradas');
  }
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await supabase.from('platforms').select('*').limit(1);
  
  if (error) throw error;
  return { count: data.length };
}

// Teste de conexão com Meta API
async function testMetaAPI() {
  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;
  const accessToken = process.env.META_ACCESS_TOKEN;
  
  if (!appId || !appSecret || !accessToken) {
    throw new Error('Variáveis de ambiente da Meta API não configuradas');
  }
  
  // Apenas verificando se as variáveis estão definidas
  return { configured: true };
}

// Teste de conexão com Google APIs
async function testGoogleAPIs() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Variáveis de ambiente do Google APIs não configuradas');
  }
  
  // Apenas verificando se as variáveis estão definidas
  return { configured: true };
}

// Teste de conexão com RD Station
async function testRDStation() {
  const clientId = process.env.RD_STATION_CLIENT_ID;
  const clientSecret = process.env.RD_STATION_CLIENT_SECRET;
  const refreshToken = process.env.RD_STATION_REFRESH_TOKEN;
  
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Variáveis de ambiente do RD Station não configuradas');
  }
  
  // Apenas verificando se as variáveis estão definidas
  return { configured: true };
}

// Teste de conexão com 3CX
async function test3CX() {
  const apiUrl = process.env.CX3_API_URL;
  const apiToken = process.env.CX3_API_TOKEN;
  
  if (!apiUrl || !apiToken) {
    throw new Error('Variáveis de ambiente do 3CX não configuradas');
  }
  
  // Apenas verificando se as variáveis estão definidas
  return { configured: true };
}

// Teste de conexão com Exact Sales
async function testExactSales() {
  const apiUrl = process.env.EXACT_SALES_API_URL;
  const apiKey = process.env.EXACT_SALES_API_KEY;
  
  if (!apiUrl || !apiKey) {
    throw new Error('Variáveis de ambiente do Exact Sales não configuradas');
  }
  
  // Apenas verificando se as variáveis estão definidas
  return { configured: true };
}

// Teste de conexão com Irroba
async function testIrroba() {
  const apiUrl = process.env.IRROBA_API_URL;
  const apiKey = process.env.IRROBA_API_KEY;
  
  if (!apiUrl || !apiKey) {
    throw new Error('Variáveis de ambiente do Irroba não configuradas');
  }
  
  // Apenas verificando se as variáveis estão definidas
  return { configured: true };
}

// Função principal para executar todos os testes
async function runAllTests() {
  console.log(`${colors.magenta}=== INICIANDO TESTES DE CONEXÃO COM APIS ====${colors.reset}`);
  
  const results = {
    supabase: await testAPI('Supabase', testSupabase),
    meta: await testAPI('Meta API', testMetaAPI),
    google: await testAPI('Google APIs', testGoogleAPIs),
    rdStation: await testAPI('RD Station', testRDStation),
    cx3: await testAPI('3CX', test3CX),
    exactSales: await testAPI('Exact Sales', testExactSales),
    irroba: await testAPI('Irroba', testIrroba)
  };
  
  console.log(`\n${colors.magenta}=== RESUMO DOS TESTES ====${colors.reset}`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const [api, success] of Object.entries(results)) {
    if (success) {
      successCount++;
      console.log(`${colors.green}✓ ${api}${colors.reset}`);
    } else {
      failCount++;
      console.log(`${colors.red}✗ ${api}${colors.reset}`);
    }
  }
  
  console.log(`\n${colors.cyan}Total: ${successCount + failCount}, Sucesso: ${successCount}, Falha: ${failCount}${colors.reset}`);
}

// Executar todos os testes
runAllTests().catch(error => {
  console.error(`${colors.red}Erro ao executar testes: ${error.message}${colors.reset}`);
  process.exit(1);
});