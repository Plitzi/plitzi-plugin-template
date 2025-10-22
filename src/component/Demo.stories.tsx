// eslint-disable-next-line
// @ts-ignore
import PlitziSdk, { PlitziServiceProvider } from '@plitzi/plitzi-sdk';
import { useRef, useState } from 'react';

import Demo from './Demo';
import Settings from './Settings';

import type { SettingsProps } from './Settings';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Dummy',
  component: Demo,
  // parameters: {
  //   layout: 'centered'
  // }
  tags: ['autodocs'],
  argTypes: {},
  args: { content: 'Content Here' }
} satisfies Meta<typeof Demo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { internalProps: { plitziJsxSkipHOC: true } },
  render: function Render(args) {
    const ref = useRef<HTMLDivElement>(null);

    return (
      <PlitziServiceProvider
        value={{
          settings: { previewMode: true }
        }}
      >
        <Demo ref={ref} {...args} />
      </PlitziServiceProvider>
    );
  }
};

const schema = {
  settings: {
    title: 'Default',
    customCss: ''
  },
  flat: {
    '5f544375ced80ed16f382b7b': {
      attributes: {
        name: 'Home'
      },
      builder: {
        itemsAllowed: [],
        itemsNotAllowed: []
      },
      definition: {
        label: 'Page',
        type: 'page',
        slug: '',
        items: ['5f47e7ca8294097d8b0a1715'],
        styleSelectors: {
          base: ''
        }
      },
      id: '5f544375ced80ed16f382b7b'
    },
    '5f47e7ca8294097d8b0a1715': {
      id: '5f47e7ca8294097d8b0a1715',
      attributes: {
        content: 'Testing'
      },
      definition: {
        label: 'Demo',
        type: 'demo',
        description: '',
        parentId: '5f544375ced80ed16f382b7b',
        styleSelectors: {
          base: ''
        }
      }
    }
  },
  pages: ['5f544375ced80ed16f382b7b']
};

export const WithHoc: Story = {
  args: {},
  render: () => (
    <PlitziSdk offlineMode offlineData={{ schema, style: {} }}>
      <PlitziSdk.Plugin
        renderType="demo"
        component={Demo}
        assets={[{ type: 'text/css', href: '/main.css', rel: 'stylesheet' }]}
      />
    </PlitziSdk>
  )
};

export const WithHocNoPreview: Story = {
  args: {},
  render: () => (
    <PlitziSdk className="w-full" offlineMode offlineData={{ schema, style: {} }} previewMode={false}>
      <PlitziSdk.Plugin
        renderType="demo"
        component={Demo}
        assets={[{ type: 'text/css', href: '/main.css', rel: 'stylesheet' }]}
      />
    </PlitziSdk>
  )
};

export const WithHocNoIframe: Story = {
  args: {},
  render: () => (
    <PlitziSdk className="w-full" offlineMode renderMode="raw" offlineData={{ schema, style: {} }}>
      <PlitziSdk.Plugin renderType="demo" component={Demo} />
    </PlitziSdk>
  )
};

export const ComponentSettings: Story = {
  args: { content: '' },
  render: function Render(args: SettingsProps) {
    const [props, setProps] = useState({});

    const onUpdate = (key: string, value: string) => {
      setProps(state => ({ ...state, [key]: value }));
    };

    return <Settings {...args} {...props} onUpdate={onUpdate} />;
  }
};
