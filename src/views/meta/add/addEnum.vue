<template>
    <a-modal
        :centered="true"
        :footer="null"
        :closable="false"
        :visible="visible"
    >
        <a-form
            :form="form"
            @submit="handleSubmit"
        >
            <a-form-item :key="item.name" v-for="item in config">
                <component 
                    v-bind:is="item.slot"
                    v-decorator="[
                        item.name,
                        item.options,
                    ]"
                    :placeholder="item.placeholder"
                />
            </a-form-item>
            <slot></slot>
        </a-form>
    </a-modal>
</template>
<script lang="ts">
import { Vue, Component, Prop, Provide, Watch } from 'vue-property-decorator';
import { Modal, Form, Input } from 'ant-design-vue';

@Component({
    components: {
        'a-modal': Modal,
        'a-form': Form,
        'a-form-item': Form.Item,
        'a-input': Input
    }
})
export default class AddEnum extends Vue {
    @Provide() public form: any;
    @Prop({ default: () =>{} }) public submit!: FunctionConstructor;
    @Prop({ default: false }) public visible!: boolean;
    @Prop() public enumName!: string;
    @Prop({ default: [] }) public config: any;

    public beforeCreate() {
        this.form = this.$form.createForm(this);
    }

    public handleSubmit(e: any): void {
        e.preventDefault();
        this.form.validateFields(async (err: any, values: any) => {
            if (!err) {
                values.enumName = this.enumName
                this.submit(values);
            }
        });
    }

    @Watch('visible')
    watchVisible(val: boolean, old: boolean){
        if (!val) {
            this.form.resetFields();
        }
    }
    
}
</script>

