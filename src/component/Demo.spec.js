// Packages
import React from 'react';
import { render } from '@testing-library/react';

// Relatives
import Demo from './Demo';

jest.mock('plitziSdkFederation/usePlitziServiceContext')

describe('Dummy', () => {
  it('should render successfully', () => {
    const BaseElement = render(<Demo internalProps={{}} />);

    expect(BaseElement).toBeTruthy();
  });
});
