import fs from "fs";
import path from "path";

const outputDir = path.join(process.cwd(), "public", "images");

fs.mkdirSync(outputDir, { recursive: true });

const filename = "phetchaburi.jpg";
const query = "Phetchaburi Thailand palace temple";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function searchWikimedia() {
  const apiUrl =
    "https://commons.wikimedia.org/w/api.php?" +
    new URLSearchParams({
      action: "query",
      generator: "search",
      gsrsearch: query,
      gsrnamespace: "6",
      gsrlimit: "20",
      prop: "imageinfo",
      iiprop: "url|mime",
      iiurlwidth: "1200",
      format: "json",
      origin: "*",
    });

  const response = await fetch(apiUrl, {
    headers: {
      "User-Agent": "ThailandSmartTravelAssistant/1.0 educational-project",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Wikimedia API error: ${response.status}`);
  }

  const data = await response.json();

  const pages = data.query?.pages ? Object.values(data.query.pages) : [];

  for (const page of pages) {
    const imageInfo = page.imageinfo?.[0];

    if (!imageInfo) continue;

    if (imageInfo.mime !== "image/jpeg") continue;

    const imageUrl = imageInfo.thumburl || imageInfo.url;

    if (imageUrl) {
      return imageUrl;
    }
  }

  return null;
}

async function main() {
  console.log("");
  console.log("🇹🇭 Downloading missing image...");
  console.log("");
  console.log(`Searching: ${query}`);

  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const imageUrl = await searchWikimedia();

      if (!imageUrl) {
        throw new Error("No suitable JPEG image found");
      }

      console.log("✓ Image found");

      const response = await fetch(imageUrl, {
        headers: {
          "User-Agent": "ThailandSmartTravelAssistant/1.0 educational-project",
          Accept: "image/jpeg,image/*",
        },
      });

      if (!response.ok) {
        throw new Error(`Image download failed: ${response.status}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());

      if (buffer.length < 10000) {
        throw new Error("Downloaded file is too small");
      }

      const filePath = path.join(outputDir, filename);

      fs.writeFileSync(filePath, buffer);

      console.log(`✓ Saved: ${filename}`);
      console.log("");
      console.log("Done!");
      console.log(`Location: public/images/${filename}`);
      console.log("");

      return;
    } catch (error) {
      console.log(`Attempt ${attempt} failed: ${error.message}`);

      if (attempt < 5) {
        console.log("Waiting before retry...");
        await sleep(6000);
      }
    }
  }

  console.log("");
  console.log("✗ Could not download phetchaburi.jpg");
  console.log("Please try again later.");
}

main();
