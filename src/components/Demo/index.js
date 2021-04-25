// Packages
import { Utils } from '@plitzi/plitzi-element';

// Relatives
import Demo, { DemoWithoutHOC } from './Demo';
import Settings from './Settings';
import Package from '../../../package.json';

const {
  Style: { StyleConstants }
} = Utils;

export { DemoWithoutHOC };

Demo.content = {
  attributes: {
    selectorClass: ''
  },
  definition: {
    label: 'Demo',
    type: 'demo',
    category: 'basic',
    bindings: {}
  },
  market: {
    category: 'demo',
    owner: 'Plitzi',
    verified: true,
    license: 'MIT',
    website: 'https://plitzi.com',
    backgroundColor: '#1A2835',
    icon: ''
  },
  settings: Settings,
  bindingsAllowed: {
    attributes: [],
    style: [StyleConstants.BACKGROUND_BACKGROUND_COLOR]
  },
  defaultStyle: {
    name: 'Demo',
    displayMode: 'desktop',
    style: {}
  },
  version: Package.version
};

export const { version } = Package;

export default Demo;
