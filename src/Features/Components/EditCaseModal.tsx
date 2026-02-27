import { Modal, Button, TextInput, Textarea, Select, Stack, Group, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, isNotEmpty } from '@mantine/form';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/hook';
import { updateCase } from '../Redux/casesSlice';
import type { HMCTSCase } from '../cases/types';

interface EditCaseModalProps {
  opened: boolean;
  onClose: () => void;
  caseData: HMCTSCase | null;
}

export const EditCaseModal = ({ opened, onClose, caseData }: EditCaseModalProps) => {
  const dispatch = useAppDispatch();
  
  const form = useForm({
    // 1. Remove 'mode: uncontrolled' for the Edit modal. 
    // Controlled mode is more reliable for "pre-filled" forms.
    initialValues: {
      title: '',
      description: '',
      status: 'New' as HMCTSCase['status'],
      dueDate: new Date(),
    },
    validate: {
      title: isNotEmpty('Title is required'),
      description: isNotEmpty('Description is required'),
    },
  });

  // 2. Critical Fix: Reset form whenever 'caseData' changes OR the modal opens
  useEffect(() => {
    if (caseData && opened) {
      form.setValues({
        title: caseData.title,
        description: caseData.description,
        status: caseData.status,
        dueDate: new Date(caseData.dueDate),
      });
    }
  }, [caseData, opened]); // Added 'opened' here

  const handleSave = (values: typeof form.values) => {
    if (!caseData) return;

    dispatch(updateCase({
      ...caseData, // Keep the original ID and createdAt
      ...values,
      dueDate: values.dueDate.toISOString(),
    }));
    onClose();
  };

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={<Text fw={700}>Edit Case Details</Text>} 
      centered 
      size="xl"
       radius={10}
       padding={20}
    >
      {/* 3. Guard: Don't show the form if the data isn't loaded yet */}
      {caseData ? (
        <form onSubmit={form.onSubmit(handleSave)}>
          <Stack>
            <TextInput 
              label="Title" 
              withAsterisk 
              {...form.getInputProps('title')} 
            />
            <Textarea 
              label="Description" 
              withAsterisk 
              minRows={3} 
              {...form.getInputProps('description')} 
            />
            <Group grow>
              <Select 
                label="Status" 
                data={['New', 'In Progress', 'Closed']} 
                {...form.getInputProps('status')} 
              />
              <DateInput 
                label="Due Date" 
                withAsterisk 
                {...form.getInputProps('dueDate')} 
              />
            </Group>
            <Group justify="flex-end" mt="md">
              <Button variant="subtle" onClick={onClose}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </Group>
          </Stack>
        </form>
      ) : (
        <Text c="dimmed" ta="center" py="xl">Loading case data...</Text>
      )}
    </Modal>
  );
};