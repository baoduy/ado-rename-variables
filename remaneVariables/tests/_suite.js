"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const path = require("path");
const ttm = require("azure-pipelines-task-lib/mock-test");
describe("Sample task tests", function () {
    before(function () { });
    after(() => { });
    it("should succeed with a replace inputs", function (done) {
        this.timeout(1000);
        const tp = path.join(__dirname, "success.js");
        const tr = new ttm.MockTestRunner(tp);
        tr.run();
        console.log(tr.errorIssues);
        assert.equal(tr.succeeded, true, "should have succeeded");
        done();
    });
    it("it should fail if tool returns 1", function (done) {
        // Add failure test here
    });
});
