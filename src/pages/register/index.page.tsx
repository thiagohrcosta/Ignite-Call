import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Container, Form, FormError, Header } from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const registerFormSchema = z.object({
  username: z.string()
    .min(3, { message: 'Username must have at least three letters.' })
    .regex(/^([a-z\-]+)$/i, { message: 'Username cannot contain numbers or symbols.' })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, { message: 'Full name must have at least three letters.'})
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting }} = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema)
  })

  const router = useRouter()

  useEffect(() => {
    if(router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username])

  async function handleRegister(data: RegisterFormData) {
    console.log(data)
  }

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

      <Form as='form' onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size='sm'>Username</Text>
          <TextInput 
            prefix='ignite.com/'
            placeholder='your-username'
            {...register('username')}
          />

          {errors.username && (
            <FormError size='sm'>
              {errors.username.message}
            </FormError>
          )}
        </label>

        <label>
          <Text size='sm'>Full name</Text>
          <TextInput 
            placeholder='your name'
            {...register('name')}
          />
          {errors.name && (
            <FormError size='sm'>
              {errors.name.message}
            </FormError>
          )}
        </label>

        <Button type='submit' disabled={isSubmitting}>
          Next step
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}