<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h2>{{user}}</h2>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {getUser} from '../api/userApi'
import axios from 'axios'

export default {
  name: 'HomeView',
  data: () => ({
    user: {
      id: '',
      password: ''
    },
  }),
  created() {
    this.test()
  },
  components: {
    HelloWorld
  },
  methods: {
    test(){
      console.log("test");
      getUser().then((result) => {
        this.user = result.data[0];
        console.log(result);
      }).catch((error) => {
        console.log(error);
      })
      // axios.get('http://localhost:3000/api/user/getUser').then((result)=>{
      //   console.log(result);
      //   this.user = result.data[0];
      // }).catch(()=>{
      //   console.log("no");
      // })
    },
    
  }
}
</script>
