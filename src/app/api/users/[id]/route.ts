import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, {params}: {params: {id: string}}) {
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const getUserInfo = await sql `
        SELECT * FROM users WHERE name = ${params.id}
        `;
        if(getUserInfo.rows.length > 0) {

            return NextResponse.json({name: getUserInfo.rows[0].name, password: getUserInfo.rows[0].password});
        }
        else return NextResponse.json({error: "لايمكن تحميل البيانات"})
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "حدث خطــأ اثناء تحميل بيانات المستخدم"})
    }
}

export async function PATCH(request: NextRequest, {params}: {params: {id: string}}) {
    const {name, password} = await request.json();
    const cookiesStore = cookies();
    try {
        const updateUserQuery = await sql `
        UPDATE users 
        SET name = ${name}, 
        password = ${password} 
        WHERE name = ${params.id} 
        RETURNING name
        `;
        if(updateUserQuery.rows.length > 0) {
            const token = `${name}!!/${password}:##34@`;
            cookiesStore.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "development",
                path: "/",
            });
            return NextResponse.json({name: updateUserQuery.rows[0].name});
        }
        else return NextResponse.json({error: "حدث خطأ في التعديل! حاول مجددا"})
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل في عمليــة التعديــل"})
    }
}