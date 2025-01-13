import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './style'
import Image from 'next/image'

import PreviewImg from '../../assets/apppreview.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm';

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size='4xl'>
          Simplify your agenda
        </Heading>
        <Text size='xl'>
          Connect your calendar and let people book appointments on their own time.
        </Text>

        <ClaimUsernameForm />
      </Hero>
      <Preview>
        <Image 
          src={PreviewImg} 
          height={400}
          quality={100}
          priority
          alt='Calendar simulating the App'
        />
      </Preview>
    </Container>
  );
}
