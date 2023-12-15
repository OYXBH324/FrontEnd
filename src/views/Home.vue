<template>
  <div>
    <FormList></FormList>
    <div style="display: flex;margin-bottom: 10px;font-size: 18px;color: #808080;">
      <div style="margin-right: 20px;font-family: sans-serif;">Total Requests: {{s.total}}</div>
      <div style="margin-right: 20px">On-time Completion: {{s.within}}</div>
      <div>Delayed Completion: {{s.later}}</div>
    </div>
  </div>
</template>

<script>
import FormList from "@/views/Components/FormList";
import {formStatic, getUserInfo} from "@/api/api";
import {Auth} from "aws-amplify";
import jwt_decode from "jwt-decode";
export default {
  components:{FormList},
  data(){
    return{
      s:{}
    }
  },
  methods:{
    initUserInfo() {
      Auth.currentSession().then(res=>{
        console.log("currentSessuion",res)
        this.$store.commit('setTokens',res)
        setTimeout(()=>{getUserInfo(res.idToken.jwtToken).then(user=>{
          console.log("user.Data",user.data);
          this.$store.commit('setUserInfo',user.data)
          ;
        })},2000)
        console.log("currentSession end")
        this.flag = true
        console.log(jwt_decode(res.idToken.jwtToken))}
      );
      console.log("OK")
    }
  }
  ,
  mounted() {
    console.log("home")
    formStatic().then(res=>{
      console.log("home data")
      this.s = res.data
    })
    this.initUserInfo()
  },

}
</script>
<style scoped>

</style>
