#  目录结构
:::vue
├── build
├── deploy ==自动发布脚本==
├── docs ==项目文档文件夹==
├── generate ==代码生成工具==
│   ├──generate.js ==vue的table页面生成js==
│   ├──generate-api.js ==api生成文件==
│   ├──template.js ==table模板==
│   ├──template-api.js ==api模板==
├── public ==不打包的静态资源==
├── src ==源代码==
│   ├──api ==api文件==
│        ├──base ==baseApi==
│        ├──module ==api模块==
│   ├──assets ==静态资源==
│   ├──components ==公共组件==
│   ├──constants ==全局常量==
│   ├──directive ==自定义指令==
│   ├──filter ==过滤器==
│   ├──icons ==图标==
│   ├──mixins ==混入相关==
│        ├──mixins.js ==table页面混入文件==
│        ├──websocket-mixins.js ==websocket页面混入文件==
│   ├──router ==路由相关==
│   ├──store ==vuex==
│   ├──styles ==样式==
│   ├──utils ==工具类==
│   ├──views ==视图文件==
│   ├──App.vue ==vue挂载点==
│   ├──main.js ==入口文件==
│   ├──permission.js ==权限相关==
│   ├──.env.development ==开发环境配置文件==
│   ├──.env.production ==生产环境配置文件==
│   ├──.env.sit ==测试环境配置为文件==
│   ├──package.json ==项目配置文件==
│   ├──vue.config.js ==vue配置文件==
:::