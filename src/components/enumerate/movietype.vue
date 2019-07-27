<template>
    <a-select :placeholder="placeholder" :style="{ width: '100%' }">

    </a-select>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Select } from 'ant-design-vue';

@Component({
    components: {
        'a-select': Select,
        'a-select-options': Select.Option
    }
})
export default class MovieType extends Vue {
    @Prop({ type: Function }) public readonly onChange!: Function;
    @Prop() public readonly value!: any;
    @Prop({ type: String }) public readonly placeholder!: string;

    created() {
        console.log('props', this.$props);
    }

    beforeMount() {
        console.log('props-beforeMount', this.$props)
    }
}
</script>

