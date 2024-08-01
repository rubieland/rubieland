import { Controller, useFormContext } from 'react-hook-form';
import FileInput from '../FileInput';
import { useState } from 'react';

interface ControlledFileInputProps {
  acceptedMimetypes: string;
  isRequired?: boolean;
  withLabel?: boolean;
  multiple?: boolean;
  label: string;
  name: string;
}

const ControlledFileInput = ({
  acceptedMimetypes,
  isRequired = false,
  withLabel = true,
  multiple = true,
  label,
  name,
}: ControlledFileInputProps) => {
  const { control } = useFormContext();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<(string | ArrayBuffer | null)[]>([]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <div className="form-input">
          {withLabel && <label htmlFor={name}>{label}</label>}
          <FileInput
            acceptedMimetypes={acceptedMimetypes}
            isRequired={isRequired}
            isInvalid={!!error}
            multiple={multiple}
            onChange={(e) => {
              const target = e.target as HTMLInputElement & {
                files: FileList;
              };

              const selectedFiles = Array.from(target.files);
              setFiles(selectedFiles);

              const filePreviews = selectedFiles.map((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                return new Promise<string | ArrayBuffer | null>((resolve) => {
                  reader.onload = () => {
                    resolve(reader.result);
                  };
                });
              });

              Promise.all(filePreviews).then((previewResults) => {
                setPreviews(previewResults);
              });

              onChange(selectedFiles);
            }}
            label={label}
            name={name}
          />

          {previews.length > 0 && (
            <div className="file-previews">
              {previews.map((preview, index) =>
                preview && typeof preview === 'string' ? (
                  <div className="preview-img-container">
                    <img key={index} src={preview} alt={`Preview ${index}`} />
                  </div>
                ) : null,
              )}
            </div>
          )}

          {error && (
            <span className="input-error-message">{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default ControlledFileInput;
