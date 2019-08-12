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
          <router-link to="/home">首页</router-link>
        </a-menuitem>
        <a-menuitem key="2">
          <router-link to="/metadata">元数据维护</router-link>
        </a-menuitem>
        <a-menuitem>
          <router-link to="/about">测试表单</router-link>
        </a-menuitem>
        <a-admin @loginout="loginout" :isLogin="isLogin"/>
      </a-menu>
    </a-header>
    <a-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <!-- <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-item>Home</a-item>
        <a-item>List</a-item>
        <a-item>App</a-item>
      </a-breadcrumb> -->
      <div :style="{ padding: '24px' }">
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
import { namespace } from 'vuex-class';
import request from '@/middleware/request';
import Admin from '@/Layout/Admin.vue';
const { Header, Content, Footer } = Layout;
const { Item } = Breadcrumb;
const MenuItem = Menu.Item;
const someUser = namespace('user');


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
  @Provide() public meunKey: any = 0;
  @Provide() private isLogin: boolean = false;
  @someUser.State((state) => state.usermsg) usermsg: any;
  @someUser.Action('getUsermsg') getUsermsg: any;
  @someUser.Action('loginOut') loginOut: any;

  public async beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) =>{
      const { usermsg: { data } } = vm;
      if(!data) {
        vm.getUsermsg({
          api: '/api/user/getUser',
        })
      }
    })
  }

  // public beforeRouteUpdate(to: any, from: any, next: any) {
  //   const { data } = this.usermsg;
  //   next();
  // }

  @Emit('loginout')
  public async loginout() {
    this.loginOut({ api: '/api/user/loginout', method: 'POST' });
  }

  /**
   * 路由变化监听，根据路由变化做相应操作
   */
  @Watch('$route')
  public watchRoute(val: any, old: any) {
    // console.log(val);
    // console.log('');
    // console.log(old);
  }

  @Watch('usermsg')
  public watchUsermsg(val: any, old: any) {
    const { data } = val;
    if (data) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
}
</script>

<style lang="less">
@import '../assets/design/index.less';
:global {
    #components-layout-demo-fixed .ant-layout-header {
        background: @colorFour;
    }
    #components-layout-demo-fixed .ant-menu-dark, .ant-menu-dark .ant-menu-sub {
      background: @colorFour;
    }
}
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