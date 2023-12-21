import getInputAdapterType from "./get-input-adapter-type";
import type DataInputInterface from "../usecases/data-input-interface";
import RESASInputAdapter from "./resas-input-adapter";

export default function instantiateInputAdapter(): DataInputInterface {
    const type = getInputAdapterType();
    if (type === "resas") {
        return new RESASInputAdapter();
    } else if (type === "mock") {
        return new RESASInputAdapter();
    } else {
        throw new Error("Invalid input adapter type");
    }
}
