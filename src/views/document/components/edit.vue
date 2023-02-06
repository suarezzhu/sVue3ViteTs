<template>
  <div class="editor-container layout-pd">
    <el-card shadow="hover">
      <template #header>
        <el-input placeholder="请输入文章标题" v-model="docForm.title"></el-input>
      </template>

      <Editor
          v-model:get-html="state.editor.htmlVal"
          v-model:get-text="state.editor.textVal"
          :disable="state.editor.disable"
      />
      <el-button @click="saveDoc" type="primary">保存</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="docWangEditor">
import {defineAsyncComponent, markRaw, reactive} from 'vue';
import docApi from "/@/api/doc";

// 引入组件
const Editor = defineAsyncComponent(() => import('/@/components/editor/index.vue'));

// 定义变量内容
const state = reactive({
  editor: {
    htmlVal:'',
    textVal: '',
    disable: false,
  },
});
const docForm=reactive({
  title:'',
  content:'',
})





//保存文件内容
const saveDoc=async()=>{

  const form={
    content:state.editor.htmlVal,
    name:docForm.title,
    tag:'',
    typeId:''
  }
  const rs=await docApi().addDoc(docForm)
  console.log(state.editor.htmlVal,'123')
  console.log(state.editor.textVal,'123')
}













</script>
