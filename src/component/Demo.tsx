import { RootElement, useElement, usePlitziServiceContext } from '@plitzi/plitzi-sdk';
import classNames from 'classnames';
import { useEffect } from 'react';

import './Assets/index.scss';

import type { RefObject } from 'react';

export type DemoProps = {
  ref?: RefObject<HTMLDivElement | null>;
  className?: string;
  content?: string;
};

const Demo = ({ ref, className = '', content = 'Demo Component' }: DemoProps) => {
  const { id, rootId } = useElement();
  const {
    settings: { previewMode }
  } = usePlitziServiceContext();

  useEffect(() => {
    console.log('test', id, rootId);
  }, [id, rootId]);

  if (!previewMode) {
    return (
      <RootElement ref={ref} className={classNames('plitzi-component__demo text-red-500', className)}>
        Hi, this is a Plitzi demo component Preview Mode False
      </RootElement>
    );
  }

  return (
    <RootElement ref={ref} className={classNames('plitzi-component__demo', className)}>
      {content}
    </RootElement>
  );
};

export default Demo;
