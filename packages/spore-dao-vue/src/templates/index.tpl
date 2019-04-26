import {BaseCollection, BaseModel} from '$yard';
//

class <%=modelName%>Collection extends BaseCollection{
  constructor(url) {
    super({
      url: url || 'users',
      model: <%=modelName%>Model,
    });
  }

  // 非 basepath GET/POST/PUT/PATCH/DELET
  @rpc('reset-password')
  resetPassword() {
    return {};
  }
}

class <%=modelName%>Model extends BaseModel{
  <%=modelName%>Model (){
  }

  // 非 basepath GET/POST/PUT/PATCH/DELET
  @rpc('reset-password')
  resetPassword() {
    return {};
  }
}

export { <%=modelName%>Collection,};

