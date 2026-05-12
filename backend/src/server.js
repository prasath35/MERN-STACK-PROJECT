app.post("/api/users/sync", async (req, res) => {
  try {
    const { clerkId, email, name, profileImage } = req.body;

    const user = await User.findOneAndUpdate(
      { clerkId },
      {
        clerkId,
        email,
        name,
        profileImage,
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.status(200).json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to sync user",
    });
  }
});