由schema生成vue/element-ui 表单

```yaml
User:
  type: object
  description: 用户
  properties:
    id:
      type: integer
      description: 自增ID
      x-mock: '@integer(0)'

    name:
      description: 用户名
      type: string
      x-mock: '@string(2,10)'
    password:
      description: 密码
      type: string
      x-mock: '@string(2,10)'
```

```javascript
let data = {
}
```

