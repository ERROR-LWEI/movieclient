<template>
    <div :class="$style.editmoviebox">
        <div :class="$style.editmovie">
            <div :class="$style.movieimages">
                <movieposter :updatedata="updateMovieimage" />
            </div>
            <div :class="$style.movieform">
                <a-form :form="form" @submit="formSubmit">
                    <a-form-item>
                        <a-input
                            v-decorator="['name']"
                            placeholder="电影名"
                        />
                    </a-form-item>
                    <a-form-item>
                        <a-input 
                            v-decorator="['nameEN']"
                            placeholder="英文名"
                        />
                    </a-form-item>
                    <a-form-item>
                        <a-select
                            v-decorator="['type']"
                            placeholder="类型"
                            mode="multiple"
                        >
                            <a-select-option v-for="item in metadata.movietype.data" :key="item.id">{{ item.name }}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item>
                        <a-month-picker
                            v-decorator="['year']"
                            :style="{ width: '100%' }"
                            placeholder="拍摄时间"
                        />
                    </a-form-item>
                    <a-form-item>
                        <a-select
                            v-decorator="['site']"
                            placeholder="国家"
                            mode="multiple"
                        >
                            <a-select-option v-for="item in metadata.nation.data" :key="item.id">{{ item.name }}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item>
                        <a-select
                            v-decorator="['language']"
                            placeholder="语言"
                            mode="multiple"
                        >
                            <a-select-option v-for="item in metadata.language.data" :key="item.id">{{ item.name }}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item>
                        <a-text
                            v-decorator="['info']"
                            placeholder="描述"
                        />
                    </a-form-item>
                    <a-form-item :class="$style.colsubmit">
                        <a-button :class="$style.submitbtn" html-type="submit" type="primary" :loading="!isSubmit">提交</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Provide } from 'vue-property-decorator';
import { Form, Input, DatePicker, Upload, Button, Select } from 'ant-design-vue';
import Movieposter from '@/views/movie/editandadd/movieposter.vue';
import { namespace } from 'vuex-class';
import request from '@/middleware/request';
const someModule = namespace('metadata');
const movieModule = namespace('movie');


@Component({
    components: {
        'a-form': Form,
        'a-form-item': Form.Item,
        'a-input': Input,
        'a-month-picker': DatePicker.MonthPicker,
        'a-upload': Upload,
        'a-button': Button,
        'a-select': Select,
        'a-select-option': Select.Option,
        'a-text': Input.TextArea,
        'movieposter': Movieposter
    }
})
export default class Movieform extends Vue {
    @Provide() public form: any;
    @Provide() public formItemLayout: any = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    }
    @someModule.State(state => state) metadata: any;
    @someModule.Action('getLanguage') getLanguage: any;
    @someModule.Action('getMovietype') getMovietype: any;
    @someModule.Action('getNation') getNation: any;
    @movieModule.State(state => state) movie: any; 
    @movieModule.Action('addMovie') addMovie: any;
    isSubmit: Boolean = true;
    movieimg: String = '';

    public created() {
        const { movietype, language, nation } = this.metadata;
        if (movietype.data.length == 0) {
            this.getMovietype({
                url: '/api/meta/getMovietype'
            })
        }
        if (language.data.length == 0) {
            this.getLanguage({
                url: '/api/meta/getLanguage'
            })
        }
        if (nation.data.length == 0) {
            this.getNation({
                url: '/api/meta/getNation'
            })
        }
    }

    public beforeCreate() {
        this.form = this.$form.createForm(this);
    }

    @Emit('updateUploadStatus')
    public updateUploadStatus() {
        //this.isLoading=!this.isLoading;
    }

    @Emit('updateMovieimage')
    public updateMovieimage(params: any){
        console.log(params)
        this.movieimg = params;
    }

    formSubmit(e: any): void {
        e.preventDefault();
        this.form.validateFields(async (err: any, values: any) => {
            if (!err) {
                this.isSubmit = false;
                values['img'] = this.movieimg;
                const res = await request({
                    api: '/api/movie/addMovie',
                    method: 'POST',
                    body: values
                });
                this.isSubmit = true;
            }
        });
    }
}
</script>

<style module lang="less">
    @import "../../../assets/design/index.less";

    .editmoviebox {
        height: 100%;
        display: flex;
        align-items: center;
        justify-items: center;
    }

    .editmovie {
        width: 700px;
        max-height: 600px;
        margin:  0 auto;
        border-radius: @BorderRadius;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        box-shadow: 0 0 10px 1px #ececec;
    }

    .movieimages {
        width: 400px;
    }

    .movieform {
        width: 300px;
        padding: 40px 20px;
        background-color: #ffffff;
    }

    .colsubmit {
        :global {
            .ant-form-item-children {
                display: inherit;
                text-align: center;
            }
        }
    }

    .submitbtn {
        margin: 0 auto;
        border-radius: @BorderRadius;
    }
</style>


