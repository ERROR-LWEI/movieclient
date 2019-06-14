<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component({})
export default class About extends Vue {
    constructor() { super(); }
    beforeRouteLeave (to: Route, from: Route , next: () => void): void {
        next()
    }

    beforeRouteEnter (to: Route, from: Route, next: () => void): void {
        next();
    }
}
</script>
