import {mapEntity, mapProperty, notBlank, required, length} from '$yard';
//
@mapEntity
class User {
  //
  //@notBlank(message = "内容不能为空")
  //@length(max = 64, message = "内容长度不能超过64个字符")
  id;
  //
  //@notBlank(message = "内容不能为空")
  //@length(max = 64, message = "内容长度不能超过64个字符")
  @mapProperty("nickName")
  name;
  //
  //@length(max = 20, message = "内容长度不能超过20个字符")
  password;
}
export default User;