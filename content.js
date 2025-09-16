// --- Start of Domain Analysis Logic ---
const TLD_LIST = [
  'com', 'net', 'org', 'io', 'co', 'ai', 'xyz', 'app', 'dev', 'tech', 'store', 'online', 'me', 'info',
  'biz', 'club', 'design', 'shop', 'art', 'photography', 'pro', 'live', 'life'
];

const TREND_KEYWORDS = {
  ai: 50, gpt: 45, crypto: 40, web3: 38, meta: 35, vr: 32, ar: 32, dao: 30, nft: 28, defi: 28,
  green: 25, bio: 25, eco: 22, solar: 22, health: 20, shop: 18, pay: 18, labs: 15, studio: 15,
  cloud: 15, data: 15, sync: 12, link: 12, stack: 12,
};

const DOMAIN_REGEX = /([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/g;

const analyzeDomains = (text) => {
  const domains = [...new Set(text.match(DOMAIN_REGEX) || [])];
  if (domains.length === 0) return [];

  const trendKeywords = Object.keys(TREND_KEYWORDS);

  const trendingDomains = [];

  for (const domain of domains) {
    const domainLower = domain.toLowerCase();
    const domainParts = domainLower.split('.');
    const sld = domainParts.length > 1 ? domainParts.slice(0, -1).join('.') : domainParts[0];

    const matchedTrends = trendKeywords.filter(trend => {
      // New, smarter logic to find keywords in compound domain names.
      // A keyword matches if it's a prefix, suffix, or separated by hyphens.

      // 1. Check for start/end, which is most common (e.g., "aiforge", "forgeai").
      if (sld.startsWith(trend) || sld.endsWith(trend)) {
        return true;
      }

      // 2. Check for keywords separated by hyphens (e.g., "my-crypto-wallet").
      const hyphenParts = sld.split('-');
      if (hyphenParts.includes(trend)) {
        return true;
      }
      
      return false;
    });

    if (matchedTrends.length > 0) {
      trendingDomains.push({
        domain,
        matchedTrends,
      });
    }
  }
  
  // Sort by number of trends matched, then alphabetically.
  return trendingDomains.sort((a, b) => {
    if (b.matchedTrends.length !== a.matchedTrends.length) {
      return b.matchedTrends.length - a.matchedTrends.length;
    }
    return a.domain.localeCompare(b.domain);
  });
};
// --- End of Domain Analysis Logic ---

// --- Start of Highlighting Logic ---
function highlightDomains(domains) {
  if (!domains || domains.length === 0) return;

  const styleId = 'domain-keyword-highlighter-style';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      .domain-keyword-highlight {
        background-color: #facc15 !important;
        color: #121212 !important;
        padding: 1px 2px;
        border-radius: 3px;
        font-weight: bold;
        font-style: normal;
      }
    `;
    document.head.appendChild(style);
  }

  // Remove previous highlights to avoid duplicates on re-scan
  const existingHighlights = document.querySelectorAll('mark.domain-keyword-highlight');
  existingHighlights.forEach(mark => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize(); // Merges adjacent text nodes
  });


  const escapedDomains = domains.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escapedDomains.join('|')})`, 'gi');

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  const nodesToProcess = [];
  let node;
  while (node = walker.nextNode()) {
    const parent = node.parentElement;
    if (parent.tagName.toLowerCase() !== 'script' && 
        parent.tagName.toLowerCase() !== 'style' &&
        !parent.classList.contains('domain-keyword-highlight')) {
      nodesToProcess.push(node);
    }
  }
  
  nodesToProcess.forEach(textNode => {
    if (regex.test(textNode.nodeValue)) {
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      textNode.nodeValue.replace(regex, (match, ...args) => {
        const offset = args[args.length - 2];
        const precedingText = textNode.nodeValue.substring(lastIndex, offset);
        if (precedingText) {
          fragment.appendChild(document.createTextNode(precedingText));
        }
        const mark = document.createElement('mark');
        mark.className = 'domain-keyword-highlight';
        mark.textContent = match;
        fragment.appendChild(mark);
        lastIndex = offset + match.length;
      });
      const remainingText = textNode.nodeValue.substring(lastIndex);
      if (remainingText) {
        fragment.appendChild(document.createTextNode(remainingText));
      }
      textNode.parentNode.replaceChild(fragment, textNode);
    }
  });
}
// --- End of Highlighting Logic ---

// --- Main Execution ---
function runScanner() {
  try {
    const pageText = document.body.innerText;
    const domains = analyzeDomains(pageText);

    if (domains.length > 0) {
      const domainsToHighlight = domains.map(d => d.domain);
      highlightDomains(domainsToHighlight);
    }

    // Save results to storage for the popup
    chrome.storage.local.set({ domains: domains }, () => {
      console.log('Domain keyword analysis complete.');
    });
  } catch(e) {
    console.error("Domain Keyword Analyzer Error:", e);
    chrome.storage.local.set({ domains: [], error: 'An unexpected error occurred during analysis.' });
  }
}

runScanner();