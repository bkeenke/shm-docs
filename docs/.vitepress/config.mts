import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "SHM",
  description: "Универсальная биллинговая система с действиями по событиям",

  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.jpg' }],
    ['meta', { name: 'theme-color', content: '#22d3ee' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:site_name', content: 'SHM Docs' }],
  ],

  locales: {
    root: {
      label: 'Русский',
      lang: 'ru',
      themeConfig: {
        nav: [
          { text: 'Главная', link: '/' },
          { text: 'Документация', link: '/guide/' },
          { text: 'API', link: '/api/' },
          {
            text: 'Ссылки',
            items: [
              { text: 'GitHub', link: 'https://github.com/danuk/shm' },
              { text: 'Telegram', link: 'https://t.me/shm_billing' }
            ]
          }
        ],
        sidebar: {
          '/guide/': [
            {
              text: 'Введение',
              items: [
                { text: 'Что такое SHM?', link: '/guide/' },
                { text: 'Быстрый старт', link: '/guide/getting-started' }
              ]
            },
            {
              text: 'Установка',
              collapsed: false,
              items: [
                { text: 'Docker', link: '/guide/install/docker' }
              ]
            },
            {
              text: 'Настройка',
              collapsed: false,
              items: [
                { text: 'Биллинг', link: '/guide/setup/billing' },
                { text: 'Услуги', link: '/guide/setup/services' },
                { text: 'События', link: '/guide/setup/events' },
                { text: 'Серверы', link: '/guide/setup/servers' },
                { text: 'Шаблоны', link: '/guide/setup/templates' },
                { text: 'Платежные системы', link: '/guide/setup/payments' }
              ]
            },
            {
              text: 'Интеграции',
              collapsed: false,
              items: [
                { text: 'Telegram бот', link: '/guide/integrations/telegram-bot' },
                { text: 'Marzban', link: '/guide/integrations/marzban' },
                { text: 'Remnawave', link: '/guide/integrations/remnawave' },
                { text: 'WireGuard', link: '/guide/integrations/wireguard' }
              ]
            },
            {
              text: 'Администрирование',
              collapsed: false,
              items: [
                { text: 'Обновление', link: '/guide/manage/upgrade' },
                { text: 'Безопасность', link: '/guide/manage/security' },
                { text: 'Резервное копирование', link: '/guide/manage/backup' }
              ]
            }
          ],
          '/api/': [
            {
              text: 'API Reference',
              items: [
                { text: 'Введение', link: '/api/' },
                { text: 'Аутентификация', link: '/api/auth' },
                { text: 'Пользователи', link: '/api/users' },
                { text: 'Услуги', link: '/api/services' },
                { text: 'Платежи', link: '/api/payments' },
                { text: 'Шаблоны', link: '/api/templates' }
              ]
            }
          ]
        },
        outline: {
          label: 'На этой странице'
        },
        docFooter: {
          prev: 'Предыдущая страница',
          next: 'Следующая страница'
        },
        lastUpdated: {
          text: 'Обновлено'
        },
        editLink: {
          pattern: 'https://github.com/danuk/shm-docs/edit/main/docs/:path',
          text: 'Редактировать на GitHub'
        },
        footer: {
          message: 'Распространяется под лицензией MIT',
          copyright: '© 2024-present SHM Team'
        },
        search: {
          provider: 'local',
          options: {
            translations: {
              button: {
                buttonText: 'Поиск',
                buttonAriaLabel: 'Поиск'
              },
              modal: {
                noResultsText: 'Нет результатов для',
                resetButtonTitle: 'Сбросить поиск',
                footer: {
                  selectText: 'выбрать',
                  navigateText: 'навигация',
                  closeText: 'закрыть'
                }
              }
            }
          }
        }
      }
    },
    // en: {
    //   label: 'English',
    //   lang: 'en',
    //   link: '/en/',
    //   themeConfig: {
    //     nav: [
    //       { text: 'Home', link: '/en/' },
    //       { text: 'Documentation', link: '/en/guide/' },
    //       { text: 'API', link: '/en/api/' },
    //       {
    //         text: 'Links',
    //         items: [
    //           { text: 'GitHub', link: 'https://github.com/danuk/shm' },
    //           { text: 'Telegram', link: 'https://t.me/shm_billing' }
    //         ]
    //       }
    //     ],
    //     sidebar: {
    //       '/en/guide/': [
    //         {
    //           text: 'Introduction',
    //           items: [
    //             { text: 'What is SHM?', link: '/en/guide/' },
    //             { text: 'Getting Started', link: '/en/guide/getting-started' }
    //           ]
    //         },
    //         {
    //           text: 'Installation',
    //           collapsed: false,
    //           items: [
    //             { text: 'Docker', link: '/en/guide/install/docker' }
    //           ]
    //         },
    //         {
    //           text: 'Configuration',
    //           collapsed: false,
    //           items: [
    //             { text: 'Billing', link: '/en/guide/setup/billing' },
    //             { text: 'Services', link: '/en/guide/setup/services' },
    //             { text: 'Events', link: '/en/guide/setup/events' },
    //             { text: 'Servers', link: '/en/guide/setup/servers' },
    //             { text: 'Templates', link: '/en/guide/setup/templates' },
    //             { text: 'Payment Systems', link: '/en/guide/setup/payments' }
    //           ]
    //         },
    //         {
    //           text: 'Integrations',
    //           collapsed: false,
    //           items: [
    //             { text: 'Telegram Bot', link: '/en/guide/integrations/telegram-bot' },
    //             { text: 'Marzban', link: '/en/guide/integrations/marzban' },
    //             { text: 'Remnawave', link: '/en/guide/integrations/remnawave' },
    //             { text: 'WireGuard', link: '/en/guide/integrations/wireguard' }
    //           ]
    //         },
    //         {
    //           text: 'Administration',
    //           collapsed: false,
    //           items: [
    //             { text: 'Upgrade', link: '/en/guide/manage/upgrade' },
    //             { text: 'Security', link: '/en/guide/manage/security' },
    //             { text: 'Backup', link: '/en/guide/manage/backup' }
    //           ]
    //         }
    //       ],
    //       '/en/api/': [
    //         {
    //           text: 'API Reference',
    //           items: [
    //             { text: 'Introduction', link: '/en/api/' },
    //             { text: 'Authentication', link: '/en/api/auth' },
    //             { text: 'Users', link: '/en/api/users' },
    //             { text: 'Services', link: '/en/api/services' },
    //             { text: 'Payments', link: '/en/api/payments' },
    //             { text: 'Templates', link: '/en/api/templates' }
    //           ]
    //         }
    //       ]
    //     },
    //     outline: {
    //       label: 'On this page'
    //     },
    //     editLink: {
    //       pattern: 'https://github.com/danuk/shm-docs/edit/main/docs/:path',
    //       text: 'Edit this page on GitHub'
    //     },
    //     footer: {
    //       message: 'Released under the MIT License',
    //       copyright: '© 2024-present SHM Team'
    //     }
    //   }
    // }
  },

  themeConfig: {
    logo: '/logo.jpg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/bkeenke/shm' }
    ]
  },

  markdown: {
    lineNumbers: true,
    container: {
      tipLabel: 'Совет',
      warningLabel: 'Внимание',
      dangerLabel: 'Осторожно',
      infoLabel: 'Информация',
      detailsLabel: 'Подробности'
    }
  }
})
