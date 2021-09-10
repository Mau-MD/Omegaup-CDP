import { getFromId } from "../util";

const testIfEditorToggles = () => {
  getFromId("writing-hide").click();
  getFromId("solution-md-editor").should("not.exist");
  getFromId("writing-hide").click();
  getFromId("solution-md-editor").should("exist");
};

const testTab = (id, contains) => {
  getFromId(`writing-${id}`).click();
  cy.then(() => {
    contains.forEach((contain) => {
      cy.contains(contain).should("exist");
    });
  });
  testIfEditorToggles();
};

describe("Writing Tests", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.visit("/");
    getFromId("writing-tab").click();
  });

  it("Inner tabs change and toggle editor", () => {
    const testIds = ["desc", "in", "out", "example", "limits"];
    const shouldContain = [
      "es la descripción del problema",
      "entrada del problema.",
      "salida esperada.",
      "Case #1: 3",
      "Aquí",
    ];

    testIds.forEach((id, index) => {
      testTab(id, [shouldContain[index]]);
    });
    testTab("todo", [...shouldContain]);
  });

  it("Save markdown to store", () => {
    getFromId("solution-md-editor").type("test");
  });
});
