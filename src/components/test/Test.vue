<template>
  <div>
    <examination-paper :data-source="paperData"> </examination-paper>
  </div>
</template>

<script>
import examinationPaper from "@/components/test/examinationPaper.vue";
import { getTest } from "@/api/cases.js";
export default {
  name: "Test",
  components: {
    examinationPaper
  },
  created: function() {
    this.fetchData();
  },
  data() {
    return {
      paperData: {}
    };
  },

  methods: {
    fetchData() {
      getTest()
        .then(result => {
          console.log("res: ", result);
          let data = result.data.data.data;
          let paper = {
            paperId: "1",
            //试卷名称
            paperName: data.title,
            //考生ID
            examineId: "",
            //考生名称
            examineName: "",
            //分数
            score: data.score,
            //考试时长
            examDuration: data.time,
            //交卷时间
            submissionTime: "",
            list: []
          };
          let problems = data.problems;
          for (var i = 0; i < problems.length; i++) {
            console.log("problem: ", problems[i].problem);
            console.log("answer len: ", JSON.parse(problems[i].answer));
            paper.list.push({
              type: 1,
              no: i + 1,
              subject: problems[i].problem,
              totalScore: problems[i].score,
              answers: JSON.parse(problems[i].answer),
              examineAnswer: null,
              correctAnswer: problems[i].correct,
              answerAnalysis: "答案解析.......",
              isHook: 1,
              score: 0
            });
          }
          this.paperData = paper;
        })
        .catch(err => {
          console.log("err: ", err);
        });
    }
  }
};
</script>

<style></style>
