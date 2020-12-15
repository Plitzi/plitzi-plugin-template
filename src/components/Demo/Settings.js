import React from 'react';
// import PropTypes from 'prop-types';
import { BaseSettings } from '@plitzi/plitzi-element';

class Settings extends BaseSettings {
  render() {
    return (
      <div className="element-settings__container">
        <h1>LIST OPTIONS</h1>
        <div className="settings-item">
          <label>Label</label>
        </div>
      </div>
    );
  }
}

Settings.defaultProps = {
  ...BaseSettings.defaultProps
};

Settings.propTypes = {
  ...BaseSettings.propTypes
};

export default Settings;
