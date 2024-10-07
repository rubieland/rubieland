import ControlledTextInput from '@/ui/components/FormInputs/ControlledFormInputs/ControlledTextInput';
import ControlledFileInput from '@/ui/components/FormInputs/ControlledFormInputs/ControlledFileInput';
import ControlledTextarea from '@/ui/components/FormInputs/ControlledFormInputs/ControlledTextarea';
import ControlledCheckbox from '@/ui/components/FormInputs/ControlledFormInputs/ControlledCheckbox';
import { useCreatePostFormValidation } from '../../hooks/useCreatePostFormValidation';
import { acceptedMimeTypesString } from '@/core/fileUploadConfig';
import CustomButton from '@/ui/components/Button/CustomButton';
import { addAsterisk } from '@/utils/string.utils';
import { isFormValid } from '@/utils/form.utils';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface CreatePostFormProps {
  onSubmit: () => void;
}

const CreatePostForm = ({ onSubmit }: CreatePostFormProps) => {
  const { t } = useTranslation();
  const form = useCreatePostFormValidation();
  const watchedValues = form.watch(['title', 'content']);
  const isFormFilled = isFormValid(watchedValues);

  // TODO: remove console.log
  console.log(form.getValues());

  return (
    <FormProvider {...form}>
      <form>
        {/* TODO: see how to implement file upload input */}
        <ControlledFileInput
          acceptedMimetypes={acceptedMimeTypesString}
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
            onClick={form.handleSubmit(onSubmit)}
            isDisabled={!isFormFilled}
            title={t('common.send')}
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default CreatePostForm;
