<template>
  <div class="list-admins">
    <el-form :model="searchForm" :inline="true"  class="search-form-inline">
      <el-form-item label="状态">
        <el-select v-model="searchForm.status" placeholder="状态"/>
          <el-option label="0" value="0"></el-option>
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="名字">
        <el-input v-model="searchForm.name" placeholder="名字"/>
      </el-form-item>
      <el-form-item label="性别">
       <el-switch v-model="searchForm.online"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="_handleSearchSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-table
        :data="items"
        >
        <el-table-column
          type="selection"
          width="55"
          >
        </el-table-column>
        <el-table-column
          type="index"
          width="55"
          >
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          >
        </el-table-column>
        <el-table-column
          prop="name"
          label="名字"
          >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          >
        </el-table-column>
        <el-table-column
          prop="updateAt"
          label="更新时间"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button>其他</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        :layout="pagination.layout"
        :page-sizes="pagination.pageSizes"
        :page-size="panigation.pageSize"
        @size-change="_handleSizeChange"
        @current-change="_handleCurrentChange"
        :current-page.sync="pagination.currentPage"
        :total="pagination.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import BaseCollection from '$models/collection';
import { MessageBox } from 'element-ui';
import {Detail} from './detail';
export default {
  name: "admins_list",
  data(){
    return {
      searchForm:{
        status:'',
        name:'',
        online:'',
      },
      pagination:{
        currentPage:1,
        layout: "total, prev, pager, next",
        total: 0,
        pageSizes: [10,20,30,40],
        pageSize: 10,
      },
      status: {
        fetch:'init',  // init, fetching, fetched, failed
        update: 'init', // init, updateing, updated, failed
        create: 'init', // init, creating, created, failed
        destory: 'init', // init, destorying, destoryed, failed
      },
      error: { fetch:null, updte:null, create:null, destory:null, },
      errorMessage: { fetch:'', update:'', create:'', destory:'', },
    };
  },
  computed:{
    items(){
      return [];
    },
  },
  mounted(){
    this.collection = new BaseCollection({url: "/admins"});
  },
  methods:{
    fetchItems(){
      this.status.fetch = "fetching";
      this.collection.fetch().then(rs=>{
        this.status.fetch = 'fetched';
        this.error.fetch=null;
        this.errorMessage.fetch='';
      },err=>{
        this.status.fetch = 'failed'
        this.error.fetch = err;
        this.errorMessage.fetch = err.message;
      });
    },
    _handleSearchSubmit(){
      let data = JSON.parse(JSON.stringify(this.searchForm));
      this.collection.setParams(data);
      this.fetchItems();
    },
    _onCreate(data){
      this.status.create = 'creating'
      this.collection.create(data).then(rs=>{
        this.status.create = 'created';
        this.error.create = null;
        this.errorMessage.create = '';
      },err=>{
        this.status.create = 'failed'
        this.error.create = err;
        this.errorMessage.create = err.message;
      });
    },
    _onDelete(item){
      let id = item.id;
      MessageBos({
        title: '警告',
        message: '确定要删除此管理员吗',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            this.collection.select(id).destory().then(rs=>{
              instance.confirmButtonLoading = false;
              this.$message({
                type: 'success',
                message: '删除成功',
              });
              done();
            },err=>{
              this.$message({
                type: 'error',
                message: '删除失败',
              });
              instance.confirmButtonLoading = false;
              done();
            });
          } else {
            done();
          }
        },
      }).then(rs=>{
      },err=>{
      });
    },
    _onShowDetail(item){
      let routeFun = function route(item) {
        return {
          name: 'adminDetail',
          params: {
            adminId: item.id,
          },
        };
      };
      let route = routeFun.call(this,item);
      this.$router.push(route);
    },
    _handleSizeChange(newSize){
      this.collection.pageSize = newSize;
      this.fetchItems();
    },
    _handleCurrentChange(newPage){
      this.collection.page = newPage;
      this.fetchItems();
    },
  },
};
</script>
<style lang="less">
.list-admins{
  .search-form-inline{
  }
}
</style>