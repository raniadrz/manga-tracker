#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking project setup...\n');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found!');
  process.exit(1);
}

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully\n');
  } catch (error) {
    console.error('❌ Failed to install dependencies');
    process.exit(1);
  }
}

// Check if src directory exists
if (!fs.existsSync('src')) {
  console.error('❌ src directory not found!');
  process.exit(1);
}

// Check if main entry point exists
if (!fs.existsSync('src/main.jsx')) {
  console.error('❌ src/main.jsx not found!');
  process.exit(1);
}

// Check if App.jsx exists
if (!fs.existsSync('src/App.jsx')) {
  console.error('❌ src/App.jsx not found!');
  process.exit(1);
}

console.log('✅ Project structure looks good!\n');

// Try to build
console.log('🏗️  Attempting to build...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('\n✅ Build successful!');
  
  // Check if dist directory was created
  if (fs.existsSync('dist')) {
    console.log('✅ dist directory created successfully');
    console.log('📁 Build output location: ./dist');
  } else {
    console.error('❌ dist directory not found after build');
  }
  
} catch (error) {
  console.error('\n❌ Build failed!');
  console.error('Check the error messages above for details.');
  process.exit(1);
}
