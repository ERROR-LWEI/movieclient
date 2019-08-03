import { RouteConfig } from 'vue-router';
import Nation from '@/views/meta/nation/nation.vue';

const MetaRouter: RouteConfig = {
    path: 'metadata',
    name: 'metadata',
    component: () => import('@/views/meta/Layout/MetaLayout.vue'),
    children:[
        {
            path: 'enum/nation',
            name: 'nation',
            component: Nation
        }
    ]
}

export default MetaRouter;