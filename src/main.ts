import { createApp } from "vue";
import App from "./App.vue";
import EntityDataStore from "./usecases/entitiy-data-store";
import instantiateInputAdapter from "./interface-adapters/instantiate-input-adapter";
import entityDataStoreKey from "./entity-data-store-key";

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
createApp(App)
    .provide(entityDataStoreKey, new EntityDataStore(instantiateInputAdapter()))
    .mount("#app");
