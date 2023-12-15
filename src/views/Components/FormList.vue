<template>
  <div>
    <el-table :data="formList" highlight-current-row @row-click="rowClick" height="550px">
      <el-table-column prop="id" label="id" width="40"></el-table-column>
      <el-table-column prop="title" label="Title"></el-table-column>
      <el-table-column prop="user.email" label="Requester"></el-table-column>
      <el-table-column prop="hod.email" label="Hod"></el-table-column>
      <el-table-column prop="ssdp.work" label="Category"></el-table-column>
      <el-table-column prop="department.departmentName" label="Department"></el-table-column>
      <el-table-column prop="approve" label="ApproveStatus">
        <template #default="scope">
          <div v-if="scope.row.approve==0">UnApproved</div>
          <div v-else-if="scope.row.approve==1">Level 1</div>
          <div v-else-if="scope.row.approve==2">Passed</div>
          <div v-else>Rejected</div>
        </template>
      </el-table-column>
      <el-table-column prop="performed" label="ProcessStatus">
        <template #default="scope">
          <div v-if="scope.row.performed==0">UnPerformed</div>
          <div v-else-if="scope.row.performed==1">Performed</div>
          <div v-else>Unknown</div>
        </template>
      </el-table-column>
      <el-table-column prop="completed" label="Completed">
        <template #default="scope">
          <div v-if="scope.row.completed==0">UnCompleted</div>
          <div v-else-if="scope.row.completed==1">Completed</div>
          <div v-else>Unknown</div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="CreateTime"></el-table-column>
      <el-table-column prop="fileName" label="fileName"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {EventBus} from "@/event-bus";
import {getAllForm, getSelfForms} from "@/api/api"

export default {
  name: "FormList",
  props: ["list_type"],
  data() {
    return {
      formList: [
        {
          id: 1,
          title: "Title",
          content: "asclkvajksdhfkjasd",
          audit: "true", process: true,
          finish: false,
          createTime: "2023-10-06 21:27:18",
          fileName: "",
        }]
    }
  },
  methods: {
    rowClick(row) {
      console.log(row)
      EventBus.$emit("formChange", JSON.stringify(row))
    },
    getFormList() {
      if (this.list_type) {
        console.log(this.list_type)
        let param = {};
        if (this.list_type === "self") {
          param = {page: 1, userId: this.$store.getters.getUserInfo.id}
        }else if(this.list_type === "approve") {
          param = {page:1,approve1:"[1,2]",approve2:"12"}
        }else if(this.list_type ==="performed"){
          param= {page:1,approve:2,performed:0,route:this.$store.getters.getUserInfo.id}
        }
        getSelfForms(param).then(res => {
          this.formList = res.data.records
        })
      } else {
        console.log("1111111111111111111111")
        getAllForm({page: 1}).then(res => {
          this.formList = res.data.records
        })
      }
      return true
    }

  },
  created() {
    console.log("formList")
    this.getFormList();
    //localStorage.removeItem("formInfo")
    EventBus.$on("updateFormList", () => {
      this.getFormList()
    })
  },
  destroyed() {
    console.log("des")
    EventBus.$off()
  }
}
</script>

<style scoped>

</style>
