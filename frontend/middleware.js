import { NextResponse } from "next/server";

export default function middleware(request) {
    const token = request.cookies.get("session");

    const portectedPaths = ['/','/profile']

    if(portectedPaths.some(path => request.nextUrl.pathname.startswith(path))){
        if(!token){
            const loginUrl = new Url('/login',request.url);
            return NextResponse.redirect(loginUrl);
        }
    }
    return NextResponse.next();
}