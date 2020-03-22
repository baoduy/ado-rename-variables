"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const path = require("path");
const ttm = require("azure-pipelines-task-lib/mock-test");
const remaneVariables_1 = require("../remaneVariables");
describe('Sample task tests', function () {
    before(function () { });
    after(() => { });
    it('should succeed with a replace inputs', function (done) {
        //this.timeout(3000);
        const tp = path.join(__dirname, 'success.js');
        const tr = new ttm.MockTestRunner(tp);
        tr.run();
        console.warn(tr.errorIssues);
        assert.equal(tr.succeeded, true, 'should have succeeded');
        done();
    });
    // it('it should fail if tool returns 1', function(done: MochaDone) {
    //   // Add failure test here
    //   done();
    // });
    it('it should replace all characters', function (done) {
        this.timeout(100);
        const rs = remaneVariables_1.replace('A-B-C-D', [{ from: '-', to: ':' }]);
        assert.equal(rs.includes('-'), false, 'should not contains hyphone (-) characters');
        assert.equal(rs.includes(':'), true, 'should be replaced by (:) characters');
        done();
    });
});
