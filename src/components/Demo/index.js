import Demo from './Demo';
import Settings from './Settings';
import Package from '../../../package.json';

Demo.definition = {
  attributes: {
    selectorClass: { items: [], raw: '' }
  },
  defaultAttributes: {},
  definition: {
    label: 'Demo',
    type: 'demo',
    category: 'basic'
  }
};

Demo.defaultStyle = {
  name: 'Demo',
  displayMode: 'desktop',
  style: {}
};

Demo.settings = Settings;

export const { version } = Package;

export default Demo;
