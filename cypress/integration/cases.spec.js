import { getFromId, getStoreData } from "../util";

describe("Cases Tab Tests", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.visit("/");
    getFromId("cases-tab").click();
  });

  it("Add cases, groups and lines. Test persistence", () => {
    // Add case
    addCase("case1");
    cy.contains("case1").should("exist");

    addGroup("group1");
    // cy.contains("group1").click();

    addCase("case2", "group1");
    cy.contains("case2").should("exist");

    cy.contains("case1").click();
    getFromId("in-window").should("exist");

    getFromId("add-line").click();
    cy.get(".chakra-input").type("1 2 3");

    // Check persistence

    cy.contains("case2").click();
    cy.contains("case1").click();
    cy.get(".chakra-input").should("have.value", "1 2 3");
  });

  it("Layout and add multiple cases", () => {
    // Open, add and close layout
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100); // Bug where menu was appearing in the wrong place
    getFromId("more-options").click();
    getFromId("layout").click();
    getFromId("add-layout-line").click();
    getFromId("add-layout-line").click();
    cy.get(".chakra-select:last").select("array");
    cy.get("body").click(0, 0);

    // Add multiple cases
    getFromId("more-options").click();
    getFromId("add-multiple-cases").click();
    getFromId("prefix-input").type("case");
    cy.get("#field-94").type("3");
    getFromId("add-multiple-cases-btn").click();

    for (let index = 1; index <= 3; index++) {
      checkLayout("case" + index);
    }
  });

  it("Move case to another group", () => {
    addGroup("group1");
    addGroup("group2");
    addCase("case1", "group1");

    cy.contains("case1").click();
    getFromId("edit-case").click();
    cy.get(".css-g1d714-ValueContainer").type("group2{enter}");
    getFromId("edit-case-btn").click();

    cy.get(".group1").should("have.length", 0);
    cy.get(".group2").should("have.length", 1);
  });
});

const checkLayout = (caseName) => {
  cy.contains(caseName).click();
  cy.contains("Arreglo").should("exist");
  cy.get(".chakra-input").should("have.length", 2);
};

const addCase = (caseName, groupName = undefined) => {
  getFromId("add-btn").click();
  getFromId("case-name-input").type(caseName);
  if (groupName) {
    cy.get(".css-g1d714-ValueContainer").type(groupName + "{enter}");
  }
  getFromId("add-case").click();
};

const addGroup = (groupName) => {
  getFromId("add-btn").click();
  getFromId("add-group-tab").click();
  getFromId("group-name-input").type(groupName);
  getFromId("add-group").click();
  cy.contains(groupName).click();
};
