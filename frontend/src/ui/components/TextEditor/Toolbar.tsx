import { type Editor } from '@tiptap/react';
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  Heading3,
} from 'lucide-react';

interface ToolbarProps {
  editor: Editor | null;
}

const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) {
    return null;
  }
  return (
    <div
      className="tw-px-4 tw-py-3 tw-rounded-tl-md tw-rounded-tr-md tw-flex tw-justify-between tw-items-start
    tw-gap-5 tw-w-full tw-max-w-xl tw-flex-wrap tw-border tw-border-grey50"
    >
      <div className="tw-flex tw-justify-start tw-items-center tw-gap-5 tw-w-full tw-lg:w-10/12 tw-flex-wrap">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive('bold')
              ? 'tw-bg-primary tw-rounded-lg tw-p-1'
              : 'tw-p-1 tw-rounded-lg hover:tw-bg-primaryLight'
          }
        >
          <Bold
            className={
              editor.isActive('bold')
                ? ' tw-stroke-primaryLight tw-w-5 tw-h-5'
                : 'tw-stroke-black tw-w-5 tw-h-5'
            }
          />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive('italic')
              ? 'tw-bg-primary tw-p-1 tw-rounded-lg'
              : 'tw-p-1 tw-rounded-lg hover:tw-bg-primaryLight'
          }
        >
          <Italic
            className={
              editor.isActive('italic')
                ? ' tw-stroke-primaryLight tw-w-5 tw-h-5'
                : 'tw-stroke-black tw-w-5 tw-h-5'
            }
          />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive('underline')
              ? 'tw-bg-primary tw-p-1 tw-rounded-lg'
              : 'tw-p-1 tw-rounded-lg hover:tw-bg-primaryLight'
          }
        >
          <Underline
            className={
              editor.isActive('underline')
                ? ' tw-stroke-primaryLight tw-w-5 tw-h-5'
                : 'tw-stroke-black tw-w-5 tw-h-5'
            }
          />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive('strike')
              ? 'tw-bg-primary tw-p-1 tw-rounded-lg'
              : 'tw-p-1 tw-rounded-lg hover:tw-bg-primaryLight'
          }
        >
          <Strikethrough
            className={
              editor.isActive('strike')
                ? ' tw-stroke-primaryLight tw-w-5 tw-h-5'
                : 'tw-stroke-black tw-w-5 tw-h-5'
            }
          />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={
            editor.isActive('heading', { level: 3 })
              ? 'tw-bg-primary tw-p-1 tw-rounded-lg'
              : 'tw-p-1 tw-rounded-lg hover:tw-bg-primaryLight'
          }
        >
          <Heading3
            className={
              editor.isActive('heading', { level: 3 })
                ? ' tw-stroke-primaryLight tw-w-5 tw-h-5'
                : 'tw-stroke-black tw-w-5 tw-h-5'
            }
          />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive('bulletList')
              ? 'tw-bg-primary tw-p-1 tw-rounded-lg'
              : 'tw-p-1 tw-rounded-lg hover:tw-bg-primaryLight'
          }
        >
          <List
            className={
              editor.isActive('bulletList')
                ? ' tw-stroke-primaryLight tw-w-5 tw-h-5'
                : 'tw-stroke-black tw-w-5 tw-h-5'
            }
          />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive('orderedList')
              ? 'tw-bg-primary tw-p-1 tw-rounded-lg'
              : 'tw-p-1 tw-rounded-lg hover:tw-bg-primaryLight'
          }
        >
          <ListOrdered
            className={
              editor.isActive('orderedList')
                ? ' tw-stroke-primaryLight tw-w-5 tw-h-5'
                : 'tw-stroke-black tw-w-5 tw-h-5'
            }
          />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive('blockquote')
              ? 'tw-bg-primary tw-p-1 tw-rounded-lg'
              : 'tw-p-1 tw-rounded-lg hover:tw-bg-primaryLight'
          }
        >
          <Quote
            className={
              editor.isActive('blockquote')
                ? ' tw-stroke-primaryLight tw-w-5 tw-h-5'
                : 'tw-stroke-black tw-w-5 tw-h-5'
            }
          />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCodeBlock().run();
          }}
          className={
            editor.isActive('codeBlock')
              ? 'tw-bg-primary tw-p-1 tw-rounded-lg'
              : 'tw-p-1 tw-rounded-lg hover:tw-bg-primaryLight'
          }
        >
          <Code
            className={
              editor.isActive('codeBlock')
                ? ' tw-stroke-primaryLight tw-w-5 tw-h-5'
                : 'tw-stroke-black tw-w-5 tw-h-5'
            }
          />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className="tw-p-1 tw-rounded-lg hover:tw-bg-primaryLight"
        >
          <Undo className="tw-w-5 tw-h-5 tw-stroke-black group-hover:tw-stroke-primaryLight" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className="tw-p-1 tw-rounded-lg hover:tw-bg-primaryLight"
        >
          <Redo className="tw-w-5 tw-h-5 tw-stroke-black group-hover:tw-stroke-primaryLight" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
