import { PostSchemaFormData } from '@/ui/pages/BackOffice/hooks/usePostFormValidation';
import { Controller, useFormContext } from 'react-hook-form';
import Tiptap from '@/ui/components/TextEditor/Tiptap';

interface ControlledTextEditorProps {
  name: keyof PostSchemaFormData;
}

const ControlledTextEditor = ({
  name = 'content',
}: ControlledTextEditorProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Tiptap content={value} onContentChange={onChange} />

          {error && (
            <span className="input-error-message">{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default ControlledTextEditor;
