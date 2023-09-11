import { useParam } from "@blitzjs/next"

const TimPage = () => {
  const id = useParam("id", "string")

  return <div>{id}&apos;s personal page</div>
}

export default TimPage
