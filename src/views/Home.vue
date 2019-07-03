<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
        constructor() { super(); }
    public beforeRouteLeave(to: Route, from: Route , next: () => void): void {
        next();
    }

    public beforeRouteEnter(to: Route, from: Route, next: () => void): void {
        next();
    }
}
</script>
