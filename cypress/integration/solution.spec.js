const sampleCppCode = `#include <iostream>`;

describe("solution", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.visit("/");
  });

  it("Type cpp code and save it to store", () => {
    // Write code
    cy.get("[data-test=language-select]").select("2");
    cy.get(".ace_content").type(sampleCppCode);

    // Save to store
    cy.get("[data-test=solution-save]").click();

    // Check store
    cy.window()
      .its("store")
      .invoke("getState")
      .its("solution")
      .its("code")
      .should("equal", sampleCppCode);

    cy.window()
      .its("store")
      .invoke("getState")
      .its("solution")
      .its("language")
      .should("equal", 2);
  });

  it("Write solution text and save it to store", () => {
    // Write code
    cy.get("[data-test=solution-input]").type("123");

    // Save to store
    cy.get("[data-test=solution-save]").click();

    // Check store
    cy.window()
      .its("store")
      .invoke("getState")
      .its("solution")
      .its("text")
      .should("equal", "Escribe aquí la solución de tu problema123");
  });

  it("Toggle code and solution editor", () => {
    cy.get("[data-test=show-code]").click();
    cy.get(".ace_content").should("not.exist");
    cy.get("[data-test=show-solution]").click();
    cy.get("[data-test=solution-input]").should("not.exist");
    cy.get("[data-test=show-code]").click();
    cy.get("[data-test=show-solution]").click();
    cy.get(".ace_content");
    cy.get("[data-test=solution-input]");
  });
});
