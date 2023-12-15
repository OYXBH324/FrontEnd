<template>
  <div>
    <el-row>
      <el-col :span="14">
        <FormList list_type="self"></FormList>
      </el-col>
      <el-col :span="10">
        <FormContent list_type="self"></FormContent>
        <br>
        <el-button v-if="isCheck" @click="performed" type="success">Mark As Finish</el-button>
        <el-button v-if="isCheck" @click="updateForm" type="success">Upgrade</el-button>
        <el-button v-if="isCheck" @click="deleteForm" type="danger">Delete</el-button>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import FormList from "@/views/Components/FormList";
  import FormContent from "@/views/Components/FormContent";
  import {EventBus} from "@/event-bus";

  export default {
    name: "FinishForm",
    components: {FormList, FormContent},
    data() {
      return {
        isCheck:false
      }
    },
    methods: {
      performed() {
        EventBus.$emit("finishForm")
      },
      deleteForm() {
        EventBus.$emit("deleteForm")
      },
      updateForm() {
        EventBus.$emit("updateForm1")
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
