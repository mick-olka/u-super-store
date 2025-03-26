export const globalConfig = {
  userCanOrderWithoutAuth: process.env.NEXT_PUBLIC_USER_CAN_ORDER_WITHOUT_AUTH === "true" || true,
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "localhost:7500",
  localUrl: process.env.NEXT_PUBLIC_LOCAL_URL || "localhost:3000",
  shopLabel: process.env.NEXT_PUBLIC_SHOP_LABEL || "Rotang.ua",
  email: "mickolka64@gmail.com",
  gitHub: "https://github.com/mick-olka/turbo-store",
};
