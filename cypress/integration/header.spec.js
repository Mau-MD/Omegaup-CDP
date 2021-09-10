import { getFromId, getStoreData } from "../util";

const testStoreTab = (id, index) => {
  getFromId(id).click();
  getStoreData("tabs", "tabIndex").should("equal", index);
};

describe("Header tests", () => {
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

  it("Test tab changes", () => {
    const tabs = ["writing", "cases", "solution"];
    const shouldHaveIndex = [1, 2, 0];

    tabs.forEach((tab, index) =>
      testStoreTab(`${tab}-tab`, shouldHaveIndex[index])
    );
  });
});
