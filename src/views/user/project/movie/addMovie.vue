<template>
    <router-link to="/usermessage/project/movie/add">
        <div :class="$style.addmovie">
            <a-icon type="plus-circle"/>
        </div>
    </router-link>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Icon } from 'ant-design-vue';

@Component({
    components: {
        'a-icon': Icon
    }
})
export default class AddMovie extends Vue {

}
</script>

<style module lang="less">
    .addmovie {
        width: 120px;
        height: 150px;
        border: 1px dashed  #9e9d9d;
        border-radius: 6px;
        margin: 10px 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        & i {
            display: inherit;
        }
    }
</style>


