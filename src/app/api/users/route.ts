import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {name, password} = await request.json();
    try {
        const checkUserQuery = await sql `
        SELECT * FROM users WHERE name = ${name} AND password = ${password}
        `;
        if(checkUserQuery.rows.length > 0) {
            const token = `${name}!!/${password}:##34@`;
            const response = NextResponse.json({name: checkUserQuery.rows[0].name});
            response.cookies.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "development",
                path: "/",
                maxAge: 60,
            });
            return response;
        }
        else return NextResponse.json({error: "خطأ فـي الاسم أو كلمــة المرور!"})
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل في عمليــة تسجيل الدخول"})
    }
}