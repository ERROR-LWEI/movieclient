<template>
  <div :class="$style.admin">
    <a-dropdown v-if="isLogin" placement="bottomCenter">
      <div><a-avatar shape="square" size="large" icon="user" src="https://pic3.zhimg.com/v2-2c2059e4602213552c33b672df16ff77_is.jpg"/></div>
      <a-menu slot="overlay">
        <a-menu-item v-for="item in items" v-bind:key="item.key">
          <router-link :to="item.link"><a-icon :type="item.icon" :class="$style.icon_link" style="margin-right: 8px" /> {{ item.name }}</router-link>
        </a-menu-item>
        <a-menu-item>
          <a herf="#" @click="click"><a-icon type="logout" style="margin-right: 8px" /> 退出</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <div v-else :class="$style.loginlink">
      <router-link to="/user/login">登录</router-link>
      <router-link to="/user/sigin">注册</router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide, Emit, Prop, Watch } from 'vue-property-decorator';
import { Dropdown, Menu, Avatar, Icon } from 'ant-design-vue';
const Item = Menu.Item;

@Component({
  components: {
    'a-dropdown': Dropdown,
    'a-menu': Menu,
    'a-menu-item': Item,
    'a-avatar': Avatar,
    'a-icon': Icon,
  },
})
export default class Admin extends Vue {
  @Prop({ default: false }) public isLogin!: boolean;
  @Provide() public items = [
    { name: '用户', link: '/usermessage', key: 1, icon: 'user' },
    { name: '维护', link: '/metasetting', key: 2, icon: 'setting' },
    { name: '设置', link: '/setting', key: 3, icon: 'setting' },
  ];
  @Emit('loginout') public click() {}

  @Watch('isLogin')
  watchIsLogin(val: any, old: any) {
    console.log(val, old);
  }
}
</script>
<style module lang="less">
.admin {
  height: 64px;
  float: right;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  color: #fff;

  .icon_link {
    display: inline-block;
    margin-right: 10px;
  }
}

.loginlink {
  a {
    display: inline-block;
    padding: 0 5px;
    color: #fff;
  }
}
</style>


