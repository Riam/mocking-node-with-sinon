const { expect } = require("chai");
const sinon = require("sinon");
const fs = require("fs");
const proxyquire = require("proxyquire");

describe.skip("File management stub", function () {
  afterEach(() => {
    sinon.restore();
  });

  it("should write a new file", function () {
    const writeStub = sinon.stub(fs, "writeFileSync");
    const fileManagement = proxyquire("./file.management", { fs });

    fileManagement.createFile("test.txt");

    expect(writeStub.callCount).to.equal(1);
  });

  it("should throw an exception if file already exists", function () {
    const writeStub = sinon.stub(fs, "writeFileSync");
    writeStub.throws(new Error());

    const fileManagement = proxyquire("./file.management", { fs });

    expect(() => fileManagement.createFile("test.txt")).to.throw();
  });

  it("createFileSafe should write a file named test1.txt when test.txt already exists", function () {
    const writeStub = sinon.stub(fs, "writeFileSync");
    const readStub = sinon.stub(fs, "readdirSync");
    const fileManagement = proxyquire("./file.management", { fs });

    // when called with this argument throw and exception
    writeStub.withArgs("./data/test.txt").throws(new Error());
    // the rest of the time return undefined
    writeStub.returns(undefined);
    readStub.returns(["test.txt"]);
    
    fileManagement.createFileSafe("test.txt");
    console.log(`Write stub called: ${writeStub.callCount}`);

    expect(writeStub.calledWith("./data/test1.txt")).to.be.true;
  });

  it("getAllFiles should return a list of files", function () {
    const readStub = sinon.stub(fs, "readdir");
    const fileManagement = proxyquire("./file.management", { fs });

    readStub.yields(null, ["test.txt"]);

    fileManagement.getAllFiles((err, data) => {
      expect(data).to.eql(["test.txt"]);
    })
  });

});