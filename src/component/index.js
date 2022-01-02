// Relatives
import Demo from './Demo';
import Settings from './Settings';
import manifest from './manifest.json';

Demo.content = {
  ...manifest,
  instanceSettings: Settings,
  version: VERSION
};

export const version = VERSION;

export default Demo;
