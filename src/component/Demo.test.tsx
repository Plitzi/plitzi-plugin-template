import { ElementContext, PlitziServiceProvider } from '@plitzi/plitzi-sdk';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Demo from './Demo';

import type { PlitziServiceContextValue } from '@plitzi/plitzi-sdk';

describe('Demo Tests', () => {
  it('Render Component', () => {
    // render(<Dummy />);

    // const description = screen.getByText('Dummy Component');
    // expect(description).toBeDefined();

    const ref = { current: null };

    const BaseElement = render(
      <PlitziServiceProvider value={{ settings: { previewMode: true } } as PlitziServiceContextValue}>
        <ElementContext value={{ id: '', rootId: '', plitziJsxSkipHOC: true }}>
          <Demo ref={ref} />
        </ElementContext>
      </PlitziServiceProvider>
    );

    expect(BaseElement).toBeTruthy();
  });
});
