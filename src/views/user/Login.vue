<template>
    <div class="Login">
        <div class="logo"></div>
        <div class="form">
            <a-form :form="form" @submit="handleSubmit">
                <a-form-item>
                    <a-input
                        size="large"
                        v-decorator="[
                            'account',
                            {
                                rules: [{ type: 'email', required: true, message: '请输入邮箱地址' }],
                                validateTrigger: 'submit'
                            }
                        ]"
                        type="text"
                        class="formInput"
                        placeholder="Email"
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
                            {
                                rules: [{ required: true, message: 'Please input your note!' }],
                                validateTrigger: 'submit'
                            }
                        ]"
                        :type="inputType"
                        class="formInput"
                        placeholder="Password"
                    >
                        <a-icon
                            slot="prefix"
                            type="lock"
                            style="color: rgba(0,0,0,.25)"
                        />
                        <a-icon slot="suffix" @click="click" :type="type" style="cursor:pointer"/>
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
            <div class="thirdparty">
                <a-icon type="weibo" @click="weibologin" />
                <a-icon type="qq" />
                <a-icon type="wechat" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Emit, Model, Watch, Provide } from 'vue-property-decorator';
import { Form, Input, Icon, Checkbox, Button } from 'ant-design-vue';
import request from '@/middleware/request';
import { Route } from 'vue-router';
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

    beforeRouteEnter(to: Route, from: Route, next: any) {
        console.log('to', to);
        console.log('');
        console.log('from', from);
        next();
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

    @Watch('$route')
    watchRoute(val: any, old: any) {
        console.log('val', val);
        console.log('');
        console.log('old', val);
    }

    weibologin() {
        window.location.href = 'https://api.weibo.com/oauth2/authorize?client_id=524879129&redirect_uri=http://www.lemonpai.cn/user/login&code=CODE'
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
         height: 45px;
         border-radius: 20px;
    }
}
.Login {
    width: 100%;
    height: 100%;
    padding: 50px 20px 20px 20px;
    border-radius: 6px;
    background: @colorOne;
    background-size: cover;
    box-shadow: @boxShadowOne @colorTwo;
    position: relative;

    .logo {
        width:  100px;
        height: 100px;
        border-radius: 50px;
        position: absolute;
        top: -50px;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0 auto;
        background: #ddd;
        background: @logoImg;
        border: 2px solid #fff;
        background-size: 100%;
        transition: all .2s linear;

        &:hover {
            top: -60px;
            width: 110px;
            height: 110px;
            border-radius: 55px;
            box-shadow: 0 4px 10px 2px #52525245;
            transition: all .2s linear;
        }
    }
    .form {
        padding: 20px 20px;

        .thirdparty {
            width: 90%;
            margin: auto;
            margin-top: 50px;
            // border-top: 2px solid #cacaca;
            padding-bottom: 10px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;

            & i {
                font-size: 24px;
                cursor: pointer;
            }
        }

        .login-form-forgot {
            float: right;
        }

        .login-form-button {
            font-family: "ITCAvantGardeProReg";
            font-weight: 900;
            letter-spacing: 4px;
            width: 100%;
            height: 42px;
            font-size: 16px;
            border-radius: 30px;
            &:hover {
                box-shadow: 0 4px 10px 2px #505050;
            }
        }
    }
}
</style>





