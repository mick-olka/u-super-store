export enum ROUTES {
  home = '/admin/',
  error = '/admin/*',

  // Info
  info = '/admin/info',

  product = '/admin/product/:id',
  createProduct = '/admin/product/create',

  collectionsPage = '/admin/collections',
  collection = '/admin/collections/:id',
  createCollection = '/admin/collections/create',

  ordersPage = '/admin/orders',
  order = '/admin/orders/:id',
  createOrder = '/admin/orders/create',

  textBlocksPage = '/admin/text_blocks',
  textBlock = '/admin/text_blocks/:id',

  // Auth
  login = '/admin/login',
  register = '/admin/register',
}
