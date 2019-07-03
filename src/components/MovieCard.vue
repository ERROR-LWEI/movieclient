<template>
    <div>
        <div>
            <p>
                <span>{{ title }}</span>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Movie from '@/interface/Movie';

@Component({})
export default class MovieCard extends Vue {
    @Prop({ type: String, default: '名称' }) private title!: string;
    @Prop({ required: true }) private data!: Movie;
}
</script>

