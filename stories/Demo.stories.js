// Packages
import React from 'react';
import PlitziSdk from '@plitzi/plitzi-sdk';

// Relatives
import Demo, { DemoWithoutHOC } from '../src/components/Demo/Demo';

// Style
import '@plitzi/plitzi-sdk/dist/plitzi-sdk.css';

export default {
  title: 'Example/Demo',
  component: Demo,
  argTypes: {}
};

const schema = {
  settings: {
    title: 'Default',
    customCss: ''
  },
  flat: {
    '5f544375ced80ed16f382b7b': {
      attributes: {
        selectorClass: '',
        name: 'Home'
      },
      definition: {
        label: 'Page',
        type: 'page',
        slug: '',
        items: ['5f47e7ca8294097d8b0a1715']
      },
      id: '5f544375ced80ed16f382b7b'
    },
    '5f47e7ca8294097d8b0a1715': {
      id: '5f47e7ca8294097d8b0a1715',
      attributes: {
        selectorClass: ''
      },
      definition: {
        label: 'Demo',
        type: 'demo',
        description: '',
        parentId: '5f544375ced80ed16f382b7b'
      }
    }
  },
  pages: ['5f544375ced80ed16f382b7b']
};

export const withoutHoc = () => <DemoWithoutHOC />;

export const withHoc = () => (
  <PlitziSdk offlineMode offlineData={{ schema }}>
    <PlitziSdk.plugin renderType="demo" component={Demo} />
  </PlitziSdk>
);
