<template>
  <div class="about">
    <a-form :form="form" @submit="submit">
      <a-form-item>
        <a-select
          :labelInValue="true"
          v-decorator="['params1']"
        >
          <a-select-item value="MZJF">麦子金服</a-select-item>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-select
          :labelInValue="true"
          v-decorator="['params2']"
        >
          <a-select-item value="2">消费服务</a-select-item>
        </a-select>
      </a-form-item>
      <a-form-item>
          <a-upload
            v-decorator="['file']"
            name="file"
          >上传</a-upload>
      </a-form-item>
      <a-button
        type="primary"
        html-type="submit"
      >
        提交
      </a-button>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Emit } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { Form, Select, Upload, Button } from 'ant-design-vue';
import request from '../middleware/request';

@Component({
  components: {
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-select': Select,
    'a-select-item': Select.Option,
    'a-upload': Upload,
    'a-button': Button
  }
})
export default class About extends Vue {
    @Provide() public form: any;

    public beforeCreate() {
      this.form = this.$form.createForm(this);
    }

    public beforeRouteLeave(to: Route, from: Route , next: () => void): void {
        next();
    }

    public beforeRouteEnter(to: Route, from: Route, next: () => void): void {
        next();
    }

    @Emit('submit')
    async submit(e: any): void {
      e.preventDefault();
      this.form.validateFields(async (err: any, values: any) => {
          if (!err) {
            const _file = values.file.file.originFileObj;
            const form = new FormData();
            form.append('companyCode', values.params1.key);
            form.append('companyName', values.params1.label);
            form.append('productCategory', values.params2.label);
            form.append('productCategoryId', values.params2.key);
            form.append('file', _file);
            const res = await request({
              api: '/api/audit/flow/deploy',
              method: 'POST',
              body: form
            })
          }
      });
    }
}
</script>
