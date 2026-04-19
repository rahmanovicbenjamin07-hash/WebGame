export const fetchUserAvatar = async (userId: number)=>{
        try {
            const res = await fetch(`http://localhost:3001/user/${userId}`)
            if(!res.ok) {
                throw new Error("Failed to get the avatar");
            }

            const data = await res.json();
            return data[0]?.image ?? null;            
        } catch (error) {
            console.log(error);
        }
    }