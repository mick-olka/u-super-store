// these are set in main.ts
export const envNames = {
  DATABASE_URL: "DATABASE_URL",
  ADMIN_KEY: "ADMIN_KEY",
  ACCESS_TOKEN_SECRET: "ACCESS_TOKEN_SECRET",
  REFRESH_TOKEN_SECRET: "REFRESH_TOKEN_SECRET",
  ALLOW_UNAUTHORIZED_ORDERS: "ALLOW_UNAUTHORIZED_ORDERS",
};

export enum EVENTS {
  product_deleted = "product.deleted",
  photos_deleted = "photos.deleted",
  photos_added = "photos.added",
  collection_deleted = "collection.deleted",
  collection_items_updated = "collection.items.updated",
  product_import = "product.import",
  order_created = "order.created",
  order_deleted = "order.deleted",
}
