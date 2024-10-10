import ControlledTextInput from '@/ui/components/FormInputs/ControlledFormInputs/ControlledTextInput';
import ControlledFileInput from '@/ui/components/FormInputs/ControlledFormInputs/ControlledFileInput';
import ControlledTextarea from '@/ui/components/FormInputs/ControlledFormInputs/ControlledTextarea';
import ControlledCheckbox from '@/ui/components/FormInputs/ControlledFormInputs/ControlledCheckbox';
import { CreatePostSchemaFormData } from '../../hooks/useCreatePostFormValidation';
import CustomButton from '@/ui/components/Button/CustomButton';
import { UseFormHandleSubmit } from 'react-hook-form';
import { addAsterisk } from '@/utils/string.utils';
import { useTranslation } from 'react-i18next';

interface CreatePostFormProps {
  handleSubmit: UseFormHandleSubmit<CreatePostSchemaFormData>;
  onSubmit: (data: CreatePostSchemaFormData) => void;
  isFormFilled: boolean;
}

const CreatePostForm = ({
  handleSubmit,
  isFormFilled,
  onSubmit,
}: CreatePostFormProps) => {
  const { t } = useTranslation();

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
