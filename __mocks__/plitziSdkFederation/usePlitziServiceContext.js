const { createContext } = require('react');

const NavigationContext = createContext({});
const CollectionContext = createContext({});
const plitziSdkFederation = createContext({});
const DataSourceContext = createContext({ useDataSource: () => ({}) });

module.exports = {
  __esModule: true,
  default: jest.fn(() => ({
    settings: {},
    utils: { getWindow: () => {} },
    contexts: { CollectionContext, NavigationContext, DataSourceContext }
  })),
  PlitziServiceProvider: plitziSdkFederation.Provider
};
