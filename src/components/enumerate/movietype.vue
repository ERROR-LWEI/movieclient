<template>
    <a-select :placeholder="placeholder" :style="{ width: '100%' }">
        <a-select-options v-for="item in movietype" :key="item.id" :value="item.id">
            {{ item.name }}
        </a-select-options>
    </a-select>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Select } from 'ant-design-vue';
import { namespace } from 'vuex-class';
const someModule = namespace('metadata');

@Component({
    components: {
        'a-select': Select,
        'a-select-options': Select.Option
    }
})
export default class MovieType extends Vue {
    @someModule.State(state => state.movietype.data) movietype: any;
    @someModule.Action('getMovietype') getMovietype: any;
    @Prop({ type: Function }) public readonly onChange!: Function;
    @Prop() public readonly value!: any;
    @Prop({ type: String }) public readonly placeholder!: string;

    public created() {
        this.getMovietype({
            url: '/api/meta/getMovietype'
        })
    }
}
</script>

