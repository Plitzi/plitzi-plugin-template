import Demo from './Demo';
import Settings from './Settings';

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

export default Demo;
