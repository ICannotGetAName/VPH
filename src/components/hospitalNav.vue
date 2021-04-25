<template>
<div id="top">
    <div class="flex" id="nav_header">
        <h1>医院导览图</h1>
    </div>
    <div class="content">
        <div class="list_l">
            <ul class="navList">
                <li v-for="room in rooms" v-bind:key="index">
                    <a href="#" class="room">{{room.roomName}}</a>
                </li>
            </ul>
        </div>
        <div class="map_r">
            
        </div>
    </div>
    
</div>
</template>

<script>
    export default {
        name: 'hospitalNav',
        data() {
            return {
                rooms: [
                    {roomName: '前台'},
                    {roomName: '诊室'},
                    {roomName: '免疫室'},
                    {roomName: '化验室'},
                    {roomName: '影像室'},
                    {roomName: '专科检查室'},
                    {roomName: '处置室'},
                    {roomName: '药房'},
                    {roomName: '注射室'},
                    {roomName: '手术准备室'},
                    {roomName: '手术室'},
                    {roomName: '住院部'},
                    {roomName: '病理剖析室'},
                    {roomName: '档案室'},
                ]
            }
        },

        methods: {
        }
    }
</script>

<style>
.list_l {
    width: 20%;
}
.navList {
    list-style-type: none;
    background-color:#f6f4f0;
    margin: 0 auto;
    padding: 0;
}
.room {
    display: block;
    height: 50px;
    color: black;
    background-color:#f6f4f0;
    text-decoration: none;
    line-height: 50px;
    
}
.room:hover {
    background-color:orange;
}
#nav_header {
    background-color: darkorange;
    color: rgb(40, 40, 40);
    font-family: 'Times New Roman', Times, serif;
    font-size: large;
    text-align: center;
    width: 100%;
    height: 15%;
    vertical-align: middle;
    margin: auto;
}
.map_r {
    width: 80%;
}
</style>