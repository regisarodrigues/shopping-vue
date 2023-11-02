/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const colors = require('tailwindcss/colors');

export const content = [
  './index.html',
  './src/**/*.{vue,js,ts,jsx,tsx}',
  './formkit.config.js',
  './node_modules/vue-tailwind-datepicker/**/*.js'
];
export const theme = {
  extend: {
    colors: {
      'vtd-primary': colors.green
    }
  }
};
// eslint-disable-next-line no-undef
export const plugins = [require('@tailwindcss/forms')];
