import ControlledTextInput from '@/ui/components/FormInputs/ControlledFormInputs/ControlledTextInput';
import ControlledFileInput from '@/ui/components/FormInputs/ControlledFormInputs/ControlledFileInput';
import ControlledTextarea from '@/ui/components/FormInputs/ControlledFormInputs/ControlledTextarea';
import ControlledCheckbox from '@/ui/components/FormInputs/ControlledFormInputs/ControlledCheckbox';
import { CreatePostSchemaFormData } from '../../hooks/useCreatePostFormValidation';
import CustomButton from '@/ui/components/Button/CustomButton';
import { UseFormHandleSubmit, UseFormReset } from 'react-hook-form';
import { addAsterisk } from '@/utils/string.utils';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

interface CreatePostFormProps {
  handleSubmit: UseFormHandleSubmit<CreatePostSchemaFormData>;
  onSubmit: (data: CreatePostSchemaFormData) => void;
  reset: UseFormReset<CreatePostSchemaFormData>;
  isSubmitSuccessful: boolean;
  isFormFilled: boolean;
}

const CreatePostForm = ({
  isSubmitSuccessful,
  handleSubmit,
  isFormFilled,
  onSubmit,
  reset,
}: CreatePostFormProps) => {
  const { t } = useTranslation();

  // reset form when the post is successfully created
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form>
      <ControlledFileInput
        label={t('form.post.picture')}
        pictureType="postPicture"
        name="picture"
      />
      <ControlledTextInput
        placeholder={addAsterisk(t('form.post.title'))}
        label={t('form.post.title')}
        name="title"
      />
      <ControlledTextarea
        placeholder={addAsterisk(t('form.post.content'))}
        label={t('form.post.content')}
        name="content"
      />
      <ControlledCheckbox
        label={t('form.post.isPublished')}
        name="isPublished"
      />
      <div className="form-input">
        <CustomButton
          onClick={handleSubmit(onSubmit)}
          isDisabled={!isFormFilled}
          title={t('common.send')}
          type="submit"
        />
      </div>
    </form>
  );
};

export default CreatePostForm;
