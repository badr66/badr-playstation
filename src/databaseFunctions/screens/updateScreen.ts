export async function updateScreen(body: {number: string, name: string, cost: number}, id: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    type ApiResponse = {
        message?: string;
        error?: string;
    }
    try {
        const callApi = await fetch(`${baseUrl}/api/screens/${id}`,
            {
                method: "PATCH",
                body: JSON.stringify(body),
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