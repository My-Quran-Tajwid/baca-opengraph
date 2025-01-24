import Image from "next/image"
import { Figtree } from "next/font/google";

const figtree = Figtree({
    subsets: ['latin'],
    variable: "--font-figtree",
    display: 'swap',
})


export default function Footer() {
    return (
        <footer className={`flex items-center justify-center ${figtree.className} my-8`}>
            <Image src="/images/baca-logo.png" alt="QUranTajwid Logo" width={36} height={36} />
            <span className="ml-2 text-lg text-rose-700 dark:text-rose-400 font-bold">QuranTajwid</span>
        </footer >
    )
}