const { expect } = require("chai");
const sinon = require("sinon");
const fs = require("fs");
const proxyquire = require("proxyquire");
const fileManagement = require("./file.management");

describe.skip("File Management", () => {
  afterEach( () => {
    sinon.restore();
  });
  
  describe("When writing a new new file", () => {
    it("should call writeFileSync", () => {
      const writeSpy = sinon.spy(fs, "writeFileSync");
      const fileManagement = proxyquire("./file.management", { fs });

      fileManagement.createFile("test.txt");

      expect(writeSpy.calledWith("./data/test.txt", "")).to.be.true;
    });

    it("should not write a new file if no file name is specified", () => {
      const writeSpy = sinon.spy(fs, "writeFileSync");
      const fileManagement = proxyquire("./file.management", { fs });

      try {
        fileManagement.createFile();

      } catch (error) {

      }

      expect(writeSpy.notCalled).to.be.true;
    });

    it.skip("should call writeFileSync = Injected", () => {
      const writeSpy = spy(fs, "writeFileSync");
      fileManagement.createFileInjected("test.txt", fs);

      // expect(writeSpy.calledOnce).to.be.true;
      expect(writeSpy.calledWith("./data/test.txt", "")).to.be.true;
    });



  });
});
