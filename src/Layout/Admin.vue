<template>
  <div class="admin">
    <a-dropdown placement="bottomCenter">
      <div><a-avatar shape="square" size="large" icon="user" src="https://pic3.zhimg.com/v2-2c2059e4602213552c33b672df16ff77_is.jpg"/></div>
      <a-menu slot="overlay">
        <a-menu-item v-for="item in items" v-bind:key="item.key">
          <router-link :to="item.link"><a-icon :type="item.icon" class="icon_link" style="margin-right: 8px" /> {{ item.name }}</router-link>
        </a-menu-item>
        <a-menu-item>
          <a herf="#" @click="click"><a-icon type="logout" style="margin-right: 8px" /> 退出</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide, Emit } from 'vue-property-decorator';
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
  @Provide() public items = [
    { name: '用户', link: '/usermessage', key: 1, icon: 'user' },
    { name: '设置', link: '/setting', key: 2, icon: 'setting' },
  ];
  @Emit('loginout') public click() {}


}
</script>
<style lang="less">
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
</style>


