// Packages
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import usePlitziServiceContext from 'plitziSdkFederation/usePlitziServiceContext'; // eslint-disable-line

// Styles
import './Assets/index.scss';

const Demo = forwardRef((props, ref) => {
  const { className, internalProps, content } = props;
  const { style } = internalProps;
  const { previewMode } = usePlitziServiceContext();

  if (!previewMode) {
    return (
      <div ref={ref} style={style} className={classNames('plitzi-component__demo', { [className]: className })}>
        Hi, this is a Plitzi demo component Preview Mode False
      </div>
    );
  }

  return (
    <div ref={ref} style={style} className={classNames('plitzi-component__demo', { [className]: className })}>
      {content}
    </div>
  );
});

Demo.defaultProps = {
  className: '',
  internalProps: null,
  content: 'Demo Component'
};

Demo.propTypes = {
  className: PropTypes.string,
  internalProps: PropTypes.object,
  content: PropTypes.string
};

export default Demo;