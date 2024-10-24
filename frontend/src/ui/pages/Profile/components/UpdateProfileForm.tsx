import ControlledTextInput from '@/ui/components/FormInputs/ControlledFormInputs/ControlledTextInput';
import ControlledFileInput from '@/ui/components/FormInputs/ControlledFormInputs/ControlledFileInput';
import { useUpdateProfileFormValidation } from '../hooks/useUpdateProfileFormValidation';
import CustomButton from '@/ui/components/Button/CustomButton';
import { UpdateProfileBody } from '@/models/user/user.entity';
import { useTranslation } from 'react-i18next';
import { FormProvider } from 'react-hook-form';
import '../styles/UpdateProfileForm.scss';

interface UpdateProfileFormProps {
  onSubmit: (data: UpdateProfileBody) => void;
  existingProfileData: UpdateProfileBody | null;
}

const UpdateProfileForm = ({
  existingProfileData,
  onSubmit,
}: UpdateProfileFormProps) => {
  const { t } = useTranslation();

  const form = useUpdateProfileFormValidation(existingProfileData);
  const { isDirty, isSubmitting } = form.formState;
  const isSubmitDisabled = !isDirty || isSubmitting;

  return (
    <FormProvider {...form}>
      <form className="update-profile-form">
        <ControlledFileInput
          label={t('form.user.avatarLabel')}
          pictureType="avatar"
          name="avatar"
        />
        {/* TODO: add a delete avatar button setting the avatar to null */}
        <ControlledTextInput
          placeholder={t('form.user.firstName')}
          label={t('form.user.firstName')}
          autocomplete="given-name"
          name="firstName"
        />
        <ControlledTextInput
          placeholder={t('form.user.lastName')}
          label={t('form.user.lastName')}
          autocomplete="family-name"
          name="lastName"
        />
        <ControlledTextInput
          placeholder={`${t('form.user.phoneLabel')} (${t('form.user.phonePlaceholder')})`}
          label={t('form.user.phoneLabel')}
          autocomplete="tel"
          name="phone"
        />
        <ControlledTextInput
          placeholder={t('form.user.emailLabel')}
          label={t('form.user.emailPlaceholder')}
          autocomplete="email"
          name="email"
          type="email"
        />

        <div className="form-input">
          <CustomButton
            onClick={form.handleSubmit(onSubmit)}
            isDisabled={isSubmitDisabled}
            title={t('common.edit')}
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateProfileForm;
