import Link from "next/link"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import logout from "@/features/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { Button } from "@mantine/core"
import { Vertical } from "mantine-layout-components"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */
export const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Button
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <Vertical fullH>
        <Button component={Link} href={Routes.SignupPage()}>
          <strong>Sign Up</strong>
        </Button>
        <Button component={Link} href={Routes.LoginPage()}>
          <strong>Login</strong>
        </Button>
      </Vertical>
    )
  }
}
