<template>
  <el-form
    ref="form"
    :rules="rules"
    >

    <el-form-item label="用户名" prop="name">
      <el-input v-model="form.name" placeholder="tom" />
    </el-form-item>


    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" placeholder="******" />
    </el-form-item>


  </el-form>
</template>

<script>
// TODO 配置webpack alias 引用外部规则
import $rules from '$rules';

/*
const rules = {
  "name": [
    {
      "required": true,
      "message": "必填",
      "trigger": "blur"
    },
    {
      "min": 2,
      "max": 20
    }
  ],
  "password": [
    "$rules.required",
    "$rules.length(2,10)"
  ]
};
*/
const rules = {
  name: [
    {"required":true,"message":"必填","trigger":"blur"},
    {"min":2,"max":20},
  ],
  password: [
    $rules.required,
    $rules.length(2,10),
  ],
};

const defaultForm = {
  "name": "",
  "password": ""
};

export default {
  name: 'user-form',
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
