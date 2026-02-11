import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

const iconSizes = [
    { name: 'mdpi', size: 48, folder: 'mipmap-mdpi' },
    { name: 'hdpi', size: 72, folder: 'mipmap-hdpi' },
    { name: 'xhdpi', size: 96, folder: 'mipmap-xhdpi' },
    { name: 'xxhdpi', size: 144, folder: 'mipmap-xxhdpi' },
    { name: 'xxxhdpi', size: 192, folder: 'mipmap-xxxhdpi' }
];

const baseDir = './android/app/src/main/res';

function drawIcon(size, isRound = false) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Background - white with subtle gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(1, '#f8f9fa');

    if (isRound) {
        // Create circular background
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    } else {
        // Square background with rounded corners
        const cornerRadius = size * 0.1;
        ctx.beginPath();
        ctx.moveTo(cornerRadius, 0);
        ctx.lineTo(size - cornerRadius, 0);
        ctx.quadraticCurveTo(size, 0, size, cornerRadius);
        ctx.lineTo(size, size - cornerRadius);
        ctx.quadraticCurveTo(size, size, size - cornerRadius, size);
        ctx.lineTo(cornerRadius, size);
        ctx.quadraticCurveTo(0, size, 0, size - cornerRadius);
        ctx.lineTo(0, cornerRadius);
        ctx.quadraticCurveTo(0, 0, cornerRadius, 0);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    // Draw the letter "A" in purple
    ctx.fillStyle = '#4f46e5'; // Indigo/Purple color
    ctx.font = `bold ${size * 0.65}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Add subtle shadow for depth
    ctx.shadowColor = 'rgba(79, 70, 229, 0.3)';
    ctx.shadowBlur = size * 0.05;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = size * 0.02;

    ctx.fillText('A', size / 2, size / 2);

    return canvas;
}

function drawForegroundIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Transparent background
    ctx.clearRect(0, 0, size, size);

    // Draw the letter "A" in purple (larger for foreground)
    ctx.fillStyle = '#4f46e5';
    ctx.font = `bold ${size * 0.7}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Add shadow
    ctx.shadowColor = 'rgba(79, 70, 229, 0.4)';
    ctx.shadowBlur = size * 0.06;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = size * 0.02;

    ctx.fillText('A', size / 2, size / 2);

    return canvas;
}

console.log('🎨 Generating Alchemy Connect app icons...\n');

iconSizes.forEach(config => {
    const folderPath = path.join(baseDir, config.folder);

    // Ensure folder exists
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    // Generate standard launcher icon
    const standardCanvas = drawIcon(config.size, false);
    const standardPath = path.join(folderPath, 'ic_launcher.png');
    const standardBuffer = standardCanvas.toBuffer('image/png');
    fs.writeFileSync(standardPath, standardBuffer);
    console.log(`✅ Created ${config.name} ic_launcher.png (${config.size}x${config.size})`);

    // Generate foreground icon
    const foregroundCanvas = drawForegroundIcon(config.size);
    const foregroundPath = path.join(folderPath, 'ic_launcher_foreground.png');
    const foregroundBuffer = foregroundCanvas.toBuffer('image/png');
    fs.writeFileSync(foregroundPath, foregroundBuffer);
    console.log(`✅ Created ${config.name} ic_launcher_foreground.png (${config.size}x${config.size})`);

    // Generate round launcher icon
    const roundCanvas = drawIcon(config.size, true);
    const roundPath = path.join(folderPath, 'ic_launcher_round.png');
    const roundBuffer = roundCanvas.toBuffer('image/png');
    fs.writeFileSync(roundPath, roundBuffer);
    console.log(`✅ Created ${config.name} ic_launcher_round.png (${config.size}x${config.size})\n`);
});

console.log('🎉 All icons generated successfully!');
console.log('📱 Your Android app now has a purple "A" icon in all required sizes.');
