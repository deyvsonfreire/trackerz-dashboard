import { DrillDownData } from '@/components/charts/DrillDownChart';

/**
 * Dados hierárquicos para demonstrar drill-down por canal de marketing
 */
export const channelDrillDownData: DrillDownData[] = [
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    value: 125000,
    color: '#1877F2',
    children: [
      {
        id: 'meta-facebook',
        name: 'Facebook',
        value: 75000,
        color: '#1877F2',
        children: [
          { id: 'meta-facebook-feed', name: 'Feed', value: 45000, color: '#1877F2' },
          { id: 'meta-facebook-stories', name: 'Stories', value: 20000, color: '#4267B2' },
          { id: 'meta-facebook-reels', name: 'Reels', value: 10000, color: '#0866FF' }
        ]
      },
      {
        id: 'meta-instagram',
        name: 'Instagram',
        value: 50000,
        color: '#E4405F',
        children: [
          { id: 'meta-instagram-feed', name: 'Feed', value: 25000, color: '#E4405F' },
          { id: 'meta-instagram-stories', name: 'Stories', value: 15000, color: '#C13584' },
          { id: 'meta-instagram-reels', name: 'Reels', value: 10000, color: '#833AB4' }
        ]
      }
    ]
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    value: 98000,
    color: '#4285F4',
    children: [
      {
        id: 'google-search',
        name: 'Search',
        value: 60000,
        color: '#4285F4',
        children: [
          { id: 'google-search-brand', name: 'Brand Keywords', value: 35000, color: '#4285F4' },
          { id: 'google-search-generic', name: 'Generic Keywords', value: 25000, color: '#1A73E8' }
        ]
      },
      {
        id: 'google-display',
        name: 'Display',
        value: 25000,
        color: '#34A853',
        children: [
          { id: 'google-display-remarketing', name: 'Remarketing', value: 15000, color: '#34A853' },
          { id: 'google-display-prospecting', name: 'Prospecting', value: 10000, color: '#137333' }
        ]
      },
      {
        id: 'google-youtube',
        name: 'YouTube',
        value: 13000,
        color: '#FF0000',
        children: [
          { id: 'google-youtube-skippable', name: 'Skippable', value: 8000, color: '#FF0000' },
          { id: 'google-youtube-non-skippable', name: 'Non-Skippable', value: 5000, color: '#CC0000' }
        ]
      }
    ]
  },
  {
    id: 'linkedin-ads',
    name: 'LinkedIn Ads',
    value: 45000,
    color: '#0077B5',
    children: [
      {
        id: 'linkedin-sponsored',
        name: 'Sponsored Content',
        value: 25000,
        color: '#0077B5',
        children: [
          { id: 'linkedin-sponsored-single', name: 'Single Image', value: 15000, color: '#0077B5' },
          { id: 'linkedin-sponsored-carousel', name: 'Carousel', value: 10000, color: '#005885' }
        ]
      },
      {
        id: 'linkedin-message',
        name: 'Message Ads',
        value: 12000,
        color: '#00A0DC',
        children: [
          { id: 'linkedin-message-sponsored', name: 'Sponsored InMail', value: 8000, color: '#00A0DC' },
          { id: 'linkedin-message-conversation', name: 'Conversation Ads', value: 4000, color: '#0073A4' }
        ]
      },
      {
        id: 'linkedin-dynamic',
        name: 'Dynamic Ads',
        value: 8000,
        color: '#7FC15E',
        children: [
          { id: 'linkedin-dynamic-follower', name: 'Follower Ads', value: 5000, color: '#7FC15E' },
          { id: 'linkedin-dynamic-spotlight', name: 'Spotlight Ads', value: 3000, color: '#5F9142' }
        ]
      }
    ]
  },
  {
    id: 'tiktok-ads',
    name: 'TikTok Ads',
    value: 32000,
    color: '#000000',
    children: [
      {
        id: 'tiktok-in-feed',
        name: 'In-Feed Ads',
        value: 20000,
        color: '#000000',
        children: [
          { id: 'tiktok-in-feed-video', name: 'Video Ads', value: 15000, color: '#000000' },
          { id: 'tiktok-in-feed-image', name: 'Image Ads', value: 5000, color: '#333333' }
        ]
      },
      {
        id: 'tiktok-spark',
        name: 'Spark Ads',
        value: 8000,
        color: '#FF0050',
        children: [
          { id: 'tiktok-spark-organic', name: 'Organic Posts', value: 5000, color: '#FF0050' },
          { id: 'tiktok-spark-branded', name: 'Branded Content', value: 3000, color: '#E6004A' }
        ]
      },
      {
        id: 'tiktok-brand',
        name: 'Brand Takeover',
        value: 4000,
        color: '#25F4EE',
        children: [
          { id: 'tiktok-brand-image', name: 'Image Takeover', value: 2500, color: '#25F4EE' },
          { id: 'tiktok-brand-video', name: 'Video Takeover', value: 1500, color: '#1DD1CB' }
        ]
      }
    ]
  }
];

/**
 * Dados hierárquicos para demonstrar drill-down por região
 */
export const regionDrillDownData: DrillDownData[] = [
  {
    id: 'sudeste',
    name: 'Sudeste',
    value: 180000,
    color: '#8884d8',
    children: [
      {
        id: 'sao-paulo',
        name: 'São Paulo',
        value: 120000,
        color: '#8884d8',
        children: [
          { id: 'sp-capital', name: 'Capital', value: 80000, color: '#8884d8' },
          { id: 'sp-interior', name: 'Interior', value: 25000, color: '#7A7BD8' },
          { id: 'sp-litoral', name: 'Litoral', value: 15000, color: '#6C72D8' }
        ]
      },
      {
        id: 'rio-janeiro',
        name: 'Rio de Janeiro',
        value: 35000,
        color: '#82ca9d',
        children: [
          { id: 'rj-capital', name: 'Capital', value: 25000, color: '#82ca9d' },
          { id: 'rj-interior', name: 'Interior', value: 10000, color: '#7BC49A' }
        ]
      },
      {
        id: 'minas-gerais',
        name: 'Minas Gerais',
        value: 25000,
        color: '#ffc658',
        children: [
          { id: 'mg-bh', name: 'Belo Horizonte', value: 15000, color: '#ffc658' },
          { id: 'mg-interior', name: 'Interior', value: 10000, color: '#FFC042' }
        ]
      }
    ]
  },
  {
    id: 'sul',
    name: 'Sul',
    value: 95000,
    color: '#ff7300',
    children: [
      {
        id: 'rio-grande-sul',
        name: 'Rio Grande do Sul',
        value: 45000,
        color: '#ff7300',
        children: [
          { id: 'rs-porto-alegre', name: 'Porto Alegre', value: 30000, color: '#ff7300' },
          { id: 'rs-interior', name: 'Interior', value: 15000, color: '#E66A00' }
        ]
      },
      {
        id: 'parana',
        name: 'Paraná',
        value: 35000,
        color: '#00ff00',
        children: [
          { id: 'pr-curitiba', name: 'Curitiba', value: 25000, color: '#00ff00' },
          { id: 'pr-interior', name: 'Interior', value: 10000, color: '#00E600' }
        ]
      },
      {
        id: 'santa-catarina',
        name: 'Santa Catarina',
        value: 15000,
        color: '#0088fe',
        children: [
          { id: 'sc-florianopolis', name: 'Florianópolis', value: 8000, color: '#0088fe' },
          { id: 'sc-interior', name: 'Interior', value: 7000, color: '#007AE6' }
        ]
      }
    ]
  },
  {
    id: 'nordeste',
    name: 'Nordeste',
    value: 65000,
    color: '#00c49f',
    children: [
      {
        id: 'bahia',
        name: 'Bahia',
        value: 25000,
        color: '#00c49f',
        children: [
          { id: 'ba-salvador', name: 'Salvador', value: 18000, color: '#00c49f' },
          { id: 'ba-interior', name: 'Interior', value: 7000, color: '#00B08F' }
        ]
      },
      {
        id: 'pernambuco',
        name: 'Pernambuco',
        value: 20000,
        color: '#ffbb28',
        children: [
          { id: 'pe-recife', name: 'Recife', value: 15000, color: '#ffbb28' },
          { id: 'pe-interior', name: 'Interior', value: 5000, color: '#E6A623' }
        ]
      },
      {
        id: 'ceara',
        name: 'Ceará',
        value: 20000,
        color: '#ff8042',
        children: [
          { id: 'ce-fortaleza', name: 'Fortaleza', value: 15000, color: '#ff8042' },
          { id: 'ce-interior', name: 'Interior', value: 5000, color: '#E6733B' }
        ]
      }
    ]
  },
  {
    id: 'centro-oeste',
    name: 'Centro-Oeste',
    value: 35000,
    color: '#8dd1e1',
    children: [
      {
        id: 'distrito-federal',
        name: 'Distrito Federal',
        value: 20000,
        color: '#8dd1e1',
        children: [
          { id: 'df-brasilia', name: 'Brasília', value: 20000, color: '#8dd1e1' }
        ]
      },
      {
        id: 'goias',
        name: 'Goiás',
        value: 10000,
        color: '#7BC7D9',
        children: [
          { id: 'go-goiania', name: 'Goiânia', value: 7000, color: '#7BC7D9' },
          { id: 'go-interior', name: 'Interior', value: 3000, color: '#6BBDD1' }
        ]
      },
      {
        id: 'mato-grosso',
        name: 'Mato Grosso',
        value: 5000,
        color: '#69BDC9',
        children: [
          { id: 'mt-cuiaba', name: 'Cuiabá', value: 3000, color: '#69BDC9' },
          { id: 'mt-interior', name: 'Interior', value: 2000, color: '#5AB3C1' }
        ]
      }
    ]
  },
  {
    id: 'norte',
    name: 'Norte',
    value: 25000,
    color: '#d084d0',
    children: [
      {
        id: 'amazonas',
        name: 'Amazonas',
        value: 12000,
        color: '#d084d0',
        children: [
          { id: 'am-manaus', name: 'Manaus', value: 10000, color: '#d084d0' },
          { id: 'am-interior', name: 'Interior', value: 2000, color: '#C877C8' }
        ]
      },
      {
        id: 'para',
        name: 'Pará',
        value: 8000,
        color: '#C86AC8',
        children: [
          { id: 'pa-belem', name: 'Belém', value: 6000, color: '#C86AC8' },
          { id: 'pa-interior', name: 'Interior', value: 2000, color: '#C05DC0' }
        ]
      },
      {
        id: 'outros-norte',
        name: 'Outros Estados',
        value: 5000,
        color: '#B850B8',
        children: [
          { id: 'outros-norte-capitais', name: 'Capitais', value: 3000, color: '#B850B8' },
          { id: 'outros-norte-interior', name: 'Interior', value: 2000, color: '#B043B0' }
        ]
      }
    ]
  }
];

/**
 * Dados hierárquicos para demonstrar drill-down por produto/categoria
 */
export const productDrillDownData: DrillDownData[] = [
  {
    id: 'eletronicos',
    name: 'Eletrônicos',
    value: 250000,
    color: '#8884d8',
    children: [
      {
        id: 'smartphones',
        name: 'Smartphones',
        value: 120000,
        color: '#8884d8',
        children: [
          { id: 'iphone', name: 'iPhone', value: 70000, color: '#8884d8' },
          { id: 'samsung', name: 'Samsung', value: 35000, color: '#7A7BD8' },
          { id: 'xiaomi', name: 'Xiaomi', value: 15000, color: '#6C72D8' }
        ]
      },
      {
        id: 'laptops',
        name: 'Laptops',
        value: 80000,
        color: '#82ca9d',
        children: [
          { id: 'macbook', name: 'MacBook', value: 45000, color: '#82ca9d' },
          { id: 'dell', name: 'Dell', value: 20000, color: '#7BC49A' },
          { id: 'lenovo', name: 'Lenovo', value: 15000, color: '#74BE97' }
        ]
      },
      {
        id: 'acessorios',
        name: 'Acessórios',
        value: 50000,
        color: '#ffc658',
        children: [
          { id: 'fones', name: 'Fones de Ouvido', value: 25000, color: '#ffc658' },
          { id: 'capas', name: 'Capas e Cases', value: 15000, color: '#FFC042' },
          { id: 'carregadores', name: 'Carregadores', value: 10000, color: '#FFBA2C' }
        ]
      }
    ]
  },
  {
    id: 'roupas',
    name: 'Roupas',
    value: 180000,
    color: '#ff7300',
    children: [
      {
        id: 'masculino',
        name: 'Masculino',
        value: 90000,
        color: '#ff7300',
        children: [
          { id: 'camisetas-m', name: 'Camisetas', value: 40000, color: '#ff7300' },
          { id: 'calcas-m', name: 'Calças', value: 30000, color: '#E66A00' },
          { id: 'sapatos-m', name: 'Sapatos', value: 20000, color: '#CC6100' }
        ]
      },
      {
        id: 'feminino',
        name: 'Feminino',
        value: 90000,
        color: '#00ff00',
        children: [
          { id: 'vestidos', name: 'Vestidos', value: 35000, color: '#00ff00' },
          { id: 'blusas', name: 'Blusas', value: 30000, color: '#00E600' },
          { id: 'sapatos-f', name: 'Sapatos', value: 25000, color: '#00CC00' }
        ]
      }
    ]
  },
  {
    id: 'casa',
    name: 'Casa e Decoração',
    value: 120000,
    color: '#0088fe',
    children: [
      {
        id: 'moveis',
        name: 'Móveis',
        value: 70000,
        color: '#0088fe',
        children: [
          { id: 'sofas', name: 'Sofás', value: 30000, color: '#0088fe' },
          { id: 'mesas', name: 'Mesas', value: 25000, color: '#007AE6' },
          { id: 'cadeiras', name: 'Cadeiras', value: 15000, color: '#006CCC' }
        ]
      },
      {
        id: 'decoracao',
        name: 'Decoração',
        value: 30000,
        color: '#00c49f',
        children: [
          { id: 'quadros', name: 'Quadros', value: 15000, color: '#00c49f' },
          { id: 'plantas', name: 'Plantas', value: 10000, color: '#00B08F' },
          { id: 'luminarias', name: 'Luminárias', value: 5000, color: '#009C7F' }
        ]
      },
      {
        id: 'eletrodomesticos',
        name: 'Eletrodomésticos',
        value: 20000,
        color: '#ffbb28',
        children: [
          { id: 'geladeiras', name: 'Geladeiras', value: 8000, color: '#ffbb28' },
          { id: 'fogoes', name: 'Fogões', value: 7000, color: '#E6A623' },
          { id: 'micro-ondas', name: 'Micro-ondas', value: 5000, color: '#CC911E' }
        ]
      }
    ]
  }
];

export default {
  channelDrillDownData,
  regionDrillDownData,
  productDrillDownData
};