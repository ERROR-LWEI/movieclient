import { RouteConfig } from 'vue-router';

const MetaRouter: RouteConfig = {
    path: 'metadata',
    name: 'metadata',
    component: () => import('@/views/meta/Layout/MetaLayout.vue'),
    children:[
        {
            path: 'nation',
            name: 'nation',
            component: () => import('@/views/meta/enum/nation.vue')
        }
    ]
}

export default MetaRouter;