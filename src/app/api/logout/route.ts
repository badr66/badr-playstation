import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const cookies = request.cookies;
    const token = cookies.get("token");
    if(token) {
        const deleteCookies = cookies.delete(token.name);
        if(deleteCookies) {
            return NextResponse.json({message: "تم تسجيل الخروج بنجــاح"});
        }
        else {
            return NextResponse.json({error: "فشل تسجيل الخروج! حاول مجددا"});
        }
    }
    else {
        return NextResponse.json({error: "عمليــة خاطئــة"});
    }
}