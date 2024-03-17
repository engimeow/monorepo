import { DogNameForm } from "@puppy-ti/app/page.client";
import { Navigation } from "@puppy-ti/components/navigation";
import Image from "next/image";
import { IoShareSocialOutline } from "react-icons/io5";

export default function Page({
  searchParams,
}: {
  searchParams: { status: "invalid" };
}) {
  // const handleSubmit = async (e: FormData) => {
  //   "use server";
  //   const dogName = e.get("dogName");

  //   if (dogName === null || dogName === "") {
  //     return redirect("/?status=invalid");
  //   } else {
  //     const url = new URL("/free-test", window.location.href);

  //     url.searchParams.append("dogName", dogName.toString());

  //     return redirect(url.href);
  //   }
  // };

  return (
    <div className="background-image-container relative flex flex-col mx-auto max-w-full min-h-screen sm:max-w-3xl">
      <Image
        src="/landing-bg-top.png"
        alt="landing-bg-top.png"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full absolute z-[-1] landing-bg-top"
        priority
      />
      <Navigation />
      <Image
        alt="hero"
        src="/hero.png"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full z-10 px-16 pt-16 sm:pt-32"
        priority
        draggable={false}
      />
      <div className="mx-[1.875rem]">
        <p className="text-[#C4A5FA] text-center mt-14 text-xl min-[480px]:mt-24 sm:mt-20 sm:text-3xl">
          나의 반려견은 어떤 성향일까?
        </p>

        <div className="text-center mt-10 text-6xl sm:text-[6.875rem]">
          <span className="text-[#1C0E35]">퍼피</span>
          <span className="text-[#7846D0]">티아이</span>
        </div>
        <DogNameForm status={searchParams.status} />
        <div className="text-center mt-20 spoqa font-light text-2xl">
          <span>참여 횟수</span>
          <span className="mx-4">|</span>
          <span>1,563 회</span>
        </div>
        <div className="flex flex-row items-center justify-center mt-20 mb-32 spoqa gap-3 font-light text-2xl">
          <IoShareSocialOutline />
          <span>공유하기</span>
        </div>
      </div>
      <Image
        src="/landing-bg-bottom.png"
        alt="landing-bg-bottom.png"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full absolute z-[-1] bottom-0"
        priority
      />
    </div>
  );
}
