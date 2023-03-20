// Packages
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { RootElement, usePlitziServiceContext } from '@plitzi/plitzi-sdk';

// Styles
import './Assets/index.scss';

const Demo = forwardRef((props, ref) => {
  const { className, internalProps, content } = props;
  const {
    settings: { previewMode }
  } = usePlitziServiceContext();

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
});

Demo.defaultProps = {
  className: '',
  internalProps: {},
  content: 'Demo Component'
};

Demo.propTypes = {
  className: PropTypes.string,
  internalProps: PropTypes.object,
  content: PropTypes.string
};

export default Demo;
