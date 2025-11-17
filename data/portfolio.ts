import { PortfolioData, ReservedTag } from '@/lib/types';

/**
 * PORTFOLIO CONFIGURATION FILE
 * 
 * This is the ONLY file you need to edit to update your portfolio content.
 * 
 * Instructions:
 * 1. Update personal information in the 'personal' section
 * 2. Add/remove/modify projects in the 'projects' array
 * 3. Each project supports different media types (see examples below)
 * 
 * Media Type Examples:
 * - gallery: Slideshow of multiple images
 * - video: Embedded YouTube or Vimeo video
 * - iframe: Interactive embed (e.g., p5.js sketch)
 * - grid: Static grid of images
 */

/**
 * RESERVED TAGS CONFIGURATION
 * 
 * These are special tags that have distinct visual styling to highlight
 * the context in which projects were created (e.g., academic vs commercial work).
 * 
 * Visual Guidelines:
 * - University: Blue/indigo theme representing academic work
 * - Commercial: Green/emerald theme representing professional/business work
 */
export const reservedTags: ReservedTag[] = [
  {
    id: 'commercial',
    label: 'Commercial',
    backgroundColor: '#059669', // Emerald-600
    textColor: '#FFFFFF',
    borderColor: '#10B981', // Emerald-500
    icon: 'Briefcase'
  },
  {
    id: 'university',
    label: 'University',
    backgroundColor: '#4F46E5', // Indigo-600
    textColor: '#FFFFFF',
    borderColor: '#6366F1', // Indigo-500
    icon: 'GraduationCap'
  },
];

export const portfolioData: PortfolioData = {
  personal: {
    name: "Quincy Sproul",
    title: "Data Scientist & Machine Learning Engineer",
    tagline: "M.Eng. Engineering Mathematics | ML & Statistical Modeling",
    bio: [
      "I'm a data scientist specialising in machine learning, statistical modelling, and computer vision. With a Master's in Engineering Mathematics, I bridge theoretical rigor with practical applications.",
      "My work focuses on developing robust, scalable solutions for complex problems in finance, healthcare, and technology. I'm passionate about translating data into actionable insights and building systems that make a real-world impact."
    ],
    email: "quincy.sproul@gmail.com",
    location: "Leamington Spa, UK",
    links: {
      github: "https://github.com/qcuincy",
      linkedin: "https://www.linkedin.com/in/quincysproul/",
    //   custom: [
    //     {
    //       label: "Medium",
    //       url: "https://medium.com/@alexmorgan"
    //     }
    //   ]
    }
  },

  skills: [
    "Python",
    "SQL",
    "Machine Learning",
    "Pandas",
    "NumPy",
    "Git",
    "TensorFlow/Keras",
    "PyTorch",
    "Deep Learning",
    "Statistical Modelling",
    "Data Analysis",
    "Data Preprocessing",
    "Data Techniques",
    "MLOps",
    "AWS",
    "Snowflake",
    "Docker",
    "API Integration",
    "Flask",
    "LLM",
    "Transformer Models",
    "NLP",
    "Computer Vision",
    "CNN",
    "YOLOv8",
    "Object Detection",
    "Visual Search",
    "Time Series Analysis",
    "Time-Series Forecasting",
    "ARIMA",
    "EWMA",
    "Risk Modelling",
    "Risk Analysis",
    "Transfer Learning",
    "Self-Supervised Learning",
    "Contrastive Learning",
    "Dimensionality Reduction (PCA, t-SNE)",
    "Optimisation",
    "Object-Oriented Programming (OOP)",
    "Software Design",
    "Data Visualisation",
    "Plotly",
    "Agentic Systems",
    "Agent-Based Modeling",
    "Autonomous Systems",
    "Bayesian Modelling",
    "Probabilistic Programming",
    "GPR",
    "GPyTorch",
    "Predictive Maintenance",
    "Fleet Analysis",
    "Environmental Monitoring",
    "Renewable Energy",
    "MATLAB",
    "Arduino",
    "Pololu 3pi+ 32U4",
    "PID",
    "Embedded Systems",
    "Robotics",
    "Startup",
    "MVP",
    "n8n",
    "Keras",
    "Autoencoder",
    "LSTM Autoencoder",
    "Bio-inspired AI",
    "Boids Algorithm",
    "Control Systems",
    "Crowd Simulation",
    "Data Augmentation",
    "Data Mining",
    "Data Modelling",
    "Differential Equations",
    "GPR",
    "Line Following",
    "Numerical Methods",
    "SciPy",
    "Scientific Computing",
    "Sensor Fusion",
    "TensorFlow/Keras",
    "VR Development",
  ],

  projects: [
    {
      id: "project-1",
      title: "Benchmarking Productivity of Github Projects with Stochastic Modelling",
      featured: false,
      year: "2022",
      month: "December",
      tags: ["University", "Data Analysis", "Time Series Analysis", "Statistical Modeling", "Machine Learning", "Python", "ARIMA", "Data Mining", "Git"],
      description: "This project established a productivity benchmark for Java software developers by analysing 98 projects from GitHub. Using data mining and statistical methods, we fitted Autoregressive Integrated Moving Average (ARIMA) and Random Walk time-series models to measure productivity in lines of code per author per week. Change point analysis was implemented to segment the project lifecycle into initial, midterm, and mature phases, allowing for more granular performance comparison. The result is a set of four highly accurate benchmarks that software teams can use to evaluate their performance against typical productivity trends.",
      links: [
        {
          label: "View Code",
          url: "https://github.com/lj20127/MDM3_Code4Thought",
          icon: "Github"
        },
        {
          label: "Technical Report",
          url: "/projects/benchmarking/report.pdf",
          icon: "FileText"
        },
      ],
      media: {
        type: "gallery",
        images: [
          "/projects/benchmarking/long-arima-benchmark.png",
          "/projects/benchmarking/long-rw-benchmark.png",
          "/projects/benchmarking/comparison-table.png",
        ]
      }
    },

    {
      id: "project-2",
      title: "Simulating Crowd Behaviour with Agent-based Modelling",
      featured: false,
      year: "2023",
      month: "August",
      tags: ["University", "Agent-Based Modeling", "Crowd Simulation", "Behavioral Modeling", "Data Visualisation", "Python", "MATLAB", "Boids Algorithm", "Data Analysis"],
      description: "This project investigates how venue design and crowd density impact audience visibility at live events through agent-based modeling. We developed and analysed two distinct crowd simulation models: a discrete model and a more complex continuous model based on the 'Boids' algorithm. These simulations were used to test various venue dimensions and stage shapes (rectangular, circular, and semi-circular) to determine their effect on the percentage of the audience with a clear line of sight. The results offer valuable insights and suggestions for optimising venue layouts to maximise the audience's viewing experience.",
      links: [
        {
          label: "Launch Interactive Demo",
          url: "https://editor.p5js.org/qcuincy/full/VoaIvusJL",
          icon: "ExternalLink"
        },
        {
          label: "View Code",
          url: "https://editor.p5js.org/qcuincy/collections/PTi5Hq963",
          icon: "ExternalLink"
        },
        {
          label: "Presentation",
          url: "/projects/crowd-behaviour/presentation.pdf",
          icon: "FileText"
        }
      ],
      media: {
        type: "iframe",
        iframeUrl: "https://editor.p5js.org/qcuincy/full/H7XQJ6CtS",
        aspectRatio: "16/10"
      }
    },


    {
      id: "project-3",
      title: "Visual Search with Deep Embeddings & Contrastive Learning",
      year: "2023",
      month: "October",
      tags: ["University", "Deep Learning", "Visual Search", "Contrastive Learning", "Self-Supervised Learning", "Transfer Learning", "CNN", "Python", "TensorFlow/Keras", "Data Augmentation", "Dimensionality Reduction (PCA, t-SNE)"],
      description: "This project addresses the challenge of visual search in fashion e-commerce, where varied camera angles hinder accurate item matching. We implemented and compared several deep learning models to create robust image embeddings, including a baseline CNN, VGG16/VGG19 transfer learning models, and a self-supervised contrastive learning model using a ResNet backbone. The contrastive learning approach successfully learned to group similar clothing styles and patterns by treating augmented versions of the same image as positive pairs, thus creating representations that are invariant to different viewpoints. This comprehensive analysis evaluates different deep embedding strategies, demonstrating the effectiveness of contrastive learning for building powerful visual search engines.",
      links: [
        {
          label: "View Code",
          url: "https://www.kaggle.com/quincys/visualsearch-contrastive-learning/",
          icon: "ExternalLink"
        },
        {
          label: "Technical Report",
          url: "/projects/visual-embedding/report.pdf",
          icon: "FileText"
        }
      ],
      media: {
        type: "gallery",
        images: [
          "/projects/visual-embedding/query-1.png",
          "/projects/visual-embedding/query-2.png",
          "/projects/visual-embedding/query-3.png",
          "/projects/visual-embedding/query-4.png",
          "/projects/visual-embedding/query-5.png"
        ]
      }
    },

    {
      id: "project-4",
      title: "Solar Panel Dust Detection with Object Detection (YOLO)",
      year: "2023",
      month: "December",
      tags: ["University", "Machine Learning", "Deep Learning", "Computer Vision", "Object Detection", "YOLOv8", "CNN", "Python", "Keras"],
      description: "This project tackles the critical issue of reduced solar panel efficiency due to the accumulation of dirt and debris. I explored various machine learning models to classify panels as 'clean' or 'dirty', including K-Nearest Neighbors, a custom Convolutional Neural Network (CNN), and an SVM-enhanced network. The primary focus was developing a YOLOv8 object detection model capable of identifying and localising dirty panels in real-time, specifically for use with drone footage. This final model successfully differentiated between clean and dirty panels within the same frame, proving far more effective for practical maintenance applications than standard binary image classifiers.",
      links: [
        {
          label: "View Code",
          url: "https://github.com/EMAT31530/group-project-group-14",
          icon: "Github"
        },
        {
          label: "Technical Report",
          url: "/projects/solar-panel-dust-detection/report.pdf",
          icon: "FileText"
        }
      ],
      media: {
        type: "gallery",
        images: [
          "/projects/solar-panel-dust-detection/query-1.png",
          "/projects/solar-panel-dust-detection/query-2.png",
          "/projects/solar-panel-dust-detection/query-3.png",
          "/projects/solar-panel-dust-detection/query-4.png",
          "/projects/solar-panel-dust-detection/query-5.png"
        ]
      },
    },

    {
      id: "project-5",
      title: "Pololu 3pi+ 32U4 Line Following Algorithm",
      year: "2024",
      month: "January",
      tags: ["University", "Robotics", "Line Following", "Control Systems", "PID", "Sensor Fusion", "Embedded Systems", "Pololu 3pi+ 32U4", "Arduino", "Python"],
      description: "This project implements a line following algorithm for the Pololu 3pi+ 32U4 robot. The algorithm is designed to navigate a line using a combination of sensor data and a control loop. The sensor data is used to determine the position of the robot relative to the line, and the control loop is used to adjust the robot's speed and direction to keep it on the line.",
      links: [
      ],
      media: {
        type: "video",
        videoUrl: "https://www.youtube.com/watch?v=D-A6DYnb4zQ",
        platform: "youtube"
      }
    },

    {
      id: "project-6",
      title: "Scientific Computing Toolbox for Solving ODEs & PDEs",
      year: "2024",
      featured: false,
      month: "March",
      tags: ["University", "Python", "Numerical Methods", "Scientific Computing", "Object-Oriented Programming (OOP)", "Differential Equations", "Software Design", "Data Visualisation", "NumPy", "SciPy"],
      description: "This Python package is a versatile numerical toolbox designed to solve a wide range of ordinary and partial differential equations (ODEs and PDEs). It capably handles both initial value problems (IVPs) and boundary value problems (BVPs), automatically detecting the problem type to simplify the user's workflow. Built with an object-oriented design, the software implements various numerical methods, including Runge-Kutta, finite difference, and parameter continuation techniques. The result is a modular and user-friendly library that provides an efficient tool for solving complex mathematical models and simulations.",
      links: [
        {
          label: "View Code",
          url: "https://github.com/qcuincy/emat30008",
          icon: "Github"
        },
        {
          label: "Technical Report",
          url: "/projects/scientific-computing/report.pdf",
          icon: "BookOpen"
        }
      ],
      media: {
        type: "gallery",
        images: [
          "/projects/scientific-computing/architecture.jpg",
        ]
      }
    },
    {
      id: "project-7",
      title: "Reducing Latency & Improving Accuracy in Dynamic Hand Gesture Recognition",
      year: "2024",
      featured: false,
      month: "April",
      tags: ["University", "Python", "PyTorch", "Machine Learning", "Deep Learning", "Transformer Models", "Time-Series Forecasting", "Data Preprocessing", "Computer Vision", "VR Development"],
      description: "This project explores using Transformer models for early and accurate hand gesture recognition in Virtual Reality, addressing the common issues of latency and inaccuracy. By encoding hand movements into discrete states representing pose, orientation, and motion, the system can predict the remainder of a gesture from only its initial frames. This predictive capability significantly reduces response time, paving the way for more intuitive and seamless user interactions in VR environments. The research compares various model configurations to balance prediction speed and reliability, with findings indicating that longer input sequences improve classification accuracy, particularly for nuanced movements.",
      links: [
        {
          label: "View Code",
          url: "https://github.com/qcuincy/early-gesture-recognition",
          icon: "Github"
        },
        {
          label: "Technical Report",
          url: "/projects/gesture-recognition/report.pdf",
          icon: "BookOpen"
        }
      ],
      media: {
        type: "video",
        videoUrl: "https://www.youtube.com/watch?v=i1qRj2ZToFk",
        platform: "youtube"
      }
    },
    {
      id: "project-8",
      title: "Sonar-Enhanced ASV for Freshwater Monitoring (Concept)",
      year: "2024",
      month: "June",
      tags: ["University", "Bio-inspired AI", "Startup", "Environmental Monitoring", "Autonomous Systems", "Robotics"],
      description: "Developed SEIR-based compartmental models with Bayesian parameter estimation to forecast COVID-19 spread across multiple regions. Incorporated mobility data, policy interventions, and vaccination rates to improve prediction accuracy. Models achieved 85% accuracy for 14-day forecasts during critical pandemic phases. Created interactive dashboard for public health officials to explore scenarios and evaluate intervention strategies. Work contributed to local health department decision-making during peak pandemic periods.",
      links: [
        {
          label: "View Code",
          url: "https://github.com/qcuincy/emat30008",
          icon: "Github"
        },
        {
          label: "Technical Report",
          url: "/projects/scientific-computing/report.pdf",
          icon: "BookOpen"
        }
      ],
      media: {
        type: "video",
        videoUrl: "https://www.youtube.com/watch?v=p-LtMCzl_d8",
        platform: "youtube"
      }
    },
    {
      id: "project-9",
      title: "Agentic Power Plant Analysis Chat (MVP)",
      featured: true,
      year: "2025",
      month: "August",
      tags: ["Commercial", "LLM", "Agentic Systems", "n8n", "Snowflake", "NLP", "MVP", "Python"],
      description: "Developed a working MVP for an agentic chat interface to democratise data access for non-technical users. The system, powered by n8n, allows users to ask plain-English questions, which are then translated into complex SQL queries against a massive Snowflake database. The agent can handle plotting, table results, and is designed to eventually query multiple data sources (Snowflake, DynamoDB, document databases) to provide a unified conversational analysis tool.",
      links: [
        // Internal project, no public links
      ],
      media: {
        type: "video", // A screen recording of you using the chat is ideal
        videoUrl: "https://www.youtube.com/watch?v=1lBEOiCPW-c",
        platform: "youtube"
      }
    },

    {
      id: "project-10",
      title: "Wind Turbine Unyawing Optimisation Model",
      featured: true,
      year: "2025",
      month: "August",
      tags: ["Commercial", "Optimisation", "Data Modelling", "Renewable Energy", "Time Series Analysis", "Python"],
      description: "Co-developed a high-impact optimisation model that calculates the optimal times to unyaw a wind turbine. By analysing wind speed, direction, and nacelle position, the model identifies moments to realign the turbine that minimises power loss. Our analysis has shown potential savings of 1-2 MWh per turbine per month, scaling to 600-1,000 MWh in total annual savings for a wind farm, representing a significant financial and operational improvement.",
      links: [
        // Internal project, no public links
      ],
      media: {
        type: "gallery",
        images: [
          "/projects/yaw-optimisation/example-result.png",
        ]
      }
    },

    {
      id: "project-11",
      title: "Automated Solar Plant Outage Tracker (Autoencoder)",
      featured: false,
      year: "2025",
      month: "July",
      tags: ["Commercial", "Deep Learning", "Autoencoder", "Anomaly Detection", "Time Series Analysis", "API Integration", "Python"],
      description: "Built an automated outage tracker for Concentrated Solar Plants (CSP). The system ingests live weather data (cloud cover, solar irradiance) from external APIs and trains an autoencoder to model the expected power output. When the real-time power produced deviates significantly from the model's prediction (i.e., a high residual error) during sunlight hours, the system automatically flags a potential outage. This provides a real-time, automated monitoring solution where none existed.",
      links: [
        // Internal project, no public links
      ],
      media: {
        type: "gallery",
        images: [
          "/projects/csp-outage-tracker/all-outages.png",
          "/projects/csp-outage-tracker/weather-variables.png",
          "/projects/csp-outage-tracker/weather-variables-2.png",
          "/projects/csp-outage-tracker/outages-highlighted.png",
        ]
      }
    },

    {
      id: "project-12",
      title: "Bayesian Failure Rate Model for Plant Components",
      featured: false,
      year: "2025",
      month: "May",
      tags: ["Commercial", "Bayesian Modelling", "Statistical Modelling", "Risk Analysis", "Probabilistic Programming", "Python"],
      description: "Designed and implemented Bayesian modeling logic to dynamically update component failure rate probabilities. The model uses prior engineering knowledge as a baseline and updates its beliefs based on new inspection results (e.g., 'no fault found', 'minor fault'). This provides a live, data-driven assessment of component reliability, allowing for optimised predictive maintenance schedules and improved risk management.",
      links: [
        // Internal project, no public links
      ],
      media: {
        type: "gallery",
        images: [
          "/projects/component-risk-analysis/waterfall-plot.png",
          "/projects/component-risk-analysis/total-loss-contribution.png",
          "/projects/component-risk-analysis/glm-sensitivity-duration.png",
          "/projects/component-risk-analysis/glm-sensitivity-minor-events.png",
          "/projects/component-risk-analysis/glm-sensitivity-plant-age.png",
          "/projects/component-risk-analysis/glm-sensitivity-plant-size.png",
        ]
      }
    },

    {
      id: "project-13", // Make sure this ID is unique
      title: "Wind Turbine Predictive Maintenance Framework",
      featured: true, // Set to true as it's a strong project
      year: "2025", // Adjust year/month as needed
      month: "September", 
      tags: [
        "Commercial",
        "Predictive Maintenance",
        "Anomaly Detection", 
        "Fleet Analysis", 
        "GPR", 
        "LSTM Autoencoder", 
        "EWMA", 
        "Python", 
        "Pandas", 
        "GPyTorch", 
        "TensorFlow", 
        "Flask", 
        "Plotly"
      ],
      description: "Developed a comprehensive framework for wind turbine predictive maintenance. The system generates realistic synthetic SCADA data, performs extensive feature engineering, and employs a two-stage anomaly detection process. First, Gaussian Process Regression (GPR) models establish normal operating behavior for key components. Then, standardised residuals from the GPR models are fed into an LSTM Autoencoder; high reconstruction errors signal potential anomalies. The framework includes advanced fleet analysis capabilities, calculating relative health indices by comparing turbines against the fleet median and applying EWMA control charts to generate a prioritised watchlist. A Flask dashboard utilising Plotly provides visualisations for fleet monitoring, alerts, and individual turbine diagnostics.",
      links: [
      ],
      media: {
        type: "gallery",
        images: [
          "/projects/fleet-analysis/architecture.png",
          "/projects/fleet-analysis/dashboard.png",
          "/projects/fleet-analysis/component-alerts.png",
          "/projects/fleet-analysis/watchlist.png",
          "/projects/fleet-analysis/health-index.png",
          "/projects/fleet-analysis/residuals.png",
          "/projects/fleet-analysis/event-list.png",
        ]
      }
    },
  ]
};

export default portfolioData;