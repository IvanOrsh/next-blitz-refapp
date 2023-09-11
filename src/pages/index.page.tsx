import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { UserInfo } from "@/core/components/UserInfo"

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      {/* Auth */}

      <div>
        <UserInfo />
      </div>
    </Layout>
  )
}

export default Home
