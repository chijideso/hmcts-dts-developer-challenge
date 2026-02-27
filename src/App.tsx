import { AppShell, Box, Text, Group, Paper, Title, Stack, Flex,Center } from '@mantine/core';
import { CaseForm } from './Features/Components/CaseForm';
import { CaseList } from './Features/Components/CaseList';

export default function App() {
  return (
    <AppShell
      header={{ height: 70 }}
      padding="md" // Padding for the overall main area
      styles={{
        main: { backgroundColor: '#f3f4f6' }
      }}
    >
      <AppShell.Header withBorder={false} bg="brand" px="xl">
        <Group h="100%" justify="space-between">
          <Text fw={800} size="xl" c="white" style={{ letterSpacing: '-0.5px' }}>
            HMCTS <Text span fw={400} opacity={0.8}>Case Manager</Text>
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        {/* Container-less Box to ensure 100% width usage */}
        <Box py="md">
          <Flex
            gap="xl"
            // Stack vertically on mobile ('column'), side-by-side on desktop ('row')
            direction={{ base: 'column', lg: 'row' }} 
            align="flex-start"
          >
            
            {/* Left Column: Form */}
            {/* On mobile it takes 100% width; on desktop it stays at 400px */}
            <Center>

           
            <Box style={{ flex: '0 0 auto', width: '100%', maxWidth: '500px' }}>
              <CaseForm />
            </Box>
 </Center>
            {/* Right Column: The Table */}
            {/* flex: 1 makes it fill the rest of the screen */}
            <Stack style={{ flex: 1, width: '100%', minWidth: 0 }} gap="lg">
              <Paper withBorder p="xl" radius="md" w={900} shadow="xs">
                <Title order={2} size="h3" mb="xl">Active Case Registry</Title>
                
                {/* Scroll container for the table so it doesn't break the layout on tiny screens */}
                <Box style={{ overflowX: 'auto' }}>
                  <CaseList />
                </Box>
              </Paper>
            </Stack>

          </Flex>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}