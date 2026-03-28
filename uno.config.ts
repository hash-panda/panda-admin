import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        ant: () => import('@iconify-json/ant-design/icons.json').then((i) => i.default),
      },
    }),
  ],
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'flex-col-center': 'flex flex-col items-center justify-center',
  },
  theme: {
    colors: {
      primary: {
        DEFAULT: '#1677ff',
        hover: '#4096ff',
        active: '#0958d9',
      },
    },
  },
});
