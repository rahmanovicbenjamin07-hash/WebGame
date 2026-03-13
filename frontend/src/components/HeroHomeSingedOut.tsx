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
            const res = await fetch("http://localhost:3001/location/new");
            
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
                <div className="relative ">
                    <img src={BgImg} className="absolute right-0 z-0"/>
                    <div className="relative z-10 flex flex-col gap-4 max-w-309.5 mx-auto pt-42.5">
                        <div className="flex flex-col gap-4">
                           <h1 className="text-primary text-[61px]">Explore the <br></br>world with <br></br>Geotagger!</h1>
                            <p className="max-w-105">Geotagger is webiste that allowes you to post picture and tag it on the map. Other user than try to locate it via Google Maps. </p>     
                        </div>                   
                        <Link to="/signup">
                            <Button variant="default">Sign up</Button>
                        </Link> 
                    </div>
                </div>

                <div className="max-w-324.5 mx-auto relative z-1 flex flex-col items-center mt-56">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-primary leading-[100%] text-center">Try yourself at Geotagger!</h4>
                        <p className="text-dark max-w-146.75 text-center">Try to guess the location of image by selecting position on the map. When you guess it, it gives you the error distance.</p>
                    </div>
                    <div className="flex gap-5 mt-16 mb-20">
                        {NewUpload.map((upload)=>
                            <LockGuess imageUrl={upload.imageUrl}></LockGuess>
                        )}
                    </div>
                    <Link to="/signup">
                        <Button variant="default">Sign up</Button>
                    </Link>                  
                </div>
                <div className="mt-27">
                    <Footer/>
                </div>               
            </div>
        </>
    )
}