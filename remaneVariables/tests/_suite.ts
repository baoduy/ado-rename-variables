import * as assert from "assert";
import * as path from "path";
import * as ttm from "azure-pipelines-task-lib/mock-test";

describe("Sample task tests", function() {
  before(function() {});

  after(() => {});

  it("should succeed with a replace inputs", function(done: MochaDone) {
    this.timeout(1000);

    const tp = path.join(__dirname, "success.js");
    const tr = new ttm.MockTestRunner(tp);

    tr.run();

    console.log(tr.errorIssues);
    assert.equal(tr.succeeded, true, "should have succeeded");

    done();
  });

  it("it should fail if tool returns 1", function(done: MochaDone) {
    // Add failure test here
  });
});
