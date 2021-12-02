<template>
  <div class="box">
    <div class="table-head">
      <div>
        <el-input placeholder="输入姓名进行查询" v-model="username"></el-input>
        <el-button @click="search">搜索</el-button>
      </div>
      <el-button @click="dialogVisible = true">添加用户</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleToDelete(scope.row.id)"
            type="text"
            size="small"
            :loading="loading"
            >删除</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Visible: false,
      loading: false,
      tableData: [],
      username: "",
      userInfo: {
        name: "",
        age: "",
        sex: "",
      },
      dialogVisible: false,
    };
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    handleToAction() {
      this.Visible = true;
    },
    // 搜索用户
    search() {
      let res = this.tableData.findIndex((it) => {
        it.name = this.username;
      });
      console.log(res);
      // (this.tableData = []), this.tableData.push(res);
    },
    // 获取数据
    async getUserData() {
      try {
        let res = await this.$http.get("/user");
        if (res.data.status !== 200) {
          this.$message.error(res.data.errMsg);
        }
        this.tableData = res.data.arr;
        console.log(this.tableData);
      } catch (e) {
        console.log(e);
      }
    },
    // 删除
    async handleToDelete(id) {
      this.loading = true;
      let res = await this.$http.post("/userDel", id);
      if (res.status !== 200) {
        this.$message.error("删除失败");
      }
      this.tableData = res.data.data;
      this.$message.success("删除成功");
      this.loading = false;
    },
  },
};
</script>