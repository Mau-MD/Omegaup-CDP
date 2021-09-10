import { getFromId, getStoreData } from "../util";

describe("Header Tests", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.visit("/");
  });

  it("Edit title and save it to store", () => {
    // Edit title
    getFromId("editable-preview").type(" ");
    getFromId("editable-input").clear().type("Test").blur();
    // Check in store
    getStoreData("title", "titleName").should("equal", "Test");
  });

  it("Tab changes", () => {
    const tabs = ["writing", "cases", "solution"];
    const shouldHaveIndex = [1, 2, 0];

    tabs.forEach((tab, index) =>
      testStoreTab(`${tab}-tab`, shouldHaveIndex[index])
    );
  });

  it("Tab shorcuts", () => {
    const shortcuts = ["w", "e", "q"];
    const shouldHaveIndex = [1, 2, 0];

    shortcuts.forEach((shortcut, index) => {
      cy.get("body").type(`{ctrl+${shortcut}}`);
      getStoreData("tabs", "tabIndex").should("equal", shouldHaveIndex[index]);
    });
  });
});

const testStoreTab = (id, index) => {
  getFromId(id).click();
  getStoreData("tabs", "tabIndex").should("equal", index);
};
