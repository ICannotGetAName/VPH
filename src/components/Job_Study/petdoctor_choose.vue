<template>
  <div id="top">
    <div id="header" class="flex">
      <h1>{{ title_text }}</h1>
    </div>

    <div id="section" class="flex">
      <div class="three_part">
        <button class="round_button" @click="petdoctor_learn()">
          {{ petdoctor_learn_text }}
        </button>
      </div>
      <div class="three_part">
        <button class="round_button" @click="petdoctor_test()">
          {{ petdoctor_test_text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "petdoctor_choose",
  data() {
    return {
      title_text: "学习or测试",
      petdoctor_learn_text: "学习",
      petdoctor_test_text: "测试"
    };
  },

  methods: {
    petdoctor_learn() {
      this.$router.push({ path: "/petdoctorstudy" });
    },

    petdoctor_test() {
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
