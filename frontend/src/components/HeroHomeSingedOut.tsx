import { useState,useEffect } from "react";
import { NavigationSignedOut } from "./navigationSignedOut";
import { Button } from "./ui/button";
import BgImg from "../assets/HeroSignedOutBg.png"
import LockGuess from "./ui/LockedGuess";
import { Footer } from "./footer";
import { Link } from "@tanstack/react-router";

interface NewUpload {
    id:number,
    imageUrl:string
}

export function HeroHomeSignedOut(){

    const [NewUpload,setNewUpload] = useState<NewUpload[]>([]);

    useEffect(()=> {
        const load = async () => {
            const res = await fetch("http://localhost:3001/location/new/signed-out");
            
            if(!res.ok) throw new Error("Failed to fetch Uploads");
            const data: NewUpload[] = await res.json();
            setNewUpload(data);
    };
    load();
},[])

    return(
        <>
            <div>
                <NavigationSignedOut/>
                <div className="lg:relative flex lg:flex-row flex-col lg:items-start gap-10.5 lg:pl-0 lg:pr-0 pl-2.75 pr-5.25">
                    <img src={BgImg} className="lg:absolute static lg:right-0 lg:z-0 order-2"/>
                    <div className="lg:min-w-334.75 mx-auto max-w-85.25">
                        <div className="relative z-10 flex lg:text-left text-justify lg:items-start items-center lg:flex flex-col gap-8 lg:gap-4 lg:pt-42.5 pt-12 order-1 w-full">
                                <div className="flex flex-col gap-4 lg:items-start w-full lg:max-w-none max-w-85.25">
                                    <h1 className="text-primary text-[61px] md:block hidden">Explore the <br></br>world with <br></br>Geotagger!</h1>
                                    <h4 className="text-primary md:hidden block text-center leading-[150%]">Explore the world with Geotagger!</h4>
                                <p className="max-w-105">Geotagger is webiste that allowes you to post picture and tag it on the map. Other user than try to locate it via Google Maps. </p>     
                                </div>                   
                                <Link to="/signup" className="lg:self-start items-center">
                                    <Button variant="default">Sign up</Button>
                                </Link> 
                        </div>
                    </div> 
                </div>

                <div className="lg:max-w-324.5 max-w-86.25 mx-auto relative z-1 flex flex-col items-center lg:mt-56 mt-21.75 ">
                    <div className="flex flex-col lg:gap-4 gap-2">
                        <h4 className="text-primary lg:leading-[100%] leading-[150%] text-center lg:text-[35px] text-2xl">Try yourself at Geotagger!</h4>
                        <p className="text-dark max-w-146.75 text-center">Try to guess the location of image by selecting position on the map. When you guess it, it gives you the error distance.</p>
                    </div>
                    <div className="flex lg:flex-row flex-col lg:gap-5 gap-6 lg:mt-16 mt-18 lg:mb-20 mb-10.5 px-8.75 lg:px-0 items-stretch">
                        {NewUpload.map((upload)=>
                            <LockGuess imageUrl={upload.imageUrl}></LockGuess>
                        )}
                    </div>
                    <Link to="/signup">
                        <Button variant="default">Sign up</Button>
                    </Link>                  
                </div>
                <div className="lg:mt-27 mt-9.75">
                    <Footer/>
                </div>               
            </div>
        </>
    )
}