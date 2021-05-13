// Packages
import React from 'react';
import PlitziSdk from '@plitzi/plitzi-sdk';

// Relatives
import Demo from '../src/components/Demo/Demo';

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
        category: 'structure',
        items: ['5f47e7ca8294097d8b0a1715'],
        builder: {
          isContainer: true,
          overlay: {
            theme: 'normal'
          }
        }
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
        category: 'advanced',
        description: '',
        parentId: '5f544375ced80ed16f382b7b'
      }
    }
  },
  pages: ['5f544375ced80ed16f382b7b']
};

export const simpleDemoComponent = () => (
  <PlitziSdk offlineMode offlineData={{ schema }}>
    <PlitziSdk.plugin renderType="demo" component={Demo} />
  </PlitziSdk>
);
