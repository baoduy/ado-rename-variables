"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("vsts-task-lib/task");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //do your actions
            const allVariables = tl.getVariables();
            var sortedArray = allVariables.sort((obj1, obj2) => {
                if (obj1.name > obj2.name) {
                    return 1;
                }
                if (obj1.name < obj2.name) {
                    return -1;
                }
                return 0;
            });
            console.log("All the variables in this format: [variable name] => value");
            sortedArray.forEach(element => {
                console.log(element.name + " => " + element.value);
            });
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
