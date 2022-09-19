const { createContext } = require('react');

const NavigationContext = createContext({});
const CmsContext = createContext({});
const plitziSdkFederation = createContext({});
const DataSourceContext = createContext({})

module.exports = {
  __esModule: true,
  default: jest.fn(() => ({ CmsContext, NavigationContext, DataSourceContext })),
  PlitziServiceProvider: plitziSdkFederation.Provider
};
