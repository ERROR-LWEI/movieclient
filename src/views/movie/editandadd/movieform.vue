<template>
    <div :class="$style.editmovie">
        <div :class="$style.movieimages"></div>
        <div :class="$style.movieform">
            <a-form :form="form" @submit="formSubmit">
                <a-form-item>
                    <a-input
                        :decorator="['name', { initialValue: '' }]"
                        placeholder="电影名"
                    />
                </a-form-item>
                <a-form-item>
                    <a-input 
                        :decorator="['en_name', { initialValue: '' }]"
                        placeholder="英文名"
                    />
                </a-form-item>
                <a-form-item>
                    <a-input
                        :decorator="['site', { initialValue: '' }]"
                        placeholder="国家"
                    />
                </a-form-item>
                <a-form-item>
                    <a-input
                        :decorator="['language', { initialValue: '' }]"
                        placeholder="语言"
                    />
                </a-form-item>
                <a-form-item>
                    <a-month-picker
                        :style="{ width: '100%' }"
                        placeholder="上映时间"
                    />
                </a-form-item>
                <a-form-item>
                    <movie-type placeholder="类型" />
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Provide } from 'vue-property-decorator';
import { Form, Input, DatePicker, Upload } from 'ant-design-vue';
import MovieType from '@/components/enumerate/movietype.vue';


@Component({
    components: {
        'a-form': Form,
        'a-form-item': Form.Item,
        'a-input': Input,
        'a-month-picker': DatePicker.MonthPicker,
        'movie-type': MovieType,
        'a-upload': Upload
    }
})
export default class Movieform extends Vue {
    @Provide() public form: any;
    @Provide() public isLoading: Boolean = false;
    @Provide() public formItemLayout: any = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    }
    isUpload: Boolean = true;

    public beforeCreate() {
        this.form = this.$form.createForm(this);
    }

    @Emit('updateUploadStatus')
    updateUploadStatus() {
        this.isLoading=!this.isLoading;
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

<style module lang="less">
    @import "../../../assets/design/index.less";
    .editmovie {
        width: 700px;
        margin:  0 auto;
        display: flex;
        flex-direction: row;
    }

    .movieimages {
        width: 400px;
    }

    .movieform {
        width: 300px;
        padding: 40px 20px;
        border-radius: @BorderRadius;
        background-color: #ffffff;
    }
</style>


