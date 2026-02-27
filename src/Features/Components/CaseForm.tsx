import { 
  TextInput, 
  Textarea, 
  Select, 
  Button, 
  Paper, 
  Title, 
  Stack, 
  Group 
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, isNotEmpty, hasLength } from '@mantine/form';

import { addCase } from '../Redux/casesSlice';
import type { HMCTSCase } from '../cases/types';
import { notifications } from '@mantine/notifications';
import { useAppDispatch } from '../hooks/hook';

interface CaseFormProps {
  onSuccess?: () => void;
}

export const CaseForm = ({ onSuccess }: CaseFormProps) => {
  const dispatch = useAppDispatch();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      description: '',
      status: 'New' as const,
      dueDate: null as Date | null,
    },

    // Human-friendly validation messages
    validate: {
      title: hasLength({ min: 5, max: 50 }, 'Title must be between 5 and 50 characters'),
      description: isNotEmpty('Please provide a brief description of the case'),
      dueDate: isNotEmpty('A due date is required for case tracking'),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
  // 1. Convert to Date object safely to ensure .toISOString() exists
  const safeDate = values.dueDate ? new Date(values.dueDate) : null;

  const newCase: HMCTSCase = {
    id: crypto.randomUUID(),
    title: values.title,
    description: values.description,
    status: values.status,
    // 2. Only call toISOString if the date is valid
    dueDate: safeDate && !isNaN(safeDate.getTime()) 
      ? safeDate.toISOString() 
      : new Date().toISOString(), 
    createdAt: new Date().toISOString(),
  };

  dispatch(addCase(newCase));
  
  notifications.show({
    title: 'Success',
    message: 'Case has been successfully added to the registry',
    color: 'green',
  });

  form.reset();
  onSuccess?.();
};

  return (
    <Paper withBorder p="xl" radius="md" shadow="sm">
      <Title order={3} mb="lg">Register New Case</Title>
      
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            withAsterisk
            label="Case Title"
            placeholder="e.g., Civil Money Claim - Smith vs Jones"
            key={form.key('title')}
            {...form.getInputProps('title')}
          />

          <Textarea
            withAsterisk
            label="Case Description"
            placeholder="Details regarding the legal matter..."
            minRows={3}
            key={form.key('description')}
            {...form.getInputProps('description')}
          />

          <Group grow>
            <Select
              label="Initial Status"
              data={['New', 'In Progress', 'Closed']}
              key={form.key('status')}
              {...form.getInputProps('status')}
            />

            <DateInput
              withAsterisk
              label="Due Date"
              placeholder="Pick date"
              clearable
              minDate={new Date()} // Prevent past dates
              key={form.key('dueDate')}
              {...form.getInputProps('dueDate')}
            />
          </Group>

          <Group justify="flex-end" mt="xl">
            <Button variant="default" onClick={() => form.reset()}>Clear</Button>
            <Button type="submit" color="brand">Create Case</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};