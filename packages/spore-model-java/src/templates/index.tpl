package <%=package%>;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;


@Data
@Entity
@Table(name = "<%=table.name%>")
public class <%=modelName%> {
<%for(let [name,item] of Object.entries(schema.properties)){%>
  <%if(item.primaryKey){%>@Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) <%}%>
  <%if(item.required){%>
  @NotBlank(message = "内容不能为空")<%}%>
  <%if(item.length){%>
  @Length(max = 128, message = "内容长度不能超过128个字符")<%}%>
  <%if(item.aliasFor){%>
  @JsonProperty("<%=item.aliasFor%>")<%}%>
  @Column(name="created_at")
  <%if(item.format){%>
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")<%}%>
  private <%=item.type%> <%=name%>;
<%}%>
}


