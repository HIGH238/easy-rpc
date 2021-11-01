const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
    // specify other options here
    theme: {
        colors: {
            ...defaultTheme.colors,
            discord: {
                blurple: '#5865F2',
                lightBlurple: '#727df1',
                green: '#57F287',
                yellow: '#FEE75C',
                red: '#ED4245',
                lightRed: '#ff6673',
                grey: '#2c2f33',
                lightBlack: '#23272a',
                lightGrey: '#99aab5'
            }
        }
    }
};