import {
  ActionIcon,
  Button,
  Container,
  Group,
  Header,
  MantineProvider,
  Navbar,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import ClassCard, { CardClassProps } from "./ClassCard";

import { Plus } from "tabler-icons-react";
import { ModalsProvider, useModals } from "@mantine/modals";
import { formList, useForm } from "@mantine/form";

const NewClassForm = ({ toClose }: { toClose: () => void }) => {
  const newClassForm = useForm({
    initialValues: {
      name: "",
      code: "",
      room: "",
      textbookURL: "",
      studyNotesURL: "",
      gClassroomURL: "",
    },
  });
  return (
    <form
      onSubmit={newClassForm.onSubmit((values) => {
        const stored = localStorage.getItem("classes");
        const storedJSON = stored ? JSON.parse(stored) : [];
        localStorage.setItem(
          "classes",
          JSON.stringify([...storedJSON, { ...values }])
        );
        window.location.reload();
      })}
    >
      <TextInput
        mt="md"
        required
        label="Class Name"
        placeholder="Modern History"
        {...newClassForm.getInputProps("name")}
      />
      <TextInput
        required
        mt="md"
        label="Class Code"
        placeholder="12MOHI2"
        {...newClassForm.getInputProps("code")}
      />
      <TextInput
        mt="md"
        required
        label="Classroom"
        placeholder="CL09"
        {...newClassForm.getInputProps("room")}
      />
      <TextInput
        mt="md"
        required
        label="Textbook URL"
        placeholder="https://obook.digital/..."
        {...newClassForm.getInputProps("textbookURL")}
      />
      <TextInput
        mt="md"
        required
        label="Study Notes URL"
        placeholder="https://docs.google.com/..."
        {...newClassForm.getInputProps("studyNotesURL")}
      />
      <TextInput
        mt="md"
        required
        label="Google Classroom Page URL"
        placeholder="https://classroom.google.com/..."
        {...newClassForm.getInputProps("gClassroomURL")}
      />
      <Button fullWidth mt="md" color="orange" type="submit">
        Create Class
      </Button>
    </form>
  );
};

const App = () => {
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    const classes = localStorage.getItem("classes");
    setClasses(classes ? JSON.parse(classes) : []);
  }, []);

  const modals = useModals();

  const openNewClassModal = () => {
    const id = modals.openModal({
      title: "New Class",
      children: (
        <NewClassForm
          toClose={() => {
            modals.closeModal(id);
          }}
        />
      ),
    });
  };

  return (
    <>
      <Header height={60}>
        <Container>
          <Title className="text-orange-400">juno</Title>
        </Container>
      </Header>
      <Container mt="lg">
        <Title align="center">Hey there!</Title>
      </Container>
      <Container mt="xl">
        <Title order={2}>Your Classes</Title>
        <Group mt="sm" grow>
          {classes.length > 0 ? (
            classes.map((classProps: any) => (
              <ClassCard key={classProps.name} {...classProps} />
            ))
          ) : (
            <Text>
              You do not have any classes yet! Create one using the orange
              button to the bottom right.
            </Text>
          )}
        </Group>
      </Container>
      <ActionIcon
        className="absolute right-20 bottom-20 "
        color="orange"
        size={60}
        radius="xl"
        variant="filled"
        onClick={() => {
          openNewClassModal();
        }}
      >
        <Plus />
      </ActionIcon>
    </>
  );
};

export default App;
