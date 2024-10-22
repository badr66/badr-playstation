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