/**
 * @name: index
 * @author: suarezzhu
 * @date: 2023/2/4 14:40
 * @description：index
 * @update: 2023/2/4 14:40
 */
import request from "/@/utils/request";
import {ResultData} from "/@/model";

const docApi=()=>{
    return{

        getDocFolder:(params?:Object)=>{
            return request<ResultData<any>>({
                url: '/sua/suaDoc/getFolder',
                method: 'get',
                params,
                
            })
        },

        getDocListByFolder:(params?:Object)=>{
            return request<ResultData<any>>({
                url: '/sua/suaDoc/getDocListByFolder',
                method: 'get',
                params,

            })
        },

        getDocDetail:(params?:Object)=>{
            return request<ResultData<any>>({
                url: '/sua/suaDoc/getDocDetail',
                method: 'get',
                params,

            })
        },
        editDoc:(data?:Object)=>{
            return request <ResultData<any>>({
                url: '/sua/suaDoc/editDoc',
                method: 'post',
                data,
            })
        },

        addDoc:(data?:Object)=>{
            return request <ResultData<any>>({
                url: '/sua/suaDoc/addDoc',
                method: 'post',
                data,
            })
        },

        delDoc:(data?:Object)=>{
            return request <ResultData<any>>({
                url: '/sua/suaDoc/deleteDoc',
                method: 'delete',
                data,
            })
        },

        deleteFolder:(data?:Object)=>{
            return request <ResultData<any>>({
                url: '/sua/suaDoc/deleteFolder',
                method: 'delete',
                data,
            })
        },
        addFolder:(data?:Object)=>{
            return request <ResultData<any>>({
                url: '/sua/suaDoc/addFolder',
                method: 'post',
                data,
            })
        },
        
        
    }
}

export default docApi