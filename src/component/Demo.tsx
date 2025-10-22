/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// eslint-disable-next-line
// @ts-ignore
import { RootElement, usePlitziServiceContext } from '@plitzi/plitzi-sdk';
import classNames from 'classnames';
import { useEffect } from 'react';

import './Assets/index.scss';

import type { RefObject } from 'react';

export type DemoProps = {
  ref?: RefObject<HTMLDivElement | null>;
  className?: string;
  internalProps?: Record<string, unknown>;
  content?: string;
};

const Demo = ({ ref, className = '', internalProps, content = 'Demo Component' }: DemoProps) => {
  const {
    settings: { previewMode }
  } = usePlitziServiceContext();

  useEffect(() => {
    console.log('test');
  }, []);

  if (!previewMode) {
    return (
      <RootElement
        ref={ref}
        internalProps={internalProps}
        className={classNames('plitzi-component__demo text-red-500', className)}
      >
        Hi, this is a Plitzi demo component Preview Mode False
      </RootElement>
    );
  }

  return (
    <RootElement ref={ref} internalProps={internalProps} className={classNames('plitzi-component__demo', className)}>
      {content}
    </RootElement>
  );
};

export default Demo;
