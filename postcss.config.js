module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Electron 환경에서 CSS 호환성을 위한 설정
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
      },
    },
  },
};
