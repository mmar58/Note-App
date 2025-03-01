import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { ReactRenderer } from "@tiptap/react";
import { ActionButton } from "@/components";
import tippy from "tippy.js";
import OllamaInputMenu from "@/components/OllamaInputMenu"; // React component for input field

export const OllamaPluginKey = new PluginKey("ollama");

export const Ollama = Extension.create({
  name: "ollama-regenerate",

  addOptions() {
    return {
      button: ({ editor, t }: any) => ({
        component: ActionButton,
        componentProps: {
          icon: "EmojiIcon",
          tooltip: t("editor.ollama.regenerate"),
          action: () => this.showOllamaInput(editor),
        },
      }),
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: OllamaPluginKey,
        view: (editorView) => new OllamaSuggestionView(editorView),
      }),
    ];
  },

  showOllamaInput(editor) {
    const selectedText = editor.state.selection.content().text || "";
    if (!selectedText) return;

    let instance;
    
    const menu = new ReactRenderer(OllamaInputMenu, {
      editor,
      props: {
        selectedText,
        onSubmit: async (prompt) => {
          if (!prompt.trim()) return;

          try {
            const response = await fetch("/api/ollama", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: selectedText, prompt }),
            });

            const data = await response.json();
            if (!data || !data.newText) {
              console.warn("Ollama API returned an unexpected response:", data);
              return;
            }

            editor.chain().focus().insertContent(data.newText).run();
          } catch (error) {
            console.error("Ollama API error:", error);
          } finally {
            menu.destroy();  // Closes the popup after submission
            if (instance) instance.hide();
          }
        },
        onCancel: () => {
          menu.destroy();
          if (instance) instance.hide();
        },
      },
    });

    instance = tippy(editor.view.dom, {
      content: menu.element,
      interactive: true,
      placement: "top-start",
      trigger: "manual",
      hideOnClick: true,
    });

    instance.show();
  },
});

// Placeholder for OllamaSuggestionView to prevent errors
class OllamaSuggestionView {
  constructor(editorView) {
    this.editorView = editorView;
  }
}
