const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

// Helper to make sure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 1. BRAND DATA GENERATION
const countriesByBrand = {
  'Tesla': 'USA', 'BMW': 'Germany', 'Mercedes-Benz': 'Germany', 'Audi': 'Germany',
  'Ferrari': 'Italy', 'Lamborghini': 'Italy', 'Porsche': 'Germany', 'Aston Martin': 'UK',
  'Bugatti': 'France', 'Bentley': 'UK', 'Rolls-Royce': 'UK', 'Jaguar': 'UK',
  'Land Rover': 'UK', 'Maserati': 'Italy', 'Alfa Romeo': 'Italy', 'Lexus': 'Japan',
  'Acura': 'USA', 'Infiniti': 'Japan', 'Cadillac': 'USA', 'Lincoln': 'USA',
  'Volvo': 'Sweden', 'Polestar': 'Sweden', 'Rivian': 'USA', 'Lucid': 'USA',
  'Genesis': 'South Korea', 'Corvette': 'USA', 'McLaren': 'UK', 'Pagani': 'Italy',
  'Koenigsegg': 'Sweden', 'Lotus': 'UK', 'Ford': 'USA', 'Chevrolet': 'USA',
  'Dodge': 'USA', 'Jeep': 'USA', 'GMC': 'USA', 'Toyota': 'Japan',
  'Honda': 'Japan', 'Nissan': 'Japan', 'Mazda': 'Japan', 'Subaru': 'Japan',
  'Mitsubishi': 'Japan', 'Hyundai': 'South Korea', 'Kia': 'South Korea', 'Peugeot': 'France',
  'Renault': 'France', 'Citroen': 'France', 'Fiat': 'Italy', 'Volkswagen': 'Germany',
  'Rimac': 'Croatia', 'Cupra': 'Spain'
};

const foundingYears = {
  'Tesla': 2003, 'BMW': 1916, 'Mercedes-Benz': 1926, 'Audi': 1909,
  'Ferrari': 1939, 'Lamborghini': 1963, 'Porsche': 1931, 'Aston Martin': 1913,
  'Bugatti': 1909, 'Bentley': 1919, 'Rolls-Royce': 1906, 'Jaguar': 1922,
  'Land Rover': 1948, 'Maserati': 1914, 'Alfa Romeo': 1910, 'Lexus': 1989,
  'Acura': 1986, 'Infiniti': 1989, 'Cadillac': 1902, 'Lincoln': 1917,
  'Volvo': 1927, 'Polestar': 1996, 'Rivian': 2009, 'Lucid': 2007,
  'Genesis': 2015, 'Corvette': 1953, 'McLaren': 1963, 'Pagani': 1992,
  'Koenigsegg': 1994, 'Lotus': 1948, 'Ford': 1903, 'Chevrolet': 1911,
  'Dodge': 1900, 'Jeep': 1941, 'GMC': 1911, 'Toyota': 1937,
  'Honda': 1948, 'Nissan': 1933, 'Mazda': 1920, 'Subaru': 1953,
  'Mitsubishi': 1870, 'Hyundai': 1967, 'Kia': 1944, 'Peugeot': 1810,
  'Renault': 1899, 'Citroen': 1919, 'Fiat': 1899, 'Volkswagen': 1937,
  'Rimac': 2009, 'Cupra': 2018
};

const brandNames = Object.keys(countriesByBrand);

const brands = brandNames.map((name, index) => {
  return {
    id: index + 1,
    name: name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    logo: `https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=150&h=150&q=80`,
    country: countriesByBrand[name] || 'International',
    founded: foundingYears[name] || 1990,
    description: `${name} is an elite automotive manufacturer renowned globally for building premium class vehicles representing engineering excellence, luxury, and superior performance.`,
    vehicleCount: 0
  };
});

// Categories
const categories = [
  { id: 1, name: 'Electric Vehicles', slug: 'electric-vehicles' },
  { id: 2, name: 'Luxury Sedans', slug: 'luxury-sedans' },
  { id: 3, name: 'SUV & Crossovers', slug: 'suv-crossovers' },
  { id: 4, name: 'Supercars & Hypercars', slug: 'supercars-hypercars' },
  { id: 5, name: 'Sports Coupes', slug: 'sports-coupes' },
  { id: 6, name: 'Off-Road & Adventure', slug: 'off-road-adventure' },
  { id: 7, name: 'Hybrids', slug: 'hybrids' }
];

// Unsplash Car Images Pool
const carImagesPool = [
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80', // Sedan
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80', // Porsche
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1000&q=80', // SUV
  'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=80', // Supercar
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=80', // Sedan Front
  'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1000&q=80', // Mustang/Muscle
  'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1000&q=80', // Audi
  'https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&w=1000&q=80', // Supercar Orange
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80', // BMW
  'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1000&q=80', // Electric Mercedes
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80', // AMG
  'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80', // Porsche Red
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=80', // Mercedes Classic
  'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80', // Range Rover
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80', // SUV Offroad
  'https://images.unsplash.com/photo-1605558202138-25ee2f30f07e?auto=format&fit=crop&w=1000&q=80'  // Corvette
];

// Model naming templates
const modelNouns = ['S', 'Plaid', 'GT', 'Turbo S', 'Roadster', 'M Edition', 'EV', 'Prestige', 'Hybrid', 'Veloce', 'SV', 'Carbon', 'Chrono', 'Trek', 'Apex', 'Performante', 'Trident', 'Polestar 3', 'R-Design', 'Quadri', 'E-Tron', 'F-Type', 'Concept One', 'RS', 'Quadrifoglio'];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 2. CARS DATA GENERATION
const cars = [];
const fuelTypes = ['Electric', 'Gasoline', 'Hybrid', 'Plug-in Hybrid', 'Diesel'];
const transmissions = ['Automatic', 'Manual', 'Dual-Clutch', 'Single-Speed Direct'];

// We need 100+ cars. Let's make 105.
for (let i = 1; i <= 105; i++) {
  const brandObj = getRandomItem(brands);
  const brandName = brandObj.name;
  const categoryObj = getRandomItem(categories);
  const year = getRandomInt(2024, 2027);
  const fuelType = categoryObj.slug === 'electric-vehicles' ? 'Electric' : (categoryObj.slug === 'hybrids' ? 'Hybrid' : getRandomItem(fuelTypes));
  const transmission = fuelType === 'Electric' ? 'Single-Speed Direct' : getRandomItem(transmissions);
  
  const noun = getRandomItem(modelNouns);
  const name = `${brandName} ${noun} ${getRandomInt(3, 9) * 10}d`;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  const price = getRandomInt(45000, 350000);
  const horsepower = getRandomInt(250, 1200);
  const torque = getRandomInt(300, 1300);
  const rangeKm = fuelType === 'Electric' || fuelType === 'Plug-in Hybrid' ? getRandomInt(350, 750) : null;
  const topSpeed = getRandomInt(180, 420);
  const acceleration = parseFloat((getRandomInt(20, 65) / 10).toFixed(1));
  const rating = parseFloat((getRandomInt(42, 50) / 10).toFixed(1));
  
  const img1 = carImagesPool[(i - 1) % carImagesPool.length];
  const img2 = carImagesPool[(i) % carImagesPool.length];
  const img3 = carImagesPool[(i + 1) % carImagesPool.length];

  const features = [
    'Adaptive Cruise Control',
    'Heated and Ventilated Seats',
    '360 Degree Surround Camera',
    'Premium Surround Sound System',
    'Dynamic Chassis Control',
    'Panoramic Glass Roof',
    'Wireless Apple CarPlay & Android Auto',
    'Active Lane Keep Assist',
    'Level 2 Self-Driving Capability',
    'LED Matrix Headlights',
    'Voice-Activated Controls',
    'Head-up HUD Display'
  ].sort(() => 0.5 - Math.random()).slice(0, getRandomInt(5, 9));

  cars.push({
    id: i,
    name: name,
    slug: slug,
    brand: brandName,
    price: price,
    year: year,
    category: categoryObj.name,
    fuelType: fuelType,
    transmission: transmission,
    horsepower: horsepower,
    torque: torque,
    rangeKm: rangeKm,
    topSpeed: topSpeed,
    acceleration: acceleration,
    rating: rating,
    featured: i <= 8 || Math.random() > 0.8,
    images: [img1, img2, img3],
    features: features,
    specifications: {
      "drivetrain": getRandomItem(['AWD', 'RWD', 'FWD']),
      "seatingCapacity": getRandomInt(2, 7),
      "luggageCapacity": `${getRandomInt(300, 650)} Liters`,
      "batteryCapacity": fuelType === 'Electric' ? `${getRandomInt(75, 115)} kWh` : 'N/A',
      "weight": `${getRandomInt(1400, 2400)} kg`,
      "warranty": '5 Years / 100,000 km'
    }
  });

  // Increment brand vehicle count
  brandObj.vehicleCount++;
}

// 3. ARTICLES DATA GENERATION
// Minimum 100 articles
const articleCategories = ['Electric Vehicles', 'Luxury Cars', 'Supercars', 'Technology', 'Motorsports', 'Buying Guides', 'Industry News'];
const articleAuthors = ['Michael Carter', 'Sarah Wilson', 'David Ross', 'Elena Rostova', 'Jonathan Cole', 'Marcus Vance'];
const articleTitles = [
  'Why Solid-State Batteries Will Change EVs Forever',
  'The Evolution of Supercar Aerodynamics',
  'Top 10 Most Comfortable Luxury Interiors of 2026',
  'How autonomous driving is reshaping urban cities',
  'Formula 1 Regulations: What to expect in the new era',
  'The Ultimate Guide to buying a Used Luxury SUV',
  'Behind the Scenes: Designing the ultimate hypercar',
  'Why classic sports cars are rocketing in value',
  'Hydrogen Fuel Cells: Viable future or empty promise?',
  'Inside the assembly line of high-end coach builders',
  'The impact of AI on automotive predictive maintenance',
  'Electric vs Hybrid: Which luxury cruiser fits your lifestyle?',
  'Track testing the fastest vehicles of the decade',
  'The return of manual transmissions in enthusiast cars',
  'Sustainable luxury: Inside the vegan leather revolution'
];

const articles = [];
for (let i = 1; i <= 102; i++) {
  const titleBase = articleTitles[(i - 1) % articleTitles.length];
  const title = `${titleBase} (Vol. ${Math.ceil(i / articleTitles.length)})`;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const cat = getRandomItem(articleCategories);
  const author = getRandomItem(articleAuthors);
  const readTime = getRandomInt(4, 15);
  const views = getRandomInt(1500, 45000);
  
  // Date calculation
  const date = new Date();
  date.setDate(date.getDate() - i);
  const publishedAt = date.toISOString().split('T')[0];

  const contentSections = [
    {
      heading: "The New Standard of Performance",
      text: "As engineering pushes beyond traditional limits, automotive innovators are breaking boundaries in electric drive systems, high-efficiency combustion engines, and intelligent energy management. We take an in-depth look at how these integrations are modifying dynamic handling and outright straight-line performance."
    },
    {
      heading: "Innovating Beyond Efficiency",
      text: "It is no longer just about fuel economy. Modern buyers demand zero latency, high torque delivery, and responsive ride profiles. Active suspension modules, paired with torque-vectoring differentials, allow modern platforms to execute high-speed cornering that defies their physical weight class."
    },
    {
      heading: "The Shift in Luxury Ergonomics",
      text: "Inside the cabin, physical controls are blending with sophisticated curved displays and haptic feedback grids. The focus has shifted to occupant wellness, incorporating advanced multi-zone air filtering systems, noise-canceling acoustics, and customized massage seats driven by neural algorithms."
    }
  ];

  articles.push({
    id: i,
    title: title,
    slug: slug,
    excerpt: `Explore the detailed analysis of ${title.toLowerCase()} and discover what it means for the future of the luxury automotive ecosystem.`,
    content: JSON.stringify(contentSections),
    author: author,
    category: cat,
    image: carImagesPool[i % carImagesPool.length],
    publishedAt: publishedAt,
    readTime: readTime,
    views: views,
    featured: i <= 5
  });
}

// 4. REVIEWS DATA GENERATION
// Minimum 500 reviews. Let's make 515 reviews.
const reviews = [];
const reviewerNames = [
  'James Walker', 'Alex Tremblay', 'Robert Chen', 'Sofia Lindqvist', 'Nikhil Mehta',
  'Oliver Vance', 'Emma Watson', 'Chloe Dupont', 'Hans Schmidt', 'Kenji Sato',
  'Lucas Silva', 'Aria Montgomery', 'Zoe Kravitz', 'George Harris', 'Isabella Rossi'
];

const reviewTitles = [
  'Absolutely brilliant piece of engineering',
  'Great performance but disappointing infotainment',
  'The daily driver I always wanted',
  'Exquisite design, unmatched speed',
  'Overpriced for what it offers',
  'Impressive technology but lacks raw steering feel',
  'A sustainable milestone in luxury travel',
  'Fascinating drivetrain, poor battery efficiency in winter',
  'Raw speed that puts a smile on your face',
  'Refined, quiet, and exceptionally comfortable'
];

const reviewPros = [
  ['Unbelievable acceleration', 'Extremely comfortable air suspension', 'Next-gen screen UI'],
  ['Superb build quality', 'High resale value', 'Excellent track response'],
  ['Zero emissions', 'Whisper quiet cabin', 'Abundant storage space'],
  ['Timeless design aesthetic', 'Incredible torque delivery', 'Outstanding braking power']
];

const reviewCons = [
  ['High entry cost', 'Subpar range in cold climates', 'Firm ride on 21-inch rims'],
  ['Infotainment has a learning curve', 'Tight rear headroom', 'Heavy curb weight'],
  ['Lack of exhaust soundtrack', 'Limited steering wheel feedback'],
  ['Expensive options list', 'Lacks physical interior buttons']
];

for (let i = 1; i <= 515; i++) {
  const carId = (i % cars.length) + 1;
  const car = cars.find(c => c.id === carId) || cars[0];
  
  const rating = parseFloat((getRandomInt(35, 50) / 10).toFixed(1));
  const author = getRandomItem(reviewerNames);
  const title = `${car.name} - ${getRandomItem(reviewTitles)}`;
  
  const pros = getRandomItem(reviewPros);
  const cons = getRandomItem(reviewCons);
  
  const date = new Date();
  date.setDate(date.getDate() - getRandomInt(1, 180));
  const publishedAt = date.toISOString().split('T')[0];

  reviews.push({
    id: i,
    carId: carId,
    carName: car.name,
    title: title,
    rating: rating,
    pros: pros,
    cons: cons,
    author: author,
    publishedAt: publishedAt,
    content: `After driving this vehicle for over a week through suburban highways and winding mountain passes, I can confidently state that it is a solid contender in its category. The power delivery is linear, and the cabin comfort remains superb even on longer journeys.`
  });
}

// 5. NEWS DATA GENERATION
// Minimum 200 news records. Let's make 205.
const newsCategories = ['Corporate', 'New Reveals', 'Motorsports', 'Technology', 'Electric Vehicles', 'Events'];
const newsTitles = [
  'Solid-State Battery Production Slated for Next Year',
  'Automotive Conglomerate Announces Total Electric Transition Plans',
  'New Aerodynamic Concepts Debuted at International Motorshow',
  'Legendary Racing Driver Announces Retirement Next Season',
  'Major Autonomous Driving Software Overhaul Rolled Out',
  'Supercar Maker Reaches Sales Milestone on Hybrid Models',
  'Luxury Car Brand Partners with High-End Designer for Custom Interiors',
  'New Speed Record Attempt Planned on German Autobahn',
  'Pioneering Tech Startup Unveils 1,200 HP Electric Motor',
  'Motorsport Series to Introduce 100% Sustainable Biofuel',
  'Classic Car Show Draws Record Crowd of Collectors',
  'Electric Truck Startup Begins Global Deliveries'
];

const news = [];
for (let i = 1; i <= 210; i++) {
  const headlineBase = newsTitles[(i - 1) % newsTitles.length];
  const title = `${headlineBase} (Edition ${i})`;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const cat = getRandomItem(newsCategories);
  
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(i / 1.5));
  const publishedAt = date.toISOString().split('T')[0];

  news.push({
    id: i,
    title: title,
    slug: slug,
    image: carImagesPool[i % carImagesPool.length],
    category: cat,
    publishedAt: publishedAt,
    excerpt: `The automotive landscape continues to evolve rapidly. This week, we analyze the major impacts of ${title.toLowerCase()} and what it means for industry dynamics.`,
    content: `Industry insiders and executive analysts have closely monitored this transition over the past quarter. According to official reports, the development signals a massive shift in capital investment away from historical technologies into high-efficiency platforms. Consumer demand for digital services, over-the-air performance tuning, and robust charging connectivity remains the primary catalyst for these advancements.`
  });
}

// 6. SETTINGS DATA
const settings = {
  site: {
    name: "DriveX",
    tagline: "Premium Cars • Reviews • News • Articles",
    description: "Discover luxury vehicles, electric innovations, performance reviews, industry news, and premium automotive articles from around the world.",
    logo: "DX",
    email: "contact@drivex.com",
    phone: "+1-555-123-4567",
    address: "Automotive Avenue, New York, USA",
    socials: {
      facebook: "https://facebook.com/drivex",
      instagram: "https://instagram.com/drivex",
      x: "https://x.com/drivex",
      youtube: "https://youtube.com/@drivex"
    }
  },
  hero: {
    badge: "Premium Automotive Magazine",
    title: "Discover The Future Of Cars",
    highlight: "Future",
    description: "Explore luxury vehicles, electric innovations, performance reviews, industry news, and premium automotive articles from around the world.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    buttons: {
      primary: "Browse Cars",
      secondary: "Latest Articles"
    },
    stats: [
      { title: "Readers", value: "25K+" },
      { title: "Articles", value: "1,200+" },
      { title: "Cars Reviewed", value: "350+" }
    ]
  }
};

// WRITE FILES
fs.writeFileSync(path.join(DATA_DIR, 'brands.json'), JSON.stringify(brands, null, 2));
fs.writeFileSync(path.join(DATA_DIR, 'cars.json'), JSON.stringify(cars, null, 2));
fs.writeFileSync(path.join(DATA_DIR, 'articles.json'), JSON.stringify(articles, null, 2));
fs.writeFileSync(path.join(DATA_DIR, 'reviews.json'), JSON.stringify(reviews, null, 2));
fs.writeFileSync(path.join(DATA_DIR, 'news.json'), JSON.stringify(news, null, 2));
fs.writeFileSync(path.join(DATA_DIR, 'categories.json'), JSON.stringify(categories, null, 2));
fs.writeFileSync(path.join(DATA_DIR, 'settings.json'), JSON.stringify(settings, null, 2));

console.log("Database generation successfully completed!");
console.log(`Brands generated: ${brands.length}`);
console.log(`Cars generated: ${cars.length}`);
console.log(`Articles generated: ${articles.length}`);
console.log(`Reviews generated: ${reviews.length}`);
console.log(`News generated: ${news.length}`);
