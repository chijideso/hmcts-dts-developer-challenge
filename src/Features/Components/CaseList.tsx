import { Table, Badge, Button, Text, Stack } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../hooks/hook';
import { deleteCase } from '../Redux/casesSlice';
import { EditCaseModal } from './EditCaseModal';
import type { HMCTSCase } from '../cases/types';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

export const CaseList = () => {
  const cases = useAppSelector((state) => state.cases.items);
  const dispatch = useAppDispatch();
  // Modal state management
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedCase, setSelectedCase] = useState<HMCTSCase | null>(null);

  const handleEditClick = (item: HMCTSCase) => {
    setSelectedCase(item);
    open();
  };

 const rows = cases.map((item) => (
  <Table.Tr key={item.id}>
    <Table.Td py="md"> {/* Added vertical padding */}
      <Stack gap={2}>
        <Text fw={700} size="sm">{item.title}</Text>
        <Text size="xs" c="dimmed" lineClamp={1}>{item.description}</Text>
      </Stack>
    </Table.Td>
    <Table.Td>
      <Badge 
        variant="light" 
        color={item.status === 'New' ? 'blue' : item.status === 'In Progress' ? 'orange' : 'green'}
        size="sm"
        radius="sm"
      >
        {item.status}
      </Badge>
    </Table.Td>
    <Table.Td>
      <Text size="sm" c="gray.7">{new Date(item.dueDate).toLocaleDateString()}</Text>
    </Table.Td>
    <Table.Td>
        <Button variant="light" size="xs" onClick={() => handleEditClick(item)}>
            Edit
          </Button>
      <Button variant="subtle" color="red" size="xs" onClick={() => dispatch(deleteCase(item.id))}>
        Delete
      </Button>
    </Table.Td>
  </Table.Tr>
));

  return (
    <>
  
    <Table highlightOnHover verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Case Details</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Due Date</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows.length > 0 ? rows : <Table.Tr><Table.Td colSpan={4}>No cases found.</Table.Td></Table.Tr>}</Table.Tbody>
    </Table>
        <EditCaseModal opened={opened} onClose={close} caseData={selectedCase} />  </>
  );
};