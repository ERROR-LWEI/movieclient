<template>
    <div :class="$style.Sigin">
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
                        :class="$style.Siginformbutton"
                        :loading="isLoading"
                    >
                        Sigin
                    </a-button>
                </a-form-item>
            </a-form>
            <div :class="$style.login"><span @click="siginPage">登陆</span></div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Emit, Model, Watch, Provide } from 'vue-property-decorator';
import { Form, Input, Icon, Checkbox, Button } from 'ant-design-vue';
import request from '@/middleware/request';
import { encode } from '@/middleware/cryptograph';
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
export default class Sigin extends Vue {
    @Provide() public form: any;
    @Provide() public isEye: Boolean = false;
    @Provide() public type: string = 'eye-invisible';
    @Provide() public inputType: string = 'password';
    @Provide() public isLoading: Boolean = false;

    public beforeCreate() {
        this.form = this.$form.createForm(this);
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

    public siginPage() {
        this.$router.push('/user/login');
    }

    public async sigin(param: any) {
        param.type = 'user';
        const res = await request({
            api: '/api/user/sigin',
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
                values.password = encode(values.password);
                await this.sigin(values);
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

.login {
    margin-top: 30px;
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

.Sigin {
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

        .Sigin-form-forgot {
            float: right;
        }

        .Siginformbutton {
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





