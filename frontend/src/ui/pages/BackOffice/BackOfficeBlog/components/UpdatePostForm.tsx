import ControlledTextEditor from '@/ui/components/FormInputs/ControlledFormInputs/ControlledTextEditor';
import ControlledTextInput from '@/ui/components/FormInputs/ControlledFormInputs/ControlledTextInput';
import ControlledFileInput from '@/ui/components/FormInputs/ControlledFormInputs/ControlledFileInput';
import ControlledCheckbox from '@/ui/components/FormInputs/ControlledFormInputs/ControlledCheckbox';
import { PostSchemaFormData } from '../../hooks/usePostFormValidation';
import CustomButton from '@/ui/components/Button/CustomButton';
import { UseFormHandleSubmit } from 'react-hook-form';
import { addAsterisk } from '@/utils/string.utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';

interface UpdatePostFormProps {
  handleSubmit: UseFormHandleSubmit<PostSchemaFormData>;
  onSubmit: (data: PostSchemaFormData) => void;
  isFormFilled: boolean;
}

const UpdatePostForm = ({
  handleSubmit,
  isFormFilled,
  onSubmit,
}: UpdatePostFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate({
      from: '/back-office/blog/update-post/$postId',
      to: '/back-office/blog',
    });
  };

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

      <ControlledTextEditor name="content" />

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
      <div className="form-input">
        <CustomButton
          onClick={handleNavigate}
          title={t('common.cancel')}
          type="button"
          style="error"
        />
      </div>
    </form>
  );
};

export default UpdatePostForm;
