
export async function checkUser(name: string, password: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/users`, {
            method: "POST",
            body: JSON.stringify({name, password}),
        });
        if(!callApi.ok) {
            throw new Error("خطأ بالاتصال بالخادم");
        }
        else {
            const response = await callApi.json();
            return response;
        }
    } catch(error) {
        console.log(error);
        return {error: "فشل في عملية الدخول! حاول مجددا"};
    }

}