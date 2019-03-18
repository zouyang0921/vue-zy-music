# vue-zy-music

Web 移动端音乐播放器，模仿网易云音乐 App 和 QQ 音乐 App 界面，API 采用开源的[网易云音乐 NodeJS 版 API](https://binaryify.github.io/NeteaseCloudMusicApi)。

## 功能

> 已完成

- 播放器
- 歌词滚动
- 个性推荐
- 排行榜
- 歌单详情
- 搜索
- 播放历史

> TODO

- 登录
- 同步网易云歌单
- 收藏歌单/单曲

接下来还会陆续添加一些新功能和对代码进行持续优化。

## 安装与使用

> ZY Music

```
// 下载播放器
git clone https://github.com/zouyang0921/vue-zy-music.git

// 进入播放器目录
cd vue-zy-music

// 安装依赖
npm install

// 服务端运行
npm run serve

// 项目打包
npm run build
```

> 后台服务器

```
// 进入后台服务器目录
cd vue-zy-music/server

// 安装依赖
npm install

// 服务端运行
node app.js
```

## 技术栈

- Vue CLI (Vue 脚手架工具)
- Vue：vue2.6(核心框架)
- Vue-Router (页面路由)
- Vuex (状态管理)
- ES 6 / 7
- Less (CSS 预处理器)
- Axios (网络请求)
- FastClick (解决移动端 300ms 点击延迟)

## 项目目录

```
├── dist															// 项目打包文件
├── public
│   └── index.html										// 入口 html 文件
├── server														// 服务端目录
├── src																// 项目源码目录					
│   ├── api
│   │   └── api.js										// 数据交互
│   ├── assets												// 资源目录
│   │   ├── images
│   │   ├── js
│   │   │   ├── config.js							// 常量配置
│   │   │   ├── song.js								// 数据处理
│   │   │   ├── storage.js						// 设置 localStorage
│   │   │   └── util.js								// 公共方法
│   │   └── style											// 样式目录
│   │       ├── animation.less
│   │       ├── index.less
│   │       ├── mixin.less
│   │       ├── reset.less
│   │       └── variable.less
│   ├── components										// 组件目录
│   │   ├── common										// 公共组件目录
│   │   │   └── loading
│   │   │       └── loading.vue				// 加载中组件
│   │   ├── v-header
│   │   │   └── v-header.vue					// 头部组件
│   │   ├── tab
│   │   │   └── tab.vue								// 首页-切换个性推荐推荐和排行榜
│   │   ├── banner
│   │   │   └── banner.vue						// 推荐页 banner 组件
│   │   ├── music-list
│   │   │   └── music-list.vue				// 音乐列表组件
│   │   └── player
│   │   │   ├── player.vue						// 正在播放组件
│   │   │   └── zyPlayer.js						// 播放器事相关件绑定
│   └── views													// 路由跳转相关页面
│   │   ├── index
│   │   │   └── index.vue							// 首页
│   │   ├── recommend
│   │   │   └── recommend.vue					// 个性推荐
│   │   ├── rank
│   │   │   └── rank.vue							// 排行榜
│   │   ├── playlist
│   │   │   └── playlist.vue					// 歌单
│   │   ├── mine
│   │   │   └── mine.vue							// 我的
│   │   ├── my-history
│   │   │   └── my-history.vue				// 最近播放(播放历史)
│   │   └── search
│   │       └── search.vue						// 搜索
│   ├── router
│   │   └── router.js									// 路由配置
│   ├── store													// 状态管理
│   │   ├── actions.js
│   │   ├── getters.js
│   │   ├── index.js
│   │   ├── mutation-types.js
│   │   ├── mutations.js
│   │   └── state.js
│   ├── App.vue												// 根组件
│  	├── main.js												// 入口主文件
└── vue.config.js											// Vue 配置文件
```

## 界面

#### 首页 - 个性推荐

![recommend](/Users/zouyang/Project/vue-zy-music/screen_shot/recommend.jpg)



#### 首页 - 排行榜

![rank](/Users/zouyang/Project/vue-zy-music/screen_shot/rank.jpg)



#### 歌单详情

![playlist](/Users/zouyang/Project/vue-zy-music/screen_shot/playlist.jpg)



#### 正在播放

![player](/Users/zouyang/Project/vue-zy-music/screen_shot/player.jpg)



#### 歌词滚动

![lyric](/Users/zouyang/Project/vue-zy-music/screen_shot/lyric.jpg)