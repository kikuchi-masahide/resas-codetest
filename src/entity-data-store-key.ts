import { type InjectionKey } from "vue";
import type EntityDataStore from "./usecases/entitiy-data-store";

const entityDataStoreKey = Symbol(
    "entity-data-store",
) as InjectionKey<EntityDataStore>;

export default entityDataStoreKey;
