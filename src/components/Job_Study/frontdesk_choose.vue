<template>
  <div id="top">
    <div id="header" class="flex">
      <h1>{{ title_text }}</h1>
    </div>

    <div id="section" class="flex">
      <div class="three_part">
        <button class="round_button" @click="frontdesk_learn()">
          {{ frontdesk_learn_text }}
        </button>
      </div>
      <div class="three_part">
        <button class="round_button" @click="frontdesk_test()">
          {{ frontdesk_test_text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "frontdesk_choose",
  data() {
    return {
      title_text: "学习or测试",
      frontdesk_learn_text: "学习",
      frontdesk_test_text: "测试"
    };
  },

  methods: {
    frontdesk_learn() {
      this.$router.push({ path: "/fdstudy" });
    },

    frontdesk_test() {
      this.$router.push({ path: "/test" });
    }
  }
};
</script>

<style>
.three_part {
  width: 33%;
  text-align: center;
}
</style>
