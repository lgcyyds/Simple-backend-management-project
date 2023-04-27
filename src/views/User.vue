<template>
  <div class="userManage">
    <el-dialog :title="modalType == '0' ? '新增用户' : '编辑用户'" :visible.sync="dialogVisible" width="55%"
      :before-close="resetForm">
      <el-form ref="form" :model="form" label-width="80px" :inline=true :rules="rules">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format='yyyy-MM-dd'>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm()">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </span>
    </el-dialog>
    <div class="userButton1">
      <el-button type="primary" size="mini" @click="handleAdd">+新增</el-button>
      <div class="userButton2">
        <el-input class="searchInput" v-model="pageData.name" placeholder="请输入名称" size="mini"></el-input>
        <el-button type="primary" size="mini" @click="getList()">搜索</el-button>
      </div>
    </div>
    <div class="userTable">
      <el-table stripe :data="tableData" style="width: 100%" height="100%">
        <el-table-column prop="name" label="姓名" width="100px">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="100px">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.sex === 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期" width="150px">
        </el-table-column>
        <el-table-column prop="addr" label="地址" width="">
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class='pagination'>
        <el-pagination background layout="prev, pager, next" :total='total' @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserList, deleteUser, updateUser, createUser } from "../api";
export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '年龄不能为空' , trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值' , trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        birth: [
          { type: 'string', required: true, message: '请选择时间', trigger: 'blur' }
        ],
        addr: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
      },
      modalType: 0,
      total: 0,
      pageData: {
        name: '',
        page: 1,
        limit: 7
      },
    }

  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modalType == 0) {
            createUser(this.form).then(() => {
              this.getList()
            })
          } else {
            updateUser(this.form).then(() => {
              this.getList()
            })
          }
          this.resetForm()
        } else {
          return false;
        }

      });

    },
    resetForm() {
      this.$refs.form.resetFields();
      this.dialogVisible = false
      this.form = {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: ''
      }
    },
    handleEdit(row) {
      this.modalType = 1
      this.dialogVisible = true
      this.form = { ...row }
    },
    getList() {
      getUserList({ params: this.pageData }).then((data) => {
        this.tableData = data.data.list
        this.total = data.data.count || 0

      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ id: row.id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'

          });
          this.getList()
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    handleAdd() {
      this.dialogVisible = true
      this.modalType = 0
    },
    handlePage(val) {
      // console.log(val);
      this.pageData.page = val
      this.getList();
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.userButton1 {
  display: flex;
  justify-content: space-between;
  height: 27px;
  padding-bottom: 10px;

  .userButton2 {
    display: flex;
    float: right;

    .searchInput {
      padding-right: 10px;
    }
  }

}

.userManage {
  height: 488px;

  .userTable {
    height: 430px;

    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>