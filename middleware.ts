import { updateSession } from "@/utils/supabase/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // eslint-disable-next-line no-return-await
  return await updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
