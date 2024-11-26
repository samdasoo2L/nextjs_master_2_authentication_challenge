"use server";
// 이건 서버에서만 실행되어야 하는 action이야! 를 의미

export async function handleForm(prevState: any, formData: FormData) {
  const passwordTF = formData.get("password") == "12345";
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    success: passwordTF,
    errors: passwordTF ? null : "Wrong password",
  };
}
