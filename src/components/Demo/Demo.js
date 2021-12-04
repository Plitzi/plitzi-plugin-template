// Packages
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withElement } from '@plitzi/plitzi-element';

// Styles
import './Assets/index.scss';

const Demo = props => {
  const { className, internalProps, content, PlitziContext } = props;
  const { ref, style } = internalProps;
  const { previewMode } = useContext(PlitziContext);

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
};

Demo.defaultProps = {
  className: '',
  PlitziContext: null,
  internalProps: null,
  content: 'Demo Component'
};

Demo.propTypes = {
  className: PropTypes.string,
  PlitziContext: PropTypes.object,
  internalProps: PropTypes.object,
  content: PropTypes.string
};

export { Demo as DemoWithoutHOC };

export default withElement(Demo);
