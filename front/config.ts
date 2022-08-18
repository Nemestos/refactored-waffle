export const config = {
  API_PORT: process.env.API_PORT || 80,
  FRONT_PORT: process.env.FRONT_PORT || 3000,
  PUBLIC_API: `http://${process.env.NEXT_PUBLIC_API_HOST || 'localhost'}:${process.env.API_PORT || 8080}`,
  NETWORK_API: `http://${process.env.NEXT_PUBLIC_NETWORK_API_HOST || 'api'}:${process.env.API_PORT || 8080}`
}
