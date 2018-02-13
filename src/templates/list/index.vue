<template>
  <div class="list-<%=name%>">
    <%if(searchForm){%>
    <el-form :model="searchForm" :inline="true"  class="search-form-inline">
      <%for(let formItem of searchForm){%>
      <el-form-item label="<%=formItem.label%>">
        <%if(formItem.type=='select'){%>
        <el-select v-model="searchForm.<%=formItem.name%>" placeholder="<%=formItem.placeholder||formItem.label%>"/>
        <%for(let option of model.properties[formItem.name].enum){%>
          <el-option label="<%=option%>" value="<%=option%>"></el-option>
         <%}%>
         </el-select>
       <%}else if(formItem.type=='switch'){%>
       <el-switch v-model="searchForm.<%=formItem.name%>"></el-switch>
       <%}else if(formItem.type=='text'){%>
        <el-input v-model="searchForm.<%=formItem.name%>" placeholder="<%=formItem.placeholder||formItem.label%>"/>
        <%}%>
      </el-form-item>
      <%}%>
      <el-form-item>
        <el-button type="primary" @click="_handleSearchSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <%}%>
    <div>
      <el-table
        :data="items"
        >
        <%if(shape&&Array.isArray(shape)){%>
        <% for(let shapeItem of shape){%>
        <el-table-column
          <%if(shapeItem.type){%>
          type="<%=shapeItem.type%>"
          width="55"
          <%}%>
          <%if(shapeItem.name){%>
          prop="<%=shapeItem.name%>"
          label="<%=shapeItem.label||model.properties[shapeItem.name].description||shapeItem.name%>"
          <%}else if(shapeItem.label){%>
          label="<%=shapeItem.label%>"
          <%}%>
          >
          <%if(!(shapeItem.name||shapeItem.type)){%>
          <template slot-scope="scope">
            <el-button>其他</el-button>
          </template>
          <%}%>
        </el-table-column>
        <%}%>
        <%}else{%>
        <%for(let [key,def] of Object.entries(model.properties) ){%>
        <el-table-column
          prop="<%=key%>"
          label="<%=def.description||key%>"
          >
        </el-table-column>
        <%}%>
        <%}%>
      </el-table>
    </div>
    <div>
      <%if(pagination){%>
      <el-pagination
        :layout="pagination.layout"
        :page-sizes="pagination.pageSizes"
        :page-size="panigation.pageSize"
        @size-change="_handleSizeChange"
        @current-change="_handleCurrentChange"
        :current-page.sync="pagination.currentPage"
        :total="pagination.total">
      </el-pagination>
      <%}%>
    </div>
  </div>
</template>
<script>
import BaseCollection from '$models/collection';
import { MessageBox } from 'element-ui';

export default {
  name: "<%=name%>_list",

  data(){
    return {
      <%if(searchForm){%>
      searchForm:{
      <%for(let searchItem of searchForm){%>
        <%=searchItem.name%>:'',
      <%}%>
      },
      <%}%>
      <%if(pagination){%>
      pagination:{
        currentPage:1,
        layout: "<%=pagination&&pagination.layout|| "sizes, prev, pager, next"%>",
        total: 0,
        pageSizes: <%=pagination&&pagination.pageSizes&&JSON.stringify(pagination.pageSizes)||[10,20,50]%>,
        pageSize: <%=pagination&&pagination.pageSize||10%>,
      },
      <%}%>
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
    this.collection = new BaseCollection({url: "<%=path%>"});
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
    onCreate(data){
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
    onDelete(item){
      let id = item.id;
      MessageBos({
        title: '警告',
        message: '确定要删除此<%=model.description%>吗',
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
.list-<%=name%>{
  .search-form-inline{
  }
}
</style>
