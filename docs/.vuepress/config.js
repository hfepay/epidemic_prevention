module.exports = {
  title: '前端框架介绍',  // 设置网站标题
  description : '前端框架介绍',
  base : '/',
  serviceWorker: true,
  plugins: [
    ['container', {
      type: 'vue',
      before: '<pre class="vue-container"><code>',
      after: '</code></pre>',
    }]
  ],
  themeConfig : {
    nav : [
      { text: '基本简介', link: '/' },
      { text: '快速开始', link: '/front/quickStart' },
      { text: '混入介绍', link: '/front/mixins' },
      { text: '组件', link: '/front/components' },
    ],
    sidebar: [
      '/',
      {
        title: '前端',
        children: [
          '/front/frame',
          '/front/environment',
          '/front/run',
          '/front/directory',
          '/front/quickStart',
          '/front/api',
          '/front/table',
          '/front/mixins',
          '/front/components',
          '/front/specification',
        ]
      },
      {
        title: '接口文档',
        children: [
          '/api/api'
        ]
      },
    ],
    sidebarDepth : 2
  }
}
