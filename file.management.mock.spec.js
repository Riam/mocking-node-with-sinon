const { expect } = require("chai");
const sinon = require("sinon");
const fs = require("fs");
const proxyquire = require("proxyquire");
const fileManagement = require("./file.management");

describe.only("File Management Fake", function () {
    afterEach(() => {
        sinon.restore();
    });

    it("should call writeFileSync when writing a file", function () {
        const writeMock = sinon.mock(fs);
        writeMock.expects("writeFileSync").once();
        const fileManagement = proxyquire("./file.management", { fs });

        fileManagement.createFile("txt");
        writeMock.verify();
    });

    it("should write a new file with a number appended", function () {
        const writeMock = sinon.mock(fs);
        writeMock
            .expects("writeFileSync")
            .withArgs("./data/file.txt")
            .throws();

        writeMock
            .expects("writeFileSync")
            .withArgs("./data/file1.txt")
            .once();

        writeMock
            .expects("readdirSync")
            .returns(["file.txt"])
            .once();

        const fileManagement = proxyquire("./file.management", { fs });

        fileManagement.createFileSafe("file.txt");
        writeMock.verify();
    });

    it("should not try to write a file if no file name was provided", function () {
        const writeMock = sinon.mock(fs);
        writeMock.expects("writeFileSync").never();

        const fileManagement = proxyquire("./file.management", { fs });

        try {
            fileManagement.createFile();
        } catch (error) {}

        writeMock.verify();
    });
});