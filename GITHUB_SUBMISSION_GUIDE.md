# GitHub Submission Guide
## MobileApp_Assignment_<YourName>_BSC351

This guide will walk you through submitting your mobile app assignment to GitHub.

---

## 📋 Pre-Submission Checklist

Before creating your GitHub repository, ensure you have:

- [ ] Completed README.md with app details
- [ ] Screenshots of your application (web and Android)
- [ ] PowerPoint presentation (5-8 slides)
- [ ] Working Android app in the `android/` folder
- [ ] All source code files
- [ ] .gitignore file to exclude unnecessary files

---

## 🚀 Step-by-Step Submission Process

### Step 1: Prepare Your Files

1. **Take Screenshots**
   - Open your app in a browser (http://localhost:3000)
   - Take screenshots of:
     - Login/Register screen
     - Dashboard
     - Event listing
     - Event details
     - User profile (if applicable)
   - Save screenshots in the `screenshots/` folder
   
2. **Take Android Screenshots**
   - Run your Android app on an emulator or device
   - Take screenshots of the same screens
   - Save in `screenshots/` folder with "android-" prefix

3. **Create PowerPoint Presentation**
   - Use the PRESENTATION_OUTLINE.md as a guide
   - Create 5-8 slides covering:
     - Title slide
     - Problem & Solution
     - Key Features
     - Technology Stack
     - Architecture
     - Android App
     - Achievements & Learnings
     - Demo & Future Work
   - Save as `MobileApp_Presentation_<YourName>.pptx`

4. **Update README.md**
   - Replace `[Your Name]` with your actual name
   - Replace `[Your Email]` with your email
   - Replace `[Your Institution]` with your institution name
   - Update screenshot paths if needed

---

### Step 2: Create GitHub Repository

1. **Go to GitHub**
   - Navigate to https://github.com
   - Log in to your account (create one if you don't have it)

2. **Create New Repository**
   - Click the "+" icon in the top right
   - Select "New repository"

3. **Repository Settings**
   - **Repository name**: `MobileApp_Assignment_<YourName>_BSC351`
     - Example: `MobileApp_Assignment_JohnDoe_BSC351`
   - **Description**: "AI-Powered Volunteer & NGO Matching Platform - Mobile App Development Assignment"
   - **Visibility**: Select "Public"
   - **DO NOT** initialize with README (we already have one)
   - Click "Create repository"

---

### Step 3: Upload Your Project to GitHub

#### Option A: Using Git Command Line (Recommended)

1. **Open PowerShell/Terminal** in your project folder
   ```powershell
   cd "c:\Users\MOSES JR\Desktop\alchemy-connect - Copy"
   ```

2. **Initialize Git** (if not already initialized)
   ```bash
   git init
   ```

3. **Add all files**
   ```bash
   git add .
   ```

4. **Commit your changes**
   ```bash
   git commit -m "Initial commit: Alchemy Connect Mobile App Assignment"
   ```

5. **Add remote repository**
   Replace `<your-username>` and `<YourName>` with your actual GitHub username and name:
   ```bash
   git remote add origin https://github.com/<your-username>/MobileApp_Assignment_<YourName>_BSC351.git
   ```

6. **Push to GitHub**
   ```bash
   git branch -M main
   git push -u origin main
   ```

#### Option B: Using GitHub Desktop (Easier)

1. **Download GitHub Desktop**
   - Go to https://desktop.github.com/
   - Download and install

2. **Add Repository**
   - Open GitHub Desktop
   - Click "File" → "Add Local Repository"
   - Select your project folder
   - If prompted to create a repository, click "Create Repository"

3. **Commit Changes**
   - You'll see all your files in the "Changes" tab
   - Add a commit message: "Initial commit: Alchemy Connect Mobile App"
   - Click "Commit to main"

4. **Publish Repository**
   - Click "Publish repository"
   - Name: `MobileApp_Assignment_<YourName>_BSC351`
   - Uncheck "Keep this code private"
   - Click "Publish repository"

#### Option C: Upload via GitHub Web Interface

1. **On your repository page**, click "uploading an existing file"

2. **Drag and drop** your project folder OR click "choose your files"

3. **Important**: Upload these folders/files:
   - `android/` folder (entire Android project)
   - `components/` folder
   - `services/` folder
   - `backend/` folder
   - `assets/` folder
   - `screenshots/` folder
   - `README.md`
   - `package.json`
   - `App.tsx`
   - `index.tsx`
   - `capacitor.config.ts`
   - `vite.config.ts`
   - `tsconfig.json`
   - `.gitignore`
   - Your PowerPoint file

4. **Commit changes**
   - Add commit message: "Initial commit: Mobile App Assignment"
   - Click "Commit changes"

---

### Step 4: Verify Your Repository

1. **Check that your repository contains**:
   - ✅ `android/` folder with complete Android Studio project
   - ✅ `README.md` with app details and screenshots
   - ✅ PowerPoint presentation file (5-8 slides)
   - ✅ All source code files
   - ✅ `screenshots/` folder with images

2. **Verify README displays correctly**:
   - Navigate to your repository URL
   - Scroll through the README
   - Check that all sections are visible
   - Verify screenshots are showing (if linked correctly)

3. **Test the repository link**:
   - Copy your repository URL
   - Open in an incognito/private browser window
   - Ensure it's publicly accessible

---

### Step 5: Submit to Your Lecturer

1. **Get your repository URL**
   - Format: `https://github.com/<username>/MobileApp_Assignment_<YourName>_BSC351`
   - Example: `https://github.com/johndoe/MobileApp_Assignment_JohnDoe_BSC351`

2. **Share the link**
   - If repository is Public: Simply share the URL
   - If repository is Private: 
     - Go to Settings → Collaborators
     - Add your lecturer's GitHub username
     - Share the URL

3. **Email/Submit**
   - Send the repository link to your lecturer
   - Include in your submission:
     - Your name
     - Student ID
     - Course: BSC-351 DS 02
     - Repository URL

---

## 📁 Required Repository Structure

Your final repository should look like this:

```
MobileApp_Assignment_<YourName>_BSC351/
├── android/                          # Complete Android Studio project
│   ├── app/
│   │   ├── src/
│   │   │   └── main/
│   │   │       ├── AndroidManifest.xml
│   │   │       ├── java/
│   │   │       └── res/
│   │   └── build.gradle
│   ├── build.gradle
│   └── settings.gradle
├── backend/                          # Backend server
│   └── server.js
├── components/                       # React components
│   ├── AuthForm.tsx
│   ├── Dashboard.tsx
│   └── ...
├── services/                         # API services
│   ├── api.ts
│   └── gemini.ts
├── screenshots/                      # App screenshots
│   ├── login.png
│   ├── dashboard.png
│   ├── android-home.png
│   └── ...
├── assets/                           # Static assets
├── README.md                         # Detailed app documentation
├── PRESENTATION_OUTLINE.md           # Presentation guide
├── MobileApp_Presentation_<YourName>.pptx  # PowerPoint file
├── App.tsx                           # Main app component
├── index.tsx                         # Entry point
├── package.json                      # Dependencies
├── capacitor.config.ts               # Capacitor config
├── vite.config.ts                    # Vite config
├── tsconfig.json                     # TypeScript config
└── .gitignore                        # Git ignore file
```

---

## 🔍 Common Issues & Solutions

### Issue 1: Repository too large
**Solution**: Make sure your `.gitignore` excludes:
- `node_modules/`
- `android/build/`
- `android/.gradle/`
- `dist/`
- `.env.local`

### Issue 2: Screenshots not showing in README
**Solution**: 
- Use relative paths: `./screenshots/image.png`
- Or upload to GitHub and use the raw URL

### Issue 3: Can't push to GitHub
**Solution**:
- Check your internet connection
- Verify repository URL is correct
- Ensure you have push permissions
- Try using GitHub Desktop instead

### Issue 4: Android folder is too large
**Solution**:
- Clean the build: `cd android && ./gradlew clean`
- Ensure `.gitignore` excludes build folders
- Only commit source files, not compiled outputs

---

## ✅ Final Checklist

Before submitting, verify:

- [ ] Repository name follows format: `MobileApp_Assignment_<YourName>_BSC351`
- [ ] Repository is Public (or lecturer has access)
- [ ] README.md is complete with your information
- [ ] Screenshots are included and visible
- [ ] PowerPoint presentation is uploaded (5-8 slides)
- [ ] Android folder contains complete project
- [ ] All source code files are present
- [ ] Repository URL is correct and accessible
- [ ] Link has been shared with lecturer

---

## 📧 Submission Email Template

```
Subject: BSC-351 Mobile App Assignment Submission - [Your Name]

Dear [Lecturer Name],

I am submitting my Mobile Application Development assignment for BSC-351 DS 02.

Student Details:
- Name: [Your Full Name]
- Student ID: [Your ID]
- Course: BSC-351 DS 02 - Mobile Application Development - SEM-VI

GitHub Repository:
https://github.com/[username]/MobileApp_Assignment_[YourName]_BSC351

Repository Contents:
✅ Complete Android Studio project (android/ folder)
✅ README.md with app details and screenshots
✅ PowerPoint presentation (5-8 slides)
✅ Full source code
✅ Documentation

The repository is public and accessible via the link above.

Thank you for your guidance throughout this course.

Best regards,
[Your Name]
```

---

## 🎓 Additional Tips

1. **Double-check everything** before final submission
2. **Test your repository link** in an incognito window
3. **Keep a local backup** of your project
4. **Take screenshots** of your GitHub repository as proof of submission
5. **Submit before the deadline** to avoid last-minute issues

---

## 🆘 Need Help?

If you encounter any issues:
1. Check the Common Issues section above
2. Search GitHub documentation: https://docs.github.com
3. Ask your classmates or lecturer
4. Contact GitHub support if it's a platform issue

---

**Good luck with your submission! 🚀**

---

## 📚 Useful Resources

- GitHub Guides: https://guides.github.com/
- Git Documentation: https://git-scm.com/doc
- GitHub Desktop: https://desktop.github.com/
- Markdown Guide: https://www.markdownguide.org/

---

*This guide was created for BSC-351 Mobile Application Development Assignment*
