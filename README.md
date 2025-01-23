# Quran OpenGraph Image

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

![Example](https://baca-opengraph.vercel.app/api/surah/10?alt=2)

## Getting Started

First, install dependencies

```bash
yarn
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## OpenGraph Endpoints

`/api/surah/<surahNumber?alt=1`

| Properties | Description | Value | Remarks |
| --- | --- | --- | --- |
| `surahNumber` | Surah Number in Al-Quran. Eg `1` for Al-Fatihah, etc. | 1-114 | Required | 
| alt | Predefined design options | 1-5 | Optional. Default to 0 | 

## Hosts

- https://baca-opengraph.vercel.app/
- https://baca-og.qurantajwid.my/