<template>
<div id="top">
    <div id="case_header" class="flex">
        <h1>{{ header_text }}</h1>
    </div>

    <div id="section">
        <div id="side_bar" class="horizontal">
            <div id="button_bar">
                <!-- 一级目录按钮 -->
                <div v-for="item in menu_list[current_layer]" :key="item.id">
                    <button class="side_bar_button" @click="getMenuInfo(item.id)">
                        {{ item.item_name }}
                    </button>
                    <br />
                </div>
            </div>
            <div id="navi_bar">
                <button class="side_bar_button" @click="back()">返回上级</button>
            </div>
        </div>

        <div id="content" style="text-align: left">
            {{ content }}
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'cases',
        data() {
            return {
                current_layer: 0,
                menu_list: [
                    [], // 一级目录
                    [], // 二级目录
                    []  // 三级目录
                ],
                content: "欢迎使用病例查询功能，这是主界面，可以在左侧选择病例",
                header_text: "病例查询"
            }
        },

        created: function() {
            this.getFstMenuList();
        },

        methods: {
            getFstMenuList() {
                // TODO: 获得侧边栏中的一级列表信息 最好从数据库获取
                this.menu_list[0] = [
                    {id: 1, item_name: "传染病"}, 
                    {id: 2, item_name: "寄生虫病"},
                    {id: 3, item_name: "内科"},
                    {id: 4, item_name: "外产科疾病"},
                    {id: 5, item_name: "常用手术"},
                    {id: 6, item_name: "免疫"}
                ];
            },

            getMenuInfo(id) {
                // TODO: 根据id获取详细信息
                if (this.current_layer == 0) {
                    this.content = `这是id为${id}的一级列表的介绍数据`;
                    ++this.current_layer;
                    this.getSndMenuList(id);
                } else if (this.current_layer == 1) {
                    this.content = `这是id为${id}的二级列表的介绍数据`;
                    ++this.current_layer;
                    this.getTrdMenuList(id1, id2);
                } else if (this.current_layer == 2) {
                    this.content = `这是id为${id}的三级列表的介绍数据`;
                }
            },

            getSndMenuList(id) {
                // TODO: 根据用户点击的一级列表的id 获取二级列表
                if (id == 1) {
                    this.menu_list[1] = [
                        {id: 1, item_name: "传染病1"}, 
                        {id: 2, item_name: "传染病2"},
                        {id: 3, item_name: "传染病3"},
                        {id: 4, item_name: "传染病4"},
                        {id: 5, item_name: "传染病5"},
                        {id: 6, item_name: "传染病6"}
                    ];
                } else if (id == 3) {
                    this.menu_list[1] = [
                        {id: 1, item_name: "口炎"}, 
                        {id: 2, item_name: "肠炎"},
                        {id: 3, item_name: "肠便秘"},
                        {id: 4, item_name: "胰腺炎"},
                        {id: 5, item_name: "肝炎"},
                        {id: 6, item_name: "腹膜炎"},
                        {id: 7, item_name: "肛门腺炎"}, 
                        {id: 8, item_name: "感冒"},
                        {id: 9, item_name: "鼻炎"},
                        {id:10, item_name: "气管支气管炎"},
                        {id:11, item_name: "肺炎"},
                        {id:12, item_name: "心力衰竭"},
                    ];
                } else {
                    this.menu_list[1] = [];
                }
            },

            getTrdMenuList(id1, id2) {
                if (id1 == 1 && id2 == 1) {
                    this.menu_list[2] = [
                        {id: 1, item_name: "病例1"},
                        {id: 2, item_name: "病例2"}
                    ];
                }
            },

            back() {
                if (this.current_layer > 0) {
                    --this.current_layer;
                }
            }
        }
    }
</script>

<style>
#case_header {
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

#section {
    width: 100%;
    height: 85%;
}

#side_bar {
    background-color: rgb(224, 170, 69);
    width: 200px;
    height: 100%;
}

#content {
    background-color: beige;
    width: 100%;
    height: 100%;
}

.side_bar_button {
    border: none;
    border-radius: 0px;
    width: 100%;
    height: 75px;
}

#button_bar {
    height: 90%;
    overflow: auto;
}

#navi_bar {
    height: 10%;
}
</style>