// import type { Metadata } from "next";
// import "./globals.css";
// import { BackgroundWave } from "@/components/background-wave";
// import Link from "next/link";
// import { NadioLogo } from "@/components/logos";
// // import {ElevenLabsLogo, GithubLogo} from "@/components/logos";

// export const metadata: Metadata = {
//   title: "AI할머니상담사",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en" className={"h-full w-full"}>
//       <body className={`antialiased w-full h-full lex flex-col`}>
//         <div className="flex flex-col flex-grow w-full items-center justify-center sm:px-4">
//           <nav
//             className={
//               "sm:fixed w-full top-0 left-0 grid grid-cols-2 py-4 px-8"
//             }
//           >
//             <div className={"flex"}>
//               {/* <Link href={"/"} prefetch={true}>
//                         <ElevenLabsLogo
//                             className={"h-[15px] w-auto hover:text-gray-500"}
//                         />
//                     </Link> */}
//             </div>

//             <div className={"flex gap-4 justify-end"}>
//               {/* <Link
//                         href="https://github.com/jonatanvm/convai-demo"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className={"py-0.5"}
//                         aria-label="View source on GitHub"
//                     >
//                         <GithubLogo
//                             className={"w-5 h-5 hover:text-gray-500 text-[#24292f]"}
//                         />
//                     </Link> */}
//               <Link href="https://www.nadio.com" target="_blank">
//                 <NadioLogo className={"w-5 h-5 hover:text-gray-500"} />
//               </Link>
//             </div>
//           </nav>
//           {children}
//           <BackgroundWave />
//         </div>
//       </body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import "./globals.css";
import { BackgroundWave } from "@/components/background-wave";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "AI할머니상담사",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full w-full">
      <body className="antialiased w-full h-full flex flex-col bg-[#FDF9F3]">
        <div className="flex flex-col flex-grow w-full items-center justify-center relative">
          <nav className="sm:fixed w-full top-0 left-0 grid grid-cols-2 py-4 px-8 z-10">
            <div className="flex">
              <Link
                href="https://www.nadio.io/fontmarket/?idx=70"
                target="_blank"
              >
                <Image
                  src="/nadio_voicefont_logo.png"
                  alt="나디오 보이스폰트"
                  width={432}
                  height={144}
                  className="h-24 w-auto hover:opacity-80"
                />
              </Link>
            </div>

            <div className="flex gap-4 justify-end">
              {/* 오른쪽 영역은 비워둡니다 */}
            </div>
          </nav>
          {children}
          <BackgroundWave />
        </div>
      </body>
    </html>
  );
}
