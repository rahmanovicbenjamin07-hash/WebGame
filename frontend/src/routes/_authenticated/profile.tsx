import { createFileRoute } from '@tanstack/react-router'
import { ProfileForm } from '@/components/ProfileForm'
import { ProfileBestGuess } from '@/components/ProfileBestGuess'
import { NewLocationForm } from '@/components/NewLocationForm'
import { NavigationSignedIn } from '@/components/navigationSignedIn'
import { Footer } from '@/components/footer'
import { useUser } from '@/authentication/userContext'

export const Route = createFileRoute('/_authenticated/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = useUser();
  console.log(user)

  return (
    <div className="relative md:px-8.75 h-full">
      <div className="max-w-325 mx-auto ">
        <NavigationSignedIn />
        <div className="grid lg:gap-5 lg:mt-12.5 mt-0 gap-10.5 items-stretch lg:grid-cols-3 grid-cols-1 lg:pb-32 pb-31.75 lg:pt-0 pt-8 md:px-0 px-8.75">
          <ProfileForm />
          <NewLocationForm />
          <ProfileBestGuess />
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-0">
        <Footer />
      </div>
    </div>
  )
}
