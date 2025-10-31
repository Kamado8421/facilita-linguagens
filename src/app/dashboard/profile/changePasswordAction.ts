'use server'

export default async function changePasswordAction(_prevState: any, formData: FormData) {
    const password = formData.get("password")?.toString().trim();
    const confirmPassword = formData.get("confirm-password")?.toString().trim();

    if (!password || !confirmPassword) {
        return { success: false, message: "Preencha todos os campos." };
    }

    try {


        return { success: true, message: "Senha alterada com sucesso!" };
    } catch (error) {
        console.error("Erro ao trocar a senha:", error);
        return { success: false, message: "Erro ao trocar a senha. Tente novamente mais tarde." };
    }
}
