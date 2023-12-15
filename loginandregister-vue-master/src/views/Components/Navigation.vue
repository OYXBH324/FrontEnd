<template>
    <el-menu
        router
        default-active="5"
        class="el-menu-vertical-demo"
        >
      <el-menu-item v-for="menu in menuList" :key="menu.id" :index="menu.id" :route="menu.url">
        <span slot="title">{{menu.name}}</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
import {EventBus} from "@/event-bus";
import {getUserPages} from "@/api/api";

export default {
  name: "Navigation",
  data(){
    return{
      isCollapse: true,
      menuList:[
      ],
      dashBoardData: {
        id: 10,
        name: "DashBoard",
        url: "/dashboard",
        desc: "echart",
        order: 10
      },
    }
  },
  created() {
    console.log("navi初始化")
    EventBus.$on("getPages",()=>{
      //console.log({email:this.$store.getters.getUserInfo.email})
      getUserPages({email:this.$store.getters.getUserInfo.email}).then(res=>{
        console.log("menuelist")
        this.menuList = res.data
        if(this.$store.getters.getUserInfo.email == "manager@outlook.com"){
          this.menuList.push(this.dashBoardData)
        }
      })
    })
  },
  destroyed() {
    EventBus.$off("getPages")
  }
}
</script>

<style scoped>

</style>
