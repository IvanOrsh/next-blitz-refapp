import { FORM_ERROR } from "@/core/components/Form"
import signup from "@/features/auth/mutations/signup"
import { Signup } from "@/features/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import { Vertical } from "mantine-layout-components"
import { Title, TextInput, PasswordInput, Button } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  const onSubmit = async (values: {
    email: string
    password: string
  }): Promise<
    { email: string; FORM_ERROR?: undefined } | { FORM_ERROR: any; email?: undefined } | undefined
  > => {
    try {
      await signupMutation(values)
      props.onSuccess?.()
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        // This error comes from Prisma
        return { email: "This email is already being used" }
      } else {
        return { [FORM_ERROR]: error.toString() }
      }
    }
  }

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: zodResolver(Signup),
  })

  return (
    <Vertical>
      <Title>Create an Account</Title>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />

        <TextInput
          withAsterisk
          label="Name"
          placeholder="Your name here"
          {...form.getInputProps("name")}
        />

        <PasswordInput
          withAsterisk
          label="Password"
          placeholder=""
          {...form.getInputProps("password")}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Vertical>
  )
}

export default SignupForm
