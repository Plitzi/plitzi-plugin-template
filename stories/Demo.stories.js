// Packages
import React from 'react';
import PlitziSdk, { PlitziContext } from '@plitzi/plitzi-sdk';

// Relatives
import Demo, { DemoWithoutHOC } from '../src/components/Demo';

// Style
import '@plitzi/plitzi-sdk/dist/plitzi-sdk.css';

export default {
  title: 'Example/Demo',
  decorators: [],
  component: Demo,
  argTypes: {}
};

const schema = {
  settings: {
    title: 'Default',
    customCss: ''
  },
  flat: [
    {
      attributes: {
        selectorClass: '',
        name: 'Home'
      },
      definition: {
        label: 'Page',
        type: 'page',
        slug: '',
        builder: {
          isContainer: true,
          itemsAllowed: [],
          itemsNotAllowed: []
        },
        items: ['5f47e7ca8294097d8b0a1715']
      },
      id: '5f544375ced80ed16f382b7b'
    },
    {
      id: '5f47e7ca8294097d8b0a1715',
      attributes: {
        selectorClass: '',
        content: 'Testing'
      },
      definition: {
        label: 'Demo',
        type: 'demo',
        description: '',
        parentId: '5f544375ced80ed16f382b7b'
      }
    }
  ],
  pages: ['5f544375ced80ed16f382b7b']
};

const providerValue = { previewMode: true };

export const withoutHoc = () => (
  <PlitziContext.Provider value={providerValue}>
    <DemoWithoutHOC PlitziContext={PlitziContext} internalProps={{}} content="Demo Component" />
  </PlitziContext.Provider>
);

export const withHoc = () => (
  <PlitziSdk
    offlineMode
    offlineData={{ schema }}
    // storybook compiled assets are under /main.css
    externalAssets={[
      {
        type: 'link',
        id: 'demo',
        params: {
          type: 'text/css',
          href: '/main.css',
          rel: 'stylesheet'
        }
      }
    ]}
  >
    <PlitziSdk.Plugin renderType="demo" component={Demo} />
  </PlitziSdk>
);

export const withHocNoPreview = () => (
  <PlitziSdk
    offlineMode
    offlineData={{ schema }}
    previewMode={false}
    // storybook compiled assets are under /main.css
    externalAssets={[
      {
        type: 'link',
        id: 'demo',
        params: {
          type: 'text/css',
          href: '/main.css',
          rel: 'stylesheet'
        }
      }
    ]}
  >
    <PlitziSdk.Plugin renderType="demo" component={Demo} />
  </PlitziSdk>
);

export const withHocNoIframe = () => (
  <PlitziSdk offlineMode iframeMode={false} offlineData={{ schema }}>
    <PlitziSdk.Plugin renderType="demo" component={Demo} />
  </PlitziSdk>
);
