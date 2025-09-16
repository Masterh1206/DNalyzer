
// A list of common TLDs to be stripped from domain names during normalization.
export const TLD_LIST = [
  'com', 'net', 'org', 'io', 'co', 'ai', 'xyz', 'app', 'dev', 'tech', 'store', 'online', 'me', 'info',
  'biz', 'club', 'design', 'shop', 'art', 'photography', 'pro', 'live', 'life'
];

// Keywords that are currently trending in the domain industry.
// These will receive a score boost during analysis.
export const TREND_KEYWORDS: { [key: string]: number } = {
  ai: 50,
  gpt: 45,
  crypto: 40,
  web3: 38,
  meta: 35,
  vr: 32,
  ar: 32,
  dao: 30,
  nft: 28,
  defi: 28,
  green: 25,
  bio: 25,
  eco: 22,
  solar: 22,
  health: 20,
  shop: 18,
  pay: 18,
  labs: 15,
  studio: 15,
  cloud: 15,
  data: 15,
  sync: 12,
  link: 12,
  stack: 12,
};

// Base URLs for domain registrar search queries.
export const REGISTRAR_URLS = {
  namecheap: 'https://www.namecheap.com/domains/registration/results/?domain=',
  godaddy: 'https://www.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=',
  namebio: 'https://namebio.com/s/q-',
  unstoppable: 'https://unstoppabledomains.com/search?searchTerm=',
};

// Sample data to pre-populate the input field for demonstration purposes.
export const SAMPLE_DOMAINS = `
expiringdomains.com
aifuture.net
crypto-pay.io
web3stack.co
metavisionar.com
greentechsolutions.org
biosync.ai
ecodrive.app
healthdata.cloud
shoppify.store
cryptolabs.xyz
vrstudio.live
aigenerated.art
daohub.info
defilink.me
nft-creator.design
solarpanel.pro
digitalhealth.life
metapay.tech
aistudio.dev
biolink.tech
ecogreen.shop
cryptosync.app
vrworld.online
`;