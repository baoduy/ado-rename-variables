import ma = require("azure-pipelines-task-lib/mock-answer");
import tmrm = require("azure-pipelines-task-lib/mock-run");
import path = require("path");

const taskPath = path.join(__dirname, "..", "remaneVariables.js");
console.log(taskPath);
const tmr = new tmrm.TaskMockRunner(taskPath);

tmr.setVariableName("app-0-name", "val1");
tmr.setInput("replaceInput", "- => :");

tmr.run();
