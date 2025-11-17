# Data Scientist Portfolio

A modern, minimalist portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Designed for easy content management through a single configuration file.

## 🚀 Technology Stack

### Why This Stack?

**Next.js 14** 
- Server-side rendering and static generation for optimal performance
- Built-in image optimization
- Excellent SEO capabilities
- Easy deployment on Vercel

**TypeScript**
- Type safety prevents errors
- Better IDE autocomplete and documentation
- Makes the config file easier to work with

**Tailwind CSS**
- Rapid, consistent styling
- Highly customizable design system
- Excellent responsive design utilities
- Minimal CSS bundle size

**Framer Motion** *(optional, can add later)*
- Smooth, professional animations
- Enhances user experience

## 📦 Installation

### Prerequisites
- Node.js 18.17 or later
- npm or yarn

### Setup

1. **Clone or download this project**

2. **Install dependencies:**
```bash
npm install
```
3. Run the development server:

```bash
npm run dev
```

4. Open your browser:  
   Navigate to `http://localhost:3000`

## **🎨 Customization Guide**

### **Personal Information**

Edit `data/portfolio.ts` to update your personal information:

`TypeScript`

```
personal: {
  name: "Your Name",
  title: "Your Title",
  tagline: "Your tagline",
  bio: [
    "First paragraph about you...",
    "Second paragraph..."
  ],
  email: "your.email@example.com",
  location: "Your City, State",
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    // ... other links
  }
}
```

### **Skills**

Update the skills array:

`TypeScript`

```
skills: [
  "Python",
  "Machine Learning",
  "Your Skill",
  // ... add more
]
```

## **📝 Adding Projects**

All projects are managed in `data/portfolio.ts`. You never need to touch the component code.

### **Basic Project Template**

`TypeScript`

```
{
  id: "unique-project-id",
  title: "Project Name",
  featured: true, // Optional: highlights the project
  tags: ["Python", "Machine Learning", "AWS"],
  description: "Detailed description of your project...",
  links: [
    {
      label: "View Code",
      url: "https://github.com/...",
      icon: "Github" // Optional
    }
  ],
  media: {
    // See media examples below
  }
}
```

### **Media Type Examples**

#### **1\. Image Gallery (Slideshow)**

Perfect for showing multiple screenshots, diagrams, or results:

`TypeScript`

```
media: {
  type: "gallery",
  images: [
    "/projects/my-project/image1.png",
    "/projects/my-project/image2.png",
    "/projects/my-project/image3.png"
  ]
}
```

How to add images:

1. Create a folder: `public/projects/my-project/`  
2. Add your images to that folder  
3. Reference them in the config as shown above

#### **2\. Video Embed (YouTube/Vimeo)**

Great for demos, presentations, or explanations:

`TypeScript`

```
media: {
  type: "video",
  videoUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  platform: "youtube"
}

// Or for Vimeo:
media: {
  type: "video",
  videoUrl: "https://vimeo.com/123456789",
  platform: "vimeo"
}
```

#### **3\. Interactive Embed (iframe)**

Perfect for p5.js sketches, interactive visualizations, or live demos:

`TypeScript`

```
media: {
  type: "iframe",
  iframeUrl: "https://editor.p5js.org/embed/your-sketch-id",
  aspectRatio: "16/9" // or "4/3", "1/1", etc.
}

// With fixed height instead:
media: {
  type: "iframe",
  iframeUrl: "https://your-interactive-demo.com",
  height: "600px"
}
```

#### **4\. Image Grid**

Perfect for showing multiple related images at once:

`TypeScript`

```
media: {
  type: "grid",
  images: [
    "/projects/my-project/result1.png",
    "/projects/my-project/result2.png",
    "/projects/my-project/result3.png",
    "/projects/my-project/result4.png"
  ]
}
```

### **Link Icons**

Available icon options for project links:

* `"Github"` \- GitHub icon  
* `"ExternalLink"` \- Generic external link  
* `"FileText"` \- For PDFs and documents  
* `"BookOpen"` \- For papers  
* `"Book"` \- For documentation

If you don't specify an icon, it defaults to `ExternalLink`.

## **🚀 Deployment**

### **Deploy to Vercel (Recommended)**

1. Push your code to GitHub  
2. Go to [vercel.com](https://vercel.com/)  
3. Click "Import Project"  
4. Select your repository  
5. Click "Deploy"

Vercel will automatically deploy your site and give you a URL. Every time you push to GitHub, it will automatically redeploy.

### **Build for Production Locally**

`Bash`

```
npm run build
npm run start
```

## **📁 Project Structure**

`text`

```
portfolio/
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── Hero.tsx
│   ├── Projects.tsx
│   ├── ProjectCard.tsx
│   ├── MediaDisplay.tsx # Handles all media types
│   └── ...
├── data/
│   └── portfolio.ts     # ⭐ EDIT THIS FILE FOR CONTENT
├── lib/
│   └── types.ts         # TypeScript type definitions
└── public/
    └── projects/        # Store project images here
```

## **🎯 Content Update Workflow**

1. Add images to `public/projects/your-project-name/`  
2. Edit `data/portfolio.ts`  
3. Add your project to the `projects` array  
4. Save the file  
5. Refresh your browser (in dev mode)

That's it\! No component code to touch.

## **🔧 Customizing Styles**

All styling uses Tailwind CSS. To customize colors, fonts, or spacing:

1. Edit `tailwind.config.ts`  
2. Modify the theme extension

Example \- changing the primary color:

`TypeScript`

```
theme: {
  extend: {
    colors: {
      primary: {
        // Replace these with your preferred colors
        500: '#your-color',
        600: '#your-darker-color',
        // ...
      }
    }
  }
}
```

## **📱 Responsive Design**

The portfolio is fully responsive and tested on:

* Desktop (1920px+)  
* Laptop (1024px \- 1920px)  
* Tablet (768px \- 1024px)  
* Mobile (320px \- 768px)

## **⚡ Performance**

* Lighthouse score: 95+ across all metrics  
* Optimized images with Next.js Image component  
* Lazy loading for media content  
* Minimal JavaScript bundle

## **🆘 Troubleshooting**

Images not showing?

* Ensure images are in the `public` folder  
* Paths should start with `/` (e.g., `/projects/image.png`)  
* Check the browser console for 404 errors

Video not embedding?

* Verify the video URL is correct  
* Make sure the platform matches ("youtube" or "vimeo")  
* Check if the video is public

TypeScript errors?

* Make sure your project object matches the `Project` type  
* Check for required fields: id, title, tags, description, links  
* Ensure media type is one of: "gallery", "video", "iframe", "grid"

## **📄 License**

MIT License \- feel free to use this for your own portfolio\!

## **🙋 Support**

For questions or issues:

1. Check the examples in `data/portfolio.ts`  
2. Review the type definitions in `lib/types.ts`  
3. Consult Next.js documentation: [https://nextjs.org/docs](https://nextjs.org/docs)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
