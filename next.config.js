/** @type {import('next').NextConfig} */
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//     enabled: process.env.ANALYZE === "true",
// });

const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    compiler: {
        styledComponents: true,
    },
    // 쿠키 발행 테스팅을 위한 프록시 설정
    // async rewrites() {
    //     return [
    //         {
    //             source: "/:path*",
    //             destination: "http://127.0.0.1:8080/:path*",
    //         },
    //     ];
    // },
};

// module.exports = (phase, defaultConfig) => {
//     return withBundleAnalyzer(defaultConfig);
// };

module.exports = nextConfig;
