<template>
 <div>
 我是儿子：{{message}}
 <br>
 爸爸给我的礼物：{{toSonData}}
 <br>
 <button class="btn btn-danger" @click="toFatherData">给爸爸传值</button>
 </div>
</template>
 
<script>
export default {
 // props:["toSonData"],//第一种方式
 props:{//第二种方式
 toSonData:{
  type:String,
  default:function(){
  return ""
  }
 }
 },
 data () {
 return {
  message : "爸爸你好"
 };
 },
 methods:{
 toFatherData(){
  this.$emit("toFatherData","给爸爸的爱")
 }
 }
}
 
</script>
<style lang='scss' scoped>
</style>