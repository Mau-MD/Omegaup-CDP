describe("Header tests", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.visit("/");
  });

  it("Edit title and save it to store", () => {
    // Edit title
    cy.get("[data-test=editable-preview]").type(" ");
    cy.get("[data-test=editable-input]").clear().type("Test").blur();

    // Check in store
    cy.window()
      .its("store")
      .invoke("getState")
      .its("title")
      .its("titleName")
      .should("equal", "Test");
  });
});
