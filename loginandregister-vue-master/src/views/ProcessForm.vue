<template>
  <div>
    <el-row>
      <el-col :span="14">
        <FormList list_type="performed"></FormList>
      </el-col>
      <el-col :span="10">
        <FormContent list_type="performed"></FormContent>
        <br><br>
        <el-button v-if="isCheck" type="success" @click="performed">Mark as Process</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FormList from "@/views/Components/FormList";
import FormContent from "@/views/Components/FormContent";
import {EventBus} from "@/event-bus";
export default {
  name: "ProcessForm",
  components:{FormList,FormContent},
  data() {
    return {
      isCheck:false
    }
  },
  methods:{
    performed() {
      EventBus.$emit("processForm")
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
