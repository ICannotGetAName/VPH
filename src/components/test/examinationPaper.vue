<template>
  <div class="paper-main">
    <div class="paper-header">
      <el-form
        label-position="top"
        label-width="100px"
        :model="tempDataSource"
        style="padding-top:0px; "
      >
        <el-row>
          <!-- <el-col :span="4" :offset="1">
            <el-form-item label="试卷">
              {{ dataSource.paperName }}
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="考生">
              {{ dataSource.examineName }}
            </el-form-item>
          </el-col> -->
          <el-col :span="4">
            <el-form-item
              label="分数"
              v-if="this.type === 2 || this.type === 3"
            >
              {{ dataSource.score }}
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="考试时长">
              {{ dataSource.examDuration }}分
            </el-form-item>
          </el-col>
          <el-col :span="4" v-if="this.type === 1">
            <el-form-item label="倒计时间">
              <span class="downTime">{{
                hour
                  ? hourString + ":" + minuteString + ":" + secondString
                  : minuteString + ":" + secondString
              }}</span>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="4">
            <el-form-item
              label="交卷时间"
              v-if="this.type === 2 || this.type === 3"
            >
              {{ dataSource.submissionTime }}
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
    </div>

    <div ref="paperLeft" class="paper-left">
      <div class="paper-title">
        <h1><i class="el-icon-s-grid"></i>答题卡</h1>
      </div>
      <el-collapse v-model="answerCardActiveName">
        <el-collapse-item v-for="item in convertDatas" :name="item.code">
          <template slot="title">
            <h2>{{ item.name }}</h2>
            <spn>共{{ item.count }}题</spn>
          </template>
          <el-button
            class="answer-button"
            circle
            size="small"
            v-for="index of item.count"
            :id="'answer' + item.code + index"
            @click.native="jump(item.code + index)"
            >{{ index }}</el-button
          >
        </el-collapse-item>
      </el-collapse>
    </div>

    <div ref="paperContent" class="paper-content">
      <div class="subject" v-for="item in convertDatas">
        <div class="subject-title">
          <h2>{{ item.name }}</h2>
          <spn>（共 {{ item.count }} 题，合计 {{ item.totalScore }} 分）</spn>
        </div>

        <el-card
          class="box-card"
          v-for="(sub, index) in item.childs"
          :id="item.code + (index + 1)"
        >
          <div slot="header" class="clearfix">
            <el-tag effect="dark"> {{ sub.no }} </el-tag>
            <span>{{ sub.subject }}</span>
            <span>({{ sub.totalScore }}分)</span>

            <div
              v-if="type === 2 || type === 3"
              style="float: right; padding: 3px 0"
            >
              <el-radio-group v-model="sub.isHook">
                <el-radio-button
                  :disabled="disabledRead"
                  :label="1"
                  @change.native="isHookButtionCheck(sub)"
                  ><i class="el-icon-check"
                /></el-radio-button>
                <el-radio-button
                  :disabled="disabledRead"
                  :label="2"
                  @change.native="isHookButtionCheck(sub)"
                  ><i class="el-icon-close"
                /></el-radio-button>
              </el-radio-group>
              <div
                v-if="sub.type === 1 || sub.type === 2 || sub.type === 3"
                style="display: inline;"
              >
                <el-input
                  :disabled="true"
                  v-model="sub.score"
                  style="width:50px"
                ></el-input
                ><span>分</span>
              </div>
              <div v-else style="display: inline;">
                <el-input
                  :disabled="disabledRead"
                  v-model="sub.score"
                  style="width:50px"
                ></el-input
                ><span>分</span>
              </div>
            </div>
          </div>

          <el-radio-group v-if="sub.type === 1" v-model="sub.examineAnswer">
            <el-radio
              :disabled="disabledAnswer"
              v-for="o in sub.answers"
              :label="o.no"
              class="answer-radio"
              @change="answerButtionCheck($event, item, sub)"
              >{{ o.no }}.{{ o.answer }}</el-radio
            >
          </el-radio-group>
          <el-checkbox-group v-if="sub.type === 2" v-model="sub.examineAnswer">
            <el-checkbox
              :disabled="disabledAnswer"
              v-for="o in sub.answers"
              :label="o.no"
              class="answer-checkbox"
              @change="answerButtionCheck($event, item, sub)"
              >{{ o.no }}.{{ o.answer }}</el-checkbox
            >
          </el-checkbox-group>
          <el-radio-group v-if="sub.type === 3" v-model="sub.examineAnswer">
            <el-radio
              :disabled="disabledAnswer"
              label="对"
              class="answer-radio"
              @change="answerButtionCheck($event, item, sub)"
              >对</el-radio
            >
            <el-radio
              :disabled="disabledAnswer"
              label="错"
              class="answer-radio"
              @change="answerButtionCheck($event, item, sub)"
              >错</el-radio
            >
          </el-radio-group>
          <el-input
            :disabled="disabledAnswer"
            v-if="sub.type === 4"
            type="textarea"
            :rows="2"
            v-model="sub.examineAnswer"
            resize="none"
            maxlength="150"
            @blur="answerButtionCheck($event, item, sub)"
          >
          </el-input>
          <el-input
            :disabled="disabledAnswer"
            v-if="sub.type === 5"
            type="textarea"
            :rows="10"
            v-model="sub.examineAnswer"
            resize="none"
            maxlength="2000"
            @blur="answerButtionCheck($event, item, sub)"
          >
          </el-input>

          <div v-if="type !== 1" class="subject-remark">
            <div class="item">
              <span class="title">考生答案：</span>
              <span>{{ converAnswerStr(sub.examineAnswer) }}</span>
            </div>
            <div class="item">
              <span class="title">正确答案：</span>
              <span>{{ converAnswerStr(sub.correctAnswer) }}</span>
            </div>
            <!-- <div class="item">
              <span class="title">考生答案：</span>
              <span>{{ sub.answerAnalysis }}</span>
            </div> -->
          </div>
        </el-card>
      </div>
    </div>

    <div class="paper-footer">
      <el-button
        v-if="type === 1"
        type="success"
        @click.native="btnClick('handPaper')"
        >交卷</el-button
      >
      <el-button
        v-if="type === 2"
        type="success"
        @click.native="btnClick('readPaper')"
        >阅卷</el-button
      >
      <el-button
        v-if="type === 2"
        type="success"
        @click.native="btnClick('readPaperUpper')"
        >上一个</el-button
      >
      <el-button
        v-if="type === 2"
        type="success"
        @click.native="btnClick('readPaperNext')"
        >下一个</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "examinationPaper",
  props: {
    //试卷类型 1 考试 2 阅卷 3 查看
    type: {
      type: Number,
      default: 1
    },
    //数据源
    dataSource: {
      type: Object,
      default: () => {
        return {
          //试卷ID
          paperId: "",
          //试卷名称
          paperName: "",
          //考生ID
          examineId: "",
          //考生名称
          examineName: "",
          //分数
          score: null,
          //考试时长(分钟)
          examDuration: null,
          //交卷时间
          submissionTime: "",
          //题目集合
          list: [
            {
              //题目类型 1.单选题 2.多选题 3.判断题 4.填空题 5.简答题
              type: null,
              //题号
              no: null,
              //题目
              subject: "",
              //题目总分
              totalScore: null,
              //答案集合
              answers: [
                {
                  //答案序号
                  no: "",
                  //答案
                  answer: ""
                }
              ],
              //考生答案
              examineAnswer: null,
              //正确答案
              correctAnswer: null,
              //答案解析
              answerAnalysis: "",
              //是否对错  1.对 2.错
              isHook: null,
              //得分
              score: null
            }
          ]
        };
      }
    }
  },

  data() {
    return {
      //倒计小时
      hour: "",
      //倒计分钟
      minute: "",
      //倒计秒
      second: "",
      //计时器
      promiseTimer: "",
      //数据源
      tempDataSource: {},
      //答题卡激活项
      answerCardActiveName: [],
      //组装后数据集
      convertDatas: [],
      //禁止答题
      disabledAnswer: false,
      //禁止阅卷
      disabledRead: false
    };
  },

  watch: {
    dataSource(newValue, oldValue) {
      Object.assign(this.tempDataSource, newValue);
      this.convertData();
    }
  },

  created() {
    Object.assign(this.tempDataSource, this.dataSource);
    this.convertData();
    if (this.type === 2) {
      this.disabledAnswer = true;
    }
    if (this.type === 3) {
      this.disabledAnswer = true;
      this.disabledRead = true;
    }
  },

  computed: {
    hourString() {
      return this.hour < 10 ? "0" + this.hour : "" + this.hour;
    },
    minuteString() {
      return this.minute < 10 ? "0" + this.minute : "" + this.minute;
    },
    secondString() {
      return this.second < 10 ? "0" + this.second : "" + this.second;
    }
  },

  mounted() {
    console.log("mounted: ", this.type);
    if (this.type === 1) {
      //let remainTime = this.dataSource.examDuration * 60;
      let remainTime = 30 * 60;
      console.log("duration: ", this.dataSource.examDuration);
      if (remainTime > 0) {
        this.hour = Math.floor((remainTime / 3600) % 24);
        this.minute = Math.floor((remainTime / 60) % 60);
        this.second = Math.floor(remainTime % 60);
        this.countDowm();
      }
    }

    if (this.type === 2 || this.type === 3) {
      console.log("duration: ", this.dataSource.examDuration);
      this.convertDatas.forEach(t => {
        t.childs.forEach(c => {
          this.answerButtionCheck(c.examineAnswer, t, c);
        });
      });
    }
  },

  methods: {
    /**
     * 按钮点击事件
     */
    btnClick(type) {
      console.log(this.tempDataSource);
      switch (type) {
        //交卷
        case "handPaper":
          //this.$emit('PaperHand',this.tempDataSource)
          //this.$router.push({ path: "/TestResult" });
          this.disabledAnswer = true;
          this.disabledRead = true;
          this.type = 3;
          break;
        //阅卷
        case "readPaper":
          this.$emit("paperRead", this.tempDataSource);
          break;
        //阅卷 上一个
        case "readPaperUpper":
          this.$emit("paperReadUpper");
          break;
        //阅卷 下一个
        case "readPaperNext":
          this.$emit("paperReadNext");
          break;
      }
    },
    /**
     * 锚点定位
     */
    jump(postion) {
      let jump = this.$refs.paperContent.querySelectorAll("#" + postion);
      // 获取需要滚动的距离
      let total = jump[0].offsetTop;
      //实现form锚点定位
      this.$refs.paperContent.scrollTop = jump[0].offsetTop;
    },
    /**
     *对错选择
     */
    isHookButtionCheck(val) {
      if (val.type === 1 || val.type === 2 || val.type === 3) {
        if (val.isHook === 1) {
          val.score = val.totalScore;
        }
        if (val.isHook === 2) {
          val.score = 0;
        }
      }
    },
    /**
     *答题卡选中
     */
    answerButtionCheck(value, parent, child) {
      console.log(value, parent, child);
      let answerId = "answer" + parent.code + child.no;
      let but = this.$refs.paperLeft.querySelectorAll("#" + answerId);
      if (but.length > 0) {
        if (but[0].className.indexOf("answer-button-check") > -1) {
          if (child.examineAnswer && child.examineAnswer.length == 0) {
            but[0].classList.remove("answer-button-check");
          }
        } else {
          if (child.examineAnswer && child.examineAnswer.length > 0) {
            but[0].classList.add("answer-button-check");
          }
        }
      }
    },
    /**
     * 转换答案
     */
    converAnswerStr(answer) {
      if (answer instanceof Array) {
        return answer.join("  ");
      }
      return answer;
    },
    /**
     * 转换数据
     */
    convertData() {
      let sorted = this.groupBy(this.tempDataSource.list, function(item) {
        return [item.type];
      });
      this.convertDatas = [];
      this.answerCardActiveName = [];
      this.orderBy(sorted, "key", "asc");
      sorted.forEach(item => {
        let totalScore = 0;
        item.value.forEach(t => {
          totalScore += t.totalScore;
        });
        switch (item.key) {
          case "[1]":
            this.convertDatas.push({
              name: "单选题",
              code: "Single",
              count: item.value.length,
              totalScore: totalScore,
              childs: item.value
            });
            this.answerCardActiveName.push("Single");
            break;
          case "[2]":
            this.convertDatas.push({
              name: "多选题",
              code: "Multiple",
              count: item.value.length,
              totalScore: totalScore,
              childs: item.value
            });
            this.answerCardActiveName.push("Multiple");
            break;
        }
      });
      console.log(this.convertDatas);
    },
    /**
     * 排序
     * @param {} datas 数组
     * @param {} col 列
     * @param {} type 类型 desc,asc
     * @returns {}
     */
    orderBy(datas, col, type) {
      let m;
      for (let i = 0; i < datas.length; i++) {
        for (let k = 0; k < datas.length; k++) {
          if (type === "asc") {
            if (datas[i][col] < datas[k][col]) {
              m = datas[k];
              datas[k] = datas[i];
              datas[i] = m;
            }
          } else if (type === "desc") {
            if (datas[i][col] > datas[k][col]) {
              m = datas[k];
              datas[k] = datas[i];
              datas[i] = m;
            }
          }
        }
      }
      return datas;
    },
    /**
     * 分组
     * @param array 数据集
     * @param f 函数
     * let sorted = groupBy(list, function(item){ return [item.name];});
     */
    groupBy(array, f) {
      const groups = {};
      const keyValues = [];
      array.forEach(function(o) {
        const group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
      });
      Object.keys(groups).map(function(group) {
        return keyValues.push({ key: group, value: groups[group] });
      });
      return keyValues;
    },
    /**
     * 倒计时
     */
    countDowm() {
      let self = this;
      clearInterval(this.promiseTimer);
      this.promiseTimer = setInterval(function() {
        if (self.hour === 0 && self.minute === 0 && self.second === 0) {
          self.disabledAnswer = true;
        }
        if (self.hour === 0) {
          if (self.minute !== 0 && self.second === 0) {
            self.second = 59;
            self.minute -= 1;
          } else if (self.minute === 0 && self.second === 0) {
            self.second = 0;
            self.$emit("countDowmEnd", true);
            clearInterval(self.promiseTimer);
          } else {
            self.second -= 1;
          }
        } else {
          if (self.minute !== 0 && self.second === 0) {
            self.second = 59;
            self.minute -= 1;
          } else if (self.minute === 0 && self.second === 0) {
            self.hour -= 1;
            self.minute = 59;
            self.second = 59;
          } else {
            self.second -= 1;
          }
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
.paper-main {
  margin: 10px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}

.paper-header {
  width: 100%;
  height: 80px;
  background-color: #f7f7f7;
  position: absolute;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
}

.paper-left {
  position: absolute;
  padding: 10px;
  left: 0;
  top: 80px;
  bottom: 0;
  width: 300px;
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid #e4e4e4;
  border-top: none;
}

.paper-content {
  position: absolute;
  left: 305px;
  top: 60px;
  right: 0px;
  bottom: 45px;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #e4e4e4;
  border-top: none;
}

.paper-footer {
  position: absolute;
  padding: 5px 10px;
  left: 305px;
  right: 0;
  bottom: 0px;
  height: 45px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #f7f7f7;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
}

.paper-title {
  padding-left: 10px;
  width: 100%;
  height: 45px;
  line-height: 45px;
  background: #f7f7f7;
}

.paper-title h1 {
  font-size: 1.2em;
  margin: 0;
}

.downTime {
  color: rgb(230, 93, 110);
  font-size: 16px;
  font-weight: bold;
}
.answer-button {
  padding: 0px;
  color: #0a0a0a;
  background-color: #ffffff;
  border-color: #e4e4e4;
  margin-left: 10px;
  width: 30px;
  height: 30px;
}
.answer-button:hover {
  background: #ecf1ef;
  border-color: #e4e4e4;
  color: #0a0a0a;
}
.answer-button-check {
  background: #13ce66;
  border-color: #30b08f;
}

.answer-radio {
  display: list-item;
  margin: 5px 0px;
}

.answer-checkbox {
  display: list-item;
  margin: 5px 0px;
}

.subject-title {
  padding-left: 10px;
  width: 100%;
  height: 45px;
  line-height: 45px;
  background: #f7f7f7;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
}
.subject-title h2 {
  font-size: 16px;
  display: inline-block;
}
.subject-title span {
  font-size: 16px;
  display: inline-block;
}

.subject-remark {
  background: #f7f7f7;
}
.subject-remark .item {
  display: block;
  padding: 5px;
}
.subject-remark .title {
  font-weight: bold;
}
.el-radio >>> .el-radio__input.is-checked .el-radio__inner {
  background-color: #13ce66;
  border-color: #13ce66;
}

.el-radio-button >>> .el-radio-button__inner {
  padding: 10px;
}

.el-collapse-item h2 {
  width: 150px;
  font-size: 14px;
  display: inline-block;
}
.el-form--label-top >>> .el-form-item__label {
  float: none;
  display: inline-block;
  text-align: left;
  padding: 0px;
}

.el-card {
  margin: 10px;
}

.el-card >>> .el-card__header {
  background-color: #ffffff;
  padding: 0px 10px;
  line-height: 35px;
  font-size: 16px;
}
.el-card >>> .el-card__body {
  padding: 5px 20px;
}
</style>
