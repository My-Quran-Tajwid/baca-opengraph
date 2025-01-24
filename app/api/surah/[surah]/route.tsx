import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = "edge"

async function loadSurahFont() {
    // Modified fonts from https://github.com/My-Quran-Tajwid/quran-fonts/tree/main/fonts/King%20Fahd%20Complex/Custom since
    // VercelOG/Satori doesn't support ligatures
    const response = await fetch("https://github.com/My-Quran-Tajwid/baca-opengraph/raw/refs/heads/main/public/fonts/QCF4_Surah-Regular.ttf")
    if (response.status == 200) {
        return await response.arrayBuffer()
    }

    throw new Error('failed to load font data')

}
export async function GET(request: NextRequest, { params }: { params: Promise<{ surah: string }> }) {
    const searchParams = request.nextUrl.searchParams;
    const surahNumber = (await params).surah;
    const alternateQuery = parseInt(searchParams.get('alt') ?? '0', 10);

    // Advanced typography features such as kerning, ligatures and other OpenType features are not currently supported on Satori.
    // https://github.com/vercel/satori#language-and-typography
    // So, I tried to be smart and make one Surah font per Character. It works.
    const symbolSet = [
        '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-',
        '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':',
        ';', '<', '=', '>', '?', '@',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '[', '\\', ']', '^', '_', '`',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '{', '|', '}', '~', '¡', '¢', '£', '¤', '¥', '¦', '§', '¨', '©', 'ª',
        '«', '¬', '®', '¯', '°', '±', '²', '³', '´', 'µ'
    ];
    const surahIndex = parseInt(surahNumber) - 1;
    const surahSymbol = symbolSet[surahIndex];

    const alternateSet = [
        {
            // Vercel's Gradient (OG Playground)
            backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
            color: 'black',
        },
        {
            backgroundImage: "url('https://res.cloudinary.com/iqfareez-cloud/image/upload/v1737603518/metatags/BacaOG/3_wrwxcb.png')",
            color: 'black',
        },
        {
            backgroundImage: "url('https://res.cloudinary.com/iqfareez-cloud/image/upload/v1737603517/metatags/BacaOG/2_sxkgx8.png')",
            color: 'white',
        },
        {
            backgroundImage: "url('https://res.cloudinary.com/iqfareez-cloud/image/upload/v1737603518/metatags/BacaOG/1_llo1h5.png')",
            color: 'black',
        },
        {
            backgroundImage: "url('https://res.cloudinary.com/iqfareez-cloud/image/upload/v1737603518/metatags/BacaOG/4_vzbucf.png')",
            color: 'antiquewhite',
            dropShadow: true,
        },
        {
            backgroundImage: "url('https://res.cloudinary.com/iqfareez-cloud/image/upload/v1737603518/metatags/BacaOG/5_wfmdky.png')",
            color: 'black',
        }

    ]

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    fontSize: 180,
                    color: alternateSet[alternateQuery].color,
                    backgroundImage: alternateSet[alternateQuery].backgroundImage,
                    width: '100%',
                    height: '100%',
                    padding: '50px 200px',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textShadow: alternateSet[alternateQuery].dropShadow ? '4px 4px 16px rgba(0, 0, 0, 0.5)' : 'none',
                }}
            >
                {surahSymbol}
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: "QCF_Surah",
                    data: await loadSurahFont(),
                },

            ]
        },
    );
}