drop table `<%=table.name%>` if exists;
create table `<%=table.name%>`(
<%for(var i=0; i<fields.length; i++){ var field = fields[i]; %>
  `<%=field.name%>` <%=field.type%><%=field.length?'('+field.length+')':''%> <%=field.hasOwnProperty('default')? 'DEFAULT '+field.default:(field.nullable?'DEFAULT NULL':'NOT NULL')%> <%=field.autoIncrement?'AUTO_INCREMENT':''%> COMMENT '<%=field.comment%>',
<%}%>
  PRIMARY KEY (`<%=table.primaryKey%>`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='<%=table.description%>';
