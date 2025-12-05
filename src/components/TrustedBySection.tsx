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
    >
      {/* Gradient Background - Matching reference image */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, 
              hsl(25 75% 65%) 0%, 
              hsl(350 60% 65%) 20%,
              hsl(280 50% 50%) 45%,
              hsl(240 55% 45%) 70%,
              hsl(220 60% 35%) 100%
            )
          `,
        }}
      />
      
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/10" />

      <div className="container mx-auto px-4 relative z-10 py-20 lg:py-28">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 tracking-tight">
            Why Vora Matters
          </h2>
          <p className="text-lg lg:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
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
                className="rounded-3xl p-8 lg:p-10 h-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,140,120,0.55) 0%, rgba(255,100,140,0.45) 50%, rgba(180,80,140,0.4) 100%)',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255,255,255,0.35)',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
              >
                {/* Icon Container */}
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: 'linear-gradient(135deg, hsl(25 80% 60%) 0%, hsl(350 70% 65%) 100%)',
                    boxShadow: '0 10px 30px -5px rgba(255,100,80,0.4)',
                  }}
                >
                  <item.icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>

                {/* Company Name */}
                <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-4">
                  {item.company}
                </h3>

                {/* Description */}
                <p className="text-white/75 leading-relaxed text-base lg:text-lg">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Transition Statement */}
        <div className="text-center mb-16 lg:mb-20">
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Now, with <span className="text-yellow-200">Vora</span> — That Power is Yours
          </h3>
        </div>

        {/* Vora Value Section */}
        <div 
          className="rounded-3xl p-8 lg:p-12 max-w-5xl mx-auto"
          style={{
            background: 'linear-gradient(180deg, rgba(100,80,180,0.25) 0%, rgba(60,60,140,0.3) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 30px 60px -15px rgba(0,0,0,0.3)',
          }}
        >
          {/* Value Description */}
          <p className="text-white/85 text-center text-lg lg:text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
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
                  background: 'linear-gradient(135deg, hsl(350 65% 60%) 0%, hsl(25 80% 65%) 100%)',
                }}
              >
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-display text-lg font-semibold text-white mb-2">For Students</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Human-like, competition-ready presentations that never look AI-generated.
              </p>
            </div>

            {/* For Professionals */}
            <div className="text-center p-6">
              <div 
                className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, hsl(185 70% 50%) 0%, hsl(220 65% 55%) 100%)',
                }}
              >
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-display text-lg font-semibold text-white mb-2">For Professionals</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Brand-consistent, data-rich business decks for meetings, pitches, and reports.
              </p>
            </div>

            {/* For Everyone */}
            <div className="text-center p-6">
              <div 
                className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, hsl(270 50% 55%) 0%, hsl(300 50% 60%) 100%)',
                }}
              >
                <Users className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-display text-lg font-semibold text-white mb-2">For Everyone</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                A single platform that replaces multiple tools for ideation, design, storytelling, and visualization.
              </p>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="text-center pt-6 border-t border-white/10">
            <p className="text-xl lg:text-2xl font-semibold text-white">
              What global consulting giants use internally, Vora now delivers to the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;