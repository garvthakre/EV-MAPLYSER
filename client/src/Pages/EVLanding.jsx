import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  TrendingUp, 
  Settings, 
  Brain, 
  Map, 
  BarChart3, 
  Calendar, 
  Download, 
  Shield, 
  MessageSquare,
  ChevronRight,
  Play,
  Zap,
  Target,
  Users,
  Award,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EVChargingLanding = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const navigate = useNavigate();
  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Location-based Analysis",
      description: "Input a city/locality and get intelligent station suggestions based on EV sales data and market trends.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Profit Margin Evaluator", 
      description: "Calculate ROI and long-term profits with comprehensive financial modeling and market analysis.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Maintenance Assurance",
      description: "Track and get AI-powered suggestions for periodic maintenance of existing charging stations.",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Suggestions Panel",
      description: "Real-time ML-driven recommendations displayed in an intuitive side panel interface.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: "Interactive Map Integration",
      description: "Visualize potential charging station locations with advanced mapping technology.",
      color: "from-teal-500 to-blue-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Graphical Dashboard",
      description: "Comprehensive charts for EV growth trends, station usage, and profit margin analysis.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Historical Data Comparison",
      description: "Compare locality performance year-wise with detailed trend analysis and insights.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Export Reports",
      description: "Download station suggestions and financial data as professional CSV/PDF reports.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Admin / Client Login",
      description: "Secure authentication system with role-based access for planners, analysts, and investors.",
      color: "from-gray-600 to-gray-800"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Feedback System",
      description: "Collaborative platform allowing clients to add notes and flag data for continuous improvement.",
      color: "from-cyan-500 to-teal-500"
    }
  ];

  const stats = [
    { number: "500+", label: "Cities Analyzed", icon: <MapPin className="w-6 h-6" /> },
    { number: "95%", label: "Accuracy Rate", icon: <Target className="w-6 h-6" /> },
    { number: "1000+", label: "Stations Optimized", icon: <Zap className="w-6 h-6" /> },
    { number: "50+", label: "Happy Clients", icon: <Users className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md border-b border-white/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">EV-MAPLYSER</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Smart <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">EV Charging</span>
                <br />Station Analytics
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto">
                Revolutionize your EV infrastructure planning with AI-powered location analysis, 
                profit optimization, and comprehensive maintenance insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={()=>navigate("/Dashboard1")}className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Start Analysis</span>
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all flex items-center justify-center space-x-2">
                  <span>Watch Demo</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-blue-400 mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-white/60">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful Features for <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Smart Decisions</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Comprehensive tools and analytics to optimize your EV charging station investments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                  <div className="mt-4 flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                    <span className="text-sm font-medium">Learn more</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Intuitive <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Dashboard</span>
            </h2>
            <p className="text-xl text-white/70">Experience the power of data-driven decision making</p>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-8 border border-white/20 backdrop-blur-md">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Real-time Analytics & Insights</h3>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Live EV sales tracking and market analysis</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Interactive maps with optimal location suggestions</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Financial modeling and ROI calculations</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Maintenance scheduling and alerts</span>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-md border border-white/20">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded p-3">
                        <div className="text-white/60 text-sm">Total Stations</div>
                        <div className="text-white text-xl font-bold">1,247</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded p-3">
                        <div className="text-white/60 text-sm">Monthly Revenue</div>
                        <div className="text-white text-xl font-bold">₹4.2M</div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded p-3">
                      <div className="text-white/60 text-sm mb-2">Performance Trend</div>
                      <div className="flex space-x-1 h-16 items-end">
                        {[40, 65, 45, 80, 60, 95, 70].map((height, i) => (
                          <div key={i} className="bg-gradient-to-t from-blue-500 to-cyan-400 rounded-sm flex-1" style={{height: `${height}%`}}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-12 border border-white/20 backdrop-blur-md">
            <Award className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your EV Infrastructure?
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Join hundreds of companies using ChargeIQ to make smarter, data-driven decisions for EV charging station deployments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ChargeIQ</span>
              </div>
              <p className="text-white/60">Empowering the future of electric vehicle infrastructure with intelligent analytics.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/20 text-center text-white/60">
            <p>&copy; 2025 ChargeIQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EVChargingLanding;