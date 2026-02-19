/* eslint-disable @typescript-eslint/no-explicit-any */

import { RootElement, useElement, usePlitziServiceContext } from '@plitzi/plitzi-sdk';
import classNames from 'classnames';
import { use, useCallback, useEffect, useMemo } from 'react';

import './Assets/index.scss';

import type { InteractionCallback, InteractionCallbackParamValues } from '@plitzi/plitzi-sdk';
import type { RefObject } from 'react';

export type DemoProps = {
  ref?: RefObject<HTMLDivElement | null>;
  className?: string;
  content?: string;
};

const Demo = ({ ref, className = '', content = 'Demo Component' }: DemoProps) => {
  const {
    id,
    rootId,
    definition: { label }
  } = useElement();
  const {
    settings: { previewMode },
    contexts: { InteractionsContext }
  } = usePlitziServiceContext();
  const { interactionsManager } = use(InteractionsContext);

  const handleTest = useCallback((params: InteractionCallbackParamValues<{ paramTest: boolean }>) => {
    console.log('test', params);
  }, []);

  useEffect(() => {
    console.log('test', id, rootId);
    void interactionsManager.interactionTrigger(id, 'onDemoTest', { paramTriggerTest: 'hello World' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, rootId]);

  const interactionTriggers = useMemo<Record<string, InteractionCallback>>(
    () => ({
      onSubmit: {
        action: 'onDemoTest',
        title: 'On Demo Test',
        type: 'trigger',
        params: {},
        preview: {
          paramTriggerTest: ''
        }
      }
    }),
    []
  );

  const interactionCallbacks = useMemo<Record<string, InteractionCallback<any>>>(() => {
    return {
      playAnimation: {
        title: `Demo ${label} - Test`,
        callback: handleTest,
        action: 'playAnimation',
        type: 'callback',
        preview: {},
        params: {
          paramTest: {
            label: 'Test Param',
            canBind: true,
            type: 'boolean',
            defaultValue: false
          }
        }
      } satisfies InteractionCallback<{ paramTest: boolean }>
    };
  }, [handleTest, label]);

  if (!previewMode) {
    return (
      <RootElement ref={ref} className={classNames('plitzi-component__demo text-red-500', className)}>
        Hi, this is a Plitzi demo component Preview Mode False
      </RootElement>
    );
  }

  return (
    <RootElement
      ref={ref}
      interactionTriggers={interactionTriggers}
      interactionCallbacks={interactionCallbacks}
      className={classNames('plitzi-component__demo', className)}
    >
      {content}
    </RootElement>
  );
};

export default Demo;
