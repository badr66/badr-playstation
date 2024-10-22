import { ScreenType } from "@/types/ScreenType";

export async function getScreens() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/screens`, {cache: "no-store"});
        if(!callApi.ok) {
            throw new Error("خطأ بالاتصال بالخادم");
        }
        else {
            const response: ScreenType[] = await callApi.json();
            return response;
        }
    } catch(error) {
        console.log(error);
        return [];
    }

}