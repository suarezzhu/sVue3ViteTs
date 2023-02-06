
import request from "/@/utils/request";
import {ResultData} from "/@/model";


const siteApi=()=>{
    return{
        add:(data?:Object)=>{
            return request<ResultData<any>>({
                url: '/sua/suaSite/addSite',
                method: 'post',
                data,
            });
        },
        del:(params?:Object)=>{
            return request<ResultData<any>>({
                url: '/sua/suaSite/delSite',
                method: 'delete',
                params,
            });
        },
        edit:(data?:Object)=>{
            return request<ResultData<any>>({
                url: '/sua/suaSite/editSite',
                method: 'put',
                data,
            });
        },

        detail:(params?:Object)=>{
           return request({
               url:'/sua/suaSite/getSiteDetail',
               method:'get',
               params
           })
        },
        list:(data?:Object)=>{
            return request<ResultData<any>>({
                url: '/sua/suaSite/getSiteList',
                method: 'post',
                data,
            });
        }

    }


}
export  default siteApi