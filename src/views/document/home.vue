/**
* @name: home
* @author: suarezzhu
* @date: 2023/2/3 14:33
* @description：home
* @update: 2023/2/3 14:33
*/

<template>
  <div class="system-menu-container layout-pd">
    <el-card style="height: 900px;" shadow="hover">
      <el-form inline>
        <el-form-item>
          <el-button @click="addDoc" type="primary">新建</el-button>
        </el-form-item>
        <el-form-item label="名称">
          <el-input clearable></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success">查询</el-button>
        </el-form-item>
      </el-form>

      <el-row :gutter="1">
        <el-col style="height: 800px;" :span="4">
          <el-card>
            <el-tree
                :data="docFolder"
                :props="defaultProps"
                @node-click="handleNodeClick">
            <template #default="{node,data}">
              <el-icon><ele-Folder /></el-icon>
                 <span class="custom-tree-node">
                   <span>{{ node.label }}</span>
                   <el-icon @click.self="handleFolder"><ele-MoreFilled /></el-icon>
                 </span>
            </template>
            </el-tree>
          </el-card>

        </el-col>

        <el-col :span="4">
          <el-card style="height: 800px;overflow: auto">
            <div v-for="(item,index) in docList" class="docItem">
              {{ item.name }}
              <dic>{{ item.time }} {{ item.docSize }}</dic>
              <el-icon @click.self="handleDoc"><ele-MoreFilled /></el-icon>
            </div>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card style="height: 800px">
            <doc-edit>
            </doc-edit>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>

</template>

<script lang="ts" setup>
import docEdit from './components/edit.vue'
import docApi from "/@/api/doc";
import {onMounted, reactive, ref} from "vue";

// import {more}

interface Tree {
  label: string
  children?: Tree[]
}



const defaultProps = {
  children: 'children',
  label: 'label',
}




// let docFolder =ref()
let docFolder =ref(<Tree><any>[])
let docList = ref([])


const currentDocDetail={
  name:'hello',
  content:"<p>hello</p>"
}

const handleNodeClick = async (data:any) => {
  if(!data.children){
    const rs=await docApi().getDocListByFolder({id:data.id})
    docList.value=rs.data as any
  }
}

//获取文件夹层级列表
const getFolderList= async ()=>{
  const rs=await  docApi().getDocFolder()
  docFolder.value=rs.data as any;
}

//点击末端文件夹显示文件列表
const getDocListByFolder=()=>{


}
//点击文件显示文件详情
const getDocDetail=()=>{


}//处理文件
const handleDoc=()=>{


}//处理文件夹
const handleFolder=()=>{


}

onMounted(()=>{
  getFolderList()
})

</script>


<style scope lang="scss" scoped>

:deep(.el-form .el-form-item:last-of-type) {
  margin-bottom: 20px !important;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

</style>