<template>
  <div id="top">
    <div id="header" class="flex">
      <h1>选择功能模块</h1>
    </div>

    <div id="section" class="flex">
      <div class="four_part">
        <button class="round_button" @click="rooms_View()">医院导览</button>
      </div>
      <div class="four_part">
        <button class="round_button" @click="jobs_Study()">职能学习</button>
      </div>
      <div class="four_part">
        <button class="round_button" @click="cases_View()">病例查询</button>
      </div>
      <div class="four_part">
        <button class="round_button" @click="sys_Config()">系统管理</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "function_page",
  data() {
    return {};
  },

  methods: {
    rooms_View() {
      // TODO
      this.$router.push("/hospitalNav");
    },

    jobs_Study() {
      this.$router.push({ path: "/job_studying" });
    },

    cases_View() {
      this.$router.push({ path: "/cases" });
    },

    sys_Config() {
      window.location.href = "http://139.9.140.136";
    }
  }
};
</script>

<style>
.four_part {
  width: 25%;
  text-align: center;
}
</style>
