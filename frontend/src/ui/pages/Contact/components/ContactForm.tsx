import ControlledTextInput from '@/ui/components/FormInputs/ControlledFormInputs/ControlledTextInput';
import ControlledTextarea from '@/ui/components/FormInputs/ControlledFormInputs/ControlledTextarea';
import LegalContentConfirmation from '@/ui/components/LegalContent/LegalContentConfirmation';
import { useContactFormValidation } from '../hooks/useContactFormValidation';
import { ContactMessageBody } from '@/api/contact/postContactMessage';
import CustomButton from '@/ui/components/Button/CustomButton';
import { useUserInfo } from '@/stores/SessionStore';
import { useTranslation } from 'react-i18next';
import { FormProvider } from 'react-hook-form';

interface ContactFormProps {
  onSubmit: (data: ContactMessageBody) => void;
}

const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const { t } = useTranslation();
  const user = useUserInfo();
  const form = useContactFormValidation(user);
  const { isDirty, isSubmitting } = form.formState;
  const isSubmitDisabled = !isDirty || isSubmitting;

  return (
    <FormProvider {...form}>
      <form>
        <ControlledTextInput
          label={t('form.contact.fullName')}
          name="fullName"
        />
        <ControlledTextInput
          label={t('form.contact.email')}
          name="email"
          type="email"
        />
        <ControlledTextInput label={t('form.contact.subject')} name="subject" />
        <ControlledTextarea label={t('form.contact.message')} name="message" />
        <LegalContentConfirmation />
        <div className="form-input">
          <CustomButton
            onClick={form.handleSubmit(onSubmit)}
            title={t('form.contact.submit')}
            isDisabled={isSubmitDisabled}
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default ContactForm;
