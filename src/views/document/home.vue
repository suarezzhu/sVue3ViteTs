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
          <el-dropdown>
            <el-button type="primary">
              新增
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="addDoc">空白文档</el-dropdown-item>
                <el-dropdown-item @click="addFolder">文件夹</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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
                node-key="id"
                :props="defaultProps"
                @node-expand="unfoldTreeState"
                :default-expanded-keys="defaultExpandKeys"
                @node-collapse="foldTreeState"
                highlight-current
                @node-click="handleNodeClick">
              <template #default="{node,data}">

                <!--             文件名-->
                <el-icon v-if="data.type_id">
                  <el-icon>
                    <ele-Document/>
                  </el-icon>
                </el-icon>
                <!--                文件夹-->
                <el-icon v-else>
                  <ele-Folder/>
                </el-icon>
                <span class="custom-tree-node">
                   <span>{{ node.label }}</span>
                  <el-dropdown>
                  <el-icon @click.stop="handleFolder"><ele-MoreFilled/></el-icon>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item @click="addDoc(data)">新建文件</el-dropdown-item>
                          <el-dropdown-item @click="addFolder(data)">新建文件夹</el-dropdown-item>
                          <el-dropdown-item @click="reName(data)">重命名</el-dropdown-item>
                          <el-dropdown-item @click="deleteDocOrFolder(data)">删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                </el-dropdown>
                </span>
              </template>

            </el-tree>
          </el-card>

        </el-col>

        <el-col :span="4">
          <el-card style="height: 800px;overflow: auto">
            <div @click="openDoc(item)" v-for="(item,index) in docList" class="docItem">

              <span class="docList">
                  <el-icon v-if="item.type_id"><ele-Document/></el-icon>
                  <el-icon v-else><ele-Folder/></el-icon>
                     {{ item.label }}
                  <el-icon @click.self="handleDoc"><ele-MoreFilled/></el-icon>
              </span>

              <div>{{ item.time }}</div>
              <div>{{ item.docSize }}</div>

            </div>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card style="height: 800px">
            <doc-edit
                :html="htmlContent"
            >
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
import {onMounted, reactive, ref,Ref} from "vue";
import {ElMessage} from "element-plus";
import doc from "/@/api/doc";

// import {more}

interface Tree {
  label: string
  children?: Tree[]
}


const defaultProps = {
  children: 'children',
  label: 'label',
}


// 展开的节点key数组
// let defaultExpandKeys1=ref<number[]>([1,3])
let defaultExpandKeys=ref<number[]>([])
// const b = ref<string[]>([]) //可以通过范型显示约束 Ref<string[]>
// const c: Ref<string[]> = ref([]) //声明类型 Ref<string[]>



let docFolder = ref(<Tree><any>[])
let docList = ref(<any>[])
//当前文档内容
let htmlContent = ref("")
//当前处在层级id
let currentFolderId = ref("")
//当前父层级的id
let currentParentFolderId = ref("")
//当前级别是文件夹还是文档列表
let isFolder = ref(true)


const currentDocDetail = {
  name: 'hello',
  content: "<p>hello</p>"
}




// 节点打开状态
const unfoldTreeState =(data:any, node:object, ele:object) =>{
  if (defaultExpandKeys.value.indexOf(data["id"]) === -1) {
    defaultExpandKeys.value.push(data.id)
  }

}

// 节点关闭状态

const foldTreeState= (data:any, node:any, ele:object) =>{

  //节点关闭时,把defaultExpandKeys内对应的id扔出去

  if (defaultExpandKeys.value.indexOf(data.id) !== -1) {

    const index = defaultExpandKeys.value.findIndex(item => {

      return item === data.id

    })

    defaultExpandKeys.value.splice(index, 1)

    // console.log(this.defaultExpandKeys.splice(index, 1), '关闭时候')

  }

}




const handleNodeClick = async (data: any) => {
  currentParentFolderId = data["parent_id"];
  currentFolderId = data.id;
  getDocList(currentFolderId)
}

//根据id获取文档列表
const getDocList=async(id:any)=>{
  const rs = await docApi().getDocListByFolder({id:id})
  docList.value = rs.data as any
}



//获取文件夹层级列表
const getFolderList = async () => {
  const rs = await docApi().getDocFolder()
  docFolder.value = rs.data as any;
}

//点击末端文件夹显示文件列表
const getDocListByFolder = () => {


}
//点击文件显示文件详情
const getDocDetail = () => {


}
const openDoc = async (item: any) => {
  const rs = await docApi().getDocDetail({id: item.id})
  htmlContent.value = rs.data["content"]
}


//处理文件
const handleDoc = () => {


}//处理文件夹
const handleFolder = () => {


}
// 增加文档
const addDoc =async (data: any) => {
  let pId = null
  pId = data ? data.id : currentFolderId;
  let newDoc = {
    name: "未命名文件",
    typeId: pId
  }
  const rs= await docApi().addDoc(newDoc)
  if(rs.code==200){
    ElMessage.success("添加成功")
  }else {
    ElMessage.error("添加失败")
  }
  getFolderList()
  getDocList(currentFolderId)
}

//增加文件夹
const addFolder = async (data:any) => {
  let pId = null
  pId = data ? data.id : currentFolderId;
  let param = {
    label: "未命名文件夹",
    parent_id: pId
  }
  const rs = await docApi().addFolder(param);
  if (rs.code = 200) {
    ElMessage.success("添加成功")
  }
  getFolderList();

}


onMounted(() => {
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
.docList{
  display: flex;
  justify-content: space-between;

}

</style>