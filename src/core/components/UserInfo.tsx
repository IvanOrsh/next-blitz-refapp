import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import logout from "@/features/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Button } from "@mantine/core"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */
export const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (!currentUser) return null
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
}
