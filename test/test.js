"use strict";

var expect = require("chai").expect;
var nock = require("nock");

var OhmHour = require("../lib/ohmhour");

describe("#ohmhour", function() {
  it("should get return no Ohm Hour", function()
  {
    nock("https://login.ohmconnect.com/")
      .get("/verify-ohm-hour/abcdef")
      .reply(200, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"+
                  "      <ohmhour>\n"+
                  "          <address>123 SOME STREET</address>\n"+
                  "          <active>None</active>\n"+
                  "      </ohmhour>\n");

    var ohm = new OhmHour("abcdef");
    ohm.check().then((state) => {
      expect(state).to.equal("None");
    });
  });

  it("should get return upcoming Ohm Hour", function()
  {
    nock("https://login.ohmconnect.com/")
      .get("/verify-ohm-hour/abcdef")
      .reply(200, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"+
                  "      <ohmhour>\n"+
                  "          <address>123 SOME STREET</address>\n"+
                  "          <active>False</active>\n"+
                  "      </ohmhour>\n");

    var ohm = new OhmHour("abcdef");
    ohm.check().then((state) => {
      expect(state).to.equal("False");
    });
  });

  it("should get return active Ohm Hour", function()
  {
    nock("https://login.ohmconnect.com/")
      .get("/verify-ohm-hour/abcdef")
      .reply(200, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"+
                  "      <ohmhour>\n"+
                  "          <address>123 SOME STREET</address>\n"+
                  "          <active>True</active>\n"+
                  "      </ohmhour>\n");

    var ohm = new OhmHour("abcdef");
    ohm.check().then((state) => {
      expect(state).to.equal("True");
    });
  });
});
