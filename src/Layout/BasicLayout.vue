<template>
  <Layout id="components-layout-demo-fixed">
    <Header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <MenuItem key="1">nav 1</MenuItem>
        <MenuItem key="2">nav 2</MenuItem>
        <MenuItem key="3">nav 3</MenuItem>
      </Menu>
    </Header>
    <Content :style="{ padding: '0 50px', marginTop: '64px' }">
      <Breadcrumb :style="{ margin: '16px 0' }">
        <Item>Home</Item>
        <Item>List</Item>
        <Item>App</Item>
      </Breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">Content</div>
    </Content>
    <Footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Layout, Menu, Breadcrumb } from 'ant-design-vue';
import { Route } from 'vue-router';
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
    MenuItem
  }
})
export default class BasicLayout extends Vue {

}
</script>

<style lang="less">
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255,255,255,.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>