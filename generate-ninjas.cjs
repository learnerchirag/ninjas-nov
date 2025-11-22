const fs = require('fs');
const path = require('path');

// Arrays for generating diverse data
const names = [
    'Naruto', 'Sasuke', 'Sakura', 'Kakashi', 'Itachi', 'Gaara', 'Rock Lee', 'Neji',
    'Hinata', 'Shikamaru', 'Ino', 'Choji', 'Kiba', 'Shino', 'Tenten', 'Temari',
    'Kankuro', 'Jiraiya', 'Tsunade', 'Orochimaru', 'Minato', 'Kushina', 'Obito',
    'Madara', 'Hashirama', 'Tobirama', 'Hiruzen', 'Danzo', 'Yamato', 'Sai',
    'Kurenai', 'Asuma', 'Guy', 'Konan', 'Pain', 'Kisame', 'Deidara', 'Sasori',
    'Hidan', 'Kakuzu', 'Zabuza', 'Haku', 'Kimimaro', 'Jugo', 'Suigetsu', 'Karin',
    'Killer Bee', 'A', 'Darui', 'Mei', 'Chojuro', 'Onoki', 'Kurotsuchi', 'Deidara',
    'Chiyo', 'Ebisu', 'Iruka', 'Anko', 'Kabuto', 'Mifune', 'Hanzo', 'Konohamaru',
    'Moegi', 'Udon', 'Karui', 'Omoi', 'Samui', 'Ao', 'Fuu', 'Han', 'Roshi',
    'Yagura', 'Utakata', 'Saiken', 'Matatabi', 'Isobu', 'Son Goku', 'Kokuo',
    'Shukaku', 'Gyuki', 'Kurama', 'Rin', 'Shisui', 'Fugaku', 'Mikoto', 'Izumi',
    'Nawaki', 'Dan', 'Kaguya', 'Hagoromo', 'Hamura', 'Indra', 'Asura', 'Toneri',
    'Urashiki', 'Momoshiki', 'Kinshiki', 'Isshiki', 'Boruto', 'Sarada', 'Mitsuki',
    'Kawaki', 'Sumire', 'Metal Lee', 'Shikadai', 'Inojin', 'Chocho', 'Himawari'
];

const locations = ['Konoha', 'Suna', 'Kiri', 'Iwa', 'Kumo'];
const healthStates = ['Healthy', 'Injured', 'Critical'];

// Function to generate a random ID
function generateId(index) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id + index;
}

// Function to get a random item from an array
function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Function to generate a random power level between 100 and 10000
function randomPower() {
    return Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
}

// Function to generate a unique name with suffix if needed
function generateUniqueName(index) {
    const baseName = randomItem(names);
    const suffix = Math.floor(index / names.length);
    return suffix > 0 ? `${baseName} ${suffix}` : baseName;
}

// Generate 1000+ entries
function generateEntries(count = 1200) {
    const entries = [];

    for (let i = 0; i < count; i++) {
        entries.push({
            id: generateId(i),
            name: generateUniqueName(i),
            location: randomItem(locations),
            health: randomItem(healthStates),
            power: randomPower()
        });
    }

    return entries;
}

// Create the JSON data
const data = {
    ninjas: generateEntries(1200)
};

// Write to file
const outputPath = path.join(__dirname, 'ninjas-database.json');
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');

console.log(`✅ Successfully generated ${data.ninjas.length} ninja entries!`);
console.log(`📁 File saved to: ${outputPath}`);
console.log(`📊 File size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);

// Optional: Start a simple JSON server
console.log('\n🚀 To start a JSON server with this data:');
console.log('1. Install json-server: npm install -g json-server');
console.log('2. Run: json-server --watch ninjas-database.json --port 3000');
console.log('3. Access at: http://localhost:3000/ninjas');