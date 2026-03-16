const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'posts');
const outputFile = path.join(__dirname, 'articles_data.js');

function generateArticles() {
    try {
        if (!fs.existsSync(postsDir)) {
            console.error(`Error: Directory '${postsDir}' does not exist.`);
            return;
        }

        const items = fs.readdirSync(postsDir);
        const articles = [];

        items.forEach(item => {
            const itemPath = path.join(postsDir, item);
            let stats;
            try {
                stats = fs.statSync(itemPath);
            } catch (err) {
                return; // skip if error
            }

            if (stats.isDirectory()) {
                const title = item
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ');

                let files = [];
                try {
                    files = fs.readdirSync(itemPath);
                } catch (err) {
                    return;
                }

                const pngFiles = files
                    .filter(file => file.toLowerCase().endsWith('.png'))
                    .sort((a, b) => a.localeCompare(b));

                if (pngFiles.length > 0) {
                    const thumbnail = `posts/${item}/${pngFiles[0]}`;
                    const slides = pngFiles.map(file => `posts/${item}/${file}`);

                    // Simple snippet logic based on folder name
                    const snippet = `Explore our latest insights on ${title}, analyzing key market dynamics, policy impacts, and emerging trends to empower your financial decisions.`;

                    articles.push({
                        id: item,
                        title: title,
                        date: stats.mtime,
                        thumbnail: thumbnail,
                        slides: slides,
                        snippet: snippet
                    });
                }
            }
        });

        // Sort articles, most recent first
        articles.sort((a, b) => b.date - a.date);

        const cleanArticles = articles.map(a => {
            return {
                id: a.id,
                title: a.title,
                thumbnail: a.thumbnail,
                slides: a.slides,
                snippet: a.snippet
            }
        });

        // Output as a JS variable piece to avoid CORS issues when opening file:// directly
        const fileContent = `const articlesData = ${JSON.stringify(cleanArticles, null, 2)};`;
        fs.writeFileSync(outputFile, fileContent);

        console.log(`Successfully generated ${outputFile} with ${cleanArticles.length} articles.`);

    } catch (error) {
        console.error('Error generating articles:', error);
    }
}

generateArticles();
