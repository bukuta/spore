由schema生成sql表

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

生成建表sql
```sql
create table `user` if not exists(
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增Id',
  `name` char(10) defult '' comment '用户名',
  `password` char(10) defult '' comment '密码',
  PRIMARY KEY (`id`)
)  ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='资源';
```

```javascript
let data = {
  table: {
    name: 'User',
    description: '用户',
    primaryKey: 'id',
  },
  fields: [
    {
      name: 'id',
      type: 'bigint',
      [length: 20,]
      [default: '',]
      [nullable: false,]
      [autoIncrement: true,]
      [comment: '自增ID',]
    }
  ],
}
```

```ejs
create table `<%=table.name%>` if not exists(
<%for(var i=0;i<fields.length;i++){ var field = fields[i];%>
  `<%=field.name%>` <%=field.type%><%=field.length?'('+fields.length+')':''%> <%=field.default? 'DEFAULT '+field.default:(field.nullable?'DEFAULT NULL':'NOT NULL')%> <%=fields.autoIncrement?'AUTO_INCREMENT'%> COMMENT '<%=fields.comment%>',
<%}%>
  PRIMARY KEY (`<%=table.primaryKey%>`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='<%=table.description%>';
```
