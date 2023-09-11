import { Suspense } from "react"
import { MantineProvider, MantineThemeOverride } from "@mantine/core"
import { ErrorBoundary, AppProps } from "@blitzjs/next"
import { withBlitz } from "@/blitz-client"
import { RootErrorFallback } from "../core/components/RootErrorFallback"
import "@/styles/globals.css"

const mantineTheme: MantineThemeOverride = {
  colorScheme: "light",
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
        <Suspense fallback="Loading...">{<Component {...pageProps} />}</Suspense>
      </MantineProvider>
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
