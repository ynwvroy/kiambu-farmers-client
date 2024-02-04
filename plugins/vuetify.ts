import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import * as labsComponents from 'vuetify/labs/components';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

import type { ThemeDefinition } from 'vuetify/vuetify';

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    'primary': '#feeb29',
    'lightbg': '#f8f6ea',
    'info': '#03c9d7',
    'success': '#05b187',
    'accent': '#fc4b6c',
    'warning': '#fec90f',
    'error': '#fc4b6c',
    'secondary': '#0cb9c5',
    'link': '#ff4c4c',
    'natureWhite': '#f8f6ea',
    'yellowStrong': '#feeb29',
    'red': '#fa4400',
    'green': '#63a46c',
    'greyUltrabright': '#f6f6f6',
    'greyBright': '#eeeeee',
    'greyMedium': '#d9d9d9',
    'grey-dark': '#7a7a7a',
    'greyUltradark': '#484848',
    'black': '#242424',
    'white': '#ffffff',
    'pitchBlack': '#000000',
    'completed': '#DAFFDF',
  },
};

const icons = {
  defaultSet: 'mdi',
  aliases,
  sets: {
    mdi,
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components: { ...components, ...labsComponents },
    icons,
    directives,
    theme: {
      themes: {
        light: lightTheme,
      },
    },
    display: {
      thresholds: {
        lg: 1150,
      },
    },
    defaults: {
      VBtn: {
        color: '#feeb29',
        rounded: 'lg',
        flat: true,
        fontWeight: '400',
        letterSpacing: '0',
      },

      VCard: {
        flat: true,
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
