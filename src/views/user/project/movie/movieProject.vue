<template>
    <div :class="$style.movieproject">
        <div>
            <add-movie/>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AddMovie from '@/views/user/project/movie/addMovie.vue';

@Component({
    components: {
        'add-movie': AddMovie
    }
})
export default class MovieProject extends Vue {}
</script>
<style module lang="less">
    .movieproject {
        padding: 10px 20px;
    }
</style>


