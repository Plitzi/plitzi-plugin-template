import Input from '@plitzi/plitzi-ui/Input';
import { useCallback } from 'react';

export type SettingsProps = {
  content?: string;
  onUpdate?: (key: string, value: string) => void;
};

const Settings = ({ content = '', onUpdate }: SettingsProps) => {
  const handleChangeContent = useCallback((value: string) => onUpdate?.('content', value), [onUpdate]);

  return (
    <div className="flex flex-col">
      <div className="bg-[#1A2835] px-4 py-2 flex items-center justify-center">
        <h1 className="text-white m-0">Demo Settings</h1>
      </div>
      <div className="flex flex-col w-full px-4 py-2">
        <Input id="content" label="Content" size="xs" value={content} onChange={handleChangeContent} />
      </div>
    </div>
  );
};

export default Settings;
