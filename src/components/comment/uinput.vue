<template>
  <div>
    <div
      v-if="!onlyInput && type !== 'textarea'"
      class="input-view"
      :class="labelPosition === 'top' ? '' : 'flex_y_center'"
    >
      <p
        :class="
          labelPosition === 'right'
            ? 'txt-r'
            : labelPosition === 'left'
            ? 'txt-l'
            : labelPosition === 'center'
            ? 'txt-c'
            : labelPosition === 'top'
            ? 'txt-top'
            : ''
        "
      >
        {{ label }}
      </p>
      <div :class="labelPosition === 'top' ? 'w-100' : ''">
        <div style="display: flex;flex-direction: row">
          <input
            v-if="type !== 'tel' && type !== 'msgcode' && inputBorder === 'all'"
            :style="inputStyle"
            @focus="getFocus"
            @input="input"
            v-model="data"
            :name="name"
            class="standard"
            :type="type === ('text' || 'email') ? 'text' : type || 'text'"
            :disabled="disabled"
            :placeholder="placeholder"
            @blur="input_blur"
            :maxlength="
              type === 'idcard'
                ? '18'
                : type === 'password'
                ? '16'
                : type === 'bankcard'
                ? '19'
                : maxlength
            "
            :class="
              error && mustFill ? 'error' : error === false ? 'success' : ''
            "
          />
          <input
            v-if="type === 'tel' && inputBorder === 'all'"
            :style="{ inputStyle }"
            @focus="getFocus"
            @input="input"
            v-model="data"
            :name="name"
            class="standard"
            type="number"
            :disabled="disabled"
            :placeholder="placeholder"
            @blur="input_blur"
            maxlength="11"
            :class="
              error && mustFill ? 'error' : error === false ? 'success' : ''
            "
          />

          <div v-if="inputBorder === 'bottom'" class="rel">
            <input
              v-if="
                type !== 'tel' && type !== 'msgcode' && inputBorder === 'bottom'
              "
              :style="inputStyle"
              @focus="getFocus"
              @input="input"
              v-model="data"
              :name="name"
              class="standard-bottom"
              :type="type === ('text' || 'email') ? 'text' : type || 'text'"
              :disabled="disabled"
              :placeholder="placeholder"
              @blur="input_blur"
              :maxlength="
                type === 'idcard'
                  ? '18'
                  : type === 'password'
                  ? '16'
                  : type === 'bankcard'
                  ? '19'
                  : maxlength
              "
              :class="
                error && mustFill
                  ? 'standard-bottom-error'
                  : error === false
                  ? 'standard-bottom-success'
                  : ''
              "
            />

            <input
              v-if="type === 'tel' && inputBorder === 'bottom'"
              :style="inputStyle"
              @focus="getFocus"
              @input="input"
              v-model="data"
              :name="name"
              class="standard-bottom"
              type="number"
              :disabled="disabled"
              :placeholder="placeholder"
              @blur="input_blur"
              maxlength="11"
              :class="
                error && mustFill
                  ? 'standard-bottom-error'
                  : error === false
                  ? 'standard-bottom-success'
                  : ''
              "
            />
            <label
              class="standard-bottom-line"
              :class="
                borderAnimation === 'left'
                  ? 'ani-left'
                  : borderAnimation === 'center'
                  ? 'ani-center'
                  : borderAnimation === 'right'
                  ? 'ani-right'
                  : ''
              "
            ></label>
          </div>

          <div
            v-if="type === 'msgcode' && inputBorder === 'all'"
            class="msgcode flex_y_center"
          >
            <input
              @input="input"
              @focus="getFocus"
              :name="name"
              class="standard"
              type="number"
              :disabled="disabled"
              :placeholder="placeholder"
              @blur="input_blur"
              maxlength="6"
              :class="
                error && mustFill ? 'error' : error === false ? 'success' : ''
              "
            />
            <p @click="getCode" :class="interval ? 'disabled' : ''">
              {{ codetext }}
            </p>
          </div>
          <p v-if="type === 'label'" class="default_label">
            {{ defaultValue }}
          </p>
          <div v-if="!disabledClear" style="">
            <div v-if="isClear" class="clear-style" @click="clearInputValue">
              <img
                style="width: 16px;height: 16px"
                src="../../assets/images/close-circle@2x.png"
              />
            </div>
          </div>
        </div>
        <div class="error-tip" v-show="error && mustFill">{{ tipMsg }}</div>
      </div>
    </div>
    <!-- 单input -->
    <div v-if="onlyInput && type !== 'textarea'">
      <input
        v-if="type !== 'tel' && type !== 'msgcode' && inputBorder === 'all'"
        :style="inputStyle"
        @blur="input_blur"
        @focus="getFocus"
        @input="input"
        :name="name"
        v-model="data"
        :disabled="disabled"
        :type="type === ('text' || 'email') ? 'text' : type || 'text'"
        class="standard"
        :placeholder="placeholder"
        :maxlength="
          type === 'idcard'
            ? '18'
            : type === 'password'
            ? '16'
            : type == 'bankcard'
            ? '19'
            : maxlength
        "
        :class="error && mustFill ? 'error' : error == false ? 'success' : ''"
      />
      <input
        v-if="type === 'tel' && inputBorder == 'all'"
        :style="inputStyle"
        @focus="getFocus"
        @blur="input_blur"
        @input="input"
        :name="name"
        v-model="data"
        :disabled="disabled"
        :type="type == ('text' || 'email') ? 'text' : type || 'text'"
        class="standard"
        :placeholder="placeholder"
        maxlength="11"
        :class="error && mustFill ? 'error' : error == false ? 'success' : ''"
      />

      <div v-if="inputBorder === 'bottom'" class="rel">
        <input
          v-if="type != 'tel' && type != 'msgcode' && inputBorder == 'bottom'"
          :style="inputStyle"
          @focus="getFocus"
          @input="input"
          v-model="data"
          :name="name"
          class="standard-bottom"
          :type="type == ('text' || 'email') ? 'text' : type || 'text'"
          :disabled="disabled"
          :placeholder="placeholder"
          @blur="input_blur"
          :maxlength="
            type == 'idcard'
              ? '18'
              : type == 'password'
              ? '16'
              : type == 'bankcard'
              ? '19'
              : maxlength
          "
          :class="
            error && mustFill
              ? 'standard-bottom-error'
              : error == false
              ? 'standard-bottom-success'
              : ''
          "
        />

        <input
          v-if="type == 'tel' && inputBorder == 'bottom'"
          :style="inputStyle"
          @focus="getFocus"
          @input="input"
          v-model="data"
          :name="name"
          class="standard-bottom"
          type="number"
          :disabled="disabled"
          :placeholder="placeholder"
          @blur="input_blur"
          maxlength="11"
          :class="
            error && mustFill
              ? 'standard-bottom-error'
              : error == false
              ? 'standard-bottom-success'
              : ''
          "
        />
        <label
          class="standard-bottom-line"
          :class="
            borderAnimation == 'left'
              ? 'ani-left'
              : borderAnimation == 'center'
              ? 'ani-center'
              : borderAnimation == 'right'
              ? 'ani-right'
              : ''
          "
        ></label>
      </div>

      <div
        v-if="type === 'msgcode' && inputBorder === 'all'"
        class="msgcode flex_y_center"
      >
        <input
          @focus="getFocus"
          @input="input"
          :name="name"
          class="standard"
          type="number"
          :disabled="disabled"
          :placeholder="placeholder"
          @blur="input_blur"
          maxlength="6"
          :class="
            error && mustFill ? 'error' : error === false ? 'success' : ''
          "
        />
        <text @click="getCode" :class="interval ? 'disabled' : ''">{{
          codetext
        }}</text>
      </div>
      <div class="error-tip" v-show="error && mustFill">{{ tipMsg }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'uInput',
  props: {
    name: {
      String,
    },
    onlyInput: {
      type: Boolean,
      default: false,
    },
    inputBorder: {
      //输入框边线 默认全边线 可选参数 bottom | all | none
      type: String,
      default: 'all',
    },
    inputStyle: {
      type: String,
    },
    borderAnimation: {
      //输入框边线 入场动画 可选参数 left | center | right | none
      type: String,
      default: 'left',
    },
    mustFill: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '输入框',
    },
    labelPosition: {
      type: String,
      default: 'right',
    },
    placeholder: {
      type: String,
      default: null,
    },
    maxlength: {
      type: Number,
      default: 70,
    },
    value: {
      default: '',
    },
    codeText: {
      type: String,
      default: '点击发送验证码',
    },
    countDown: {
      type: Number,
      default: 60,
    },
    send: {
      type: Boolean,
      default: false,
    },
    tlposition: {
      type: String,
      default: 'top',
    },
    height: {
      type: String,
      default: '',
    },
    defaultValue: {
      type: String,
    },
    disabledClear: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mobile: /^(13[0-9]|14[4579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[189])\d{8}$/,
      email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      identity_card: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/,
      tipMsg: '',
      error: null,
      data: this.value,
      codetext: this.codeText,
      currCountDown: this.countDown,
      interval: false,
      isClear: false,
    }
  },
  created() {
    if (this.value) {
      this.data = this.value
    }
    if (this.codeText) {
      this.codetext = this.codeText
    }
    if (this.countDown) {
      this.currCountDown = this.countDown
    }
  },
  watch: {
    value(newV, oldV) {
      this.data = newV
    },
  },
  methods: {
    input_blur(e) {
      if (this.mustFill) {
        if (e.detail.value || e.currentTarget.value) {
          this.error = false
          let input = e.detail.value || e.currentTarget.value
          if (this.type === 'tel') {
            if (!this.mobile.test(input)) {
              this.tipMsg = '手机号格式不正确'
              this.error = true
            } else {
              this.error = false
            }
          }
          if (this.type === 'email') {
            if (!this.email.test(input)) {
              this.tipMsg = '邮箱格式不正确'
              this.error = true
            } else {
              this.error = false
            }
          }

          if (this.type === 'idcard') {
            if (!this.identity_card.test(input)) {
              this.tipMsg = '身份证格式不正确'
              this.error = true
            } else {
              this.error = false
            }
          }

          if (this.type === 'bankcard') {
            if (input.length < 16 || input.length > 19) {
              this.tipMsg = '输入的卡号有误'
              this.error = true
            } else {
              this.error = false
            }
          }
        } else {
          this.tipMsg = this.placeholder || ''
          this.error = true
        }
        this.$emit('getValue', {
          el: e,
          value: e.detail.value || e.currentTarget.value,
          status: !this.error,
        })
      } else {
        this.$emit('getValue', {
          el: e,
          value: e.detail.value || e.currentTarget.value,
        })
      }
    },
    input(e) {
      this.$emit('input', e.target.value)
      this.isClear = this.isShowClear(e)
    },
    getFocus(e) {
      this.$emit('focus', {
        el: e,
        value: e.target.value,
      })
    },
    getCode() {
      if (this.send) {
        if (this.currCountDown === this.countDown && this.interval === false) {
          this.interval = true
          this.countDownFun()
          this.$emit('counting', null)
        }
      }
    },
    countDownFun() {
      const _this = this
      let timer = setInterval(function() {
        if (_this.currCountDown <= 0) {
          _this.codetext = _this.codeText
          _this.currCountDown = _this.countDown
          _this.interval = false
          clearInterval(timer)
          return
        } else {
          _this.interval = true
          _this.codetext = '重新获取(' + _this.currCountDown + ')'
          _this.currCountDown--
        }
      }, 1000)
    },
    isShowClear(e) {
      let input = e.detail.value || e.currentTarget.value

      return input.length !== 0
    },
    clearInputValue() {
      this.isClear = false
      this.data = ''
      this.$emit('inputclear', { clear: '' })
    },
  },
}
</script>

<style scoped>
.input-view {
  width: 98%;
  /*margin: 50px auto;*/
  box-sizing: border-box;
  height: 100%;
}

.input-view > text {
  display: block;
  width: 25%;
  font-size: 11px;
  color: #505050;
  margin-right: 21.7391px;
}

.input-view > div {
  width: 71%;
}

.input-view > div > div {
  margin-top: 2.1739px;
  margin-left: 0;
}

.standard {
  border: 1px solid #c0c0c0;
  width: 100%;
  padding: 0 10px;
  height: 18px;
  border-radius: 2px;
  transition: all 0.3s;
  /*line-height: 70px;*/
  color: #707070;
  font-size: 6px;
  box-sizing: border-box;
}

.standard:hover,
.standard:focus {
  border: 1px solid #747474;
}

.txt-r {
  text-align: right;
  width: 45px;
  padding-right: 8px;
  font-size: 8px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #004f63;
  line-height: 11px;
}

.txt-l {
  text-align: left;
  color: #0a5669;
  font-size: 10px;
  width: 60px;
}

.txt-c {
  text-align: center;
}

.txt-top {
  width: 100% !important;
  margin-bottom: 6.5217px;
}

.error {
  border: 1px solid #ad1212 !important;
}

.success {
  border: 2.1739px solid #008000 !important;
}

.standard-bottom {
  border: none;
  /* border-bottom: 1px solid #c0c0c0; */
  width: 100%;
  padding: 0 10px 0 1px;
  /*font-size: 28px;*/
  height: 30px;
  transition: all 0.5s;
  line-height: 70px;
  color: #707070;
  box-sizing: border-box;
  position: relative;
}

.standard-bottom-line {
  position: absolute;

  height: 1px;
  bottom: 0;
  width: 100%;
  background-color: #c0c0c0;
}

.ani-left {
  left: 0%;
  animation: left 1.5s;
}

.ani-center {
  left: 0%;
  animation: center 1.5s;
}

.ani-right {
  right: 0%;
  animation: left 1.5s;
}

@keyframes left {
  0% {
    background-color: #c0c0c0;
    width: 0;
  }

  100% {
    background-color: #747474;
    width: 100%;
  }
}

@keyframes center {
  0% {
    background-color: #c0c0c0;
    width: 0;
    left: 50%;
  }

  100% {
    background-color: #747474;
    width: 100%;
    left: 0%;
  }
}

.standard-bottom-error {
  border-bottom: 1px solid #ad1212 !important;
}

.standard-bottom-success {
  border-bottom: 1px solid #008000 !important;
}

.error-tip {
  font-size: 6px;
  color: #de0000;
  text-align: right;
  height: 18px;
  position: absolute;
  /*position: absolute;*/
}

:focus {
  outline: none;
}

.text {
  min-height: 150px;
  line-height: 43.4782px;
  padding: 10.8695px 21.7391px;
  overflow: hidden;
}

.msgcode {
  position: relative;
  width: 100%;
}

.msgcode > input {
  /*padding-right: 173.913px;*/
}

.msgcode > p {
  font-size: 6px;
  position: absolute;
  right: 5px;
  color: #14aeab;
  border-left: 1px solid #ececec;
  padding-left: 21.7391px;
}

.disabled {
  color: #c1c1c1 !important;
}

.btn {
  font-size: 30.4347px;
  width: 100%;
  background-color: #dfdfdf;
  color: #3b3c3e;
}

.btn:hover {
  opacity: 0.7;
}

.rel {
  position: relative;
}

.w-100 {
  width: 100% !important;
}

.flex {
  /* 转为弹性盒模型*/
  display: flex;
}

.flex_bet {
  /* 两端左右*/
  display: flex;
  justify-content: space-between;
}

.flex_wrap {
  /* 转为弹性盒模型并自动换行*/
  display: flex;
  flex-wrap: wrap;
}

.flex_inline {
  /* 转为行内弹性盒模型*/
  display: inline-flex;
}

.flex_y_start {
  /* 垂直顶部对齐*/
  display: flex;
  align-items: flex-start;
}

.flex_x_center {
  /* x轴对齐*/
  display: flex;
  justify-content: center;
}

.flex_y_center {
  /* y轴对齐*/
  display: flex;
  align-items: center;
}

.flex_y_end {
  /* 垂直底部对齐*/
  display: flex;
  align-items: flex-end;
}

/*
* 完全居中
*/
.flex_xy_center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex_tb {
  /* 垂直两端对齐*/
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.flex_tb_c {
  /* 多行垂直两端对齐，水平居中*/
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.flex_line_xy_center {
  /* 多行垂直居中，水平居中*/
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.flex_line_y_center {
  /* 多行垂直居中，*/
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.flex_line_end {
  /* 多行垂直起点在下沿*/
  display: flex;
  flex-direction: column-reverse;
}
.clear-style {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 30px;
  margin-left: -30px;
}
.default_label {
  padding-left: 15px;
  font-size: 8px;
}

.sendcode_label {
  /*font-size: 8px;*/
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #14aeab;
  line-height: 9px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
