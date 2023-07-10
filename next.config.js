module.exports = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },

    // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    //     // Note: we provide webpack above so you should not `require` it
    //     // Perform customizations to webpack config
    //     config.plugins.push(
    //         new webpack.ProvidePlugin({
    //             $: 'jquery',
    //             jQuery: 'jquery',
    //             'window.jQuery': 'jquery',
    //         }),
    //     )
    //     // Important: return the modified config
    //     return config
    // },
}
