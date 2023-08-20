/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    compiler: {
        styledComponents: true,
    },
    // 쿠키 발행 테스팅을 위한 프록시 설정
    async rewrites() {
        return [
            {
                source: "/:path*",
                destination: "http://localhost:8080/:path*",
            },
        ];
    },
};

module.exports = nextConfig;
