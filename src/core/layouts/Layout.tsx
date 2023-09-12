import Head from "next/head"
import React, { PropsWithChildren, Suspense } from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { AppShell, Navbar, Header, Text, Footer, Anchor } from "@mantine/core"
import { Horizontal } from "mantine-layout-components"
import Link from "next/link"

type LayoutProps = {
  title?: string
  maxWidth?: number
}

const Layout: BlitzLayout<PropsWithChildren<LayoutProps>> = ({
  title,
  children,
  maxWidth = 800,
}) => {
  const thisYear = new Date().getFullYear()

  return (
    <>
      <Head>
        <title>{title || "next-blitz-refapp"}</title>
        <link rel="icon" href="/image/favicon.ico" />
      </Head>

      <AppShell
        padding="md"
        // navbar={
        //   <Navbar width={{ base: 300 }} height={500} p="xs">
        //     {/* Navbar content */}
        //   </Navbar>
        // }
        header={
          <Header height={45} p="xs">
            <Horizontal debug fullH>
              <Anchor component={Link} underline={false} color="gray.3" href={Routes.Home()}>
                Refapp
              </Anchor>
            </Horizontal>
          </Header>
        }
        footer={
          <Footer height={35}>
            <Horizontal fullH fullW center>
              <Text fz="xs" color="dimmed">
                address, copyright, {thisYear}
              </Text>
            </Horizontal>
          </Footer>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
      >
        {/* Your application here */}
        <Suspense fallback={"Loading..."}>{children}</Suspense>
      </AppShell>
    </>
  )
}

export default Layout
