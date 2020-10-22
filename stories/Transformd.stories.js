import React from 'react';
import PlitziSdk from '@plitzi/plitzi-sdk';

import Demo from '../src/components/advanced/Demo/Demo';

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
        selectorClass: {
          items: [],
          raw: ''
        }
      },
      definition: {
        label: 'Page 0',
        type: 'page',
        slug: '',
        category: 'structure',
        items: ['5f47e7ca8294097d8b0a1715']
      },
      id: '5f544375ced80ed16f382b7b'
    },
    '5f47e7ca8294097d8b0a1715': {
      id: '5f47e7ca8294097d8b0a1715',
      attributes: {
        selectorClass: { items: [], raw: '' }
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

export const withHoc = () => (
  <PlitziSdk schema={schema}>
    <PlitziSdk.override renderType="demo" component={Demo} />
  </PlitziSdk>
);
