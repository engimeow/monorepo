"use client";

import { useRouter } from "next/navigation";

export const DogNameForm = ({ status }: { status: "invalid" }) => {
  const router = useRouter();

  const submit = async (e: FormData) => {
    const dogName = e.get("dogName");

    if (dogName === null || dogName === "") {
      router.replace("/?status=invalid#name", { shallow: true } as any);
      return;
    } else {
      const url = new URL("/free-test", window.location.href);

      url.searchParams.append("dogName", dogName.toString());
      router.push(url.href);

      return;
    }
  };

  return (
    <form action={submit} className="flex flex-col">
      <input
        id="name"
        type="text"
        name="dogName"
        placeholder="반려견 이름을 입력해 주세요."
        className="rounded-[0.625rem] py-[1.125rem] text-center mt-20 spoqa input-shadow text-2xl placeholder-[#CCCCCC]"
      />
      {status === "invalid" && (
        <p className="text-2xl text-red-500 spoqa mt-3">
          반려견 이름을 입력해주세요.
        </p>
      )}

      <button
        className="rounded-[0.625rem] py-[1.125rem] mt-10 bg-[#C4A5FA] text-white button-shadow text-2xl"
        type="submit"
      >
        시작하기
      </button>
    </form>
  );
};
