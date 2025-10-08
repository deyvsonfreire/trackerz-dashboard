/**
 * Interface que representa um produto no sistema
 */
export interface Product {
  /** ID único do produto */
  id: string;
  /** Nome do produto */
  name: string;
  /** Descrição do produto */
  description?: string;
  /** Preço do produto */
  price: number;
  /** ID da categoria do produto */
  category_id?: string;
  /** Nome da categoria */
  category_name?: string;
  /** URL da imagem do produto */
  image_url?: string;
  /** Quantidade em estoque */
  stock_quantity?: number;
  /** SKU do produto */
  sku?: string;
  /** Data de criação do registro */
  created_at: string;
  /** Data da última atualização */
  updated_at: string;
}