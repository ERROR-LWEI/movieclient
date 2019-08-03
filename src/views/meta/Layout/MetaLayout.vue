<template>
    <div :class="$style.MetaLayout">
        <a-layout style="background: #fff">
            <a-layout-sider width="200" style="background: #fff">
                <a-menu
                    mode="inline"
                    style="height: 100%"
                >
                    <a-sub-menu :key="item.key" v-for="item in module">
                        <span slot="title"><a-icon v-if="item.icon" :type="item.icon" />{{ item.name }}</span>
                        <a-menu-item :key="child.key" v-for="child in item.children"><router-link :to="`/metadata/${item.key}/${child.key}`">{{ child.name }}</router-link></a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </a-layout-sider>
            <a-layout-content>
                <div :class="$style.MetaRouterView">
                    <router-view/>
                </div>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { Layout, Menu, Icon } from 'ant-design-vue';
import menuconfig from './MetaMenu';

@Component({
    components: {
        'a-layout': Layout,
        'a-layout-sider': Layout.Sider,
        'a-menu': Menu,
        'a-icon': Icon,
        'a-sub-menu': Menu.SubMenu,
        'a-menu-item': Menu.Item,
        'a-layout-content': Layout.Content
    }
})
export default class MetaLayout extends Vue {
    @Provide() private module = menuconfig;

    public beforeRouteEnter(to: Route, from: Route, next: any) {
        console.log('to', to);
        console.log('from', from);
        next((vm: any) => {
            console.log(vm)
        })
    }
}
</script>

<style module lang="less">
@import '../../../assets/design/index.less';
    .MetaLayout {
        padding: 20px 0;
        background-color: #fff;
        box-shadow: @defaultBoxShadow #e4e4e4;
    }
    .MetaRouterView {
        padding: 20px;
    }
</style>

