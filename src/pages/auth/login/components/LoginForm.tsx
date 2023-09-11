import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { AuthenticationError, PromiseReturnType } from "blitz"
import { FORM_ERROR } from "@/core/components/Form"
import login from "@/features/auth/mutations/login"
import { useMutation } from "@blitzjs/rpc"
import { useForm, zodResolver } from "@mantine/form"
import { TextInput, Button, PasswordInput, Title } from "@mantine/core"
import { Vertical } from "mantine-layout-components"
import { Login } from "@/features/auth/schemas"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  const onSubmit = async (values) => {
    try {
      const user = await loginMutation(values)
      props.onSuccess?.(user)
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
      } else {
        return {
          [FORM_ERROR]:
            "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
        }
      }
    }
  }

  const form = useForm({
    validate: zodResolver(Login),
    initialValues: {
      email: "",
      password: "",
    },
  })

  return (
    <Vertical>
      <Title>Login</Title>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          withAsterisk
          label="Password"
          placeholder=""
          {...form.getInputProps("password")}
        />

        <Button type="submit">Submit</Button>
      </form>

      <Link href={Routes.ForgotPasswordPage()}>Forgot your password?</Link>

      <div style={{ marginTop: "1rem" }}>
        Or <Link href={Routes.SignupPage()}>Sign Up</Link>
      </div>
    </Vertical>
  )
}

export default LoginForm
