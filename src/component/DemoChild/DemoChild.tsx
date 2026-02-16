import { RootElement, usePlitziServiceContext } from '@plitzi/plitzi-sdk';
import classNames from 'classnames';

import '../Assets/index.scss';

import type { RefObject } from 'react';

export type DemoChildProps = {
  ref?: RefObject<HTMLDivElement | null>;
  className?: string;
  content?: string;
};

const DemoChild = ({ ref, className = '', content = 'Demo Child Component' }: DemoChildProps) => {
  const {
    settings: { previewMode }
  } = usePlitziServiceContext();

  if (!previewMode) {
    return (
      <RootElement ref={ref} className={classNames('plitzi-component__demo-child text-red-500', className)}>
        Hi, this is a Plitzi demo child component Preview Mode False
      </RootElement>
    );
  }

  return (
    <RootElement ref={ref} className={classNames('plitzi-component__demo-child', className)}>
      {content}
    </RootElement>
  );
};

export default DemoChild;
