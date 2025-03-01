import { useCallback, useEffect, useState } from 'react';
import { BubbleMenu } from '@tiptap/react';
import { ActionButton } from '@/components/ActionButton';
import { useAttributes } from '@/hooks/useAttributes';
import { useLocale } from '@/locales';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui';
// import { regenerateTextWithOllama } from '@/utils/ollama-api'; // Mock API call utility

export function BubbleMenuOllama({ editor }: any) {
  const { t } = useLocale();
  const [currentText, setCurrentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const shouldShow = useCallback(() => {
    const textSelection = editor.state.selection.content().text || '';
    return Boolean(textSelection.trim());
  }, [editor]);

  useEffect(() => {
    if (visible) {
      const selectedText = editor.state.selection.content().text || '';
      setCurrentText(selectedText);
    }
  }, [visible, editor]);

  const handleRegenerate = useCallback(async () => {
    if (!currentText.trim()) return;

    setLoading(true);
    try {
    //   const newText = await regenerateTextWithOllama(currentText);
    console.log("Processing",currentText,Date.now())
    //   editor.chain().focus().insertContent(newText).run();
      setVisible(false);
    } catch (error) {
      console.error('Ollama API Error:', error);
    }
    setLoading(false);
  }, [currentText, editor]);

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="ollama-bubble-menu"
      shouldShow={shouldShow}
      tippyOptions={{
        popperOptions: { modifiers: [{ name: 'flip', enabled: false }] },
        placement: 'bottom-start',
        offset: [-2, 16],
        zIndex: 9999,
      }}
    >
      <div className="richtext-w-auto richtext-px-3 richtext-py-2 richtext-rounded-sm richtext-shadow-sm richtext-border richtext-border-neutral-200 dark:richtext-border-neutral-800 richtext-bg-background">
        {visible ? (
          <>
            <Textarea
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              autoFocus
              placeholder={t('editor.ollama.input_placeholder')}
              rows={3}
              style={{ marginBottom: 8 }}
            />
            <div className="richtext-flex richtext-items-center richtext-justify-between">
              <Button onClick={handleRegenerate} disabled={loading} className="richtext-flex-1">
                {loading ? t('editor.ollama.generating') : t('editor.ollama.regenerate')}
              </Button>
            </div>
          </>
        ) : (
          <ActionButton tooltip={t('editor.ollama.open')} action={() => setVisible(true)}>
            🔄
          </ActionButton>
        )}
      </div>
    </BubbleMenu>
  );
}

export default BubbleMenuOllama;
