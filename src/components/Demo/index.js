import Demo from './Demo';

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

export default Demo;
