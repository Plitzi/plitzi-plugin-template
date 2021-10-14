// Packages
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withElement } from '@plitzi/plitzi-element';

// Styles
import './Assets/index.scss';

const Demo = props => {
  const { className, internalProps, content } = props;
  const { ref, style, previewMode } = internalProps;

  if (!previewMode) {
    return (
      <div ref={ref} style={style} className={classNames('plitzi-component__demo', { [className]: className })}>
        {content}
      </div>
    );
  }

  return (
    <div ref={ref} style={style} className={classNames('plitzi-component__demo', { [className]: className })}>
      Hi, this is a Plitzi demo component
    </div>
  );
};

Demo.defaultProps = {
  internalProps: null,
  className: '',
  content: 'Demo Component'
};

Demo.propTypes = {
  internalProps: PropTypes.object,
  className: PropTypes.string,
  content: PropTypes.string
};

export { Demo as DemoWithoutHOC };

export default withElement(Demo);
