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
                        type="password"
                        placeholder="密码"
                    >
                        <a-icon
                            slot="prefix"
                            type="lock"
                            style="color: rgba(0,0,0,.25)"
                        />
                        <a-icon slot="suffix" type="eye"/>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-checkbox
                        v-decorator="[
                        'remember',
                        {
                            valuePropName: 'checked',
                            initialValue: true,
                        }
                        ]"
                    >
                        记住我
                    </a-checkbox>
                    <a
                        class="login-form-forgot"
                        href=""
                    >
                        忘记密码
                    </a>
                    <a-button
                        type="primary"
                        html-type="submit"
                        class="login-form-button"
                    >
                        登录
                    </a-button>
                    <a href="">
                        现在注册!
                    </a>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
    constructor() {
        super();
    }

    form: any;

    beforeCreate () {
        this.form = this.$form.createForm(this);
    }

    async login(param: any) {
        const res = await request({
            api: '/api/user/login',
            method: 'POST',
            body: param
        });
        console.log(res);
    }

    handleSubmit(e:any): void {
        e.preventDefault();
        this.form.validateFields((err, values) => {
            if (!err) {
                this.login(values);
            }
        });
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/design/index.less';
.Login {
    width: 100%;
    height: 100%;
    padding: 40px 20px 20px 20px;
    border-radius: 6px;
    background: @colorOne;
    box-shadow: @boxShadowOne;

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
            width: 100%;
            font-size: 16px;
        }
    }
}
</style>





