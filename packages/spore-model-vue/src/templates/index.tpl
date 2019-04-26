import {mapEntity, mapProperty, notBlank, required, length} from '$yard';
//

@mapEntity
class <%=modelName%> {
<%for(let [name,item] of Object.entries(schema.properties)){%>
  //
  <%if(item.required){%>
  //@notBlank(message = "内容不能为空")<%}%>
  <%if(item.length){%>
  //@length(max = <%=item.length%>, message = "内容长度不能超过<%=item.length%>个字符")<%}%>
  <%if(item.aliasFor){%>
  @mapProperty("<%=item.aliasFor%>")<%}%>
  <%=name%>;
<%}%>
}

export default <%=modelName%>;

