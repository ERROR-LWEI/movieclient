<template>
  <Layout id="components-layout-demo-fixed">
    <Header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo">
          Lemon
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['1']"
        :style="{ lineHeight: '64px' }"
      >
        <MenuItem key="1">
          <router-link to="/home">Home</router-link>
        </MenuItem>
        <MenuItem key="2">
          <router-link to="/about">About</router-link>
        </MenuItem>
        <MenuItem key="3">nav 3</MenuItem>
              <a-admin @loginout="loginout"/>
      </Menu>
    </Header>
    <Content :style="{ padding: '0 50px', marginTop: '64px' }">
      <Breadcrumb :style="{ margin: '16px 0' }">
        <Item>Home</Item>
        <Item>List</Item>
        <Item>App</Item>
      </Breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
          <router-view/>
      </div>
    </Content>
    <Footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
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
    Layout, 
    Header, 
    Content, 
    Footer, 
    Menu, 
    Breadcrumb, 
    Item,
    MenuItem,
    'a-admin': Admin
  }
})
export default class BasicLayout extends Vue {
  @Provide() isAuth = false;
  @Provide() meunKey: any = 0;

  async beforeRouteEnter(to:any, from:any, next:any) {
    const toPath = to.path,
          fromPath = from.path;
    if (toPath.indexOf('/user') < 0) {
      const { code } = await request({
        api: '/api/user/getUser',
      });
      if (code === 401) {
        next('/user/login');
      }
    }
    next((vm: any) => {
      vm.isAuth = true;
    });
  }

  beforeRouteUpdate (to:any, from:any, next:any) {
    const { isAuth } = this;
    if (!isAuth) {
      next('/user/login');
    }
    next();
  }

  @Emit('loginout')
  async loginout() {
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
  watchRoute(val: any, old: any) {
    console.log(val);
    console.log('')
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