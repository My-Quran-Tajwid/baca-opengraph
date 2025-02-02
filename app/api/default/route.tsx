import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = "edge"

async function loadGoogleFont(font: string, text: string) {
    const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
    const css = await (await fetch(url)).text()
    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

    if (resource) {
        const response = await fetch(resource[1])
        if (response.status == 200) {
            return await response.arrayBuffer()
        }
    }

    throw new Error('failed to load font data')
}


export async function GET(request: NextRequest, { params }: { params: Promise<{ surah: string }> }) {
    const searchParams = request.nextUrl.searchParams;
    const alternateQuery = parseInt(searchParams.get('alt') ?? '0', 10);

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

    const text = "QuranTajwid"

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    fontSize: 180,
                    color: alternateSet[alternateQuery].color,
                    backgroundImage: alternateSet[alternateQuery].backgroundImage,
                    width: '100%',
                    fontFamily: 'Figtree',
                    fontWeight: 600,
                    height: '100%',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textShadow: alternateSet[alternateQuery].dropShadow ? '4px 4px 16px rgba(0, 0, 0, 0.5)' : 'none',
                    letterSpacing: '-10',
                }}
            >
                {text}
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: 'Figtree',
                    data: await loadGoogleFont('Figtree', text),
                    style: 'normal',

                },
            ]
        },
    );
}