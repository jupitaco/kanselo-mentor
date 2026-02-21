import { getMentorByIdApi } from "@/services/apis/bookings.api";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  try {
    const response = await getMentorByIdApi(slug);

    if (!response.ok) {
      return Response.json(
        { error: response.body.message },
        { status: response.status },
      );
    }

    return Response.json({
      status: response.status,
      data: response.body,
    });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
