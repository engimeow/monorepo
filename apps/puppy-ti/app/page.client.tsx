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
    <form action={submit} className="flex-col-m w-full page-inner">
      <input
        id="name"
        type="text"
        name="dogName"
        placeholder="반려견 이름을 입력해 주세요."
        className="block-shape input-shadow text-center spoqa block-txt placeholder-[#CCCCCC]"
      />
      {status === "invalid" && (
        <p className="spoqa main-txt text-[#7846D0]">
          반려견 이름을 입력해주세요.
        </p>
      )}

      <button
        className="block-shape button-shadow text-white block-txt bg-[#C4A5FA]"
        type="submit"
      >
        시작하기
      </button>
    </form>
  );
};
