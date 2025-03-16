#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const getStacks_1 = require("../core/getStacks");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const stacks = (0, getStacks_1.getStacks)();
        const { projectName } = yield inquirer_1.default.prompt([
            {
                type: "input",
                name: "projectName",
                message: "Enter your project name:",
            },
        ]);
        const frontendStacks = stacks.filter((s) => s.category === "frontend");
        const backendStacks = stacks.filter((s) => s.category === "backend");
        const { selectedFrontend } = yield inquirer_1.default.prompt([
            {
                type: "list",
                name: "selectedFrontend",
                message: "Select a frontend stack:",
                choices: frontendStacks.map((stack) => ({
                    name: `${stack.metadata.name}`,
                    value: stack,
                })),
            },
        ]);
        const { selectedBackend } = yield inquirer_1.default.prompt([
            {
                type: "list",
                name: "selectedBackend",
                message: "Select a backend stack:",
                choices: backendStacks.map((stack) => ({
                    name: `${stack.metadata.name}`,
                    value: stack,
                })),
            },
        ]);
        const { frontendLang } = yield inquirer_1.default.prompt([
            {
                type: "list",
                name: "frontendLang",
                message: `Select language for ${selectedFrontend.metadata.name}:`,
                choices: selectedFrontend.metadata.types,
            },
        ]);
        const { backendLang } = yield inquirer_1.default.prompt([
            {
                type: "list",
                name: "backendLang",
                message: `Select language for ${selectedBackend.metadata.name}:`,
                choices: selectedBackend.metadata.types,
            },
        ]);
        const config = {
            name: projectName,
            frontend: {
                framework: selectedFrontend.name,
                language: frontendLang,
            },
            backend: {
                framework: selectedBackend.name,
                language: backendLang,
            },
        };
        console.log("\nYour project config:");
        console.log(JSON.stringify(config, null, 2));
    });
}
run();
