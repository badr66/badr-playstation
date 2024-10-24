export async function getUserInfo(id: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/users/${id}`,
            {
                method: "POST",
            }
        );
        if(!callApi.ok) {
            throw new Error("خطأ بالاتصال بالخادم");
        }
        else {
            const response = await callApi.json();
            return response;
        }
    } catch(error) {
        console.log(error);
        return {error: "فشل في الاتصال"};
    }

}