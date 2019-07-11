<template>
    <div :class="$style.Login">
        <div :class="$style.logo"></div>
        <div :class="$style.form">
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
                        :class="$style.formInput"
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
                        :class="$style.formInput"
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
                        :class="$style.loginformbutton"
                        :loading="isLoading"
                    >
                        LOGIN
                    </a-button>
                </a-form-item>
            </a-form>
            <div :class="$style.thirdparty">
                <a-icon type="weibo" @click="weibologin" />
                <a-icon type="qq" />
                <a-icon type="wechat" />
            </div>
            <div :class="$style.sigin"><span @click="loginPage">注册</span></div>
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
    },
})
export default class Login extends Vue {
    @Provide() public form: any;
    @Provide() public isEye: Boolean = false;
    @Provide() public type: string = 'eye-invisible';
    @Provide() public inputType: string = 'password';
    @Provide() public isLoading: Boolean = false;

    public beforeCreate() {
        this.form = this.$form.createForm(this);
    }

    public beforeRouteEnter(to: Route, from: Route, next: any) {
        const { query: { code } } = to;
        next((vm: any) => {
            if (code) {
                vm.login({ type: 'weibo', code, url: 'www.lemonpai.cn' });
            }
        });
    }

    @Emit('click')
    public click() {
        this.isEye = !this.isEye;
    }

    @Watch('isEye')
    public watchEye(val: Boolean, old: Boolean) {
        this.type = (!this.isEye ? 'eye' : 'eye-invisible');
        this.inputType = (!this.isEye ? 'text' : 'password');
    }

    @Watch('$route')
    public watchRoute(val: any, old: any) {
        console.log('val', val);
        console.log('');
        console.log('old', val);
    }

    public loginPage() {
        console.log(this.$router)
        this.$router.push('/user/sigin');
    }

    public weibologin() {
        window.location.href = 'https://api.weibo.com/oauth2/authorize?client_id=524879129&redirect_uri=http://www.lemonpai.cn/user/login&code=CODE';
    }

    public async login(param: any) {
        param.type = 'user';
        const res = await request({
            api: '/api/user/login',
            method: 'POST',
            body: param,
        });
        if (res.code === 1) {
            this.$router.push('/home');
        }
    }

    public handleSubmit(e: any): void {
        e.preventDefault();
        this.form.validateFields(async (err: any, values: any) => {
            if (!err) {
                this.isLoading = true;
                await this.login(values);
                this.isLoading = false;
            }
        });
    }
}
</script>
<style module lang="less">
@import '../../assets/design/index.less';

:global {
    body .ant-input {
        font-family: "ITCAvantGardeProReg";
        font-weight: 900;
        font-size: 20px;
        height: 45px;
        border-radius: 20px;
    }
}

.sigin {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #cacacad4;
    position: relative;

    & span {
        display: inline-block;
        padding: 10px;
        background: @colorOne;
        position: absolute;
        top: -20px;
        cursor: pointer;
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

        .loginformbutton {
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





