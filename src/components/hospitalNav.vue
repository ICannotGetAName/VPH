<template>
  <div id="top">
    <div class="logo" @click="back_func"></div>
    <div class="flex" id="nav_header">
      <h1>医院导览图</h1>
    </div>
    <div class="content">
      <div class="list_l">
        <ul class="navList">
          <li v-for="room in rooms" v-bind:key="room.name">
            <a @click="showInfo(room.name)" class="room">
              {{ room.name }}
            </a>
          </li>
        </ul>
      </div>
      <div class="map_r">
        <div class="roomPic">
          <img
            :src="picsrc"
            alt="医院地图"
            width="860"
            height="500"
            class="pic"
          />
        </div>
        <div class="intro">
          <p class="info">{{ info }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOffices } from "@/api/cases.js";
export default {
  name: "hospitalNav",
  data() {
    return {
      rooms: [
        // { roomName: "前台", url: "#/rooms/frontdesk" },
        // { roomName: "诊室", url: "#/rooms/diagnose" },
        // { roomName: "免疫室", url: "#/rooms/immusion" },
        // { roomName: "化验室", url: "#/rooms/check" },
        // { roomName: "影像室", url: "#/rooms/film" },
        // { roomName: "专科检查室", url: "#/rooms/speciality" },
        // { roomName: "处置室", url: "#/rooms/deal" },
        // { roomName: "药房", url: "#/rooms/drug" },
        // { roomName: "注射室", url: "#/rooms/inject" },
        // { roomName: "手术准备室", url: "#/rooms/prepare" },
        // { roomName: "手术室", url: "#/rooms/opreation" },
        // { roomName: "住院部", url: "#/rooms/stay" },
        // { roomName: "病理剖析室", url: "#/rooms/examine" },
        // { roomName: "档案室", url: "#/rooms/document" }
      ],

      info: "bla",
      picsrc: "localhost"
    };
  },

  created: function() {
    this.getInfo();
  },

  methods: {
    back_func() {
      this.$router.push("/function_page");
    },
    getInfo() {
      getOffices()
        .then(result => {
          console.log("data: ", result);
          this.rooms = result.data.data.data;
        })
        .catch(err => {
          console.log("err: ", err);
        });
      this.info = "医院地图总览";
      this.picsrc = require("../assets/map.jpg");
    },
    showInfo(name) {
      for (let i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i].name == name) {
          this.info = this.rooms[i].func;
          this.picsrc = this.rooms[i].intro;
          break;
        }
      }
    }
  }
};
</script>

<style>
.list_l {
  width: 20%;
  float: left;
}
.navList {
  list-style-type: none;
  background-color: #f6f4f0;
  margin: 0 auto;
  padding: 0;
}
.room {
  display: block;
  height: 50px;
  color: black;
  background-color: #f6f4f0;
  text-decoration: none;
  line-height: 50px;
}
.room:hover {
  background-color: orange;
}
#nav_header {
  background-color: darkorange;
  color: rgb(40, 40, 40);
  font-family: "Times New Roman", Times, serif;
  font-size: large;
  text-align: center;
  width: 100%;
  height: 15%;
  vertical-align: middle;
  margin: auto;
}
.map_r {
  width: 80%;
  float: left;
}

.pic {
  margin: 20 auto;
}
</style>
