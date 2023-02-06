/**
* @name: edit&addSIte
* @author: suarezzhu
* @date: 2023/1/29 17:03
* @description：edit&addSIte
* @update: 2023/1/29 17:03
*/

<template>
 <el-form :model="form" label-width="120px">
   <el-form-item label="名称">
     <el-input v-model="form.name"></el-input>
   </el-form-item>
   <el-form-item label="链接">
     <el-input v-model="form.url"></el-input>
   </el-form-item>
   <el-form-item label="标签">
     <el-tag
        v-for="tag in dynamicTags"
        :key="tag"
        class="mx-1"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
     >
       {{tag}}
     </el-tag>
     <el-input
         v-if="inputVisible"
         ref="InputRef"
         v-model="inputValue"
         class="ml-1 w-20"
         size="small"
         @keyup.enter="handleInputConfirm"
         @blur="handleInputConfirm"
     />
     <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
       + 添加标签
     </el-button>
   </el-form-item>

   <el-form-item label="类型">
     <el-select  v-model="form.typeId">
       <el-option
       v-for="item in data.typeOptions"
       :key="item.value"
       :label="item.key"
       :value="item.value"
       >
       </el-option>
     </el-select>
   </el-form-item>

   <el-form-item label="备注">
     <el-input v-model="form.note"></el-input>
   </el-form-item>
   <el-form-item>
     <el-button @click="submit" type="primary">
       确定
     </el-button>
   </el-form-item>

 </el-form>

</template>

<script lang="ts" setup name="editSite">


import {onMounted, reactive,ref,nextTick,defineEmits,defineProps,watch} from "vue";
import {sysApi} from "/@/api/sys";
import site from "/@/api/site";
import {ElInput, ElMessage} from "element-plus";
import {inc} from "nprogress";
import emitter from "/@/utils/mitt";



const emit=defineEmits(['close'])
const props = defineProps({
  form: {
    type:Object,
    default:()=>null
  },
  dicts:{
    type:Array,
    default:()=>[]
  }
});
const inputValue = ref('')
let dynamicTags = ref(<any>[])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

let data=reactive(
    {
      typeOptions:{}
    }
)

let form=reactive({
  id:null,
  name:'',
  url:'',
  typeId:'',
  tag:'',
  note:''
})



//-----------------------
onMounted(
    ()=>{


    }
)
watch(
    ()=>props.form,
    (nv,ov)=>{
      console.log(nv,'nv123')
        if(nv){
          if(nv.tag){
            dynamicTags.value=nv.tag.split(',')
          }
          Object.assign(form,nv)
        }
    }
)

watch(
    ()=>props.dicts,
    (nv,ov)=>{
      if(nv){
        console.log(nv,'222')
        data.typeOptions=nv["lxOptions"]
      }
    }
)



const submit=async()=>{
  form.tag=dynamicTags.value.join(',')
  let api=form.id?site().edit(form):site().add(form)
  const rs= await api
  if(rs.code==200){
    ElMessage.success("success")
  }else {
    ElMessage.error("failed")
  }
  emit('close');
}


//标签操作---------------------------------

const handleClose = (tag: any) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

</script>

<style scoped>

</style>