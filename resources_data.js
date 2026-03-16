const resourcesData = [
    {
        id: "quant-resources",
        title: "Quant Resources",
        description: "Puzzles, probability challenges, and quantitative interview guides for quant roles.",
        items: [
            { title: "Brainstellar", source: "Brainstellar", type: "reading", url: "https://brainstellar.com/" },
            { title: "Puzzlequant", source: "Puzzlequant", type: "reading", url: "https://www.puzzledquant.com/" },
            { title: "Quantbook IITKGP", source: "Google Drive", type: "reading", url: "https://drive.google.com/file/d/1rqv4wH8XbeeV-ROLGOY4FYchcZ_05G1m/view" },
            { title: "Quant Guide", source: "QuantGuide", type: "reading", url: "https://www.quantguide.io/questions" },
            { title: "Guide", source: "Google Docs", type: "reading", url: "https://docs.google.com/document/d/1Z6JiK6a1JNbHSxzMpNm3IAUbLC98xk6in_c24txmxmI/edit" },
            { title: "150 Most Frequently Asked Questions on Quant Interviews", source: "Google Drive", type: "reading", url: "https://drive.google.com/file/d/1oYeXWPajrFysTsHhH48a5d4ick9mm4fW/view?usp=drive_link" },
            { title: "Heard on the street", source: "Google Drive", type: "reading", url: "https://drive.google.com/file/d/1RuQO7Y11aB33w-cPZHWkUKt5sZ0KoBku/view?usp=drive_link" },
            { title: "Xinfeng Zhou", source: "Google Drive", type: "reading", url: "https://drive.google.com/file/d/1RlVjDNNgdFupAHgO1yV_54QEERS5N5x7/view?usp=drive_link" },
            { title: "Fifty Challenging Problems in Probability", source: "Google Drive", type: "reading", url: "https://drive.google.com/file/d/1j1M1Xf4I0u_35P3x09UXY9jB4IuQv4lG/view?usp=drive_link" }
        ]
    },
    {
        id: "intro-to-stock-market",
        title: "Intro to Stock Market",
        description: "Start here — learn why to invest, market regulators, IPOs, and how the stock market works.",
        items: [
            { title: "Intro To Stock Markets", source: "Zerodha Varsity", type: "video", url: "https://zerodha.com/varsity/chapter/why-should-you-invest/" },
            { title: "The Need To Invest", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/the-need-to-invest/" },
            { title: "Regulators of the Market", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/regulators/" },
            { title: "Market Intermediaries", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/financial-intermediaries/" },
            { title: "IPO Part 1", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/the-ipo-markets-part-1/" },
            { title: "IPO Part 2", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/the-ipo-markets-part-2/" },
            { title: "The Stock Markets", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/the-stock-markets/" },
            { title: "The Stock Market Index", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/the-stock-markets-index/" },
            { title: "Commonly Used Terms", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/commonly-used-jargons/" },
            { title: "Trading Terminal", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/the-trading-terminal/" },
            { title: "Clearing and Settlement", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/clearing-and-settlement-process/" },
            { title: "Corporate Actions and its Impacts", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/five-corporate-actions-and-its-impact-on-stock-prices/" },
            { title: "Key Events and their Impacts", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/key-events-and-their-impact-on-markets/" },
            { title: "Getting Started", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/getting-started/" }
        ]
    },
    {
        id: "fundamental-analysis",
        title: "Fundamental Analysis",
        description: "Annual reports, P&L statements, balance sheets, and financial ratio analysis.",
        items: [
            { title: "Fundamental Analysis", source: "Zerodha Varsity", type: "video", url: "https://zerodha.com/varsity/chapter/introduction-to-fundamental-analysis/" },
            { title: "Introduction", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/module/fundamental-analysis/" },
            { title: "Mindset Of Investor", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/mindset-investor/" },
            { title: "Reading Annual Report of Company", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/read-annual-report-company/" },
            { title: "Understanding P&L Statement 1", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/understanding-pl-statement-part1/" },
            { title: "Understanding P&L Statement 2", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/understanding-pl-statement-part2/" },
            { title: "Understanding BS Statement 1", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/understanding-balance-sheet-statement-part-1/" },
            { title: "Understanding BS Statement 2", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/understanding-balance-sheet-statement-part-2/" },
            { title: "Cash Flow Statement", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/cash-flow-statement/" },
            { title: "Financial Ratio Analysis 1", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/financial-ratio-analysis/" },
            { title: "Financial Ratio Analysis 2", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/financial-ratios-part-2/" },
            { title: "Financial Ratio Analysis 3", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/financial-ratios-part-3/" },
            { title: "Equity Research 1", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/equity-research-part-1/" },
            { title: "Discounted Cash Flows", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/dcf-primer/" },
            { title: "Equity Research 2", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/equity-research-part-2/" }
        ]
    },
    {
        id: "technical-analysis",
        title: "Technical Analysis",
        description: "Candlestick patterns, moving averages, volumes, indicators, and the Dow Theory.",
        items: [
            { title: "Fundamental vs Technical Analysis", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/fundamental-analysis-vs-technical-analysis/" },
            { title: "Introduction", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/introducing-technical-analysis/" },
            { title: "Chart Types", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/chart-types/" },
            { title: "Introduction to Candlesticks", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/getting-started-candlesticks/" },
            { title: "Single Candlesticks Pattern 1", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/single-candlestick-patterns-part-1/" },
            { title: "Single Candlesticks Pattern 2", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/single-candlestick-patterns-part-2/" },
            { title: "Single Candlesticks Pattern 3", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/single-candlestick-patterns-part-3/" },
            { title: "Multiple Candlesticks Pattern 1", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/multiple-candlestick-patterns-part-1/" },
            { title: "Multiple Candlesticks Pattern 2", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/multiple-candlestick-patterns-part-2/" },
            { title: "Multiple Candlesticks Pattern 3", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/multiple-candlestick-patterns-part-3/" },
            { title: "Volumes", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/volumes/" },
            { title: "Moving Averages", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/moving-averages/" },
            { title: "Indicators Part 1", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/indicators-part-1/" },
            { title: "Indicators Part 2", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/indicators-part-2/" },
            { title: "Fibonacci Retracements", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/fibonacci-retracements/" },
            { title: "Dow Theory Part 1", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/dow-theory-part-1/" },
            { title: "Dow Theory Part 2", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/dow-theory-part-2/" },
            { title: "Helping you get Started", source: "Zerodha Varsity", type: "reading", url: "https://zerodha.com/varsity/chapter/finale-helping-get-started/" }
        ]
    },
    {
        id: "valuation",
        title: "Valuation",
        description: "Valuation concepts, DCF analysis, financial statements, and key metrics for investors.",
        items: [
            { title: "Valuation Concepts", source: "YouTube", type: "video", url: "https://www.youtube.com/playlist?list=PLUkh9m2BorqnKWu0g5ZUps_CbQ-JGtbI9" },
            { title: "DCF Analysis", source: "YouTube", type: "video", url: "https://www.youtube.com/watch?v=bE7FfmYz4ns" },
            { title: "What is Valuation?", source: "Investopedia", type: "reading", url: "https://www.investopedia.com/terms/v/valuation.asp" },
            { title: "Valuation Analysis", source: "Investopedia", type: "reading", url: "https://www.investopedia.com/terms/v/valuation_analysis.asp" },
            { title: "Financial Statements", source: "Investopedia", type: "reading", url: "https://www.investopedia.com/terms/f/financial-statements.asp" },
            { title: "Balance Sheet", source: "Investopedia", type: "reading", url: "https://www.investopedia.com/terms/b/balancesheet.asp" },
            { title: "Cash Flow Statement", source: "Investopedia", type: "reading", url: "https://www.investopedia.com/terms/c/cashflowstatement.asp" },
            { title: "Key Financial Ratios", source: "Investopedia", type: "reading", url: "https://www.investopedia.com/financial-edge/0910/6-basic-financial-ratios-and-what-they-tell-you.aspx" },
            { title: "5 Must have Metrics for investors", source: "Investopedia", type: "reading", url: "https://www.investopedia.com/articles/fundamental-analysis/09/five-must-have-metrics-value-investors.asp" }
        ]
    },
    {
        id: "basics-of-corporate-finance",
        title: "Basics of Corporate Finance",
        description: "Introduction to fundraising, bond markets, capital budgeting, and financial leverage.",
        items: [
            { title: "Introduction to Corporate Finance", source: "YouTube", type: "video", url: "https://youtu.be/5eGRi66iUfU" },
            { title: "Capital Budgeting Video", source: "YouTube", type: "video", url: "https://www.youtube.com/watch?v=ZOaGNDmKpzo" },
            { title: "Introduction to Fundraising Avenues", source: "Investopedia", type: "reading", url: "https://www.investopedia.com/ask/answers/03/062003.asp" },
            { title: "Bond Market", source: "Investopedia", type: "reading", url: "https://www.investopedia.com/articles/bonds/08/bond-market-basics.asp" },
            { title: "Capital Budgeting", source: "Investopedia", type: "reading", url: "https://www.investopedia.com/articles/financial-theory/11/corporate-project-valuation-methods.asp" },
            { title: "Corporate Capital", source: "Investopedia", type: "reading", url: "https://www.investopedia.com/terms/c/corporate-capital.asp" },
            { title: "Use of Financial Leverage", source: "Investopedia", type: "reading", url: "https://www.investopedia.com/articles/investing/111813/optimal-use-financial-leverage-corporate-capital-structure.asp" }
        ]
    }
];
