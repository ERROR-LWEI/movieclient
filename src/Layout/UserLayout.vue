<template>
    <div class="UserLayout">
        <div class="shade"></div>
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
        background: url('../assets/img/bgimg1.jpg') no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: relative;
        top: 0;

        .shade {
            width: 100%;
            height: 100%;
            background: #464646c4;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
        }

        .RouterView {
            width: 400px;
            position: relative;
            top: 0;
            z-index: 1;
        }
    }
</style>


