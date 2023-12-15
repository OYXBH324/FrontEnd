<template>
  <div>
    <template>
<!--      <div id="google_btn"></div>-->

<!--      <el-button @click="loginGoogle">asdasd</el-button>-->
      <amplify-authenticator style="margin:0;padding:0;height: 100vh;border: none">
        <el-row>
          <nav class="flex items-center justify-between bg-pink lg:px-3 shadow border-solid"
               style="margin-bottom: -16px;">
					<span class="font-semibold text-xl tracking-tight">
						<a href="/"><img src="./logo.png"
                             style="width: 250px; text-align:left; padding-left:10px; padding-top:20px;" /></a>
					</span>
          </nav>
        </el-row>
        <el-row>
          <nav class="bg-black">
            <div class="ck_title_cont float_left" style="color:white;font-size: 30px;text-align: left;display: inline-block;">
              Ditech Request Portal
            </div>
            <div style="display: inline-block; float:right">
              <div style="display: inline-block;margin-right: 20px;color:white;font-size: 21px;margin-top: 5px">
                Email:{{this.$store.getters.getUserInfo.email}}
              </div>
              <div style="display: inline-block; float:right">
                <amplify-sign-out></amplify-sign-out>
              </div>
            </div>
          </nav>
        </el-row>
        <el-row style="display: flex">
          <el-col :span="3"> <Navigation v-if="flag"></Navigation></el-col>
          <el-col :span="21"><router-view v-if="flag"/></el-col>
        </el-row>
      </amplify-authenticator>
    </template>
  </div>
</template>
<script>
//import gapi from 'gapi-client';
import jwt_decode from "jwt-decode";
import {getUserInfo} from "@/api/api";
import {Amplify, Auth, Hub} from "aws-amplify";
import Navigation from "@/views/Components/Navigation";
import {EventBus} from "@/event-bus";
//import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
export default {
  components:{Navigation},
  computed:{
    role(){
      if(this.$store.getters.getUserInfo.role){
        return this.$store.getters.getUserInfo.role.name
      }else{
        return "Unknow"
      }
    },
  },
  data() {
    return {
      googleSignInParams: {
        client_id: "374981876730-upksmv66t08onukfno6folg3e7ihh7o7.apps.googleusercontent.com"
      },
      profile: null,
      error: null,
      flag:false,
    }
  },
  methods: {
    initUserInfo(){
      Auth.currentSession().then(res=>{
        this.$store.commit('setTokens',res)
        //this.$router.push("/index")
        getUserInfo(res.idToken.jwtToken).then(user=>{
          console.log("user.Data",user.data);
          this.$store.commit('setUserInfo',user.data)
          setTimeout(()=>{EventBus.$emit("getPages")},500)
          ;
        })
        setTimeout(()=>{getUserInfo(res.idToken.jwtToken).then(user=>{
          console.log("user.Data",user.data);
          this.$store.commit('setUserInfo',user.data)
          ;
        })},2000)
        console.log("currentSession end")
        this.flag = true
        console.log(jwt_decode(res.idToken.jwtToken))}
      );
    }
  },
  created() {
    console.log("app create")
    this.initUserInfo();
    Hub.listen("auth",async ()=>{
      this.initUserInfo();
    })
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

#{
  margin:0;
  padding:0;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.bg-pink {
  --tw-bg-opacity: 1;
  background-image: url(header_bg.jpg);
  height: 130px;
  background-repeat: no-repeat;
}
.bg-black {
  --tw-bg-opacity: 1;
  background-image: url(header_bg2.jpg);
  height: 35px;
}
.text-gray-100 {
  --tw-text-opacity: 1;
  color: rgba(243, 244, 246, var(--tw-text-opacity));
}

</style>
