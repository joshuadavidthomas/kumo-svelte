export const fruits = [
  "Apple",
  "Apricot",
  "Avocado",
  "Banana",
  "Blackberry",
  "Blueberry",
  "Cantaloupe",
  "Cherry",
  "Coconut",
  "Cranberry",
  "Date",
  "Dragon Fruit",
  "Fig",
  "Grape",
  "Grapefruit",
  "Guava",
  "Honeydew",
  "Kiwi",
  "Lemon",
  "Lime",
  "Lychee",
  "Mango",
  "Nectarine",
  "Orange",
  "Papaya",
  "Passion Fruit",
  "Peach",
  "Pear",
  "Persimmon",
  "Pineapple",
  "Plum",
  "Pomegranate",
  "Raspberry",
  "Starfruit",
  "Strawberry",
  "Tangerine",
  "Watermelon",
];

export type Language = {
  emoji: string;
  label: string;
  value: string;
};

export const languages: Language[] = [
  { value: "en", label: "English", emoji: "🇬🇧" },
  { value: "fr", label: "French", emoji: "🇫🇷" },
  { value: "de", label: "German", emoji: "🇩🇪" },
  { value: "es", label: "Spanish", emoji: "🇪🇸" },
  { value: "it", label: "Italian", emoji: "🇮🇹" },
  { value: "pt", label: "Portuguese", emoji: "🇵🇹" },
  { value: "nl", label: "Dutch", emoji: "🇳🇱" },
  { value: "pl", label: "Polish", emoji: "🇵🇱" },
  { value: "ru", label: "Russian", emoji: "🇷🇺" },
  { value: "ja", label: "Japanese", emoji: "🇯🇵" },
  { value: "zh", label: "Chinese", emoji: "🇨🇳" },
  { value: "ko", label: "Korean", emoji: "🇰🇷" },
  { value: "ar", label: "Arabic", emoji: "🇸🇦" },
  { value: "hi", label: "Hindi", emoji: "🇮🇳" },
  { value: "tr", label: "Turkish", emoji: "🇹🇷" },
  { value: "vi", label: "Vietnamese", emoji: "🇻🇳" },
  { value: "th", label: "Thai", emoji: "🇹🇭" },
  { value: "sv", label: "Swedish", emoji: "🇸🇪" },
  { value: "no", label: "Norwegian", emoji: "🇳🇴" },
  { value: "da", label: "Danish", emoji: "🇩🇰" },
  { value: "fi", label: "Finnish", emoji: "🇫🇮" },
  { value: "el", label: "Greek", emoji: "🇬🇷" },
  { value: "cs", label: "Czech", emoji: "🇨🇿" },
  { value: "ro", label: "Romanian", emoji: "🇷🇴" },
  { value: "hu", label: "Hungarian", emoji: "🇭🇺" },
  { value: "uk", label: "Ukrainian", emoji: "🇺🇦" },
  { value: "id", label: "Indonesian", emoji: "🇮🇩" },
  { value: "ms", label: "Malay", emoji: "🇲🇾" },
  { value: "he", label: "Hebrew", emoji: "🇮🇱" },
  { value: "fa", label: "Persian", emoji: "🇮🇷" },
];

export const languageItems = languages.map((language) => ({
  label: `${language.emoji} ${language.label}`,
  value: language.value,
}));

export type ServerLocation = {
  label: string;
  value: string;
};

export type ServerLocationGroup = {
  items: ServerLocation[];
  value: string;
};

export const servers: ServerLocationGroup[] = [
  {
    value: "Asia",
    items: [
      { label: "Japan", value: "japan" },
      { label: "China", value: "china" },
      { label: "Singapore", value: "singapore" },
      { label: "South Korea", value: "south-korea" },
      { label: "India", value: "india" },
      { label: "Hong Kong", value: "hong-kong" },
      { label: "Taiwan", value: "taiwan" },
      { label: "Thailand", value: "thailand" },
    ],
  },
  {
    value: "Europe",
    items: [
      { label: "Germany", value: "germany" },
      { label: "France", value: "france" },
      { label: "Italy", value: "italy" },
      { label: "United Kingdom", value: "uk" },
      { label: "Netherlands", value: "netherlands" },
      { label: "Spain", value: "spain" },
      { label: "Poland", value: "poland" },
      { label: "Sweden", value: "sweden" },
    ],
  },
  {
    value: "North America",
    items: [
      { label: "United States (East)", value: "us-east" },
      { label: "United States (West)", value: "us-west" },
      { label: "Canada", value: "canada" },
      { label: "Mexico", value: "mexico" },
    ],
  },
  {
    value: "South America",
    items: [
      { label: "Brazil", value: "brazil" },
      { label: "Argentina", value: "argentina" },
      { label: "Chile", value: "chile" },
    ],
  },
  {
    value: "Oceania",
    items: [
      { label: "Australia", value: "australia" },
      { label: "New Zealand", value: "new-zealand" },
    ],
  },
];

export type DatabaseItem = {
  disabled?: boolean;
  label: string;
  reason?: string;
  value: string;
};

export const databases: DatabaseItem[] = [
  { value: "postgres", label: "PostgreSQL" },
  { value: "mysql", label: "MySQL" },
  { value: "mariadb", label: "MariaDB" },
  { value: "mongodb", label: "MongoDB" },
  { value: "redis", label: "Redis" },
  { value: "sqlite", label: "SQLite" },
  { value: "cassandra", label: "Apache Cassandra" },
  { value: "dynamodb", label: "Amazon DynamoDB" },
  { value: "couchdb", label: "CouchDB" },
  { value: "neo4j", label: "Neo4j" },
  { value: "elasticsearch", label: "Elasticsearch" },
  { value: "cockroachdb", label: "CockroachDB" },
  { value: "timescaledb", label: "TimescaleDB" },
  { value: "clickhouse", label: "ClickHouse" },
  { value: "firestore", label: "Google Firestore" },
  { value: "supabase", label: "Supabase" },
  { value: "planetscale", label: "PlanetScale" },
  { value: "fauna", label: "Fauna" },
  { value: "d1", label: "Cloudflare D1" },
  { value: "turso", label: "Turso" },
];

export const disabledDatabases: DatabaseItem[] = [
  { value: "postgres", label: "PostgreSQL" },
  { value: "mysql", label: "MySQL" },
  { value: "mariadb", label: "MariaDB", disabled: true, reason: "Beta" },
  { value: "mongodb", label: "MongoDB" },
  { value: "cassandra", label: "Apache Cassandra", disabled: true, reason: "Coming soon" },
  { value: "redis", label: "Redis" },
  { value: "d1", label: "Cloudflare D1" },
];

export type BotItem = {
  author: string;
  label: string;
  value: string;
};

export const bots: BotItem[] = [
  { value: "googlebot", label: "Googlebot", author: "Google" },
  { value: "bingbot", label: "Bingbot", author: "Microsoft" },
  { value: "yandexbot", label: "YandexBot", author: "Yandex" },
  { value: "duckduckbot", label: "DuckDuckBot", author: "DuckDuckGo" },
  { value: "baiduspider", label: "Baiduspider", author: "Baidu" },
  { value: "slurp", label: "Yahoo Slurp", author: "Yahoo" },
  { value: "applebot", label: "Applebot", author: "Apple" },
  { value: "facebookbot", label: "Facebookbot", author: "Meta" },
  { value: "twitterbot", label: "Twitterbot", author: "X" },
  { value: "linkedinbot", label: "LinkedInBot", author: "LinkedIn" },
  { value: "pinterestbot", label: "Pinterest", author: "Pinterest" },
  { value: "discordbot", label: "Discordbot", author: "Discord" },
  { value: "slackbot", label: "Slackbot", author: "Slack" },
  { value: "telegrambot", label: "TelegramBot", author: "Telegram" },
  { value: "whatsapp", label: "WhatsApp", author: "Meta" },
  { value: "semrushbot", label: "SemrushBot", author: "Semrush" },
  { value: "ahrefsbot", label: "AhrefsBot", author: "Ahrefs" },
  { value: "mj12bot", label: "MJ12bot", author: "Majestic" },
  { value: "dotbot", label: "DotBot", author: "Moz" },
  { value: "petalbot", label: "PetalBot", author: "Huawei" },
];
