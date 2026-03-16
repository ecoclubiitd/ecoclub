// Events Data — extracted from poster images in Events/ folder
const eventsData = {
    competitions: [
        {
            title: "Quant Trading Challenge",
            partner: "Jane Street",
            date: "1 March 2026",
            venue: "LHC, IIT Delhi",
            description: "A high-stakes quantitative trading competition presented by Jane Street, testing algorithmic strategy, market intuition, and speed.",
            prize: "50K",
            poster: "Events/Competitions/WhatsApp Image 2026-03-14 at 16.39.21.jpeg"
        },
        {
            title: "Dalal Street",
            partner: "TRYST'26",
            date: "28 February 2026",
            venue: "LHC, IIT Delhi",
            description: "Stock Market Simulation Arena — a live trading competition where participants compete in real-time market scenarios.",
            prize: "15K",
            poster: "Events/Competitions/WhatsApp Image 2026-03-14 at 16.39.20 (1).jpeg"
        },
        {
            title: "Bluffs and Bargains",
            partner: "TRYST'26",
            date: "27 February 2026",
            venue: "LHC, IIT Delhi",
            description: "Outwit, outsmart, and outnegotiate — a strategic bargaining and negotiation competition testing wits under pressure.",
            prize: "15K",
            poster: "Events/Competitions/WhatsApp Image 2026-03-14 at 16.39.21 (2).jpeg"
        },
        {
            title: "Da Vinci Cricket League",
            partner: "Da Vinci Trading",
            date: "13 February 2026",
            venue: "LH111, IIT Delhi",
            description: "Blend your love for cricket with the art of trading. A unique competition combining sports analytics with market dynamics.",
            poster: "Events/Competitions/WhatsApp Image 2026-03-14 at 16.39.21 (1).jpeg"
        },
        {
            title: "Numerix",
            partner: "IMC Trading",
            date: "6 February 2026",
            venue: "LH 526-527, IIT Delhi",
            description: "The Ultimate Guesstimate League — a quantitative reasoning and estimation competition with goodies sponsored by IMC Trading.",
            poster: "Events/Competitions/WhatsApp Image 2026-03-14 at 16.39.22.jpeg"
        },
        {
            title: "Bullion Chase",
            partner: "CAIC",
            date: "13 January 2026",
            venue: "LH 111, IIT Delhi",
            description: "Inter-Hostel competition featuring quiz prelims, market trading semi-finals, and auction finals. A comprehensive finance challenge.",
            poster: "Events/Competitions/WhatsApp Image 2026-03-14 at 16.39.23.jpeg"
        },
        {
            title: "FinQuest",
            partner: "CAIC",
            date: "10 October 2025",
            venue: "LH 114, IIT Delhi",
            description: "A two-stage competition combining quantitative finance puzzles with hands-on trading strategy simulation. Carries 20% CAIC Trophy weightage.",
            poster: "Events/Competitions/WhatsApp Image 2026-03-14 at 16.39.26.jpeg"
        }
    ],
    guestLectures: [
        {
            title: "Explore the World of Quantitative Finance",
            partner: "BlackRock",
            speaker: "Michael Sternberg",
            role: "Managing Director, Global Head of Aladdin Financial Engineering",
            date: "11 March 2026",
            venue: "LH310, IIT Delhi",
            description: "A deep dive into what quants really do, quant finance beyond formulas and trading, and the impact across investing and risk management.",
            poster: "Events/Guest Lecture/WhatsApp Image 2026-03-14 at 16.39.20.jpeg"
        },
        {
            title: "Navigating Careers in Finance",
            partner: "Goldman Sachs",
            speaker: "Harsh Nanda",
            role: "Partner, Head of Technology Private Equity",
            date: "3 November 2025",
            venue: "LH308, IIT Delhi",
            description: "Career insights and leadership perspectives from a Goldman Sachs Partner, exploring pathways in technology-driven private equity.",
            poster: "Events/Guest Lecture/WhatsApp Image 2026-03-14 at 16.39.25.jpeg"
        },
        {
            title: "Guest Lecture by India's Chief Economic Advisor",
            partner: "CAIC",
            speaker: "Dr. V. Anantha Nageswaran",
            role: "Chief Economic Advisor, Government of India",
            date: "22 September 2025",
            venue: "Seminar Hall, IIT Delhi",
            description: "An exclusive session with the Chief Economic Advisor of India, offering insights into macroeconomic policy and India's economic trajectory.",
            poster: "Events/Guest Lecture/WhatsApp Image 2026-03-14 at 16.39.27 (1).jpeg"
        }
    ],
    workshops: [
        {
            title: "Future of Finance: Equity Derivatives & Optionality",
            partner: "Goldman Sachs",
            date: "3 February 2026",
            venue: "LH111, IIT Delhi",
            description: "Session on equity derivatives and optionality in mortgages — perspectives from Goldman Sachs engineers on the future of structured finance.",
            poster: "Events/Workshops/WhatsApp Image 2026-03-14 at 16.39.22 (1).jpeg"
        },
        {
            title: "Technical Analysis: Indicators & Chart Patterns",
            partner: "StockGro",
            speaker: "Rushit Sejpal, Equity Strategist",
            date: "22 December 2025",
            venue: "IIT Delhi",
            description: "Understanding indicators and chart patterns — delve into the world of equity markets with professional insights from StockGro.",
            poster: "Events/Workshops/WhatsApp Image 2026-03-14 at 16.39.24.jpeg"
        },
        {
            title: "Unlocking Opportunities in Investment & Finance",
            partner: "CFA Institute",
            date: "15 October 2025",
            venue: "LH 111, IIT Delhi",
            description: "An awareness session by CFA Institute exploring career pathways, government relations, and advocacy in the investment management industry.",
            poster: "Events/Workshops/WhatsApp Image 2026-03-14 at 16.39.25 (2).jpeg"
        },
        {
            title: "Beginner's Guide to Quant Trading",
            partner: "Atlas Research",
            speaker: "Sudeept Sinha, Founder",
            date: "2 November 2025",
            venue: "Seminar Hall, IIT Delhi",
            description: "A comprehensive introduction to quantitative trading with a quant challenge featuring Apple gadgets as prizes.",
            poster: "Events/Workshops/WhatsApp Image 2026-03-14 at 16.39.25 (1).jpeg"
        },
        {
            title: "AI & Stock Market",
            partner: "Tradomate",
            speaker: "Ritvik Dashora, CFA",
            date: "24 September 2025",
            venue: "IIT Delhi",
            description: "Webinar and competition exploring the intersection of artificial intelligence and stock market analysis with Amazon voucher prizes.",
            poster: "Events/Workshops/WhatsApp Image 2026-03-14 at 16.39.26 (2).jpeg"
        },
        {
            title: "Technical Analysis Discussion",
            partner: null,
            date: "20 January 2026",
            venue: "LHC, IIT Delhi",
            description: "Tuesday Night Discussion on technical analysis fundamentals, chart reading, and market trend identification.",
            poster: "Events/Workshops/WhatsApp Image 2026-03-14 at 16.39.22 (2).jpeg"
        },
        {
            title: "How Money Moves",
            partner: null,
            date: "7 January 2025",
            venue: "LH111, IIT Delhi",
            description: "Wednesday Night Discussion exploring the mechanics of monetary flow, banking systems, and financial infrastructure.",
            poster: "Events/Workshops/WhatsApp Image 2026-03-14 at 16.39.23 (1).jpeg"
        },
        {
            title: "Game Theory",
            partner: null,
            date: "6 November 2025",
            venue: "LHC, IIT Delhi",
            description: "Tuesday Night Discussion on game theory principles, strategic decision-making, and their applications in economics and finance.",
            poster: "Events/Workshops/WhatsApp Image 2026-03-14 at 16.39.24 (1).jpeg"
        },
        {
            title: "Intro to Stock Market",
            partner: null,
            date: "7 October 2025",
            venue: "LHC, IIT Delhi",
            description: "Tuesday Night Discussion introducing the fundamentals of stock markets, trading basics, and market analysis for beginners.",
            poster: "Events/Workshops/WhatsApp Image 2026-03-14 at 16.39.26 (1).jpeg"
        }
    ]
};
