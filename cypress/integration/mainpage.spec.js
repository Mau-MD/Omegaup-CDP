/// <reference types="cypress" />

describe("Main page", () => {
  it("Go to creator", () => {
    cy.visit("http://localhost:3000");
    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(4000); // Waits until the initial animation ends
    cy.contains("Problema").click();
    cy.url().should("contain", "/creator");
  });
});
