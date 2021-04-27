<template>
  <div id="top">
    <div id="header" class="flex">
      <h1>{{ title_text }}</h1>
    </div>

    <div id="section" class="flex">
      <div class="three_part">
        <button class="round_button" @click="assist_learn()">
          {{ assist_learn_text }}
        </button>
      </div>
      <div class="three_part">
        <button class="round_button" @click="assist_test()">
          {{ assist_test_text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "assist_choose",
  data() {
    return {
      title_text: "学习or测试",
      assist_learn_text: "学习",
      assist_test_text: "测试"
    };
  },

  methods: {
    assist_learn() {
      this.$router.push({ path: "/asstudy" });
    },

    assist_test() {
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
