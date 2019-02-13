<template>
    <div class="operation-component flex align-items-center">
        <div class="operation-container flex justify-content-between">
            <div class="flex align-items-center">
                <el-button size="small" @click="clear">clear</el-button>
                <el-button size="small" type="primary" @click="save">save</el-button>
            </div>
            <div>
                <span style="margin-right: 25px">choose a background:</span>
                <el-radio-group v-model="backgroundImg" @change="bgChange">
                    <el-radio label="bg3">
                        <img src="../assets/bg3.jpg" height="70">
                    </el-radio>
                    <el-radio label="bg2">
                        <img src="../assets/bg2.jpg" height="70">
                    </el-radio>
                    <el-radio label="bg4">
                        <img src="../assets/bg4.jpg" height="70">
                    </el-radio>
                </el-radio-group>
            </div>
        </div>

    </div>
</template>

<script>
    import bus from './bus';

    export default {
        name: "operation",
        data() {
            return {
                backgroundImg:'',
            }
        },
        methods: {
            bgChange(src) {
                bus.$emit('changeDrawBg',src);
            },
            clear() {
                console.log(1)
            },
            save() {
                console.log(2)
            }
        },
    }
</script>

<style scoped lang="scss">
    .operation-component {
        width: 100%;
        height: 80px;
        border-bottom: 1px solid #ccc;
        .operation-container{
            width: 100%;
            margin: 0 20px;
        }
    }
</style>