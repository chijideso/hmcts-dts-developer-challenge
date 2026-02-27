import { notifications } from '@mantine/notifications';
import { IoCheckmarkCircleOutline } from 'react-icons/io5'; // Clean checkmark
import { BsExclamationOctagon } from 'react-icons/bs';     // Sharp error icon

export const showSuccess = (title: string, message: string) => {
  notifications.show({
    title,
    message,
    color: 'green',
    icon: <IoCheckmarkCircleOutline size={22} />, // React icons usually need slightly larger size than Tabler
    loading: false,
    autoClose: 4000,
    withCloseButton: true,
    styles: (theme) => ({
      root: { 
        borderLeft: `4px solid ${theme.colors.green[6]}`,
        backgroundColor: '#fff' 
      },
      title: { fontWeight: 700 },
      description: { color: theme.colors.gray[7] }
    }),
  });
};

export const showError = (title: string, message: string) => {
  notifications.show({
    title,
    message,
    color: 'red',
    icon: <BsExclamationOctagon size={20} />,
    loading: false,
    autoClose: false, 
    withCloseButton: true,
    styles: (theme) => ({
      root: { 
        borderLeft: `4px solid ${theme.colors.red[6]}`,
        backgroundColor: '#fff'
      },
      title: { fontWeight: 700 },
    }),
  });
};