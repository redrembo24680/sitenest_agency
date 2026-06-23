import sharp from 'sharp';
import { existsSync } from 'fs';
import { join } from 'path';

const publicDir = './public';

// Compress og-image.jpg
const ogImagePath = join(publicDir, 'og-image.jpg');
if (existsSync(ogImagePath)) {
  // Create compressed JPEG
  await sharp(ogImagePath)
    .jpeg({ quality: 75, progressive: true, mozjpeg: true })
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .toFile(join(publicDir, 'og-image-optimized.jpg'));
  
  // Create WebP version
  await sharp(ogImagePath)
    .webp({ quality: 75 })
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .toFile(join(publicDir, 'og-image.webp'));
  
  console.log('✅ og-image optimized and WebP version created');
}

// Optimize all portfolio mockup images
const { readdirSync } = await import('fs');
const portfolioDir = join(publicDir, 'portfolio_mockups');

if (existsSync(portfolioDir)) {
  const files = readdirSync(portfolioDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  for (const file of files) {
    const inputPath = join(portfolioDir, file);
    const outputPath = join(portfolioDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    
    if (!existsSync(outputPath)) {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`✅ Converted ${file} to WebP`);
    }
  }
}

// Replace og-image.jpg with optimized version
const { copyFile, unlink } = await import('fs/promises');
const optimizedPath = join(publicDir, 'og-image-optimized.jpg');
if (existsSync(optimizedPath)) {
  await copyFile(optimizedPath, ogImagePath);
  await unlink(optimizedPath);
  console.log('✅ og-image.jpg replaced with optimized version');
}

console.log('🎉 Image optimization complete!');
