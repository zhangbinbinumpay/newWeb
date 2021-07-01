<template>
  <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
	  
	  <router-link :to="{ path: '/SingleNews', query: { userId: 1111}}">
		 <li v-for="helpList in helpLists" class="infinite-list-item">{{helpList.entity.alias}}
		 
		 </li> 
	  </router-link>
   
  </ul>
</template>

<script>
  export default {
	  name: 'helpList',
	  props: ['helpLists'],
    data () {
		return {}
    },
    methods: {
     
    }
  }
</script>