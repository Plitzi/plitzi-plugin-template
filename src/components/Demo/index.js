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

Demo.definition = {
  attributes: {
    selectorClass: ''
  },
  defaultAttributes: {},
  definition: {
    label: 'Demo',
    type: 'demo',
    category: 'basic',
    bindings: {}
  }
};

Demo.settings = Settings;

Demo.bindings = {
  attributes: [],
  style: [StyleConstants.BACKGROUND_BACKGROUND_COLOR]
};

Demo.defaultStyle = {
  name: 'Demo',
  displayMode: 'desktop',
  style: {}
};

export const { version } = Package;

export default Demo;
