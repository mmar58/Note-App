import { getMarkRange, mergeAttributes } from '@tiptap/core'
import type { LinkOptions as TiptapLinkOptions } from '@tiptap/extension-link'
import { Link as TiptapLink } from '@tiptap/extension-link'
import { Plugin, TextSelection } from '@tiptap/pm/state'
import type { EditorView } from '@tiptap/pm/view'
import { Extension } from "@tiptap/core";

import LinkEditPopover from '@/extensions/Ollama/components/LinkEditPopover'
import type { GeneralOptions } from '@/types'

export interface LinkOptions extends TiptapLinkOptions, GeneralOptions<LinkOptions> {}

export const Ollama = Extension.create({
  inclusive: false,

  addOptions() {
    return {
      ...this.parent?.(),
      openOnClick: true,
      button: ({ editor, t }) => {
        return {
          component: LinkEditPopover,
          componentProps: {
            editor,
            action: (value) => {
              const { link, text, openInNewTab } = value as any
              editor
                .chain()
                .extendMarkRange('link')
                .insertContent({
                  type: 'text',
                  text,
                  marks: [
                    {
                      type: 'link',
                      attrs: {
                        href: link,
                        target: openInNewTab ? '_blank' : '',
                      },
                    },
                  ],
                })
                .setLink({ href: link })
                .focus()
                .run()
            },
            id: 'ollama',
            isActive: () => editor.isActive('link') || false,
            disabled: !editor.can().setLink({ href: '' }),
            icon: 'EmojiIcon',
            tooltip: "Generate with ollama",
          },
        }
      },
    }
  },

  // addProseMirrorPlugins() {
  //   return [
  //     new Plugin({
  //       props: {
  //         handleClick: (view: EditorView, pos: number) => {
  //           const { schema, doc, tr } = view.state
  //           const range = getMarkRange(doc.resolve(pos), schema.marks.link)
  //           if (!range) {
  //             return false
  //           }
  //           const $start = doc.resolve(range.from)
  //           const $end = doc.resolve(range.to)
  //           const transaction = tr.setSelection(new TextSelection($start, $end))
  //           view.dispatch(transaction)
  //         },
  //       },
  //     }),
  //   ]
  // },
})
