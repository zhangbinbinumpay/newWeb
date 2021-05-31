<template>
  <div
    class="progress"
    :style="{
      borderRadius: brdRs + 'px',
    }"
  >
    <div
      class="progress-bar"
      :class="{
        'progress-bar-striped': showStriped,
        'progress-bar-active': showAct,
      }"
      :style="{
        width: processDept + '%',
        backgroundColor: bgColor,
        color: txtColor,
      }"
    ></div>
    <img
      :style="{
        width: '1.2em',
        position: 'absolute',
        marginTop: '-0.3em',
        left: processDept > 0 ? processDept * 0.7 + 22 + '%' : '6em',
      }"
      src="../../assets/images/ellipse.png"
    />
    <span
      :style="{
        left: processDept > 0 ? processDept * 0.7 + 15 + '%' : '6.875em',
        visibility: processDept < 100 ? 'visible' : 'hidden',
      }"
      :class="{ showTxt: 'hidden-txt' }"
      class="progress-bar-span"
      >{{ txt }}</span
    >
  </div>
</template>

<script>
/**
 * 判断传入的字符串是否为一个颜色
 * @param str {String} 颜色
 * @returns {boolean} 结果
 */
export function testColor(str) {
  const reg = new RegExp('^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$')
  return reg.test(str)
}

export default {
  name: 'myProcess',
  props: {
    // 背景颜色
    bgColor: {
      type: String,
      validator: (value) => {
        return testColor(value)
      },
      default: '#337ab7',
    },
    // 文本颜色
    txtColor: {
      type: String,
      validator: (value) => {
        return testColor(value)
      },
      default: '#fff',
    },
    showTxt: Boolean, //是否展示文本
    showStriped: Boolean, // 是否需要斑马纹
    showAct: Boolean, // 是否运动
    // 圆角大小
    brdRs: {
      type: Number,
      validator: (value) => {
        return value >= 0 && value <= 20
      },
      default: 4,
    },
    txt: String, // 文本内容
    // 进度条的深度
    processDept: {
      type: Number,
      validator: (value) => value >= 0 && value <= 100,
      default: 30,
    },
    // 进度条的高度
    pcsHeight: {
      type: Number,
      default: 10,
    },
  },
}
</script>

<style lang="scss" scoped>
.progress {
  height: 10px;
  overflow: hidden;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  background: linear-gradient(#ffe7e3, #fa9e99);

  &-bar {
    background-image: url('../../assets/images/ver_line.png');
    float: left;
    width: 0;
    height: 100%;
    font-size: 14px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    background-color: #337ab7;
    -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
    -webkit-transition: width 0.6s ease;
    -o-transition: width 0.6s ease;
    transition: width 0.6s ease;
    display: flex;
    justify-content: right;
    align-items: center;

    &-span {
      text-align: right;
      color: #004f63;
      position: absolute;
      margin-top: -20px;
      font-size: 12px;
      margin-left: 26px;
    }

    &-striped {
      background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
      background-image: -o-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
      -webkit-background-size: 10px 10px;
      background-size: 10px 10px;
    }

    &-active {
      -webkit-animation: progress-bar-stripes 2s linear infinite;
      -o-animation: progress-bar-stripes 2s linear infinite;
      animation: progress-bar-stripes 2s linear infinite;
    }

    .hidden-txt {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
  }
}

// WebKit
@-webkit-keyframes progress-bar-stripes {
  from {
    background-position: -40px 0;
  }
  to {
    background-position: 0 0;
  }
}
</style>
