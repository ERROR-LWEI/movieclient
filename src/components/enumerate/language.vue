<template>
    <a-select :placeholder="placeholder" :style="{ width: '100%' }" @change="onChange">
        <a-select-options v-for="item in language" :key="item.id" :value="item.id">
            {{ item.name }}
        </a-select-options>
    </a-select>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Select } from 'ant-design-vue';
import { namespace } from 'vuex-class';
const someModule = namespace('metadata');

interface Formdata {
    [key: string]: any;
}

@Component({
    components: {
        'a-select': Select,
        'a-select-options': Select.Option
    }
})
export default class Language extends Vue {
    @someModule.State(state => state.language.data) language: any;
    @someModule.Action('getLanguage') getLanguage: any;
    @Prop() public readonly name!:string;
    @Prop() public readonly value!: any;
    @Prop() public readonly placeholder!: string;
    @Prop() public readonly update!:(params: any)=> void;

    private onChange(e: any) {
        const _params: Formdata = {};
        _params[`${this.name}`] = e;
        this.update(_params)
    }

    public created() {
        console.log(this.value, this.$props, this.name)
        this.getLanguage({
            url: '/api/meta/getLanguage'
        })
    }
}
</script>

