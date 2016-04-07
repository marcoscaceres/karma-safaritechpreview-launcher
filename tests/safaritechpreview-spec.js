"use strict";
describe("Safari Tech Preview", function() {
  it("launches the Safari browser", function(done) {
    expect(/AppleWebKit/.test(navigator.userAgent)).toBeTruthy();
    expect(navigator.vendor).toEqual("Apple Computer, Inc.");
    done();
  });
});