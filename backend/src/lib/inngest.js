import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import user from "../models/User.js";


export const inngest  = new Inngest({ id: "interview-app" });

const syncUser = inngest.createFunction(
    { id:"sync user" },
    {event:"clerk/user.created"},
    async ({ event }) => {
       // const { name,email,profileImage,clerkId } = event.data;
        await connectDB();
        const{id,email_address,first_name,last_name,image_url} = event.data


        const newUser = {
            clerkId:id,
            email:email_addresses[0].email_address,
            name: '$(first_name || "") ${last_name || ""}',
            profileImage:image_url
        }
       await user.create(newUser);
    }
)



const deleteUserfromDB = inngest.createFunction(
    { id:"delete-user-from-DB"},
    {event:"clerk/user.deleted"},
    async ({ event }) => {
      //  const { name,email,profileImage,clerkId } = event.data;
        await connectDB();



        const{id} = event.data       
       await user.deleteOne({ clerkId: id });
    }
)

export const fucntions = {syncUser, deleteUserfromDB};