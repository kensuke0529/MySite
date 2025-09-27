/**
 * Project Data Structure
 * Centralized data management for project list cards
 */

const projectData = {
  projects: [
    {
      id: 'visa-dashboard',
      title: 'Visa Sponsor Job Dashboard',
      description: 'Developed and deployed an interactive dashboard supporting international students in finding visa-sponsored jobs, with dynamic filters by visa type, job title, and location using EDA-processed raw datasets.',
      fullDescription: 'Comprehensive dashboard built with React and D3.js for visualizing job opportunities for international students. Features advanced filtering, interactive charts, and real-time data updates.',
      category: 'data-analysis',
      status: 'active',
      priority: 'high',
      progress: 85,
      owner: 'Kensuke Umakoshi',
      lastUpdated: '3 days ago',
      tags: ['React', 'D3.js', 'Data Visualization', 'Dashboard'],
      links: [
        {
          type: 'details',
          label: 'Project Details',
          url: 'projects/visa-sponsor-dashboard.html',
          icon: 'fas fa-file-alt'
        },
        {
          type: 'demo',
          label: 'Live Demo',
          url: 'https://careers.utah.edu/internationalstudents/',
          icon: 'fas fa-external-link-alt'
        },
        {
          type: 'github',
          label: 'GitHub Repository',
          url: 'https://github.com/kensuke0529/visa-dashboard',
          icon: 'fab fa-github'
        }
      ],
      metrics: {
        tasks: { completed: 12, total: 15 },
        comments: 8,
        contributors: 3
      },
      technologies: ['React', 'D3.js', 'JavaScript', 'CSS3', 'HTML5'],
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      isFavorite: false
    },
    {
      id: 'website-deploy',
      title: 'Static Website on S3 + Terraform + GitHub Actions',
      description: 'Deployed a fast, reliable, and lightweight portfolio site using AWS S3, Terraform, and GitHub Actions for automated deployment. Achieved 99.9% uptime with serverless architecture.',
      fullDescription: 'Infrastructure as Code solution for hosting a static portfolio website with automated CI/CD pipeline using GitHub Actions and Terraform for AWS resource management.',
      category: 'cloud',
      status: 'progress',
      priority: 'medium',
      progress: 70,
      owner: 'Kensuke Umakoshi',
      lastUpdated: '1 week ago',
      tags: ['AWS S3', 'Terraform', 'GitHub Actions', 'CI/CD'],
      links: [
        {
          type: 'details',
          label: 'Project Details',
          url: 'projects/website-auto-deploy.html',
          icon: 'fas fa-file-alt'
        },
        {
          type: 'github',
          label: 'GitHub Repository',
          url: 'https://github.com/kensuke0529/MySite',
          icon: 'fab fa-github'
        }
      ],
      metrics: {
        tasks: { completed: 8, total: 12 },
        comments: 5,
        contributors: 1
      },
      technologies: ['AWS S3', 'Terraform', 'GitHub Actions', 'HTML', 'CSS'],
      startDate: '2024-02-01',
      endDate: '2024-04-01',
      isFavorite: true
    },
    {
      id: 'fraud-detection',
      title: 'End-to-End Fraud Detection',
      description: 'Developed a scalable ETL pipeline with Apache Airflow orchestrating ingestion of 284k+ transactions. Trained and deployed fraud detection models achieving 0.89 F1-score.',
      fullDescription: 'Complete machine learning pipeline for fraud detection using Apache Airflow for orchestration and advanced ML models for classification.',
      category: 'data-science',
      status: 'completed',
      priority: 'high',
      progress: 100,
      owner: 'Kensuke Umakoshi',
      lastUpdated: '2 weeks ago',
      tags: ['Python', 'Apache Airflow', 'Machine Learning'],
      links: [
        {
          type: 'details',
          label: 'Project Details',
          url: 'projects/end-to-end-fraud-detection.html',
          icon: 'fas fa-file-alt'
        },
        {
          type: 'github',
          label: 'GitHub Repository',
          url: 'https://github.com/kensuke0529/ML',
          icon: 'fab fa-github'
        }
      ],
      metrics: {
        tasks: { completed: 15, total: 15 },
        comments: 12,
        contributors: 2
      },
      technologies: ['Python', 'Apache Airflow', 'Scikit-learn', 'Pandas'],
      startDate: '2023-10-01',
      endDate: '2023-12-15',
      isFavorite: false
    },
    {
      id: 'cms-medicare',
      title: 'CMS Medicare Payment Prediction',
      description: 'Implemented a full-cycle ML pipeline on 100k+ inpatient records. Built and tuned XGBoost + ensemble models with Optuna, achieving MAE $1,891 and R² 0.946.',
      fullDescription: 'Advanced machine learning project for predicting Medicare payments using ensemble methods and hyperparameter optimization with Optuna framework.',
      category: 'data-science',
      status: 'completed',
      priority: 'medium',
      progress: 100,
      owner: 'Kensuke Umakoshi',
      lastUpdated: '3 weeks ago',
      tags: ['Python', 'XGBoost', 'Optuna', 'Machine Learning'],
      links: [
        {
          type: 'details',
          label: 'Project Details',
          url: 'projects/cms-medicare-prediction.html',
          icon: 'fas fa-file-alt'
        },
        {
          type: 'github',
          label: 'GitHub Repository',
          url: 'https://github.com/kensuke0529/CMS',
          icon: 'fab fa-github'
        }
      ],
      metrics: {
        tasks: { completed: 10, total: 10 },
        comments: 6,
        contributors: 1
      },
      technologies: ['Python', 'XGBoost', 'Optuna', 'Pandas', 'Scikit-learn'],
      startDate: '2023-09-01',
      endDate: '2023-11-30',
      isFavorite: false
    },
    {
      id: 'movie-recommendation',
      title: 'Hybrid Movie Recommendation System',
      description: 'Engineered a hybrid engine combining collaborative filtering (PyTorch), semantic search (SentenceTransformer), and item-item similarity. Achieved MAE 0.67 and RMSE 0.87 across 99k+ ratings.',
      fullDescription: 'Advanced recommendation system combining multiple approaches including collaborative filtering, content-based filtering, and semantic search for improved recommendation accuracy.',
      category: 'ai',
      status: 'completed',
      priority: 'medium',
      progress: 100,
      owner: 'Kensuke Umakoshi',
      lastUpdated: '1 month ago',
      tags: ['Python', 'PyTorch', 'SentenceTransformer', 'Recommendation System'],
      links: [
        {
          type: 'details',
          label: 'Project Details',
          url: 'projects/hybrid-movie-recommendation.html',
          icon: 'fas fa-file-alt'
        },
        {
          type: 'github',
          label: 'GitHub Repository',
          url: 'https://github.com/kensuke0529/Rec-sys',
          icon: 'fab fa-github'
        }
      ],
      metrics: {
        tasks: { completed: 12, total: 12 },
        comments: 9,
        contributors: 1
      },
      technologies: ['Python', 'PyTorch', 'SentenceTransformer', 'Pandas', 'NumPy'],
      startDate: '2023-08-01',
      endDate: '2023-10-31',
      isFavorite: true
    },
    {
      id: 'ai-news-analyst',
      title: 'AI News Analyst (RAG News Platform)',
      description: 'Built an intelligent news platform using RAG, Chroma vector DB, and OpenAI APIs to help professionals stay on top of AI trends with curated summaries and deep insights.',
      fullDescription: 'Retrieval-Augmented Generation (RAG) system for news analysis and summarization, helping professionals stay informed about AI trends and developments.',
      category: 'ai',
      status: 'progress',
      priority: 'medium',
      progress: 75,
      owner: 'Kensuke Umakoshi',
      lastUpdated: '1 week ago',
      tags: ['RAG', 'Chroma', 'OpenAI', 'News Analysis'],
      links: [
        {
          type: 'details',
          label: 'Project Details',
          url: 'projects/ai-news-analyst.html',
          icon: 'fas fa-file-alt'
        },
        {
          type: 'github',
          label: 'GitHub Repository',
          url: 'https://github.com/kensuke0529/News-analyzer',
          icon: 'fab fa-github'
        }
      ],
      metrics: {
        tasks: { completed: 9, total: 12 },
        comments: 7,
        contributors: 1
      },
      technologies: ['Python', 'Chroma', 'OpenAI API', 'RAG', 'Streamlit'],
      startDate: '2024-02-15',
      endDate: '2024-04-15',
      isFavorite: false
    },
    {
      id: 'ai-study-agent',
      title: 'AI Study Assistant Agent',
      description: 'Developed an intelligent AI agent using RAG, FAISS, OpenAI LLMs, and embeddings to provide context-aware answers from personalized document libraries, reducing hallucinations.',
      fullDescription: 'Intelligent AI study assistant that leverages Retrieval-Augmented Generation (RAG) technology to provide context-aware answers from personalized document libraries.',
      category: 'ai',
      status: 'completed',
      priority: 'high',
      progress: 100,
      owner: 'Kensuke Umakoshi',
      lastUpdated: '2 weeks ago',
      tags: ['RAG', 'FAISS', 'OpenAI', 'AI Agent'],
      links: [
        {
          type: 'details',
          label: 'Project Details',
          url: 'projects/ai-study-agent.html',
          icon: 'fas fa-file-alt'
        },
        {
          type: 'github',
          label: 'GitHub Repository',
          url: 'https://github.com/kensuke0529/ML',
          icon: 'fab fa-github'
        }
      ],
      metrics: {
        tasks: { completed: 14, total: 14 },
        comments: 11,
        contributors: 1
      },
      technologies: ['Python', 'FAISS', 'OpenAI API', 'RAG', 'Streamlit'],
      startDate: '2023-11-01',
      endDate: '2023-12-31',
      isFavorite: true
    },
    {
      id: 'pet-classifier',
      title: 'Deep Learning Pet Breed Classifier',
      description: 'Developed a comparative analysis system using fine-tuned ResNet50 vs. original ResNet50 for pet breed classification across 35 breeds. Achieved 91.33% test accuracy with 3,500% improvement.',
      fullDescription: 'Computer vision project comparing fine-tuned and original ResNet50 models for pet breed classification, demonstrating the effectiveness of transfer learning.',
      category: 'ai',
      status: 'completed',
      priority: 'medium',
      progress: 100,
      owner: 'Kensuke Umakoshi',
      lastUpdated: '3 weeks ago',
      tags: ['Deep Learning', 'ResNet50', 'Computer Vision', 'Transfer Learning'],
      links: [
        {
          type: 'details',
          label: 'Project Details',
          url: 'projects/pet-breed-classifier.html',
          icon: 'fas fa-file-alt'
        },
        {
          type: 'demo',
          label: 'Live Demo',
          url: 'https://huggingface.co/spaces/kennnn1441/pet-breed-classification-comparison',
          icon: 'fas fa-external-link-alt'
        },
        {
          type: 'github',
          label: 'GitHub Repository',
          url: 'https://github.com/kensuke0529/computer_vision_classifier',
          icon: 'fab fa-github'
        }
      ],
      metrics: {
        tasks: { completed: 8, total: 8 },
        comments: 4,
        contributors: 1
      },
      technologies: ['Python', 'PyTorch', 'ResNet50', 'Computer Vision', 'Hugging Face'],
      startDate: '2023-07-01',
      endDate: '2023-09-30',
      isFavorite: false
    },
    {
      id: 'food-delivery-analysis',
      title: 'Food Delivery App Sales Analysis',
      description: 'Analyzed 20K+ sales records using SQL (PostgreSQL) and Python to uncover key business trends and customer behaviors. Evaluated KPIs including weekly profits and retention rates.',
      fullDescription: 'Comprehensive business intelligence analysis of food delivery app data using SQL and Python to identify trends, customer behavior patterns, and business opportunities.',
      category: 'data-analysis',
      status: 'completed',
      priority: 'low',
      progress: 100,
      owner: 'Kensuke Umakoshi',
      lastUpdated: '1 month ago',
      tags: ['SQL', 'PostgreSQL', 'Python', 'Business Intelligence'],
      links: [
        {
          type: 'details',
          label: 'Project Details',
          url: 'projects/food-delivery-analysis.html',
          icon: 'fas fa-file-alt'
        },
        {
          type: 'github',
          label: 'GitHub Repository',
          url: 'https://github.com/kensuke0529/ML',
          icon: 'fab fa-github'
        }
      ],
      metrics: {
        tasks: { completed: 6, total: 6 },
        comments: 3,
        contributors: 1
      },
      technologies: ['SQL', 'PostgreSQL', 'Python', 'Pandas', 'Matplotlib'],
      startDate: '2023-06-01',
      endDate: '2023-07-31',
      isFavorite: false
    },
    {
      id: 'banking-churn',
      title: 'Banking Churn Rate Analysis & Prediction',
      description: 'Performed Exploratory Data Analysis (EDA) on 10K bank customer records to understand churn behavior. Built interactive dashboards and applied predictive modeling for retention strategies.',
      fullDescription: 'Data science project analyzing customer churn in banking using exploratory data analysis, predictive modeling, and interactive visualization to develop retention strategies.',
      category: 'data-analysis',
      status: 'completed',
      priority: 'medium',
      progress: 100,
      owner: 'Kensuke Umakoshi',
      lastUpdated: '2 weeks ago',
      tags: ['EDA', 'Predictive Modeling', 'Customer Analytics', 'Dashboard'],
      links: [
        {
          type: 'details',
          label: 'Project Details',
          url: 'projects/banking-churn.html',
          icon: 'fas fa-file-alt'
        },
        {
          type: 'github',
          label: 'GitHub Repository',
          url: 'https://github.com/kensuke0529/ML',
          icon: 'fab fa-github'
        }
      ],
      metrics: {
        tasks: { completed: 10, total: 10 },
        comments: 6,
        contributors: 1
      },
      technologies: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
      startDate: '2023-05-01',
      endDate: '2023-06-30',
      isFavorite: false
    }
  ],

  // Helper methods for data manipulation
  getProjectsByCategory: function(category) {
    if (category === 'all') return this.projects;
    return this.projects.filter(project => project.category === category);
  },

  getProjectsByStatus: function(status) {
    if (status === 'all') return this.projects;
    return this.projects.filter(project => project.status === status);
  },

  getProjectsByPriority: function(priority) {
    if (priority === 'all') return this.projects;
    return this.projects.filter(project => project.priority === priority);
  },

  getFavoriteProjects: function() {
    return this.projects.filter(project => project.isFavorite);
  },

  searchProjects: function(query) {
    const lowercaseQuery = query.toLowerCase();
    return this.projects.filter(project => 
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  },

  sortProjects: function(sortBy) {
    const sortedProjects = [...this.projects];
    
    switch (sortBy) {
      case 'name':
        return sortedProjects.sort((a, b) => a.title.localeCompare(b.title));
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return sortedProjects.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      case 'progress':
        return sortedProjects.sort((a, b) => b.progress - a.progress);
      case 'date':
      default:
        return sortedProjects.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
    }
  },

  getProjectById: function(id) {
    return this.projects.find(project => project.id === id);
  },

  updateProject: function(id, updates) {
    const projectIndex = this.projects.findIndex(project => project.id === id);
    if (projectIndex !== -1) {
      this.projects[projectIndex] = { ...this.projects[projectIndex], ...updates };
      return this.projects[projectIndex];
    }
    return null;
  },

  toggleFavorite: function(id) {
    const project = this.getProjectById(id);
    if (project) {
      project.isFavorite = !project.isFavorite;
      return project.isFavorite;
    }
    return false;
  },

  getProjectStats: function() {
    const total = this.projects.length;
    const active = this.projects.filter(p => p.status === 'active').length;
    const progress = this.projects.filter(p => p.status === 'progress').length;
    const completed = this.projects.filter(p => p.status === 'completed').length;
    const favorites = this.projects.filter(p => p.isFavorite).length;

    return {
      total,
      active,
      progress,
      completed,
      favorites
    };
  },

  getCategories: function() {
    const categories = [...new Set(this.projects.map(project => project.category))];
    return categories.map(category => ({
      value: category,
      label: category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    }));
  },

  getStatuses: function() {
    return [
      { value: 'active', label: 'Active', color: '#10B981' },
      { value: 'progress', label: 'In Progress', color: '#F59E0B' },
      { value: 'hold', label: 'On Hold', color: '#6B7280' },
      { value: 'completed', label: 'Completed', color: '#3B82F6' }
    ];
  },

  getPriorities: function() {
    return [
      { value: 'high', label: 'High', color: '#EF4444' },
      { value: 'medium', label: 'Medium', color: '#F59E0B' },
      { value: 'low', label: 'Low', color: '#6B7280' }
    ];
  }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = projectData;
}

// Make available globally
window.projectData = projectData;

