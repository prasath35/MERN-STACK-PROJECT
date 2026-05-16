import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/user.js";
import { upsertStreamUser, deleteStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "interview-app" });

// Sync user when Clerk user is created
const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const {
      id,
      email_addresses,
      first_name,
      last_name,
      image_url,
    } = event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses?.[0]?.email_address || "",
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      profileImage: image_url,
    };

    // Create or update user in MongoDB
    await User.findOneAndUpdate(
      { clerkId: id },
      newUser,
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    // Sync user to Stream
    await upsertStreamUser({
      id: newUser.clerkId.toString(),
      name: newUser.name,
      image: newUser.profileImage,
    });
  }
);

// Delete user when Clerk user is deleted
const deleteUserfromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;

    // Delete from MongoDB
    await User.deleteOne({ clerkId: id });

    // Delete from Stream
    await deleteStreamUser(id.toString());
  }
);

export const functions = [syncUser, deleteUserfromDB];