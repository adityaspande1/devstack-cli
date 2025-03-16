"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStacks = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getStacks() {
    const stacksDir = path_1.default.join(__dirname, "..", "stacks");
    const categories = ["frontend", "backend"];
    const allStacks = [];
    for (const category of categories) {
        const categoryDir = path_1.default.join(stacksDir, category);
        const stackFolders = fs_1.default.readdirSync(categoryDir);
        for (const stackName of stackFolders) {
            const metadataPath = path_1.default.join(categoryDir, stackName, "metadata.json");
            if (!fs_1.default.existsSync(metadataPath))
                continue;
            const metadata = JSON.parse(fs_1.default.readFileSync(metadataPath, "utf-8"));
            allStacks.push({
                category: category,
                name: stackName,
                metadata,
            });
        }
    }
    return allStacks;
}
exports.getStacks = getStacks;
