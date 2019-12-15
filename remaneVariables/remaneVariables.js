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
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("vsts-task-lib/task");
const parsePattern = (p) => {
    if (!p || !p.includes("=>"))
        return undefined;
    const s = p.split("=>");
    if (s.length != 2)
        return undefined;
    const pattern = { from: s[0].trim(), to: s[1].trim() };
    if (!pattern.from || !pattern.to)
        return undefined;
    return pattern;
};
const replace = (input, patterns) => {
    patterns.forEach(p => {
        if (!p)
            return;
        input = input.replace(p.from, p.to);
    });
    return input;
};
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Get variables
            const allVariables = tl.getVariables();
            //short by name
            var sortedArray = allVariables.sort((obj1, obj2) => {
                if (obj1.name > obj2.name) {
                    return 1;
                }
                if (obj1.name < obj2.name) {
                    return -1;
                }
                return 0;
            });
            //input
            const replaces = tl
                .getInput("replaceInput", true)
                .split("\n")
                .map(parsePattern);
            console.log(replaces);
            //Remane variables
            sortedArray.forEach(element => {
                const oldName = element.name;
                const newName = replace(element.name, replaces);
                if (oldName === newName) {
                    console.log(`${newName} was skipped.`);
                    return;
                }
                tl.setVariable(newName, element.value, element.secret);
                console.log(`Rename ${oldName} => ${newName}`);
            });
            tl.setResult(tl.TaskResult.Succeeded, "", true);
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
