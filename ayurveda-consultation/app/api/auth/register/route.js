export async function POST(request) {
  try {
    const body = await request.json();

    console.log("Received:", body);

    return Response.json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Registration failed",
      },
      { status: 400 }
    );
  }
}