import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {name, password} = await request.json();
    const cookiesStore = cookies();
    try {
        const checkUserQuery = await sql `
        SELECT * FROM users WHERE name = ${name} AND password = ${password}
        `;
        if(checkUserQuery.rows.length > 0) {
            const token = `${name}!!/${password}:##34@`;
            cookiesStore.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "development",
                path: "/",
            });
            return NextResponse.json({id: checkUserQuery.rows[0].id, name: name, password: password});
        }
        else return NextResponse.json({error: "خطأ فـي الاسم أو كلمــة المرور!"})
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل في عمليــة تسجيل الدخول"})
    }
}