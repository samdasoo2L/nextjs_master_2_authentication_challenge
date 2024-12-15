import { NextRequest, NextResponse } from "next/server";
import getSession from "./app/lib/session";

interface Routes {
  [key: string]: boolean;
}

const noSessionUrls: Routes = {
  "/log-in": true,
  "/create-account": true,
};

const mustSessionUrls: Routes = {
  "/tweets/add": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  // request.url 보다 request.nextUrl
  const noSession = noSessionUrls[request.nextUrl.pathname];
  const mustSession = mustSessionUrls[request.nextUrl.pathname];
  if (session.id) {
    // 세션 있으면 가면 안되는 애들
    if (noSession) {
      //요청한 request.url을 기준으로 "/"에 해당하는 URL 제작
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    console.log(request.nextUrl);
    // 세션 없으면 가면 안되는 애들
    if (mustSession) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
