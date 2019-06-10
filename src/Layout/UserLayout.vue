<template>
    <div class="UserLayout">
        <div class="RouterView">
            <router-view/>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class UserLauout extends Vue {

}
</script>
<style lang="less">
    .UserLayout {
        min-height: 100vh;
        background: url('../assets/img/welcome.png') no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .RouterView {
            width: 400px;
        }
    }
</style>


