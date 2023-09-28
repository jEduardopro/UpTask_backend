import mongoose from "mongoose";

const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id)

export default isValidId