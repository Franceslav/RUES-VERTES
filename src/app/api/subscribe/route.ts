import { NextRequest, NextResponse } from "next/server";
import { sendSubscriptionNotification } from "@/lib/mailer";

const emailRegex =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email: string | undefined = body?.email;

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Некорректный email" },
        { status: 400 }
      );
    }

    await sendSubscriptionNotification(email);

    return NextResponse.json(
      { message: "Подписка зарегистрирована" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Ошибка при оформлении подписки" },
      { status: 500 }
    );
  }
}

