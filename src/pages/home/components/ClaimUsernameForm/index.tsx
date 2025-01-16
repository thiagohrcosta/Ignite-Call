import { Button, Text, TextInput } from "@ignite-ui/react";
import { Form, FormAnnotation } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";

const claimUsernameFormSchema = z.object({
  username: z.string()
    .min(3, { message: 'Username must have at least three letters.' })
    .regex(/^([a-z\-]+)$/i, { message: 'Username cannot contain numbers or symbols.' })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }
  
  return (
    <>
      <Form as='form' onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput 
          size='sm' 
          prefix='ignite.com/' 
          placeholder='your-user' 
          {...register('username')}
        />
        <Button size='sm' type='submit'>
          Reserve
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size='sm'>
          {errors.username ? errors.username.message : 'Type your username.'}
        </Text>
      </FormAnnotation>
    </>
  )
}