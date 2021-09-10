import { getFromId, getStoreData } from "../util";

const sampleCppCode = `#include <iostream>`;

describe("Solution Tab Tests", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.visit("/");
  });

  it("Type cpp code and save it to store", () => {
    // Write code
    getFromId("language-select").select("2");
    cy.get(".ace_content").type(sampleCppCode);

    // Save to store
    getFromId("solution-save").click();

    // Check store
    getStoreData("solution", "code").should("equal", sampleCppCode);
    getStoreData("solution", "language").should("equal", 2);
  });

  it("Write solution text and save it to store", () => {
    // Write code
    getFromId("solution-input").type("123");

    // Save to store
    getFromId("solution-save").click();

    // Check store
    getStoreData("solution", "text").should(
      "equal",
      "Escribe aquí la solución de tu problema123"
    );
  });

  it("Toggle code and solution editor", () => {
    getFromId("show-code").click();
    cy.get(".ace_content").should("not.exist");

    getFromId("show-solution").click();
    getFromId("solution-input").should("not.exist");

    getFromId("show-code").click();
    getFromId("show-solution").click();

    cy.get(".ace_content").should("exist");
    getFromId("solution-input").should("exist");
  });
});
