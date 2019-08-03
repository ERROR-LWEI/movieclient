<template>
    <div>
        <div :class="$style.table">
            <a-button @click="updataVisible">添加</a-button>
            <a-table/>
        </div>
        <add-enum 
            :visible="isVisible"
            :submit="add" 
            enumName="nation"
            :config="config" 
        >
            <div :style="{ textAlign: 'center' }">
                <a-button html-type="submit" type="primary" :loading="!isSubmit">提交</a-button>
                <a-button :style="{ marginLeft: '20px' }" @click="updataVisible">取消</a-button>
            </div>
        </add-enum>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Provide, Emit, Watch } from 'vue-property-decorator';
import { Table, Button } from 'ant-design-vue';
import { namespace } from 'vuex-class';
import request from '@/middleware/request';
import AddEnum from '@/views/meta/add/addEnum.vue';

const metaModule = namespace('metadata');

@Component({
    components: {
        'a-table': Table,
        'a-button': Button,
        'add-enum': AddEnum
    }
})
export default class Nation extends Vue {
    @Provide() isVisible: any = false;
    @Provide() isSubmit: boolean = true;
    @metaModule.State((state) => state.addMetadata) addMetadata: any
    @metaModule.Action('addMetadata') addMeta: any; // 状态
    
    config = [{
        name: 'value',
        placeholder: '枚举值',
        slot: 'a-input'
    },{
        name: 'name',
        placeholder: '枚举值名称',
        slot: 'a-input'
    }]

    @Emit('updataVisible')
    updataVisible() {
        this.isVisible = !this.isVisible;
    }

    @Emit('add')
    add(value: any): void {
        this.isSubmit = !this.isSubmit;
        this.addMeta({
            api: '/api/meta/addMetadata',
            method: 'POST',
            body: value
        })
    }

    @Watch('addMetadata')
    watchAdd(value: any, old: any) {
        this.updataVisible();
        this.isSubmit = !this.isSubmit;
    }

}
</script>

<style module lang="less">
    .table {
        border-top: 1px dashed #a0a0a0;
    }
</style>


