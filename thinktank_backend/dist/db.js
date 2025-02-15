"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not defined in the environment variables");
}
mongoose_1.default.connect(process.env.MONGO_URL);
const mongoose_2 = require("mongoose");
const UserSchema = new mongoose_2.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
exports.UserModel = (0, mongoose_2.model)("User", UserSchema);
const ContentSchema = new mongoose_2.Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Tag' }],
    type: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', require: true },
});
exports.ContentModel = (0, mongoose_2.model)("content", ContentSchema);
const LinksSchema = new mongoose_2.Schema({
    hash: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', require: true },
});
exports.LinkModel = (0, mongoose_2.model)("Links", LinksSchema);
