/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: "/neet-result",
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
};

export default nextConfig;