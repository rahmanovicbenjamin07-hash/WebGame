import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import appCss from '../styles.css?url'
import { UserProvider, type UserContextType } from '@/authentication/userContext'
import { fetchUser } from '@/authentication/auth'
import { Toaster } from "@/components/ui/sonner"

const queryClient = new QueryClient()

export const Route = createRootRouteWithContext<{
      queryClient:QueryClient,
      auth: UserContextType | null;
}>()({
  beforeLoad: async () => {
  const user = await fetchUser().catch(() => null)  
  return {
    auth: {
      isAuthenticated: !!user,
      user,
    }
  }
},
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'GeoTagger',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
      <html lang="en">
        <head>
          <HeadContent />
        </head>
        <body>
            {children}
            <Toaster />
            <TanStackDevtools
              config={{
                position: 'bottom-right',
              }}
              plugins={[
                {
                  name: 'Tanstack Router',
                  render: <TanStackRouterDevtoolsPanel />,
                },
              ]}
            />
            <Scripts />
        </body>
      </html>
    </QueryClientProvider>
  </UserProvider> 
  )
}
