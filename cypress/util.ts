export const getFromId = (id: string) => {
  // @ts-ignore
  return cy.get(`[data-test=${id}]`);
};

export const getStore = () => {
  // @ts-ignore
  return cy.window().its("store").invoke("getState");
};

export const getStoreData = (model: string, arg: string) => {
  // @ts-ignore
  return cy.window().its("store").invoke("getState").its(model).its(arg);
};
