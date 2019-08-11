import { RouteConfig } from 'vue-router';


const projectRouter: RouteConfig = {
    path: 'project',
    name: 'project',
    component: () => import('@/views/user/project/layout.vue'),
    children: [{
        path: 'movie',
        name: 'movie',
        component: () => import('@/views/user/project/movie/movieProject.vue')
    }, {
        path: 'movie/add',
        name: 'addmovie',
        component: () => import('@/views/component/EditAndAddMovie/movieform.vue')
    }]
}

export default projectRouter