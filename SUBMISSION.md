# HypeMan — ElevenHacks #1 Submission

## Description

HypeMan is an AI agent that discovers your entire digital footprint and pitches you like a rockstar — using your REAL data.

Type any name or URL. Firecrawl Search scrapes your presence across GitHub, LinkedIn, articles, open source contributions, and community mentions in parallel. Claude synthesizes everything into a structured "hype sheet" with real stats, real projects, and things you forgot you did. Then an ElevenLabs voice agent delivers a personalized pitch using that data — no hallucinations, just facts.

Three hype styles to choose from:
- **Professional**: Polished, recruiter-quality pitch with specific numbers
- **Hype Beast**: Maximum energy, like a sports announcer meets TED talk
- **Roast**: Affectionately roasts you first, then reveals how impressive you actually are

Every profile gets a shareable URL. Send someone their hype — they'll love you for it.

**How it uses Firecrawl**: 5-6 parallel Firecrawl Search queries per person (`"{name} github"`, `"{name} developer"`, `"{name} linkedin"`, `"{name} open source"`), scraping top results per query into clean markdown. This gives the agent real, current data — not stale training knowledge.

**How it uses ElevenLabs**: A single ElevenAgent with dynamic variables. The hype sheet is injected as `{{profile_data}}` at conversation start via the widget SDK. The agent pitches immediately with real data, answers follow-up questions, and switches tone based on `{{hype_style}}`.

Built with Next.js 15, Firecrawl Search API, ElevenAgents, and Claude. Shipped in 4 days.

## Links

- **Demo**: https://hypeman-beta.vercel.app
- **Repo**: https://github.com/Railly/hypeman

## Social Posts

### X (+50 pts)

I built an AI that stalks your internet and hypes you up like a rockstar.

Type any name → @firecrawl_dev scrapes your digital footprint → @elevenlabsio voice agent pitches you with REAL data.

3 modes: Professional, Hype Beast, and Roast.

Try it: hypeman-beta.vercel.app

Built for #ElevenHacks

[VIDEO]

### LinkedIn (+50 pts)

What if an AI could pitch you better than you pitch yourself?

I built HypeMan for ElevenHacks — type any name, and it scrapes your entire internet presence (GitHub, LinkedIn, articles, community mentions) using Firecrawl Search, synthesizes a "hype sheet" with Claude, then an ElevenLabs voice agent delivers a personalized pitch using your real data.

Three styles: Professional (recruiter-quality), Hype Beast (maximum energy), and Roast (comedy + respect).

Every profile gets a shareable link. The agent only uses verified facts — no hallucinations.

Built with Next.js 15, Firecrawl Search API, ElevenAgents, and Claude. Shipped in 4 days from Lima, Peru.

Try it yourself: hypeman-beta.vercel.app

#ElevenHacks #buildinpublic #ai

[VIDEO]

### Instagram (+50 pts)

I built an AI that hypes you up using your REAL internet data

Type your name → it scrapes GitHub, LinkedIn, articles → a voice agent pitches you like a rockstar

3 modes: Professional / Hype Beast / Roast

Try it: link in bio

Built with @firecrawl_dev + @elevenlabsio for #ElevenHacks

#ai #coding #techtok #softwareengineer #buildinpublic #hackathon

[VIDEO]

### TikTok (+50 pts)

I built an AI that hypes you up using your REAL internet data 🔥

Type your name and listen.

#ElevenHacks #ai #coding #techtok #softwareengineer #buildinpublic #hackathon

@firecrawl @elevenlabs

[VIDEO]
