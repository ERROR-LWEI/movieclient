<template>
    <div :class="$style.home">
        <a-hot title="热门" />
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Hot from './Hot/Hot.vue';

@Component({
    components: {
        'a-hot': Hot
    }
})
export default class Home extends Vue {

}
</script>

<style module lang="less">
    .home {
        width: 100%;
        height: 100%;
        display: flex;
    }
</style>


