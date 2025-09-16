
const REGISTRAR_URLS = {
  namecheap: 'https://www.namecheap.com/domains/registration/results/?domain=',
  godaddy: 'https://www.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=',
  namebio: 'https://namebio.com/s/q-',
};

document.addEventListener('DOMContentLoaded', () => {
  const keywordsList = document.getElementById('keywords-list');
  const messageEl = document.getElementById('message');

  chrome.storage.local.get(['domains', 'error'], (result) => {
    if (chrome.runtime.lastError) {
      messageEl.textContent = 'Error retrieving data.';
      messageEl.className = 'message error';
      return;
    }
    
    const { domains, error } = result;

    if (error) {
        messageEl.textContent = error;
        messageEl.className = 'message error';
        return;
    }
    
    if (!domains || domains.length === 0) {
      messageEl.textContent = 'No domains with trend keywords found on this page.';
      messageEl.className = 'message info';
      return;
    }

    messageEl.style.display = 'none';
    keywordsList.innerHTML = ''; // Clear list

    domains.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'keyword-item';

      const rankColorClass = index < 3 ? 'rank-gold' : index < 10 ? 'rank-silver' : 'rank-bronze';

      li.innerHTML = `
        <div class="keyword-info">
            <span class="rank ${rankColorClass}">#${index + 1}</span>
            <div class="word-details">
                <span class="word">${item.domain}</span>
                <div class="meta">
                    ${item.matchedTrends.map(trend => `<span class="trend-badge">${trend}</span>`).join(' ')}
                </div>
            </div>
        </div>
        <button class="check-btn" title="Check domain availability for ${item.domain}">Check</button>
      `;

      const linksContainer = document.createElement('div');
      linksContainer.className = 'links-container';
      linksContainer.innerHTML = `
        <a href="${REGISTRAR_URLS.namecheap}${item.domain}" target="_blank" rel="noopener noreferrer">Namecheap</a>
        <a href="${REGISTRAR_URLS.godaddy}${item.domain}" target="_blank" rel="noopener noreferrer">GoDaddy</a>
        <a href="${REGISTRAR_URLS.namebio}${item.domain}" target="_blank" rel="noopener noreferrer">NameBio</a>
      `;
      li.appendChild(linksContainer);
      
      const checkBtn = li.querySelector('.check-btn');
      checkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const currentlyOpen = document.querySelector('.keyword-item.open');
        if (currentlyOpen && currentlyOpen !== li) {
          currentlyOpen.classList.remove('open');
        }
        li.classList.toggle('open');
      });

      keywordsList.appendChild(li);
    });
  });
});
