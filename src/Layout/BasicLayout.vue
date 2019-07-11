<template>
  <a-layout id="components-layout-demo-fixed">
    <a-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo">
          Lemon
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['1']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menuitem key="1">
          <router-link to="/home">Home</router-link>
        </a-menuitem>
        <a-menuitem key="2">
          <router-link to="/about">About</router-link>
        </a-menuitem>
        <a-menuitem key="3">nav 3</a-menuitem>
              <a-admin @loginout="loginout"/>
      </a-menu>
    </a-header>
    <a-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-item>Home</a-item>
        <a-item>List</a-item>
        <a-item>App</a-item>
      </a-breadcrumb>
      <div :style="{ padding: '24px', maxHeight: '100vh' }">
          <router-view/>
      </div>
    </a-content>
    <a-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-footer>
  </a-layout>
</template>

<script lang="ts">
import { Component, Vue, Provide, Emit, Watch } from 'vue-property-decorator';
import { Layout, Menu, Breadcrumb } from 'ant-design-vue';
import { Route } from 'vue-router';
import request from '@/middleware/request';
import Admin from '@/Layout/Admin.vue';
const { Header, Content, Footer } = Layout;
const { Item } = Breadcrumb;
const MenuItem = Menu.Item;
@Component({
  components: {
    'a-layout': Layout,
    'a-header':Header,
    'a-content': Content,
    'a-footer': Footer,
    'a-menu': Menu,
    'a-breadcrumb': Breadcrumb,
    'a-item': Item,
    'a-menuitem':MenuItem,
    'a-admin': Admin,
  },
})
export default class BasicLayout extends Vue {
  @Provide() public isAuth = false;
  @Provide() public meunKey: any = 0;

  public async beforeRouteEnter(to: any, from: any, next: any) {
    const toPath = to.path,
          fromPath = from.path;
    if (toPath.indexOf('/user') < 0) {
      const { code } = await request({
        api: 'http://localhost:8080/api/user/getUser',
      });
      if (code === 401) {
        next('/user/login');
      }
    }
    next((vm: any) => {
      vm.isAuth = true;
    });
  }

  public beforeRouteUpdate(to: any, from: any, next: any) {
    const { isAuth } = this;
    if (!isAuth) {
      next('/user/login');
    }
    next();
  }

  @Emit('loginout')
  public async loginout() {
    const res = await request({
        api: '/api/user/loginout',
        method: 'POST',
    });
    if (res.code === 1) {
      this.isAuth = false;
      this.$router.push('/user/login');
    }
  }

  /**
   * 路由变化监听，根据路由变化做相应操作
   */
  @Watch('$route')
  public watchRoute(val: any, old: any) {
    console.log(val);
    console.log('');
    console.log(old);
  }
}
</script>

<style lang="less">
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  line-height: 31px;
  margin: 16px 24px 16px 0;
  float: left;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 31px;
  color: #fff;
}
</style>