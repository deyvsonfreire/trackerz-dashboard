# Irroba API Analysis

## 1. Technical Characteristics

- **API Type**: RESTful
- **Data Format**: JSON
- **Authentication**: API Key sent in the request headers.
- **Rate Limiting**: Details on rate limits need to be confirmed from the documentation.
- **Pagination**: The API likely uses a page-based or offset-based pagination system.

## 2. Data Structures

Based on typical e-commerce platforms, the Irroba API is expected to provide the following resources:

### 2.1. Order

Represents a customer's order.

- `id`: (string) Unique identifier for the order.
- `status`: (string) The current status of the order (e.g., 'pending', 'paid', 'shipped').
- `total`: (number) The total amount of the order.
- `client_id`: (string) The ID of the client who placed the order.
- `created_at`: (string) The timestamp when the order was created.

### 2.2. Client

Represents a customer.

- `id`: (string) Unique identifier for the client.
- `name`: (string) The client's name.
- `email`: (string) The client's email address.
- `document`: (string) The client's document number (CPF/CNPJ).

### 2.3. Product

Represents a product in the store.

- `id`: (string) Unique identifier for the product.
- `name`: (string) The product's name.
- `sku`: (string) The product's stock keeping unit.
- `price`: (number) The product's price.

## 3. Proposed Database Modeling

### 3.1. `irroba_orders` Table

| Column Name | Data Type | Description |
|---|---|---|
| `id` | `TEXT` | Primary Key. The order's unique identifier. |
| `status` | `TEXT` | The status of the order. |
| `total` | `NUMERIC` | The total amount of the order. |
| `client_id` | `TEXT` | Foreign key to the `irroba_clients` table. |
| `created_at` | `TIMESTAMP` | The timestamp when the order was created. |

### 3.2. `irroba_clients` Table

| Column Name | Data Type | Description |
|---|---|---|
| `id` | `TEXT` | Primary Key. The client's unique identifier. |
| `name` | `TEXT` | The client's name. |
| `email` | `TEXT` | The client's email address. |
| `document` | `TEXT` | The client's document number. |

### 3.3. `irroba_products` Table

| Column Name | Data Type | Description |
|---|---|---|
| `id` | `TEXT` | Primary Key. The product's unique identifier. |
| `name` | `TEXT` | The product's name. |
| `sku` | `TEXT` | The product's SKU. |
| `price` | `NUMERIC` | The product's price. |