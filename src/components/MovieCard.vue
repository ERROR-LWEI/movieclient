<template>
    <div :class="$style.moviecard">
        <div :class="$style.Image">
            <img src="https://img1.doubanio.com/view/photo/s_ratio_poster/public/p494268647.jpg" />
        </div>
        <div :class="$style.Content">
            <p :class="$style.title">
                <span>{{ title }}</span>
                <span>{{ data.id }}</span>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Movie from '@/interface/Movie';

@Component({ })
export default class MovieCard extends Vue {
    @Prop({ type: String, default: '名称' }) private title!: string;
    @Prop({ required: true }) private data!: Movie;
}
</script>

<style module lang="less">
@import '../assets/design/index.less';
    .moviecard {
        padding: 10px;
        margin: 10px 0;
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        box-shadow: @defaultBoxShadow #ddd;
        background-color: #fff;

        .Image {
            width: 80px;
            border-radius: 6px;
            overflow: hidden;

            img { width: 100%; }
        }

        .Content {
            padding: 10px 0;
            margin-left: 10px;
            .title {
                span { display: block; }
            }
        }
    }
</style>


