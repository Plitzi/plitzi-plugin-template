import { useCallback } from 'react';

import type { ChangeEvent } from 'react';

export type SettingsProps = {
  content?: string;
  onUpdate?: (key: string, value: string) => void;
};

const Settings = ({ content = '', onUpdate }: SettingsProps) => {
  const handleChangeContent = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onUpdate?.('content', e.target.value),
    [onUpdate]
  );

  return (
    <div className="flex flex-col">
      <div className="bg-[#1A2835] px-4 py-2 flex items-center justify-center">
        <h1 className="text-white m-0">Demo Child Settings</h1>
      </div>
      <div className="flex flex-col w-full px-4 py-2">
        <label>Content</label>
        <input value={content} onChange={handleChangeContent} className="rounded" />
      </div>
    </div>
  );
};

export default Settings;
