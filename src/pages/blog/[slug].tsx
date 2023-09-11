import { useParam } from "@blitzjs/next"

const BlogPostPage = () => {
  const slug = useParam("slug", "string")

  return <div>BlogPostPage: {slug}</div>
}

export default BlogPostPage
