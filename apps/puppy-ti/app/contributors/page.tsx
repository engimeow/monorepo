import { getContributors } from "@puppy-ti/app/contributors/page.server";
import { Navigation } from "@puppy-ti/components/navigation";
import { page } from "@puppy-ti/lib/constraints/styles";
import Image from "next/image";
import { clsx } from "clsx";
import { gugi } from "@puppy-ti/lib/constraints/fonts";

export default async function ContributorsPage() {
  const { contributors, error } = await getContributors();

  if (error || !contributors) {
    return <div>Error</div>;
  }

  return (
    <div className={page}>
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
      <div className="flex flex-col min-h-[230px] sm:min-h-[400px]">
        <p className={clsx(["mt-auto text-center text-7xl", gugi.className])}>
          <span className="text-[#1C0E35]">퍼피</span>
          <span className="text-white">티아이</span>
        </p>
        <p
          className={clsx(
            ["text-center text-white text-7xl mb-8 sm:mb-10"],
            gugi.className,
          )}
        >
          팀원 소개
        </p>
      </div>
      <div
        className={clsx(["bg-white py-[85px]", "contributors-content-shadow"])}
      >
        <ul className="text-center text-[#333333] text-3xl space-y-3.5">
          {contributors.map((contributor) => (
            <li key={contributor.id}>
              <span>{contributor.content}</span>
              <span> : </span>
              <span>{contributor.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-[540px]" />
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
