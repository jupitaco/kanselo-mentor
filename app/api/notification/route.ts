import { getAllNotificationsApi } from "@/services/apis/notifications.api";

export async function GET(_: Request) {
  try {
    const response = await getAllNotificationsApi();

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
