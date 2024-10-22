import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest,{params}: {params: {id: string}}) {
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const deleteQuery = await sql `
        DELETE FROM screens WHERE id = ${parseInt(params.id)} RETURNING id
        `;
        if(deleteQuery.rows.length > 0) {
            return NextResponse.json({message: "تم حذف الشاشة بنجــاح"});
        }
        else return NextResponse.json({error: "فشل في حذف الشاشة!"});
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "حدث خطأ أثناء الحذف! حــاول مجددا"});
    }
}

export async function PATCH(request: NextRequest,{params}: {params: {id: string}}) {
    const headers = request.headers;
    headers.get("Content-Type");
    const { number, name, cost } = await request.json();
    if(name === "") {
        try {
            const UPDATEQuery = await sql `
            UPDATE screens 
            SET number = ${number},
            name = null,
            cost = ${cost}
            WHERE id = ${params.id}
            RETURNING *
            `;
            if(UPDATEQuery.rows.length > 0) {
                return NextResponse.json({message: "تم تعديل بيانات الشاشة بنجــاح"});
            }
            else return NextResponse.json({error: "فشل في تعديل الشاشة!"});
        } catch(error) {
            console.log(error);
            return NextResponse.json({error: "حدث خطأ أثناء التعديل! حــاول مجددا"});
        }
    }
    else {
        try {
            const UPDATEQuery = await sql `
            UPDATE screens 
            SET number = ${number},
            name = ${name},
            cost = ${cost}
            WHERE id = ${params.id}
            RETURNING *
            `;
            if(UPDATEQuery.rows.length > 0) {
                return NextResponse.json({message: "تم تعديل بيانات الشاشة بنجــاح"});
            }
            else return NextResponse.json({error: "فشل في تعديل الشاشة!"});
        } catch(error) {
            console.log(error);
            return NextResponse.json({error: "حدث خطأ أثناء التعديل! حــاول مجددا"});
        }
    }
}