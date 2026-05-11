import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/user.js";

export const inngest = new Inngest({ id: "interview-app" });

// ✅ USER CREATED
const syncUser = inngest.createFunction(
  { id: "sync-user", triggers: [{ event: "clerk/user.created" }] },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses?.[0]?.email_address ?? "",
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      profileImage: image_url,
    };

    await User.findOneAndUpdate({ clerkId: id }, newUser, {
      upsert: true,
      new: true,
    });
  }
);

// ✅ USER DELETED
const deleteUserfromDB = inngest.createFunction(
  { id: "delete-user-from-db", triggers: [{ event: "clerk/user.deleted" }] },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;

    await User.deleteOne({ clerkId: id });
  }
);

export const functions = [syncUser, deleteUserfromDB];