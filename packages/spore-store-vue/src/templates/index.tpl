import { BaseCollection } from '$yard';
import { createStore } from '$vuex-util';
import { baseStore, collectionStore, modelStore } from '$vuex-templates';

const collection = new BaseCollection({ url: '<%=path%>' });

let currentModelId = 0;
const currentModel = collection.exsertModel(() => `${currentModelId}`);

const projects = currentModel.exsertCollection('projects');

const projectStore = createStore({
  collection: projects,
  stores: [baseStore, collectionStore],
});

const currentStore = createStore({
  collection: currentModel,
  stores: [baseStore, modelStore],
  modules: {
    projects: projectStore,
  },
});


const filters = {};
const store = createStore({
  moduleRegistered(path, _store) {
    _store.subscribe((mutation, state) => {
      const {
        type,
        payload,
      } = mutation;
      if (type === path+'/update') {
        if (payload.currentId) {
          currentModelId = payload.currentId;
        }
      }
    });
  },
  collection,
  filters,
  stores: [
    baseStore, collectionStore,
  ],
  modules: {
    current: currentStore,
  },
});

export default store;

