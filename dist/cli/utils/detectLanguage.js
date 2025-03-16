"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectLanguage = void 0;
function detectLanguage(type, framework) {
    const RecordMap = {
        "react-vite": "typescript",
        "nextjs-app": "typescript",
        "sveltekit": "typescript",
        "express": "javascript",
        "fastApi": "python",
        "flask": "python",
        "nestjs": "typescript"
    };
    return RecordMap[framework];
}
exports.detectLanguage = detectLanguage;
