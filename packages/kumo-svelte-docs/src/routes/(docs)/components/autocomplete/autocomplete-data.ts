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
  "Pineapple",
  "Plum",
  "Raspberry",
  "Strawberry",
  "Watermelon",
];

export const fruitItems = fruits.map((fruit) => ({ label: fruit, value: fruit }));

export const countries = [
  { code: "us", label: "United States", value: "United States" },
  { code: "gb", label: "United Kingdom", value: "United Kingdom" },
  { code: "de", label: "Germany", value: "Germany" },
  { code: "fr", label: "France", value: "France" },
  { code: "jp", label: "Japan", value: "Japan" },
  { code: "cn", label: "China", value: "China" },
  { code: "in", label: "India", value: "India" },
  { code: "br", label: "Brazil", value: "Brazil" },
  { code: "ca", label: "Canada", value: "Canada" },
  { code: "au", label: "Australia", value: "Australia" },
  { code: "mx", label: "Mexico", value: "Mexico" },
  { code: "kr", label: "South Korea", value: "South Korea" },
  { code: "it", label: "Italy", value: "Italy" },
  { code: "es", label: "Spain", value: "Spain" },
  { code: "nl", label: "Netherlands", value: "Netherlands" },
  { code: "se", label: "Sweden", value: "Sweden" },
  { code: "no", label: "Norway", value: "Norway" },
  { code: "pl", label: "Poland", value: "Poland" },
  { code: "ar", label: "Argentina", value: "Argentina" },
  { code: "za", label: "South Africa", value: "South Africa" },
];

export const countryItems = countries.map((country) => ({
  label: country.label,
  value: country.value,
}));

export const servers = [
  {
    value: "North America",
    items: [
      { label: "US East (Virginia)", value: "us-east-1" },
      { label: "US West (Oregon)", value: "us-west-2" },
      { label: "Canada (Central)", value: "ca-central-1" },
    ],
  },
  {
    value: "Europe",
    items: [
      { label: "EU West (Ireland)", value: "eu-west-1" },
      { label: "EU Central (Frankfurt)", value: "eu-central-1" },
      { label: "EU North (Stockholm)", value: "eu-north-1" },
    ],
  },
  {
    value: "Asia Pacific",
    items: [
      { label: "AP Southeast (Singapore)", value: "ap-southeast-1" },
      { label: "AP Northeast (Tokyo)", value: "ap-northeast-1" },
      { label: "AP South (Mumbai)", value: "ap-south-1" },
    ],
  },
];

export const serverItems = servers.flatMap((group) =>
  group.items.map((item) => ({ label: item.label, value: item.label })),
);
