// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({

  integrations: [
    starlight({
      title: 'Didi Food Microservices API',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/SararRomero/API-RESTFul-DIDI-Food.git' }],

      sidebar: [
        // Guía Rápida para integracion
        {
          label: 'Guía de Integración',
          link: '/guides/',
        },

        {
          label: 'Microservicios Core',
          items: [
            {
              label: '1. Autenticación (Auth)',
              link: '/auth/',
            },
            {
              label: '2. Gestión de Usuarios',
              link: '/users/',
            },
            {
              label: '3. Productos',
              link: '/products/',
            },
            {
              label: '4. Pedidos (Orders)',
              link: '/orders/',
            },
          ],
        },

      ],
    }),
  ],

});