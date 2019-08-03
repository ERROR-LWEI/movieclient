<template>
    <div>元数据维护</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component({})
export default class MetaLayout extends Vue {
    public beforeRouteEnter(to: Route, from: Route, next: any) {
        console.log('to', to);
        console.log('from', from);
        next((vm: any) => {
            console.log(vm)
        })
    }
}
</script>

