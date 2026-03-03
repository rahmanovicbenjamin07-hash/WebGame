import { createFileRoute } from '@tanstack/react-router'
import { ProfileForm } from '@/components/ProfileForm'
import ClosesGuesesProfile from '@/components/ProfileBestGuess'
import { NewLocationForm } from '@/components/newLoactionForm'
import { NavigationSignedIn } from '@/components/navigationSignedIn'
import { Footer } from '@/components/footer'
import imageSample from "../assets/HeroSignedOutBg.png";

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
     <div className='max-w-325 mx-auto'>
        <NavigationSignedIn/>
        <div className='grid gap-5 items-stretch grid-cols-3 mb-17'>
          <ProfileForm/>
          <NewLocationForm/>
          <ClosesGuesesProfile meters={123} imageUrl={imageSample}/>
        </div>    
      </div>
      <Footer/>
    </>  
  )
}
