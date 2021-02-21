import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'recompose';
import { withElement, BaseElement } from '@plitzi/plitzi-element';

class Demo extends BaseElement {
  render() {
    const { className, internal, internalProps } = this.props;

    if (!internal.previewMode) {
      return (
        <div {...internalProps} className={classNames('plitzi-component__demo', { [className]: className })}>
          Demo Component
        </div>
      );
    }

    return (
      <div {...internalProps} className={classNames('plitzi-component__demo', { [className]: className })}>
        Hi, this is a Plitzi demo component
      </div>
    );
  }
}

Demo.defaultProps = {
  ...BaseElement.defaultProps,
  className: ''
};

Demo.propTypes = {
  ...BaseElement.propTypes,
  className: PropTypes.string
};

export { Demo as DemoWithoutHOC };

export default compose(withElement)(Demo);
