import ControlledTextInput from '@/ui/components/FormInputs/ControlledFormInputs/ControlledTextInput';
import { useUpdatePasswordFormValidation } from '../hooks/useUpdatePasswordFormValidation';
import usePasswordVisibility from '../../AuthPages/Login/hooks/usePasswordVisibility';
import { UpdatePasswordBody } from '@/models/user/user.entity';
import CustomButton from '@/ui/components/Button/CustomButton';
import { useTranslation } from 'react-i18next';
import { FormProvider } from 'react-hook-form';

interface UpdatePasswordFormProps {
  onSubmit: (data: UpdatePasswordBody) => void;
}

const UpdatePasswordForm = ({ onSubmit }: UpdatePasswordFormProps) => {
  const { t } = useTranslation();

  const {
    toggleConfirmPasswordVisibility,
    toggleNewPasswordVisibility,
    togglePasswordVisibility,
    isConfirmPasswordVisible,
    isNewPasswordVisible,
    isPasswordVisible,
  } = usePasswordVisibility();

  const form = useUpdatePasswordFormValidation();
  const { isDirty, isSubmitting } = form.formState;
  const isSubmitDisabled = !isDirty || isSubmitting;

  return (
    <FormProvider {...form}>
      <form className="update-profile-form">
        <ControlledTextInput
          togglePasswordVisibility={togglePasswordVisibility}
          placeholder={t('form.user.currentPassword')}
          isPasswordVisible={isPasswordVisible}
          label={t('form.user.password')}
          autocomplete="new-password"
          name="currentPassword"
          type="password"
        />
        <ControlledTextInput
          togglePasswordVisibility={toggleNewPasswordVisibility}
          placeholder={t('form.user.newPassword')}
          isPasswordVisible={isNewPasswordVisible}
          label={t('form.user.newPassword')}
          autocomplete="new-password"
          name="newPassword"
          type="password"
        />
        <ControlledTextInput
          togglePasswordVisibility={toggleConfirmPasswordVisibility}
          placeholder={t('form.user.confirmNewPassword')}
          isPasswordVisible={isConfirmPasswordVisible}
          label={t('form.user.confirmNewPassword')}
          autocomplete="new-password"
          name="confirmNewPassword"
          type="password"
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

export default UpdatePasswordForm;
