"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function Home() {
  const [surahNumber, setSurahNumber] = useState("1")
  const [altDesign, setAltDesign] = useState("1")
  const [ogUrl, setOgUrl] = useState("")
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setOgUrl(`/api/surah/${surahNumber}?alt=${altDesign}`)
  }, [surahNumber, altDesign])

  return (
    <>
      <main className="flex flex-col items-center justify-center p-4 sm:p-8 md:p-24">
        <Card className="w-full max-w-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl sm:text-3xl">Quran Surah OpenGraph Generator</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Generate OpenGraph images for Quran Surahs
              </CardDescription>
            </div>
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Select onValueChange={setSurahNumber} defaultValue={surahNumber}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select Surah" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(114)].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      Surah {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={setAltDesign} defaultValue={altDesign}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select Design" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      Design {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-2">Generated URL:</h3>
              <a
                href={ogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline break-all"
              >
                {ogUrl}
              </a>
            </div>
            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-2">Preview:</h3>
              <div className="relative w-full h-[200px] sm:h-[315px]">
                <Image
                  src={ogUrl || "/placeholder.svg"}
                  alt={`Preview for Surah ${surahNumber}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  )
}

