import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = "edge"

async function loadSurahFont() {
    const response = await fetch("https://github.com/My-Quran-Tajwid/baca-opengraph/raw/refs/heads/main/public/fonts/QCF4_Surah-Regular.ttf")
    if (response.status == 200) {
        return await response.arrayBuffer()
    }

    throw new Error('failed to load font data')

}
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('surah') ?? '0';
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
    const surahSymbol = symbolSet[parseInt(query) - 1]

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    fontSize: 180,
                    color: 'white',
                    background: 'linear-gradient(15deg, rgb(24, 218, 221) 1%, rgb(247, 92, 154) 50%)',
                    width: '100%',
                    height: '100%',
                    padding: '50px 200px',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                }}>
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