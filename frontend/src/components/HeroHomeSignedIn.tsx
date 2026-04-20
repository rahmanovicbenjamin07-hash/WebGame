import { Button } from "../components/ui/button";
import CloseGuess  from "../components/ui/CloseGuess";
import { Footer } from "./footer";
import NewUploads from "../components/ui/NewUploads";
import { NavigationSignedIn } from '../components/navigationSignedIn'
import { useState } from "react";
import { fetchUser } from "@/authentication/auth";
import { GuessingTab } from "./GuessingTab";
import { useIsMobile } from "@/utils/isMobile";
import { fetchGuesses } from "@/utils/querys/guesses-query";
import { useQuery, useInfiniteQuery} from '@tanstack/react-query'
import { fetchLocationsList } from "@/utils/querys/locations-query";

export function HeroHomeSignedIn(){
    const [open, setOpen] = useState(false);
    const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
    const isMobile = useIsMobile();
    const limit = isMobile ? 3 : 9;

    const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    });
    const user = userQuery.data;

    const {
        data: locationsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending: isLocationsPending,
        isError: isLocationsError,
        error: locationsError
    } = useInfiniteQuery({
        queryKey:['LocationsLoading', limit],
        queryFn: ({ pageParam }) => fetchLocationsList({ pageParam, limit }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === limit ? allPages.length * limit : undefined;
        },
    })

    const query = useQuery({
    queryKey:['bestGuesses'],
    queryFn: async () => await fetchGuesses(user?.id!),
    enabled: !!user?.id
    })

    /*Query error handling*/

    if (query.isError) return <p>{query.error.message}</p>;
    if (isLocationsError) return <p>{locationsError.message}</p>;

    if (isLocationsPending || (query.isPending && !!user?.id)) return <p>Loading...</p>;

    /*Query error handling*/

    const guesses = query.data || [];
    const locations = locationsData?.pages.flat() || [];

    const getLocationData = (id: number) => {
    setSelectedLocationId(id);
    setOpen(true);
}


    return(   
        <>
        <GuessingTab open={open} setOpen={setOpen} locationId={selectedLocationId}/>
        <NavigationSignedIn/>
        <div className="relative lg:pb-26.5 pb-29">
        <div className="max-w-325 lg:mx-auto  mx-8.75 lg:mt-20.75 mt-0">
            <div className="flex flex-col lg:gap-2 gap-4 lg:mt-0 mt-14">
                <h4 className="text-primary font-poppins lg:leading-13.25 leading-[150%]">Personal best guesses</h4>
                <p>Your personal best guesses appear here. Go on and try to beat your personal records or set new!</p>
                <div className="flex lg:gap-5 lg:mt-6 gap-4.25 mt-4 lg:overflow-visible overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x">
                    {guesses.map((guess) => 
                        <div key={guess.id} className="snap-start shrink-0 w-72 h-48.5 lg:flex-1 lg:w-auto lg:h-59">
                        <CloseGuess meters={guess.missMeters} imageUrl={guess.imageUrl} />
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-16 flex flex-col lg:gap-11 gap-12.75">
                <div className="flex flex-col gap-2">
                    <h4 className="text-primary font-poppins leading-13.25">New uploads</h4>
                    <p>New uploads from users. Try to guess all the locations by pressing on a picture.</p>
                    <div className="grid grid-cols-1 gap-6 mt-14 sm:grid-cols-2  lg:grid-cols-3 lg:gap-5 lg:mt-6">
                        {locations.map((location) => 
                            <NewUploads imageUrl={location.imageUrl} key={location.id} onClick={() => getLocationData(location.id)} />
                        )}
                    </div>
                </div>
                {hasNextPage && (
                    <Button variant="outline" className="mx-auto" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                        {isFetchingNextPage ? "Loading more..." : "Load more"}
                    </Button>
                    
                )}
                
            </div>           
        </div>
            <div className="absolute left-0 right-0 bottom-0">
                    <Footer/>
                </div>               
           </div>             
        </>
    )
}