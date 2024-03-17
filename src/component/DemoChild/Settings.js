// Packages
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Input from '@plitzi/plitzi-ui/Input';

const Settings = props => {
  const { content, onUpdate } = props;

  const handleChangeContent = useCallback(e => onUpdate('content', e.target.value), [onUpdate]);

  return (
    <div className="flex flex-col">
      <div className="bg-[#1A2835] px-4 py-2 flex items-center justify-center">
        <h1 className="text-white m-0">Demo Child Settings</h1>
      </div>
      <div className="flex flex-col w-full px-4 py-2">
        <label>Content</label>
        <Input value={content} onChange={handleChangeContent} inputClassName="rounded" />
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
