import { GraduationCap, Briefcase, Users, Building2, BarChart3, FileText } from "lucide-react";

const enterpriseCards = [
  {
    icon: Building2,
    company: "Deloitte",
    description: "Global firms use AI to draft research, generate slides, and create client-ready presentations at enterprise scale.",
  },
  {
    icon: FileText,
    company: "Boston Consulting Group (BCG)",
    description: "AI-driven slide systems trained on hundreds of templates allow consultants to build polished, strategic decks in minutes.",
  },
  {
    icon: BarChart3,
    company: "McKinsey & Company",
    description: "Internal generative AI helps teams summarize research, structure stories, and create data-backed presentations faster than ever.",
  },
];

const TrustedBySection = () => {
  return (
    <section 
      id="why-vora"
      className="relative overflow-hidden"
      style={{ backgroundColor: '#faf5f0' }}
    >
      {/* Coded Background - SVG Blobs */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Orange/Coral Top Blob */}
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Coral/Orange Gradient - warmer, more vibrant */}
            <linearGradient id="coralGradient" x1="0%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#f5a06a" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#f7b08a" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#f9c4a8" stopOpacity="0.7" />
            </linearGradient>
            
            {/* Pink/Rose Gradient - softer blend */}
            <linearGradient id="pinkGradient" x1="0%" y1="30%" x2="100%" y2="70%">
              <stop offset="0%" stopColor="#e9a0b5" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#de8aa0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d07590" stopOpacity="0.7" />
            </linearGradient>
            
            {/* Purple/Violet Gradient - deeper tones */}
            <linearGradient id="purpleGradient" x1="0%" y1="100%" x2="80%" y2="0%">
              <stop offset="0%" stopColor="#9a68ad" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#b080c0" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#c8a0d5" stopOpacity="0.6" />
            </linearGradient>

            {/* Peach/Apricot overlay gradient */}
            <linearGradient id="peachGradient" x1="100%" y1="0%" x2="20%" y2="100%">
              <stop offset="0%" stopColor="#f8b080" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#fac8a5" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fcddc5" stopOpacity="0.4" />
            </linearGradient>

            {/* Soft pink-orange blend */}
            <linearGradient id="blendGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0a090" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#e090a5" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Main Coral/Orange Blob - organic flowing shape */}
          <path
            d="M-50,20 
               Q100,-20 250,40 
               T500,30 
               Q650,20 800,60 
               T1100,50 
               Q1300,40 1500,80 
               L1500,280 
               Q1350,350 1150,300 
               T850,340 
               Q650,380 450,320 
               T150,380 
               Q0,400 -50,350 
               Z"
            fill="url(#coralGradient)"
          />

          {/* Secondary Orange blob - overlapping right */}
          <path
            d="M400,60 
               Q600,20 850,80 
               T1200,50 
               Q1400,30 1550,90 
               L1550,380 
               Q1400,450 1150,380 
               T800,420 
               Q600,460 400,380 
               Z"
            fill="url(#peachGradient)"
          />

          {/* Pink wave blob - middle layer */}
          <path
            d="M-100,180 
               Q50,120 200,180 
               T450,150 
               Q600,120 750,200 
               T1050,160 
               Q1200,130 1350,200 
               L1350,480 
               Q1150,550 950,480 
               T600,530 
               Q400,570 200,500 
               T-100,550 
               Z"
            fill="url(#pinkGradient)"
          />

          {/* Purple blob - bottom organic shape */}
          <path
            d="M-100,320 
               Q100,250 280,340 
               T550,280 
               Q700,240 850,340 
               T1100,300 
               L1100,600 
               Q900,680 700,600 
               T350,660 
               Q150,700 -100,640 
               Z"
            fill="url(#purpleGradient)"
          />

          {/* Soft blend overlay for depth */}
          <path
            d="M200,200 
               Q400,150 600,220 
               T950,180 
               L950,400 
               Q750,460 550,380 
               T200,420 
               Z"
            fill="url(#blendGradient)"
          />
        </svg>

        {/* Concentric Circles on the Right */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/3 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
          {/* Outer circle - slow rotation */}
          <div 
            className="absolute inset-0 rounded-full animate-[spin_40s_linear_infinite]"
            style={{
              border: '2px solid rgba(200, 130, 170, 0.4)',
            }}
          />
          {/* Middle circle - reverse rotation */}
          <div 
            className="absolute rounded-full animate-[spin_30s_linear_infinite_reverse]"
            style={{
              top: '15%',
              left: '15%',
              right: '15%',
              bottom: '15%',
              border: '2px solid rgba(180, 100, 150, 0.5)',
            }}
          />
          {/* Inner circle - slow pulse */}
          <div 
            className="absolute rounded-full animate-[pulse_4s_ease-in-out_infinite]"
            style={{
              top: '30%',
              left: '30%',
              right: '30%',
              bottom: '30%',
              border: '2px solid rgba(160, 80, 140, 0.6)',
            }}
          />
          {/* Innermost circle - gentle pulse with delay */}
          <div 
            className="absolute rounded-full animate-[pulse_3s_ease-in-out_infinite_0.5s]"
            style={{
              top: '42%',
              left: '42%',
              right: '42%',
              bottom: '42%',
              border: '2px solid rgba(140, 60, 130, 0.5)',
            }}
          />
        </div>

        {/* Soft fade overlay at edges for smooth blending */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(250,245,240,0.3) 80%, rgba(250,245,240,0.6) 100%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20 lg:py-28">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 tracking-tight"
            style={{ color: '#2d2a4a' }}
          >
            Why Vora Matters
          </h2>
          <p className="text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed font-light"
            style={{ color: '#4a4560' }}
          >
            Inspired by the way the world's most powerful organizations use AI to communicate, 
            Vora brings elite presentation intelligence to everyone.
          </p>
        </div>

        {/* Three Premium Glassmorphic Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20 lg:mb-24 max-w-6xl mx-auto">
          {enterpriseCards.map((item) => (
            <div
              key={item.company}
              className="relative group"
            >
              {/* Card */}
              <div 
                className="rounded-3xl p-8 lg:p-10 h-full transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.75) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.8)',
                  boxShadow: '0 25px 50px -12px rgba(160,100,140,0.2), 0 10px 20px -5px rgba(0,0,0,0.08)',
                }}
              >
                {/* Icon Container */}
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: 'linear-gradient(135deg, #f4a574 0%, #d98ba3 50%, #a678b8 100%)',
                    boxShadow: '0 10px 30px -5px rgba(200,120,150,0.4)',
                  }}
                >
                  <item.icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>

                {/* Company Name */}
                <h3 className="font-display text-xl lg:text-2xl font-bold mb-4"
                  style={{ color: '#2d2a4a' }}
                >
                  {item.company}
                </h3>

                {/* Description */}
                <p className="leading-relaxed text-base lg:text-lg"
                  style={{ color: '#5a5575' }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Transition Statement */}
        <div className="text-center mb-16 lg:mb-20">
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ color: '#2d2a4a' }}
          >
            Now, with <span style={{ color: '#a678b8' }}>Vora</span> — That Power is Yours
          </h3>
        </div>

        {/* Vora Value Section */}
        <div 
          className="rounded-3xl p-8 lg:p-12 max-w-5xl mx-auto relative"
          style={{
            background: 'linear-gradient(180deg, rgba(166,120,184,0.2) 0%, rgba(217,139,163,0.15) 50%, rgba(244,165,116,0.1) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(180,140,170,0.3)',
            boxShadow: '0 30px 60px -15px rgba(160,100,140,0.2)',
          }}
        >
          {/* Inner decorative corner accents */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t border-l rounded-tl-xl pointer-events-none" style={{ borderColor: 'rgba(166,120,184,0.4)' }} />
          <div className="absolute top-4 right-4 w-12 h-12 border-t border-r rounded-tr-xl pointer-events-none" style={{ borderColor: 'rgba(166,120,184,0.4)' }} />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l rounded-bl-xl pointer-events-none" style={{ borderColor: 'rgba(166,120,184,0.4)' }} />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r rounded-br-xl pointer-events-none" style={{ borderColor: 'rgba(166,120,184,0.4)' }} />

          {/* Value Description */}
          <p className="text-center text-lg lg:text-xl leading-relaxed mb-10 max-w-3xl mx-auto"
            style={{ color: '#3d3a5a' }}
          >
            Vora takes the same world-class AI presentation technology used by Deloitte, BCG, 
            and McKinsey — and makes it accessible to students, startups, and professionals everywhere.
          </p>

          {/* Three Value Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {/* For Students */}
            <div className="text-center p-6">
              <div 
                className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #d98ba3 0%, #f4a574 100%)',
                }}
              >
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-display text-lg font-semibold mb-2" style={{ color: '#2d2a4a' }}>For Students</h4>
              <p className="text-sm leading-relaxed" style={{ color: '#5a5575' }}>
                Human-like, competition-ready presentations that never look AI-generated.
              </p>
            </div>

            {/* For Professionals */}
            <div className="text-center p-6">
              <div 
                className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #7db5c9 0%, #5a8fb8 100%)',
                }}
              >
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-display text-lg font-semibold mb-2" style={{ color: '#2d2a4a' }}>For Professionals</h4>
              <p className="text-sm leading-relaxed" style={{ color: '#5a5575' }}>
                Brand-consistent, data-rich business decks for meetings, pitches, and reports.
              </p>
            </div>

            {/* For Everyone */}
            <div className="text-center p-6">
              <div 
                className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #a678b8 0%, #c490c8 100%)',
                }}
              >
                <Users className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-display text-lg font-semibold mb-2" style={{ color: '#2d2a4a' }}>For Everyone</h4>
              <p className="text-sm leading-relaxed" style={{ color: '#5a5575' }}>
                A single platform that replaces multiple tools for ideation, design, storytelling, and visualization.
              </p>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="text-center pt-6" style={{ borderTop: '1px solid rgba(166,120,184,0.2)' }}>
            <p className="text-xl lg:text-2xl font-semibold" style={{ color: '#2d2a4a' }}>
              What global consulting giants use internally, Vora now delivers to the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
