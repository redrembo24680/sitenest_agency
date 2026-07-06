const fs = require('fs');
const path = require('path');

// 1. Path definitions
const logoPath = path.join(__dirname, '../public/logo.png');
const outputPath = path.join(__dirname, '../public/sitenest_card.html');

try {
  // Convert logo.png to base64
  const logoBuffer = fs.readFileSync(logoPath);
  const logoBase64 = logoBuffer.toString('base64');
  const logoDataUrl = `data:image/png;base64,${logoBase64}`;

  // 2. Self-contained HTML Template (Pure Art Mode)
  const htmlContent = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SiteNest VIP Member Pass</title>
  <style>
    /* Reset & Theme Variables */
    :root {
      --color-bg-dark: #06070d;
      --color-blue: #00f0ff;
      --color-pink: #ff007f;
      --font-title: 'Outfit', 'Inter', system-ui, sans-serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--color-bg-dark);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      overflow: hidden;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      perspective: 1000px;
    }

    /* Premium 3D Holographic NFT Card (Clean Art Edition) */
    .web3-nft-card {
      width: 320px;
      height: 480px;
      background: linear-gradient(135deg, rgba(17, 22, 39, 0.95), rgba(8, 10, 19, 0.98));
      border: 1.5px solid rgba(255, 255, 255, 0.08);
      border-radius: 24px;
      padding: 2rem;
      box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 50px rgba(0, 240, 255, 0.04);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transform-style: preserve-3d;
      will-change: transform;
      transition: transform 0.15s ease-out, box-shadow 0.2s ease-out;
      cursor: pointer;
    }

    .web3-nft-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.06) 45%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.06) 55%, transparent 60%);
      background-size: 200% 200%;
      background-position: 0% 0%;
      transition: background-position 0.5s ease;
      pointer-events: none;
      z-index: 5;
    }

    .web3-nft-card:hover::after {
      background-position: 100% 100%;
    }

    .nft-glow-layer {
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.1), rgba(255, 0, 127, 0.07), transparent 50%);
      pointer-events: none;
      z-index: 1;
    }

    .nft-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      z-index: 2;
      transform: translateZ(50px);
      width: 100%;
    }

    .nft-logo-wrap {
      width: 200px;
      height: 200px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .nft-logo-pulse {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: rgba(0, 240, 255, 0.18);
      filter: blur(15px);
      animation: pulseGlow 3s infinite ease-in-out;
    }

    .nft-logo-svg {
      width: 170px;
      height: 170px;
      filter: drop-shadow(0 0 25px var(--color-blue));
    }

    .nft-core-logo {
      position: absolute;
      width: 60px;
      height: 60px;
      object-fit: contain;
      z-index: 3;
      filter: drop-shadow(0 2px 10px rgba(0, 240, 255, 0.4));
    }

    /* Concentric Rings Animations */
    .nft-logo-svg circle:first-of-type {
      transform-origin: 50px 50px;
      animation: rotateClockwise 25s infinite linear;
    }
    .nft-logo-svg circle:nth-of-type(2) {
      transform-origin: 50px 50px;
      animation: rotateCounterClockwise 20s infinite linear;
    }

    @keyframes rotateClockwise {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes rotateCounterClockwise {
      from { transform: rotate(0deg); }
      to { transform: rotate(-360deg); }
    }

    @keyframes pulseGlow {
      0%, 100% { transform: scale(0.95); opacity: 0.5; }
      50% { transform: scale(1.05); opacity: 0.85; }
    }
  </style>
</head>
<body>

  <div class="web3-nft-card" id="nftCard">
    <div class="nft-glow-layer"></div>
    
    <div class="nft-content">
      <div class="nft-logo-wrap">
        <div class="nft-logo-pulse"></div>
        <svg viewBox="0 0 100 100" class="nft-logo-svg">
          <circle cx="50" cy="50" r="44" stroke="rgba(0, 240, 255, 0.25)" stroke-width="1" fill="none" stroke-dasharray="6, 4" />
          <circle cx="50" cy="50" r="38" stroke="rgba(255, 0, 127, 0.3)" stroke-width="1.5" fill="none" stroke-dasharray="16, 8" />
          <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" stroke="var(--color-blue)" stroke-width="2" fill="none" stroke-linejoin="round" />
          <polygon points="50,23 72,36 72,64 50,77 28,64 28,36" stroke="var(--color-pink)" stroke-width="1.5" fill="none" stroke-linejoin="round" />
          <circle cx="50" cy="50" r="16" fill="rgba(8, 10, 19, 0.9)" stroke="var(--color-blue)" stroke-width="1.2" />
        </svg>
        <img 
          src="${logoDataUrl}" 
          alt="SiteNest Logo" 
          class="nft-core-logo"
        />
      </div>
    </div>
  </div>

  <script>
    const card = document.getElementById('nftCard');
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const rotateX = -(y / (rect.height / 2)) * 12;
      const rotateY = (x / (rect.width / 2)) * 12;
      
      card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  </script>
</body>
</html>`;

  fs.writeFileSync(outputPath, htmlContent, 'utf8');
  console.log('Clean Art Mode HTML NFT successfully generated at:', outputPath);
} catch (err) {
  console.error('Error generating HTML NFT:', err);
}
