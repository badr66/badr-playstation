import { UserType } from "@/types/UserType";

export async function editUser(body: {name: string, password: string, id: number}) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    type ApiResponse = {
        newAccount?: UserType;
        error?: string;
    }
    try {
        const callApi = await fetch(`${baseUrl}/api/users/${String(body.id)}`,
            {
                method: "PATCH",
                body: JSON.stringify({name: body.name, password: body.password}),
            }
        );
        if(!callApi.ok) {
            throw new Error("خطأ بالاتصال بالخادم");
        }
        else {
            const response: ApiResponse = await callApi.json();
            return response;
        }
    } catch(error) {
        console.log(error);
        return {error: "فشل في الاتصال"};
    }

}