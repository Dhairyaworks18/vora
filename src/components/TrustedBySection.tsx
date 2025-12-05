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
            {/* Coral/Orange Gradient */}
            <linearGradient id="coralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f4a574" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#f7b88c" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#f9c9a5" stopOpacity="0.6" />
            </linearGradient>
            
            {/* Pink Gradient */}
            <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8a4b8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#d98ba3" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#c97590" stopOpacity="0.6" />
            </linearGradient>
            
            {/* Purple Gradient */}
            <linearGradient id="purpleGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a678b8" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#b88fc4" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#c9a5d0" stopOpacity="0.5" />
            </linearGradient>

            {/* Orange-Peach Gradient for second layer */}
            <linearGradient id="peachGradient" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f5b48a" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#f9d4b8" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Top Coral/Orange Blob - largest, top layer */}
          <path
            d="M-100,50 
               C50,20 200,80 350,60 
               C500,40 600,100 750,90 
               C900,80 1000,40 1150,70 
               C1300,100 1400,50 1550,80 
               L1550,350 
               C1400,380 1250,320 1100,350 
               C950,380 800,340 650,370 
               C500,400 350,350 200,380 
               C50,410 -50,360 -100,390 
               Z"
            fill="url(#coralGradient)"
          />

          {/* Middle Pink Blob */}
          <path
            d="M-100,200 
               C100,160 250,240 400,200 
               C550,160 700,250 850,220 
               C1000,190 1150,270 1300,230 
               L1300,500 
               C1150,540 1000,480 850,520 
               C700,560 550,500 400,540 
               C250,580 100,520 -100,560 
               Z"
            fill="url(#pinkGradient)"
          />

          {/* Bottom Purple Blob */}
          <path
            d="M-100,350 
               C100,300 200,400 350,350 
               C500,300 600,420 750,380 
               C900,340 1000,450 1100,400 
               L1100,650 
               C1000,700 850,640 700,690 
               C550,740 400,680 250,730 
               C100,780 -50,720 -100,770 
               Z"
            fill="url(#purpleGradient)"
          />

          {/* Secondary Orange/Peach Blob - overlapping right side */}
          <path
            d="M600,100 
               C750,60 900,150 1050,100 
               C1200,50 1350,140 1500,90 
               L1500,450 
               C1350,500 1200,440 1050,490 
               C900,540 750,480 600,520 
               Z"
            fill="url(#peachGradient)"
          />
        </svg>

        {/* Concentric Circles on the Right */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/3 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
          {/* Outer circle */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid rgba(200, 130, 170, 0.4)',
            }}
          />
          {/* Middle circle */}
          <div 
            className="absolute rounded-full"
            style={{
              top: '15%',
              left: '15%',
              right: '15%',
              bottom: '15%',
              border: '2px solid rgba(180, 100, 150, 0.5)',
            }}
          />
          {/* Inner circle */}
          <div 
            className="absolute rounded-full"
            style={{
              top: '30%',
              left: '30%',
              right: '30%',
              bottom: '30%',
              border: '2px solid rgba(160, 80, 140, 0.6)',
            }}
          />
          {/* Innermost circle */}
          <div 
            className="absolute rounded-full"
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
