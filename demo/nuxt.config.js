import postcssConfig from '../webpack/webpack.postcss.config';
import svgConfig from '../webpack/webpack.svg.config';

import path from 'path';

export default {
    alias: {
        'webapps-common': path.resolve(__dirname, '..'),
        '../../../node_modules/fontsource-roboto': path.resolve(__dirname, 'node_modules', 'fontsource-roboto'),
        '../../buildtools/opensourcecredits/used-packages.json': '../../demo/assets/used-packages-mock.json'
    },
    head: {
        title: 'KNIME Web Apps Common Demo',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    loading: false,
    css: [
        '~/assets/index.css'
    ],
    modules: [
        // this must be the first entry in the list
        '~/modules/server-logger'
    ],
    plugins: [
        '~/plugins/logger.client'
    ],
    build: {
        postcss: postcssConfig,
        extend(config, { isDev, isClient, isServer }) {
            // limit nuxt default image rule to *.gif because we want to handle all others ourselves
            const imgRule = config.module.rules.find(
                rule => String(rule.test) === String(/\.(png|jpe?g|gif|svg|webp|avif)$/i)
            );
            imgRule.test = /\.(gif)$/i;

            config.module.rules.push(svgConfig);
        }
    },
    render: {
        bundleRenderer: {
            runInNewContext: false
        }
    }
};
