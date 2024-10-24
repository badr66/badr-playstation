type ApiResponse = {
    name?: string;
    error?: string;
}
export async function editUser(body: {newName: string, newPassword: string, id: string}) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/users/${body.id}`,
            {
                method: "PATCH",
                body: JSON.stringify({name: body.newName, password: body.newPassword}),
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