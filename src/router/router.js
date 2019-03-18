import Router from 'vue-router'

const routes = [
    { path: '/', redirect: '/index'},
    {
        path: '/index',
        component: () => import ('../views/index/index'),
        children: [
            { path: '/', redirect: 'recommend'},
            { path: 'recommend', component: () => import('../views/recommend/recommend') },
            { path: 'rank', component: () => import('../views/rank/rank') }
        ]
    },
    { path: '/playlist/:id', component: () => import('../views/playlist/playlist') },
    { path: '/search', component: () => import('../views/search/search') },
    { path: '/mine', component: () => import('../views/mine/mine') },
    { path: '/history', component: () => import('../views/my-history/my-history') }
]

export default new Router({
    routes
})
