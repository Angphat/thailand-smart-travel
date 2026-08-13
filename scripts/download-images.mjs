import fs from "fs";
import path from "path";

const outputDir = path.join(process.cwd(), "public", "images");

fs.mkdirSync(outputDir, { recursive: true });

const images = [
  // =========================
  // HERO
  // =========================
  {
    filename: "thailand-hero.jpg",
    query: "Thailand Grand Palace Bangkok",
  },

  // =========================
  // DESTINATIONS 30
  // =========================
  {
    filename: "bangkok.jpg",
    query: "Wat Arun Bangkok",
  },
  {
    filename: "chiangmai.jpg",
    query: "Doi Suthep Chiang Mai",
  },
  {
    filename: "phuket.jpg",
    query: "Phuket beach",
  },
  {
    filename: "hatyai.jpg",
    query: "Hat Yai city",
  },
  {
    filename: "pattani.jpg",
    query: "Pattani Central Mosque",
  },
  {
    filename: "krabi.jpg",
    query: "Railay Beach Krabi",
  },
  {
    filename: "ayutthaya.jpg",
    query: "Ayutthaya Historical Park",
  },
  {
    filename: "pattaya.jpg",
    query: "Pattaya Beach",
  },
  {
    filename: "hua-hin.jpg",
    query: "Hua Hin Beach",
  },
  {
    filename: "chiangrai.jpg",
    query: "White Temple Chiang Rai",
  },
  {
    filename: "koh-samui.jpg",
    query: "Koh Samui beach",
  },
  {
    filename: "koh-phangan.jpg",
    query: "Koh Phangan beach",
  },
  {
    filename: "koh-tao.jpg",
    query: "Koh Tao beach",
  },
  {
    filename: "kanchanaburi.jpg",
    query: "River Kwai Bridge Kanchanaburi",
  },
  {
    filename: "nan.jpg",
    query: "Nan Thailand temple",
  },
  {
    filename: "sukhothai.jpg",
    query: "Sukhothai Historical Park",
  },
  {
    filename: "korat.jpg",
    query: "Nakhon Ratchasima Thailand",
  },
  {
    filename: "ubon.jpg",
    query: "Ubon Ratchathani Thailand",
  },
  {
    filename: "nakhon-si-thammarat.jpg",
    query: "Nakhon Si Thammarat Thailand",
  },
  {
    filename: "songkhla.jpg",
    query: "Songkhla Thailand",
  },
  {
    filename: "trang.jpg",
    query: "Trang Thailand beach",
  },
  {
    filename: "surat-thani.jpg",
    query: "Surat Thani Thailand",
  },
  {
    filename: "pai.jpg",
    query: "Pai Thailand",
  },
  {
    filename: "mae-hong-son.jpg",
    query: "Mae Hong Son Thailand",
  },
  {
    filename: "lopburi.jpg",
    query: "Lopburi Thailand temple",
  },
  {
    filename: "phetchaburi.jpg",
    query: "Phetchaburi Thailand",
  },
  {
    filename: "rayong.jpg",
    query: "Rayong Thailand beach",
  },
  {
    filename: "chanthaburi.jpg",
    query: "Chanthaburi Thailand",
  },
  {
    filename: "nong-khai.jpg",
    query: "Nong Khai Mekong River",
  },
  {
    filename: "udon-thani.jpg",
    query: "Udon Thani Thailand",
  },

  // =========================
  // FOOD 8
  // =========================
  {
    filename: "pad-thai.jpg",
    query: "Pad Thai Thai food",
  },
  {
    filename: "tom-yum.jpg",
    query: "Tom Yum Goong Thai food",
  },
  {
    filename: "som-tam.jpg",
    query: "Som Tam Thai food",
  },
  {
    filename: "mango-sticky-rice.jpg",
    query: "Mango Sticky Rice Thai dessert",
  },
  {
    filename: "green-curry.jpg",
    query: "Thai Green Curry food",
  },
  {
    filename: "khao-pad.jpg",
    query: "Khao Pad Thai fried rice",
  },
  {
    filename: "massaman-curry.jpg",
    query: "Massaman Curry Thai food",
  },
  {
    filename: "khao-soi.jpg",
    query: "Khao Soi Chiang Mai food",
  },
];

// ========================================
// Utility
// ========================================

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ========================================
// Search Wikimedia
// ========================================

async function searchWikimedia(query) {
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

    const mime = imageInfo.mime || "";

    // Accept JPEG images
    if (mime !== "image/jpeg") continue;

    const imageUrl = imageInfo.thumburl || imageInfo.url;

    if (!imageUrl) continue;

    return imageUrl;
  }

  return null;
}

// ========================================
// Download image
// ========================================

async function downloadImage(url, filename) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "ThailandSmartTravelAssistant/1.0 educational-project",
      Accept: "image/jpeg,image/*",
    },
  });

  if (!response.ok) {
    throw new Error(`Image download failed: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  // Basic validation
  if (buffer.length < 10000) {
    throw new Error("Downloaded file is too small");
  }

  const filePath = path.join(outputDir, filename);

  fs.writeFileSync(filePath, buffer);

  return filePath;
}

// ========================================
// Download one image with retries
// ========================================

async function downloadWithRetry(image) {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const imageUrl = await searchWikimedia(image.query);

      if (!imageUrl) {
        throw new Error("No suitable JPEG image found");
      }

      await downloadImage(imageUrl, image.filename);

      return true;
    } catch (error) {
      console.log(`  Attempt ${attempt} failed: ${error.message}`);

      if (attempt < 5) {
        // Longer delay to reduce Wikimedia 429 errors
        await sleep(5000);
      }
    }
  }

  return false;
}

// ========================================
// MAIN
// ========================================

async function main() {
  console.log("");
  console.log("🇹🇭 Thailand Smart Travel Assistant");
  console.log("Downloading real Thailand travel photos...");
  console.log("");

  let success = 0;
  let failed = 0;

  for (const image of images) {
    console.log("");
    console.log(`Searching: ${image.query}`);

    const downloaded = await downloadWithRetry(image);

    if (downloaded) {
      console.log(`✓ Saved: ${image.filename}`);
      success++;
    } else {
      console.log(`✗ Failed: ${image.filename}`);
      failed++;
    }

    // Wait between requests
    await sleep(6000);
  }

  console.log("");
  console.log("=================================");
  console.log(`Total images: ${images.length}`);
  console.log(`Downloaded: ${success}`);
  console.log(`Failed: ${failed}`);
  console.log("=================================");
  console.log("");
  console.log("Images are stored in:");
  console.log("public/images/");
  console.log("");
}

main();
