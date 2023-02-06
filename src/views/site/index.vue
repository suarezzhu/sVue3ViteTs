/**
* @name: index
* @author: suarezzhu
* @date: 2023/1/29 17:03
* @description：index
* @update: 2023/1/29 17:03
*/

<template>
  <div class="system-menu-container layout-pd">
    <el-card style="height: 800px;" shadow="hover">

      <el-form :model="form" label-width="120" :inline="true" class="demo-form-inline">

        <el-form-item label="名称" label-width="120">
          <el-input clearable v-model="form.name">
          </el-input>
        </el-form-item>
        <el-form-item label="标签" label-width="120">
          <el-input clearable v-model="form.tag">
          </el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="120">
          <el-select clearable v-model="form.typeId">
            <el-option
               v-for="(item,index) in data.lxOptions"
               :label="item.key"
               :value="item.value"
            >
            </el-option>

          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="add()">添加</el-button>
        </el-form-item>



      </el-form>
      <!--    表格-->
      <el-table
          stripe
          border
          style="width: 100%;"
          :data="data.tableData"
      >
        <el-table-column
            prop="name"
            label="名称"
        />
        <el-table-column
            prop="url"
            label="链接"
            show-overflow-tooltip
        >
          <!--          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"-->
          <template #default="scope">
            <el-link type="primary" target="_blank" :href="scope.row.url">{{ scope.row.url }}</el-link>

          </template>

        </el-table-column>
        <el-table-column
            prop="tag"
            label="标签"
        />
        <el-table-column
            prop="typeId"
            label="类型"
        />
        <el-table-column
            prop="note"
            label="备注"
        />
        <el-table-column fixed="right" label="Operations" width="120">
          <template  #default="{row}">
            <el-button link type="primary" size="small" @click="edit(row)">修改</el-button>
            <el-button link type="danger" size="small" @click="del(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          style="margin-top: 20px"
          background small layout="prev, pager, next"
          @current-change="changePage"
          :total="data.total"/>

    </el-card>

    <!--    add dialog-->
    <el-dialog
        @close="closeDialog"
        v-model="data.editVisible"
        title="编辑"
        width="40%"
    >
      <edit-site
          v-if="data.editVisible"
          @close="data.editVisible=false"
          :form="data.form"
          :dicts="data.dicts"
      />
    </el-dialog>

  </div>


</template>

<script lang="ts" setup name="site">

import {onMounted, reactive} from "vue";
import EditSite from "/@/views/site/components/editSite.vue";
import siteApi from "/@/api/site";
import {ElMessage} from "element-plus";
import {number} from "echarts";
import {sysApi} from "/@/api/sys";

const formInline = reactive({
  user: '',
  region: '',
})

const onSubmit = () => {
  console.log('submit!')
}


// 搜索表单
const form = reactive({
  name: '',
  typeId: '',
  tag: '',
  pageSize: 15,
  pageNum: 1
});
//显示表格
const data = reactive(
    {
      dicts:{},
      lxOptions:[],
      form:Object,
      editVisible:false,
      tableData: <any>[],
      total: 100,
      currentpage: 1
    },
)

const search = async () => {
  const rs = await siteApi().list(form)
  if (rs.code = 200) {
    data.tableData = rs.data["records"]
    data.total = rs.data["total"]
  } else {
    ElMessage.error("获取失败")
  }

}

const add=()=>{
  data.editVisible=true

}
const edit = async(row:any) => {
  data.editVisible=true
  const rs=await siteApi().detail({id:row.id})
  data.form=rs.data[0]
}

const del= async(row:any)=>{
  const rs=await siteApi().del({id:row.id});
  if(rs.code==200){
    ElMessage.success("删除成功")
  }else {
    ElMessage.error("删除失败")
  }
  search()
}



const changePage = (number: any) => {
  form.pageNum = number
  search()
}


const closeDialog=()=>{
  search()
}

// init dict
const initDict= async()=>{
  const rs =await sysApi().getDictList({type:"WZLX"})
  if(rs.code==200){
    data.lxOptions=rs.data as any
  }

  data.dicts["lxOptions"]=data.lxOptions
}




onMounted(
    () => {
      search()
      initDict()
    }
)


</script>

<style scope lang="scss" scoped>

 :deep(.el-form .el-form-item:last-of-type) {
  margin-bottom: 20px !important;
}

</style>