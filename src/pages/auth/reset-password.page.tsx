import Layout from "src/core/layouts/Layout"
import { FORM_ERROR } from "src/core/components/Form"
import { ResetPassword } from "@/features/auth/schemas"
import resetPassword from "@/features/auth/mutations/resetPassword"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import { assert } from "blitz"
import { PasswordInput, Title, Button } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"

const ResetPasswordPage: BlitzPage = () => {
  const router = useRouter()
  const token = router.query.token?.toString()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  const form = useForm({
    initialValues: {
      password: "",
      passwordConfirmation: "",
      token,
    },

    validate: zodResolver(ResetPassword),
  })

  const onSubmit = async (values: {
    password: string
    passwordConfirmation: string
    token: string
  }): Promise<{ FORM_ERROR: any } | undefined> => {
    console.dir({ values })
    try {
      assert(token, "token is required.")
      await resetPasswordMutation({ ...values, token })
    } catch (error: any) {
      if (error.name === "ResetPasswordError") {
        return {
          [FORM_ERROR]: error.message,
        }
      } else {
        return {
          [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
        }
      }
    }
  }

  return (
    <Layout title="Reset Your Password">
      <Title>Set a New Password</Title>

      {isSuccess ? (
        <div>
          <h2>Password Reset Successfully</h2>
          <p>
            Go to the <Link href={Routes.Home()}>homepage</Link>
          </p>
        </div>
      ) : (
        <form
          onSubmit={form.onSubmit((values) => {
            console.log(values)
          })}
        >
          <PasswordInput
            withAsterisk
            label="New Password"
            placeholder=""
            {...form.getInputProps("password")}
          />

          <PasswordInput
            withAsterisk
            label="Confirm New Password"
            placeholder=""
            {...form.getInputProps("passwordConfirmation")}
          />

          <Button type="submit">Submit</Button>
        </form>
      )}
    </Layout>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"

export default ResetPasswordPage
