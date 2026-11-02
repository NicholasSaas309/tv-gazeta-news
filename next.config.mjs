/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Preparado para Vercel: sem configuração especial necessária.
  // Imagens: domínios externos (ex.: Supabase Storage) serão adicionados em fases futuras.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "i9.ytimg.com" },
    ],
  },
};

export default nextConfig;
