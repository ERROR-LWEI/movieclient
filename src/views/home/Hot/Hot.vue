<template>
    <div :class="$style.hot">
        <h2>{{ title }}</h2>
        <div :class="$style.content">
            <a-moviecard :key="item.id" v-for="item in items" :title="item.name" :data="item" />
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Provide } from 'vue-property-decorator';
import MovieCard from '@/components/MovieCard.vue';
import data from './test.data';

@Component({
    components: {
        'a-moviecard': MovieCard
    }
})
export default class Hot extends Vue {
    @Prop() private title!: string
    @Provide() items: any = data;
}
</script>
<style module lang="less">
@import '../../../assets/design/index.less';

    .hot {
        background-color: @colorThree;
        border-radius: 4px;
        padding: 15px 0;

        h2 { padding: 0 10px; }

        .content {
            overflow-y: auto;
            padding: 0 10px;
            height: 500px;
        }
    }
</style>


