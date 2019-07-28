<template>
    <div :class="$style.poster">
        <a-upload
            name="file"
            listType="picture-card"
            accept="multipart/form-data"
            @change="uploadchange"
            :showUploadList="false"
            action="/api/upload/uploadImage"
        >
            <img v-if="imageurl" :src="imageurl"/>
            <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus-circle'" />
            </div>
        </a-upload>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Upload, Icon } from 'ant-design-vue';
import request from '@/middleware/request';

@Component({
    components: {
        'a-upload': Upload,
        'a-icon': Icon
    }
})
export default class Movieposter extends Vue {
    @Prop({ type: Function }) private readonly updatedata!: Function;
    loading: Boolean = false;
    imageurl: any = '';

    private getBase64(img: any, callback: any) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result))
        reader.readAsDataURL(img);
    }

    @Emit('upload')
    public upload(file: any) {
        const fromData = new FormData();
        if (file) {
            fromData.append('file', file);
        }
        return request({
            api: '/api/upload/uploadImage',
            method: 'POST',
            body: fromData
        });
    }

    @Emit('uploadchange')
    public uploadchange(info: any) {
        console.log(info);
        if (info.file.status === 'uploading') {
            this.loading = true;
        }
        if (info.file.status === 'done') {
            console.log(info)
            this.getBase64(info.file.originFileObj, (image: string) => {
                this.imageurl = image;
                this.loading = false;
            })
            if (info.file.response && info.file.response.type !== 'ERROR') {
                this.updatedata(info.file.response.data);
            }
        }
    }
}
</script>

<style module lang="less">
    @import "../../../assets/design/index.less";
    .poster {
        width: 100%;
        height: 100%;
        overflow: hidden;

        img {
            width: 100%;
            vertical-align: top;
        }

        :global {
            .ant-upload.ant-upload-select-picture-card {
                width: 100%;
                height: 100%;
                border: transparent;
            }
            .ant-upload.ant-upload-select-picture-card > .ant-upload {
                padding: 0;
            }
            .ant-upload.ant-upload-select-picture-card {
                margin: 0;
            }
        }
    }
</style>


