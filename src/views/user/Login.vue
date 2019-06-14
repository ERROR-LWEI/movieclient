<template>
    <div class="Login">
        <h1>
            <i class="logo"></i>
            <span>百安居测试平台</span>
        </h1>
        <div class="form">
            <a-form :form="form" @submit="handleSubmit">
                <a-form-item>
                    <a-input
                        size="large"
                        v-decorator="[
                            'account',
                            {rules: [{ required: true, message: 'Please input your note!' }]}
                        ]"
                        type="text"
                        class="formInput"
                        placeholder="用户名"
                    >
                        <a-icon
                            slot="prefix"
                            type="user"
                            style="color: rgba(0,0,0,.25)"
                        />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input
                        size="large"
                        v-decorator="[
                            'password',
                            {rules: [{ required: true, message: 'Please input your note!' }]}
                        ]"
                        :type="inputType"
                        class="formInput"
                        placeholder="密码"
                    >
                        <a-icon
                            slot="prefix"
                            type="lock"
                            style="color: rgba(0,0,0,.25)"
                        />
                        <a-icon slot="suffix" @click="click" :type="type"/>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-button
                        type="primary"
                        html-type="submit"
                        class="login-form-button"
                        :loading="isLoading"
                    >
                        LOGIN
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Emit, Model, Watch, Provide } from 'vue-property-decorator';
import { Form, Input, Icon, Checkbox, Button } from 'ant-design-vue';
import request from '@/middleware/request';
const { Item } = Form;
@Component({
    components: {
        'a-form': Form,
        'a-input': Input,
        'a-form-item': Item,
        'a-icon': Icon,
        'a-checkbox': Checkbox,
        'a-button': Button,
    }
})
export default class Login extends Vue {
    @Provide() form: any;
    @Provide() isEye: Boolean = false;
    @Provide() type: string = 'eye-invisible';
    @Provide() inputType: string = 'password';
    @Provide() isLoading: Boolean = false;

    beforeCreate () {
        this.form = this.$form.createForm(this);
    }

    @Emit('click')
    click() {
        this.isEye = !this.isEye;
    }

    @Watch('isEye')
    watchEye(val: Boolean, old: Boolean) {
        this.type = (!this.isEye ? 'eye' : 'eye-invisible');
        this.inputType = (!this.isEye ? 'text': 'password');
    }

    async login(param: any) {
        this.isLoading = true;
        const res = await request({
            api: '/api/user/login',
            method: 'POST',
            body: param
        });
        this.isLoading = false;
        if (res.code === 1) {
            this.$router.push('/home');
        }
    }

    handleSubmit(e:any): void {
        e.preventDefault();
        this.form.validateFields((err: any, values: any) => {
            if (!err) {
                this.login(values);
            }
        });
    }
}
</script>
<style lang="less">
@import '../../assets/design/index.less';
body .form {
    .ant-input {
         font-family: "square";
         font-weight: 900;
    }
}
.Login {
    width: 100%;
    height: 100%;
    padding: 40px 20px 20px 20px;
    border-radius: 6px;
    background: @colorOne;
    background-size: cover;
    box-shadow: @boxShadowOne @colorTwo;

    h1 {
        font-family: "square";
        font-weight: bold;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        padding: 0 20px;
        .logo {
            display: inline-block;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: @logoImg;
            background-size: 100%;
        }
    }

    .form {
        padding: 20px 20px;

        .login-form-forgot {
            float: right;
        }

        .login-form-button {
            font-family: "ITCAvantGardeProReg";
            font-weight: 900;
            letter-spacing: 4px;
            width: 100%;
            height: 50px;
            font-size: 16px;
            border-radius: 30px;
            box-shadow: 0 5px 15px 2px #505050;
        }
    }
}
</style>





