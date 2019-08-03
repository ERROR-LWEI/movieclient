<template>
    <div>
        <a-form
            :form="form"
        >
            <a-row :gutter="24">
                <a-col
                    v-for="item in config"
                    :key="item.name"
                    :span="8"
                >

                </a-col>
            </a-row>
        </a-form>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Row, Col, Input, Form } from 'ant-design-vue';

@Component({
    components: {
        'a-form': Form,
        'a-form-item': Form.Item,
        'a-row': Row,
        'a-col': Col
    }
})
export default class SearchMeta extends Vue {
    @Prop() public config: any;
}
</script>

