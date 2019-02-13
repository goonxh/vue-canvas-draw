<template>
    <div class="main-page">
        <operation></operation>
        <div class="flex draw">
            <tools></tools>
            <draw></draw>
        </div>
    </div>
</template>

<script>
    import Operation from "./operation";
    import Draw from "./draw";
    import Tools from "./tools";
    export default {
        components: {
            Operation,
            Draw,
            Tools
        }
    }
</script>

<style scoped lang="scss">
    .main-page{
        height: 100%;
        .draw{
            height: calc(100% - 81px);
        }
    }
</style>