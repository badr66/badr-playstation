export async function logout() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    type ApiResponse = {
        message?: string;
        error?: string;
    }
    try {
        const callApi = await fetch(`${baseUrl}/api/logout`, {
            method: "POST"
        });
        if(!callApi.ok) {
            throw new Error("خطأ بالاتصال بالخادم");
        }
        else {
            const response: ApiResponse = await callApi.json();
            return response;
        }
    } catch(error) {
        console.log(error);
        return {error: "حدث خطأ ! حاول مجددا"};
    }

}