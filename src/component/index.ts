import BaseDemo from './Demo';
import DemoChild from './DemoChild';
import Settings from './Settings';

const Demo = Object.assign(BaseDemo, {
  type: 'demo',
  pluginSettings: Settings,
  version: PLUGIN_VERSION
  // content: {
  //   attributes: {},
  //   definition: {
  //     label: 'Demo',
  //     type: 'demo',
  //     bindings: {},
  //     styleSelectors: {
  //       base: ''
  //     }
  //   },
  //   market: { category: 'test' },
  //   builder: {
  //     canDelete: true,
  //     canSelect: true,
  //     canDragDrop: true,
  //     canMove: true,
  //     canTemplate: true,
  //     itemsAllowed: [],
  //     itemsNotAllowed: []
  //   },
  //   defaultStyle: {
  //     name: 'Demo',
  //     displayMode: 'desktop',
  //     style: {
  //       base: {}
  //     }
  //   }
  // }
});

export const plugins = { demoChild: DemoChild };

export const version = PLUGIN_VERSION;

export default Demo;
