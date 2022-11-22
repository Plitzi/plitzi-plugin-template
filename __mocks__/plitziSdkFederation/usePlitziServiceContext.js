const { createContext } = require('react');

const NavigationContext = createContext({});
const CmsContext = createContext({});
const plitziSdkFederation = createContext({});
const DataSourceContext = createContext({});

module.exports = {
  __esModule: true,
  default: jest.fn(() => ({
    settings: {},
    utils: { getWindow: () => {} },
    contexts: { CmsContext, NavigationContext, DataSourceContext }
  })),
  PlitziServiceProvider: plitziSdkFederation.Provider
};
