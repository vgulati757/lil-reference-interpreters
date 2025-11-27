import * as factory from "./factoryHandler.js";
import Interpreter from "../models/interpreterModel.js";

export const getAllInterpreters = factory.getAll(Interpreter);
export const getInterpreter = factory.getOne(Interpreter);
export const addInterpreter = factory.createOne(Interpreter);
export const updateInterpreter = factory.updateOne(Interpreter);
export const deleteInterpreter = factory.deleteOne(Interpreter);
