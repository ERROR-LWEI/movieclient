<template>
    <div>
        <a-form :form="form" @submit="formSubmit">
            <a-form-item v-bind="formItemLayout" label="电影名">
                <a-input :decorator="['name', { initialValue: '' }]" />
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Provide } from 'vue-property-decorator';
import { Form, Input } from 'ant-design-vue';


@Component({
    components: {
        'a-form': Form,
        'a-form-item': Form.Item,
        'a-input': Input
    }
})
export default class Movieform extends Vue {
    @Provide() public form: any;
    @Provide() public isLoading: Boolean = false;
    @Provide() public formItemLayout: any = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    }

    public beforeCreate() {
        this.form = this.$form.createForm(this);
    }

    formSubmit(e: any): void {
        e.preventDefault();
        this.form.validateFields(async (err: any, values: any) => {
            if (!err) {
                this.isLoading = true;
                
            }
        });
    }
}
</script>

