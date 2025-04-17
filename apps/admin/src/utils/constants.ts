export const globalConfig = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://178.54.240.228:7500/api',
  clientUrl: import.meta.env.VITE_CLIENT_URL || 'http://178.54.240.228:3000/',
  shopLabel: import.meta.env.VITE_SHOP_LABEL || 'Rotang.ua',
  productsPageLimit: 40,
  ordersPageLimit: 20,
  photosUrl: (import.meta.env.VITE_API_URL || 'http://178.54.240.228:7500/api') + '/upload/',
}
