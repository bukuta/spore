<template>
  <el-form
    ref="form"
    :rules="rules"
    >
    <% for(var name of Object.keys(schema.properties)){
    let property = schema.properties[name];

    if( property['enum'] && property['x-enum'] ){%>
    <el-form-item label="<%=property.description%>" prop="<%=name%>">
      <el-select v-model="form.<%=name%>" placeholder="<%=property.description%>"><%for(let item of property['x-enum']){%>
        <el-option <%=property.type!='string'?':':''%>value="<%=item.value%>" label="<%=item.label%>"/><%}%>
      </el-select>
    </el-form-item>
    <%}else{%>
    <el-form-item label="<%=property.description%>" prop="<%=name%>">
      <el-input v-model="form.<%=name%>" placeholder="<%=property.placeholder||property.description%>" />
    </el-form-item>
    <%}%>
    <%}%>
  </el-form>
</template>

<script>
// TODO 配置webpack alias 引用外部规则
import $rules from '$rules';

/*
const rules = <%=JSON.stringify(rules,0,2)%>;
*/
const rules = { <%for(let [name,rs] of Object.entries(rules)){%>
  <%=name%>: [ <%for(var item of rs){%>
    <%=typeof(item)=='object'?JSON.stringify(item):item%>, <%}%>
  ], <%}%>
};

const defaultForm = <%=JSON.stringify(boneData,0,2)%>;

export default {
  name: '<%=_.lowerCase(modelName)%>-form',
  props:{
    detail:{
      type: Object,
      default(){
        return {...defaultForm};
      },
    }
  },

  data(){
    let form = {...defaultForm, ...this.detail};

    return {
      form,
      rules,
    };
  },

  computed:{
  },

  watch:{
    detail(){
      this.form = {...this.form,...this.detail};
    },
  },

  methods:{
    getValue(){
      return {...this.form};
    },

    validate(){
      return this.$refs.form.validate();
    },
    resetFields(){
      return this.$refs.form.resetFields();
    },

  },
};
</script>
