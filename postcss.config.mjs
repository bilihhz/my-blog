import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import postcssNesting from 'tailwindcss/nesting/index.js';
import tailwindcss from 'tailwindcss';

export default {
    plugins: {
        'postcss-import': postcssImport,          // to combine multiple css files
        'tailwindcss/nesting': postcssNesting,
        tailwindcss: tailwindcss,
        autoprefixer: autoprefixer,               // 替代原 @astrojs/tailwind 提供的 autoprefixer
    }
};
