import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, {params}: {params: {id: string}}) {
    const {name, password} = await request.json();
    const cookiesStore = cookies();
    try {
        const updateUserQuery = await sql `
        UPDATE users 
        SET name = ${name}, 
        password = ${password} 
        WHERE id = ${parseInt(params.id)} 
        RETURNING id
        `;
        if(updateUserQuery.rows.length > 0) {
            const token = `${name}!!/${password}:##34@`;
            cookiesStore.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "development",
                path: "/",
            });
            return NextResponse.json({id: updateUserQuery.rows[0].id, name: name, password: password});
        }
        else return NextResponse.json({error: "حدث خطأ في التعديل! حاول مجددا"})
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل في عمليــة التعديــل"})
    }
}