import { ImageResponse } from "next/og"

// This function generates Open Graph images for different pages
export async function generateOgImage(
  title: string,
  subtitle: string,
  bgColor = "#CE1126",
  textColor = "white",
  theme = "default",
) {
  // Vegas theme with neon-style text and casino elements
  if (theme === "vegas") {
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#000000",
          color: textColor,
          padding: "40px",
          fontFamily: "Arial",
          background: "linear-gradient(to bottom, #000000, #1a0033)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ImagesIMG_2695374-HafMK7carOvs6C836vT1lH84xxOq2d.png"
            alt="STC Logo"
            width={120}
            height={120}
            style={{ marginRight: "20px" }}
          />
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "#ff2d55",
              textShadow: "0 0 10px #ff2d55, 0 0 20px #ff2d55",
            }}
          >
            Sports Talk Club
          </h1>
        </div>
        <h2
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            marginBottom: "10px",
            textAlign: "center",
            color: "#eab308",
            textShadow: "0 0 10px #eab308, 0 0 20px #eab308",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: "36px",
            marginBottom: "40px",
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          {subtitle}
        </p>
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            fontSize: "24px",
            color: "#ffffff",
          }}
        >
          STC Bowl XII • Allegiant Stadium • Las Vegas, Nevada
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  }

  // Default theme
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: bgColor,
        color: textColor,
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ImagesIMG_2695374-HafMK7carOvs6C836vT1lH84xxOq2d.png"
          alt="STC Logo"
          width={120}
          height={120}
          style={{ marginRight: "20px" }}
        />
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "bold",
          }}
        >
          Sports Talk Club
        </h1>
      </div>
      <h2
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontSize: "32px",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        {subtitle}
      </p>
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          fontSize: "24px",
        }}
      >
        Season 13 - The premier football league experience on Roblox
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}
