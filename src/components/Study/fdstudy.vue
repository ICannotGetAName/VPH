<template>
  <div id="top">
    <div class="logo" @click="back_func"></div>
    <div class="flex" id="nav_header">
      <h1>职能学习：前台</h1>
    </div>
    <div class="content">
      <div class="list_l">
        <ul class="navList">
          <li v-for="study in studys" v-bind:key="study.name">
            <a @click="showInfo(study.name)" class="room">
              {{ study.name }}
            </a>
          </li>
        </ul>
      </div>
      <div class="map_r">
        <div class="intro">
          <p class="info">
            {{ info }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfos } from "@/api/cases.js";
export default {
  name: "fdstudy",
  data() {
    return {
      studys: [],
      picsrc: "localhost",
      info: "bla"
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
      getInfos()
        .then(result => {
          console.log("data: ", result);
          this.studys = result.data.data.data;
        })
        .catch(err => {
          console.log("err: ", err);
        });
      this.info = "我是前台，我爱学习";
    },
    showInfo(name) {
      for (let i = 0; i < this.studys.length; i++) {
        if (this.studys[i].name == name) {
          this.info = this.studys[i].depict;
          this.picsrc = this.studys[i].picture;
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
