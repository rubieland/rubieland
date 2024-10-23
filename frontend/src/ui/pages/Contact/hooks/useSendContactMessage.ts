import { useTranslation } from 'react-i18next';
import {
  ContactMessageBody,
  usePostContactMessage,
} from '@/api/contact/postContactMessage';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

const useSendContactMessage = () => {
  const { t } = useTranslation();

  const handleSendContactMessageError = (error: unknown) => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        return toast.error(t('form.contact.errors.contactMessageFailed'));
      } else if (error.response?.status === 500) {
        return toast.error(t('common.serverError'));
      }
    }
    console.error('Unexpected error:', error);
    return toast.error(t('common.genericError'));
  };

  const { mutateAsync: sendContactMessage, isPending } = usePostContactMessage({
    onSuccess: () => {
      toast.success(t('form.contact.success.contactMessageSuccess'));
    },
    onError: handleSendContactMessageError,
  });

  const onSubmit = async (data: ContactMessageBody) => {
    const loadingToastId = toast.loading(t('form.contact.loading'));

    try {
      const response = await sendContactMessage(data);

      toast.dismiss(loadingToastId);
      return response;
    } catch (error) {
      toast.dismiss(loadingToastId);
      throw error;
    }
  };

  return { onSubmit, isPending };
};

export default useSendContactMessage;
