<template>
  <div style="margin-left: 20px;margin-top: 20px">

    <label for="" style="margin-right: 10px">Requester</label>
    <el-input v-model="form.email" style="width:300px;margin-right: 10px" disabled></el-input>
    <label for="" style="margin-right: 10px">ReferenceNum</label>
    <el-input v-model="form.userId" style="width:300px;margin-right: 10px" disabled></el-input>
    <label for="" style="margin-right: 10px">HOD</label>
    <el-input v-model="form.hodName" style="width:300px;margin-right: 10px" disabled></el-input>
    <br><br>
    <label for="" style="margin-right: 10px">Category</label>
    <el-select v-model="form.ssdpId" placeholder="Please select" style="margin-right: 10px">
      <el-option v-for="item in ssdps" :key="item.id" :value="item.id" :label="item.work"></el-option>
    </el-select>
    <label for="" style="margin-right: 10px">Type</label>
    <el-select v-model="form.type" placeholder="Please select" style="margin-right: 10px">
      <el-option v-for="item in types" :key="item.id" :value="item.id" :label="item.label"></el-option>
    </el-select>
    <br>
    <br><label for="" style="margin-bottom: 10px">Title</label>
    <el-input v-model="form.title"></el-input>
    <label for="">Content</label>
    <el-input v-model="form.content" type="textarea" rows="5"></el-input>
    <br><br>
    <el-date-picker v-model="form.targetTime" type="date" placeholder="Expected Date">
    </el-date-picker>
    <br><br>
    <el-upload :action="base + '/form/upload'" :headers="{
      token: $store.getters.getTokens.idToken.jwtToken
    }" :on-success="onSuccess" :limit="1" :file-list="fileList">
      <el-button size="small" type="primary">Attach Document</el-button>
    </el-upload>

    <el-button style="margin-top: 20px;" type="primary" @click="addForm">Submit</el-button>
  </div>
</template>

<script>
import { addForm, getHOD, getSSDPs } from "@/api/api";
import Env from '@/api/env'
export default {
  name: "CreateForm",
  data() {
    return {
      base: Env.baseURL,
      fileList: [],
      res: { "asd": "sd" },
      defaultExpectedDateOffset: {
        Normal: 5, // 默认偏移天数为5天
        Urgent: 3, // 默认偏移天数为3天
      },
      form: {
        title: null,
        hodName: "",
        hodId: null,
        content: null,
        targetTime: null,
        userId: this.$store.getters.getUserInfo.id,
        email: this.$store.getters.getUserInfo.email,
        ssdpId: null,
        type: null,
        departmentId: this.$store.getters.getUserInfo.department.id,
        fileName: null
      },
      hod: {

      },
      ssdps: [],//存储的是后勤部门 也是资产类型,
      types: [{ id: 1, label: "Normal" }, { id: 2, label: "Urgent" }]
    }
  },

  watch: {
    'form.type': function () {
      this.updateDefaultExpectedDate();
    },
  },

  methods: {
    onSuccess(res) {
      console.log(res)
      if (res.code === 20000) {
        this.form.fileName = res.msg
      }
    },
    updateDefaultExpectedDate() {
      // 根据选择的Type计算Expected Date的默认值
      const type = this.form.type;
      let offset = 0;
      if (type === 1) {
        offset = 5;
      } else if (type === 2) {
        offset = 3;
      }
      console.log('Offset:', offset);
      console.log('type:', type);
      const currentDate = new Date();
      console.log('currentDate1:', currentDate);
      currentDate.setDate(currentDate.getDate() + offset);
      console.log('currentDate2:', currentDate);
      this.form.targetTime = currentDate;
      console.log('form.targetTime:', this.form.targetTime);

      return currentDate;
    },
    addForm() {
      addForm(this.form).then((res) => {
        this.$message.success("Add Successfully")
        console.log(this.$store.getters.getUserInfo.id)
        this.form = {
          title: null,
          content: null,
          targetTime: null,
          userId: this.$store.getters.getUserInfo.id
        }
      })
    },
    getHOD() {
      console.log("form", this.res);
      getHOD({ departmentId: this.$store.getters.getUserInfo.department.id }).then(res => {
        this.hod = res.data
        this.form.hodName = this.hod.email
        this.form.hodId = this.hod.id
      })
    },
    getSsdp() {
      console.log("Perform SSDP");
      getSSDPs().then(res => {
        this.ssdps = res.data
        console.log(this.ssdps);
      })
    }
  },

  mounted() {
    this.getHOD();
    this.getSsdp();
  }
}
</script>

<style scoped></style>
