import { ActionIcon, Card, Group, Text, Title, Tooltip } from "@mantine/core";
import { Artboard, Book, Book2, Link } from "tabler-icons-react";

export interface CardClassProps {
  name: string;
  code: string;
  room: string;
  textbookURL: string;
  studyNotesURL: string;
  gClassroomURL: string;
}

const ClassCard = (props: CardClassProps) => (
  <Card shadow="md" p="xl" radius="sm">
    <Title order={3}>{props.name}</Title>
    <Text color="dimmed" size="sm">
      {props.code} • {props.room}
    </Text>
    <Group mt="sm">
      <Tooltip label="Textbook" withArrow>
        <ActionIcon color="orange" component="a" href={props.textbookURL}>
          <Book />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Study Notes" withArrow>
        <ActionIcon color="orange" component="a" href={props.studyNotesURL}>
          <Book2 />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Google Classroom" withArrow>
        <ActionIcon color="orange" component="a" href={props.gClassroomURL}>
          <Artboard />
        </ActionIcon>
      </Tooltip>
    </Group>
  </Card>
);

export default ClassCard;
