<template>
  <div>
    <br>
    <label for="">Requester</label>
    <el-input v-model="form.user.email" disabled></el-input>
    <br>
    <label for="">ReferenceNum</label>
    <el-input v-model="form.user.id" disabled></el-input>
    <br>
    <label for="">HOD</label>
    <el-input v-model="form.hodName" disabled></el-input>
    <label for="">Current Route</label>
    <el-input v-model="form.routeUser.email" disabled></el-input>
    <br>
    <label for="">Department</label>
    <el-input v-model="form.department.departmentName" disabled></el-input>
    <br>
    <label for="" style="margin-top: 10px">Title</label>
    <el-input v-model="form.title" :disabled="editable === false"></el-input>
    <label for="">Content</label>
    <el-input v-model="form.content" :disabled="editable === false" type="textarea" :rows="4"></el-input>
    <label for="">Remark</label>
    <el-input v-model="form.feedback" :disabled="editable === true" type="textarea" :rows="4"></el-input>
    <div>CreateTime：{{ form.createTime }}</div>

    <label for="">Category</label>
    <el-select v-model="form.ssdp.id" :disabled="editable === false">
      <el-option v-for="item in ssdps" :key="item.id" :value="item.id" :label="item.work"></el-option>
    </el-select>
    <br>
    <label for="">Type</label>
    <el-select v-model="form.type" :disabled="editable === false">
      <el-option v-for="item in types" :key="item.id" :value="item.id" :label="item.label"></el-option>
    </el-select>
    <br><br>
    <div v-if="list_type === 'approve' && form.approve === 1">
      <label for="">Staff</label>
      <el-select v-model="form.route" default-first-option>
        <el-option v-for="item in staffList" :key="item.email" :label="item.email" :value="item.id"></el-option>
      </el-select>
    </div>
    <div>File: {{ form.fileName }} <el-button @click="download(form.fileName)">DownLoad</el-button></div>


  </div>
</template>

<script>
  import { EventBus } from "@/event-bus";
  import { approve, performed, reject, completed, getAllStaff, deleteForm, updateForm, getSSDPs, download } from "@/api/api";

  export default {
    name: "FormContent",
    props: ['list_type'],
    data() {
      return {
        form: {},
        staffList: {},
        editable: false,
        ssdps: [],
        types: [{ id: 1, label: "Normal" }, { id: 2, label: "Urgent" }]
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
      },
      base64ToFile(fileByte, fileName) {
        // 下载文件
        var bstr = atob(fileByte);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        let blob = new Blob([u8arr], {
          type: ""
        });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
          let downloadElement = document.createElement("a");
          let href = window.URL.createObjectURL(blob);
          downloadElement.href = href;
          downloadElement.download = fileName;
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(href);
        }
      },
      download(fileName) {

        let data = { "fileName": fileName };
        download(data).then((res) => {
          console.log(res);
          this.base64ToFile(res.msg, fileName)
        })
      },
      updateFormList() {
        EventBus.$emit("updateFormList", {})
      },
      initStaffList() {
        getAllStaff().then(res => {
          this.staffList = res.data
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
      this.getSsdp()
      this.initStaffList();
      if (this.list_type === "self") {
        this.editable = true
      }
      EventBus.$on("formChange", (data) => {
        this.form = JSON.parse(data)
        this.form.route = this.staffList[0].id
      })
      EventBus.$on("auditForm", (data) => {
        var parse = JSON.parse(data);
        if (this.form.id) {
          if (parse.res) {
            this.form.approve = this.form.approve + 1
            approve(this.form).then(() => {
              this.form = {}
              this.$message.success("Approve Successfully")
              this.updateFormList()
            })
          } else {
            reject(this.form).then(() => {
              this.form = {}
              this.$message.warning("Reject Successfully")
              this.updateFormList()
            })
          }
        }
      })

      EventBus.$on("processForm", () => {
        console.log("processForm")
        if (this.form.id) {
          performed(this.form).then(() => {
            this.form = {}
            this.$message.success("Perform Successful")
            this.updateFormList()
          })
        }
      })
      EventBus.$on("finishForm", () => {
        if (this.form.performed === 1) {
          console.log("finishForm")
          if (this.form.id) {
            completed(this.form).then(() => {
              this.form = {}
              this.$message.success("Completed Successful")
              this.updateFormList()
            })
          }
        } else {
          this.$message.error("Form need to be Performed!")
        }
      })
      EventBus.$on("deleteForm", () => {
        console.log("delete")
        if (this.form.id) {
          deleteForm(this.form).then(() => {
            this.form = {}
            this.$message.success("Delete Successfully")
            this.updateFormList()
          })
        }
      })
      //console.log("updateFomr1")
      EventBus.$on("updateForm1", () => {
        //console.log("update")
        if (this.form.id) {
          //console.log("update")
          updateForm(this.form).then(() => {
            this.$message.success("Update Successfully")
            this.updateFormList()
          })
        }
      })
    },
    destroyed() {
      EventBus.$off()
    }
  }
</script>

<style scoped></style>
