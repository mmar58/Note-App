import { ActionButton, IconComponent, Popover, PopoverContent, PopoverTrigger } from '@/components'
import FormEditLinkTwitter from '@/extensions/Twitter/components/FormEditLinkTwitter'
import type { ButtonViewReturnComponentProps } from '@/types'

interface IPropsTwitterActiveButton {
  editor: any
  icon?: any
  title?: string
  tooltip?: string
  disabled?: boolean
  shortcutKeys?: string[]
  isActive?: ButtonViewReturnComponentProps['isActive']
  action?: ButtonViewReturnComponentProps['action']
}

function TwitterActiveButton(props: IPropsTwitterActiveButton) {
  function onSetLink(src: string) {
    if (props.action) {
      props.action(src)
    }
  }

  return (
    <Popover modal>
      <PopoverTrigger disabled={props?.disabled} asChild>
        <ActionButton
          tooltip={props?.tooltip}
          isActive={props?.isActive}
          disabled={props?.disabled}
        >
          <IconComponent name={props?.icon} />
        </ActionButton>
      </PopoverTrigger>
      <PopoverContent hideWhenDetached className="richtext-w-full" align="start" side="bottom">
        <FormEditLinkTwitter editor={props.editor} onSetLink={onSetLink} />
      </PopoverContent>
    </Popover>
  )
}

export default TwitterActiveButton
