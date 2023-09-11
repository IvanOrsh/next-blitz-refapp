import Head from "next/head"
import React, { FC, PropsWithChildren, Suspense } from "react"
import { BlitzLayout } from "@blitzjs/next"

type LayoutProps = {
  title?: string
  maxWidth?: number
}

const Layout: BlitzLayout<PropsWithChildren<LayoutProps>> = ({
  title,
  children,
  maxWidth = 800,
}) => {
  return (
    <>
      <Head>
        <title>{title || "next-blitz-refapp"}</title>
        <link rel="icon" href="/image/favicon.ico" />
      </Head>

      <Suspense fallback={"Loading..."}>
        <div
          style={{
            width: "100%",
            maxWidth,
          }}
        >
          {children}
        </div>
      </Suspense>
    </>
  )
}

export default Layout
