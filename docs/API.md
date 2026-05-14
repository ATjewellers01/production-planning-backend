# API Examples

Base URL:

```txt
http://localhost:4000/api/v1
```

## Create Product

```http
POST /products
Content-Type: application/json

{
  "sku": "RING-22K-001",
  "name": "22K Gold Ring",
  "category": "Ring",
  "purity": "22K",
  "grossWeight": 12.5,
  "netWeight": 11.8
}
```

## Create Production Order

```http
POST /production-orders
Content-Type: application/json

{
  "orderNumber": "PO-2026-0001",
  "productId": "00000000-0000-0000-0000-000000000000",
  "quantity": 10,
  "targetWeight": 118,
  "status": "draft",
  "remarks": "Initial planning order"
}
```

## Standard Response

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Validation failed"
}
```
