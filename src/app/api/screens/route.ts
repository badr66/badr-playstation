import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const screensQuery = await sql`
        SELECT * FROM screens
        `;
        return NextResponse.json(screensQuery.rows, {status: 200});
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "حدث خطأ ما! يرجى إعادة المحاولة"})
    }
}
export async function POST(request: NextRequest) {
    try {
        const {number, name, cost} = await request.json();
        if(name === "") {
            const addQuery = await sql `
            INSERT INTO screens (number, name, cost) VALUES (${number}, null, ${cost}) RETURNING id
            `;
            if(addQuery.rows.length > 0) {
                return NextResponse.json({message: "تم إضافة شاشة جديدة بنجاح"});
            }
            else return NextResponse.json({error: "حدث خطأ أثناء الإضافة! حاول مجددا"});
        }
        else {
            const addQuery = await sql `
            INSERT INTO screens (number, name, cost) VALUES (${number}, ${name}, ${cost}) RETURNING id
            `;
            if(addQuery.rows.length > 0) {
                return NextResponse.json({message: "تم إضافة شاشة جديدة بنجاح"});
            }
            else return NextResponse.json({error: "حدث خطأ أثناء الإضافة! حاول مجددا"});
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل في إضافة شاشة جديدة"});
    }
}