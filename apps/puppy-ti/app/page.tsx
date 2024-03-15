import { Navigation } from "@puppy-ti/app/components/navigation";
import { redirect } from "next/navigation";

export default function Page({
  searchParams,
}: {
  searchParams: { status: "invalid" };
}) {
  const handleSubmit = async (e: FormData) => {
    "use server";
    const input = e.get("dogName");

    if (input === null || input === "") {
      return redirect("/?status=invalid");
    }

    return redirect("/free-test");
  };

  return (
    <div>
      <Navigation />
      <div>강아지 이미지</div>
      <p>나의 반려견은 어떤 성향일까?</p>

      <div>
        <span>퍼피</span>
        <span>티아이</span>
      </div>
      <form action={handleSubmit}>
        <input
          type="text"
          name="dogName"
          placeholder="반려견 이름을 입력해 주세요."
        />
        {searchParams.status === "invalid" && <div>다시 입력</div>}

        <button type="submit">시작하기</button>
      </form>
    </div>
  );
}
