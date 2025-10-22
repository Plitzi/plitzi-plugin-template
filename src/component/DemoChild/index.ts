import BaseDemoChild from './DemoChild';
import Settings from './Settings';

const DemoChild = Object.assign(BaseDemoChild, {
  type: 'demoChild',
  pluginSettings: Settings,
  version: PLUGIN_VERSION,
  content: {
    attributes: {},
    definition: {
      label: 'Demo Child',
      type: 'demoChild',
      bindings: {},
      styleSelectors: {
        base: ''
      }
    },
    market: { category: 'test' },
    builder: {
      canDelete: true,
      canSelect: true,
      canDragDrop: true,
      canMove: true,
      canTemplate: true,
      itemsAllowed: [],
      itemsNotAllowed: []
    },
    defaultStyle: {
      name: 'Demo Child',
      displayMode: 'desktop',
      style: {
        base: {}
      }
    }
  }
});

export const plugins = {};

export const version = PLUGIN_VERSION;

export default DemoChild;
