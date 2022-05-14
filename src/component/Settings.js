// Packages
import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

const Settings = props => {
  const { content, onUpdate } = props;

  const handleChange = key => e => onUpdate(key, e.target.value);

  return (
    <div className="flex flex-col">
      <h1>LIST OPTIONS</h1>
      <div className="flex flex-col">
        <label>Content</label>
        <input value={content} onChange={handleChange('content')} />
      </div>
    </div>
  );
};

Settings.defaultProps = {
  content: '',
  onUpdate: noop
};

Settings.propTypes = {
  content: PropTypes.string,
  onUpdate: PropTypes.func
};

export default Settings;
