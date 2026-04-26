import { NavigationSignedOut } from "../Navigations/navigationSignedOut";
import { Button } from "../ui/button";
import BgImg from "../../assets/HeroSignedOutBg.png"
import LockGuess from "../ui/LockedGuess";
import { Link } from "@tanstack/react-router";
import { useQuery } from '@tanstack/react-query'
import { loadUploadSignedOut } from "@/utils/querys/locations-query";
import { SectionHeading } from "../ui/SectionHeading";
import FooterWrapper from "../Wrappers/footer-wrapper";
import PageWrapper from "../Wrappers/dashboard-page-wrapper";


export function DashboardSingedOut(){
    
    const query = useQuery({
        queryKey:['uploadsSignedOut'],
        queryFn: async () => await loadUploadSignedOut()
    })

    if(query.isError){
    return <p>{query.error.message}</p>
  }

  if(query.isPending) {
    return <p>Loading...</p>
  }

    return (
    <>
        <NavigationSignedOut/>
        <PageWrapper className="lg:pb-42 pb-26">
            <div className="lg:relative flex lg:flex-row flex-col lg:items-start gap-10.5 lg:pl-0 lg:pr-0 pl-2.75 pr-5.25">
                <img src={BgImg} className="lg:absolute static lg:right-0 lg:z-0 order-2"/>
                <div className="2xl:min-w-334.75 lg:min-w-full mx-auto max-w-85.25">
                    <div className="relative z-10 flex lg:text-left text-justify lg:items-start items-center lg:flex flex-col gap-8 lg:gap-4 lg:pt-42.5 pt-12 order-1 w-full 2xl:pl-0 sm:pl-8.75">
                        <div className="flex flex-col gap-4 md:items-start w-full lg:max-w-none 2xl:max-w-85.25">
                            <h1 className="text-primary font-medium text-[61px] md:block hidden">Explore the <br/>world with <br/>Geotagger!</h1>
                            <h4 className="text-primary md:hidden block text-center leading-[150%]">Explore the world with Geotagger!</h4>
                            <p className="max-w-105">Geotagger is a website that allows you to post a picture and tag it on the map. Other users then try to locate it via Google Maps.</p>
                        </div>
                        <Link to="/AuthPage/signup" className="lg:self-start items-center">
                            <Button variant="default">Sign up</Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="lg:max-w-324.5 max-w-86.25 mx-auto relative z-1 flex flex-col items-center lg:mt-56 mt-21.75">
                <SectionHeading title="Try yourself at Geotagger!"
                    subtitle="Try to guess the location of image by selecting position on the map. When you guess it, it gives you the error distance."
                    center
                />
                <div className="flex lg:flex-row flex-col lg:gap-5 gap-6 lg:mt-16 mt-18 lg:mb-20 mb-10.5 lg:px-8.75 2xl:px-0 items-stretch">
                    {query.data.map((upload) =>
                        <LockGuess key={upload.imageUrl} imageUrl={upload.imageUrl}/>
                    )}
                </div>
                <Link to="/AuthPage/signup">
                    <Button variant="default">Sign up</Button>
                </Link>
            </div>
            <FooterWrapper/>
        </PageWrapper>
    </>
);
}