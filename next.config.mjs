import removeImports from 'next-remove-imports';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@uiw/react-md-editor'],
  webpack: (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
            include: [/@uiw\/react-md-editor\//],
          },
        ],
      },
    };
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap.xml',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots.txt',
      },
    ];
  },
};

export default removeImports(nextConfig);
