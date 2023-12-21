import getInputAdapterType from "./get-input-adapter-type";
import type DataInputInterface from "../usecases/data-input-interface";
import RESASInputAdapter from "./resas-input-adapter";
import MockInputAdapter from "./mock-input-adapter";

export default function instantiateInputAdapter(): DataInputInterface {
    const type = getInputAdapterType();
    switch (type) {
        case "resas":
            return new RESASInputAdapter();
        case "mock":
            return new MockInputAdapter();
    }
}
