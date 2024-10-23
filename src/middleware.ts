import { NextRequest, NextResponse } from 'next/server';  

export function middleware(req: NextRequest) {  
    const token = req.cookies.get("token");
    if (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "") {
            if (token) { 
                return NextResponse.next(); 
            }
            else {
                return NextResponse.redirect(new URL('/login', req.url));  
            }
    } 
    return NextResponse.next();   
}  