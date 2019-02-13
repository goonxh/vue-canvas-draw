<template>
    <div class="tools-component">
        <div class="draw-container">
            <div class="draw-header flex justify-content-between align-items-center">
                <p>draw</p>
                <el-color-picker
                        v-model="drawColor"
                        show-alpha
                        size="mini"
                        @change="drawColorChange"
                        :predefine="predefineColors">
                </el-color-picker>
            </div>
            <div class="flex toolsBox justify-content-center">
                <span id="solidLine" :class="theTool === 'solidLine' ? 'bgGreen' : 'bgWhite'"
                      @click="changeTool('solidLine')">
                    <svg class="line icon-undefined fill-undefined undefined">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-solid-line">
                            <svg id="icon-solid-line" viewBox="0 0 262 32" width="100%" height="100%">
                              <title>solid-line</title>
                              <path :fill="theTool === 'solidLine' ? 'white' : drawColor"
                                    d="M256 19.079l6.4-3.079-6.4-3.079v-0.121h-0.251l-22.149-10.656v10.656h-233.6v6.4h233.6v10.656l22.149-10.656h0.251v-0.121z"></path>
                            </svg>
                        </use>
                    </svg>
                </span>
                <span id="dottedLine" :class="theTool === 'dottedLine' ? 'bgGreen' : 'bgWhite'"
                          @click="changeTool('dottedLine')">
                    <svg class="line icon-undefined fill-undefined undefined">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-dashed-line">
                            <svg id="icon-dashed-line" viewBox="0 0 1200 32" width="100%" height="100%">
                              <title>dashed-line</title>
                              <path :fill="theTool === 'dottedLine' ? 'white' : drawColor"
                                    d="M0 32h33.333v-32h-33.333v32zM100 32h66.667v-32h-66.667v32zM233.333 32h66.667v-32h-66.667v32zM366.667 32h66.666v-32h-66.666v32zM500 32h66.667v-32h-66.667v32zM633.333 32h66.667v-32h-66.667v32zM766.667 32h66.666v-32h-66.666v32zM900 32h66.667v-32h-66.667v32zM1033.333 32h66.667v-32h-66.667v32zM1166.667 32h33.333v-32h-33.333v32z"></path>
                            </svg>
                        </use>
                    </svg>
                </span>
            </div>
            <div class="flex toolsBox justify-content-center">
                <span id="solidArrowLine" :class="theTool === 'solidArrowLine' ? 'bgGreen' : 'bgWhite'"
                      @click="changeTool('solidArrowLine')">
                        <svg class="line icon-undefined fill-undefined undefined">
                          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-line-with-arrow">
                            <svg id="icon-line-with-arrow" viewBox="0 0 262 32" width="100%" height="100%">
                              <title>line-with-arrow</title>
                              <path :fill="theTool === 'solidArrowLine' ? 'white' : drawColor"
                                    d="M256 19.079l6.4-3.079-6.4-3.079v-0.121h-0.251l-22.149-10.656v10.656h-233.6v6.4h233.6v10.656l22.149-10.656h0.251v-0.121z"></path>
                            </svg>
                          </use>
                        </svg>
                </span>
                <span id="dottedArrowLine" :class="theTool === 'dottedArrowLine' ? 'bgGreen' : 'bgWhite'"
                      @click="changeTool('dottedArrowLine')">
                        <svg class="line icon-undefined fill-undefined undefined">
                          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-dashed-line-with-arrow">
                            <svg id="icon-dashed-line-with-arrow" viewBox="0 0 262 32" width="100%" height="100%">
                              <title>dashed-line-with-arrow</title>
                              <path :fill="theTool === 'dottedArrowLine' ? 'white' : drawColor"
                                    d="M256 19.079l6.4-3.079-6.4-3.079v-0.121h-0.251l-22.149-10.656v10.656h-11.2v6.4h11.2v10.656l22.149-10.656h0.251v-0.121zM196.8 19.2v-6.4h16v6.4h-16zM171.2 19.2v-6.4h16v6.4h-16zM145.6 19.2v-6.4h16v6.4h-16zM120 19.2v-6.4h16v6.4h-16zM94.4 19.2v-6.4h16v6.4h-16zM68.8 19.2v-6.4h16v6.4h-16zM43.2 19.2v-6.4h16v6.4h-16zM17.6 19.2v-6.4h16v6.4h-16zM8 19.2h-8v-6.4h8v6.4z"></path>
                            </svg>
                          </use>
                        </svg>
                </span>
            </div>
        </div>
        <div class="drag-container">
            <div class="drag-header flex justify-content-between align-items-center">
                <p>drag</p>
                <el-color-picker
                        v-model="dragColor"
                        show-alpha
                        size="mini"
                        @change="dragColorChange"
                        :predefine="predefineColors">
                </el-color-picker>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tools",
        data() {
            return {
                predefineColors: [
                    '#ff4500',
                    '#ff8c00',
                    '#ffd700',
                    '#90ee90',
                    '#00ced1',
                    '#1e90ff',
                    '#c71585',
                ],
            }
        },
        computed: {
            drawColor: {
                get: function () {
                    return this.$store.state.drawColor;
                },
                set: function () {}

            },
            dragColor: {
                get: function () {
                    return this.$store.state.dragColor;
                },
                set: function () {}
            },
            theTool(){
                return this.$store.state.tool;
            }
        },
        methods:{
            drawColorChange(val){
                this.$store.commit('setDrawColor',val);
            },
            dragColorChange(val) {
                this.$store.commit('setDragColor',val);
            },
            changeTool(toolName) {
                this.$store.commit('setTool',toolName);
            }
        }
    }
</script>

<style scoped lang="scss">
    .tools-component {
        width: 220px;
        height: 100%;
        .draw-header, .drag-header{
            padding: 2px 10px;
            border-bottom: 1px solid #ccc;
        }
        .toolsBox {
            width: 100%;
            span{
                border: 1px solid #e7eaef;
                border-radius: 2px;
                width: 75px;
                height: 36px;
                display: flex;
                cursor: pointer;
                justify-content: center;
                align-items: center;
                margin: 10px;
                &:hover{
                    border-color: #2f313c;
                    color: #2f313c;
                }
                svg{
                    padding: 0 5px;
                }
            }
        }
        .bgWhite{
            background-color: #fff;
        }
        .bgGreen{
            background-color: rgb(157, 216, 98);
        }
        .line{
            width: 80px;
            height: 15px;
        }
    }
</style>
