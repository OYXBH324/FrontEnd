<template>
  <div>
    <el-row>
      <el-col :span="14">
        <FormList list_type="approve"></FormList>
      </el-col>
      <el-col :span="10">
        <FormContent list_type="approve"></FormContent>
        <br>
        <el-button v-if="isCheck" type="success" @click="approve">Pass</el-button>
        <el-button v-if="isCheck" type="danger" @click="reject">Reject</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FormList from "@/views/Components/FormList";
import FormContent from "@/views/Components/FormContent";
import {EventBus} from "@/event-bus";

export default {
  name: "AuditForm",
  components: {FormList,FormContent},
  data() {
    return {
      isCheck:false
    }
  },
  methods:{
    approve(){
      this.sendApprove(true)
    },
    reject(){
      this.sendApprove(false)
    },
    sendApprove(res){
      EventBus.$emit("auditForm",JSON.stringify({res:res}))
    }
  },mounted(){
  EventBus.$on("formChange", (data) => {
    this.isCheck = true;
  })
}
}
</script>

<style scoped>

</style>
