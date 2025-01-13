import { Heading, MultiStep, Text } from "@ignite-ui/react";
import { Container, Header } from "./styles";

export default function Register() {
  return (
    <Container>
      <Header>
        <Heading as='strong'>
          Welcome to Ignite Call!
        </Heading>
        <Text>
          We need some information to create your profile! Don’t worry, you can edit this information later.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>
    </Container>
  )
}