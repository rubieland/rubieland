import { useEditor, EditorContent } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { useTranslation } from 'react-i18next';
import StarterKit from '@tiptap/starter-kit';
import { memo, useEffect } from 'react';
import Toolbar from './Toolbar';

interface TiptapProps {
  onContentChange: (content: string) => void;
  content: string;
}

const Tiptap = memo(({ onContentChange, content }: TiptapProps) => {
  const { t } = useTranslation();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: t('textEditor.defaultPlaceholder'),
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'tw-flex tw-flex-col tw-px-4 tw-py-3 tw-justify-start tw-border-b tw-border-r tw-border-l tw-border-gray-700 tw-text-gray-400 tw-items-start tw-w-full tw-gap-3 tw-font-medium tw-text-[16px] tw-pt-4 tw-rounded-bl-md tw-rounded-br-md !tw-outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
  });

  // set content when it changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  return (
    <div className="tw-w-full tw-max-w-xl">
      <Toolbar editor={editor} />
      <EditorContent style={{ whiteSpace: 'pre-line' }} editor={editor} />
    </div>
  );
});

export default Tiptap;
