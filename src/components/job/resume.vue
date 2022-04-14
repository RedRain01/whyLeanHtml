<template>
  <div class="pageBody">
    <div class="positionBar">
      <span class="fontFamily sdh-icon-dingwei"></span>&nbsp;&nbsp;当前位置 > 简介
    </div>
    <div class="searchBar">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="介绍">
          <el-input type="textarea" v-model="form.note1" rows="13"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="优缺点">
          <el-input type="textarea" v-model="form.note2" rows="14"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="爱好">
          <el-input type="textarea" v-model="form.note3" rows="15"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        note1:
          "\n你好，我是红雨，我的全名叫汪宏宇。简写是why，我的github上whyLearnFlink是汪宏宇学习flink工程的意思，不是为什么要学习flink。我家在贵州贵阳，大学在湖南工学院读的软件工程专业，现在居住在深圳的宝安区。\n" +
          "我的性格：\n" +
          "我感觉自己是性格较好，我认为正确是一件很重要的事，因为正确的事，我可以诚恳道歉，可以认真学习，可以放下面子请教，可以付出其他值得的代价。因为去做正确的事本身是一件正确的事。\n" +
          "我认为合理是很重要的事，脱离了一个合适的度，即使是正确的事，也会膨胀扭曲得让人害怕。有时候正确的并不只有你，还有别人。应该尽可能的找到矛盾的本质，再去解决和接受。合理的让\n步是正确的，合理的放松是正确的，合理舍弃利益也是正确的，人最本质的利益是生命，但有时候为了意义，使用部分生命也是合理的。活着本来也是一件损耗生命的事。\n",

        note2:
          "\n我的缺点：\n" +
          "我有不少缺点。我自己比较明显感受到的缺点有。\n" +
          "     没有达到目标：我认为我很多事做得不够好，我学习过口琴，吉他，二胡。但都没有实质的进步，只有口琴勉强算入门，其他的基本和小白无异，二胡我至今连一首小星星都拉不出来，当然二胡入门的确比较难。\n我还买过滑板，非常专业的大型健身器材。但滑板只玩过几次，健身器材用得最多的是用来晒衣服。在买每一个东西的时候，我都想得比较美，但很多时候我没有做到。再回过头看我学习的java语言，我使用了很多年了，\n但我的确没有彻底的已经了解它了。如果我足够认真的话，我应该告诉别人我精通java，我应该研究了它的底层，我应该成为一个大牛，应该有一些有趣的产出。这是我对自己的不满意\n" +
          "粗心：当然我并没有因为粗心犯过什么大事，甚至是生活中被朋友认为很多事太细节。但在以往的开发中我常常在送测的项目里有一些小问题，比如说我为了找到一些前端页面对某些地方进行标注，对后台日志进行\n详细的参数打印，但在送测时会忘记取消这些注释。类似这样的小bug会让我觉得自己不够细心。当然我参与的项目里我的bug数量是在项目组里是正常的，而且我与测试关系都很好，可能因为我是温柔负责帅气的小锅锅。\n\n" +
          "我的优点：\n" +
          "      我觉得喜爱技术是一个优点，愿意为正确的事努力，愿意为正确的事承担结果，是一个优点。珍惜时间追寻意义也是一个优点。爱生活爱自己爱别人也是一个优点。\n",
        note3:
          "\n我的爱好：\n\n" +
          "喜欢的电视剧：请回答1988，搞笑一家人，沉默的真相\n" +
          "喜欢的电影：横道世之介，超脱，无人知晓，海街日记\n" +
          "喜欢的动漫：死神，火影，致不灭的你，第一季东京食尸鬼，超能力女儿\n" +
          "喜欢的歌曲：陈奕迅的，李宗盛的，德永英明的，这世界这么多人\n" +
          "喜欢的游戏：偶尔英雄联盟\n" +
          "喜爱的书籍：文学，哲学，悬疑推理\n"
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="scss" scoped>
.pageBody {
  font: 14px Helvetica Neue, Helvetica, PingFang SC, \5fae\8f6f\96c5\9ed1,
    Tahoma, Arial, sans-serif;
}

.positionBar {
  margin-top: 3px;
  height: 45px;
  line-height: 45px;
  padding-left: 20px;
  background-color: #fff;
}

.titleSlot {
  margin: 10px 20px;
}

.searchBar {
  margin: 0 20px;
  background-color: #fff;
  padding: 15px 10px;
}

.typeSelector {
  margin-left: 35px;
}

.dataBar {
  margin: 20px 20px 0 20px;
  background-color: #fff;
  padding: 15px 10px;
}

.el-table thead tr th {
  /* 表头颜色 */
  background-color: rgb(168, 168, 168);
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
