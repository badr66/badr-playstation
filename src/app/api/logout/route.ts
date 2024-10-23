import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");
    if(token) {
        const deleteCookies = cookiesStore.delete("token");
        return NextResponse.json({message: "تم تسجيل الخروج بنجــاح"});
    }
    else {
        return NextResponse.json({error: "عمليــة خاطئــة"});
    }
}