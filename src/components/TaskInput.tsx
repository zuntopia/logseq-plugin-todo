import React, { useImperativeHandle, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { CirclePlus } from 'tabler-icons-react';
import { themeStyleState } from '../state/theme';

export interface ITaskInputRef {
  focus: () => void;
}

export interface ITaskInputProps {
  onCreateTask(content: string): void;
  onChange(content: string): void;
}

const TaskInput: React.ForwardRefRenderFunction<
  ITaskInputRef,
  ITaskInputProps
> = (props, ref) => {
  const [content, setContent] = React.useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const themeStyle = useRecoilValue(themeStyleState);

  const focus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useImperativeHandle(ref, () => ({
    focus,
  }));

  return (
    <div className="flex mb-2">
      <div
        className="px-2 h-9 flex items-center flex-1 inline rounded-lg"
        style={{
          backgroundColor: themeStyle.secondaryBackgroundColor,
        }}
      >
        <CirclePlus size={20} className="stroke-gray-400 dark:stroke-gray-200" />
        <input
          type="text"
          ref={inputRef}
          className="flex-1 bg-transparent p-1 outline-none text-sm dark:text-gray-100"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            props.onChange(e.target.value)
          }}
          placeholder="Type to search, enter to create"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              props.onCreateTask(content);
              setContent('');
            }
          }}
        />
      </div>
    </div>
  );
};

export default React.forwardRef(TaskInput);
