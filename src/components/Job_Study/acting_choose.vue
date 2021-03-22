<template>
<div id="top">
    <div id="header" class="flex">
        <h1>{{ title_text }}</h1>
    </div>

    <div id="section" class="flex">
        <div class="three_part"><button class="round_button" @click="recepting()">{{ recepting_text }}</button></div>
        <div class="three_part"><button class="round_button" @click="vet_Assit()">{{ vet_assit_text }}</button></div>
        <div class="three_part"><button class="round_button" @click="vet()">{{ vet_text }}</button></div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'acting_choose',
        data() {
            return {
                title_text: "请选择你的职业",
                recepting_text: "前台",
                vet_assit_text: "医助",
                vet_text : "兽医"
            }
        },

        methods: {
            recepting() {
                // TODO
            },

            vet_Assit() {
                // TODO
            },

            vet() {
                // TODO
            }
        }
    }
</script>

<style>
.three_part {
    width: 33%;
    text-align: center;
}
</style>