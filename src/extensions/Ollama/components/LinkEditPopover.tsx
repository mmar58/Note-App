import { useState } from 'react';

import { ActionButton, IconComponent, Popover, PopoverContent, PopoverTrigger, Button, Input } from '@/components';
import type { ButtonViewReturnComponentProps } from '@/types';

interface IPropsLinkEditPopover {
  editor: any;
  icon?: any;
  title?: string;
  tooltip?: string;
  disabled?: boolean;
  shortcutKeys?: string[];
  isActive?: ButtonViewReturnComponentProps['isActive'];
  action?: ButtonViewReturnComponentProps['action'];
}

function LinkEditPopover(props: IPropsLinkEditPopover) {
  const [open, setOpen] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');

  function onGenerate() {
    if (props.action) {
      props.action({ link: customPrompt });
      setOpen(false);
    }
  }

  function onCancel() {
    setCustomPrompt('');
    setOpen(false);
  }

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={props?.disabled} asChild>
        <ActionButton
          tooltip={props?.tooltip}
          isActive={props?.isActive}
          disabled={props?.disabled}
        >
          <IconComponent name={props?.icon} />
        </ActionButton>
      </PopoverTrigger>
      <PopoverContent hideWhenDetached className="richtext-w-full p-4" align="start" side="bottom">
        <Input
          placeholder="Custom prompt"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          className="mb-4 w-full"
        />
        <div className="flex justify-between items-center w-full">
          <Button 
            onClick={onGenerate} 
            variant="default" 
          >
            Generate
          </Button>
          <Button 
            onClick={onCancel} 
            variant="default" 
            style={{ position: 'absolute', right: '8%' }}
          >
            Cancel
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default LinkEditPopover;
