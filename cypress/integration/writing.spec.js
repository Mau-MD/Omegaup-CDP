import { getFromId } from "../util";

const testIfEditorToggles = () => {
  getFromId("writing-hide").click();
  getFromId("solution-md-editor").should("not.exist");
  getFromId("writing-hide").click();
  getFromId("solution-md-editor").should("exist");
};

const testTab = (id, contains, shortcut) => {
  if (shortcut) {
    cy.get("body").type(`{ctrl+${shortcut}}`);
  } else {
    getFromId(`writing-${id}`).click();
  }
  cy.then(() => {
    contains.forEach((contain) => {
      cy.contains(contain).should("exist");
    });
  });
  testIfEditorToggles();
};

const testTabChange = (useShortcut = false) => {
  const testIds = ["desc", "in", "out", "example", "limits"];
  const shouldContain = [
    "es la descripción del problema",
    "entrada del problema.",
    "salida esperada.",
    "Case #1: 3",
    "Aquí",
  ];

  testIds.forEach((id, index) => {
    testTab(id, [shouldContain[index]], useShortcut ? index + 2 : undefined);
  });
  testTab("todo", [...shouldContain], useShortcut ? 1 : undefined);
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
    testTabChange();
  });

  it("Save markdown to store", () => {
    getFromId("solution-md-editor").type("test");
  });

  it("Inner tabs shortcuts", () => {
    testTabChange(true);
  });
});
