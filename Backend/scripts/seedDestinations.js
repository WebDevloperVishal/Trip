import dotenv from "dotenv";
import mongoose from "mongoose";
import Destination from "../models/destination.model.js";

dotenv.config();

const MONGO_URI = process.env.DB_CONNECT;

const destinations = [
  
  {
    name: "Sinhagad Fort",
    location: "Pune",
    category: "Fort",
    description: `**Historical Significance:**  
Originally known as *Kondhana*, Sinhagad Fort’s history stretches back over 2,000 years, standing sentinel over the Sahyadri range near Pune.  
In 1670, the fort was the scene of the daring Battle of Sinhagad, during which Tanaji Malusare scaled the cliffs to recapture the fort for Chhatrapati Shivaji Maharaj from the Mughals.  
Legend says when Tanaji was killed in the charge, Shivaji declared: “Gad Ala Pan Sinha Gela” (“We gained the fort but lost the lion”), and the name was changed to *Sinhagad* (“Lion’s Fort”).  

**What to See:**  
- The steep climb/trail up the fort with rock-cut steps and dramatic cliffs.  
- Restored fort walls, old gates, and the Kaundinyeshwar temple at the base referencing its ancient roots.  
- Panoramic views over the Khadakwasla lake and lush valleys — particularly stunning during the monsoon.  
- A large open plateau at the top that serves as a picnic and sunset-viewing spot.  

**Best Time to Visit:**  
October to March is ideal — cooler weather, clear skies, and post-monsoon greenery. Monsoon (July–September) is lush but can be slippery and sometimes restricted.  
*Tip:* Early morning visits help avoid crowds and give crisp views.  

**Budget & How to Reach:**  
From Pune: ~25 km (about 1-hour drive) or local transport to Donaje village, then a short climb.  
Entry and parking are modest. A budget of ₹1,000–₹3,000 covers travel, food, and refreshments for a day outing.  
Bring water, snacks, and sturdy shoes — the ascent is moderate.  

**Why It’s Worth Visiting:**  
Sinhagad combines legendary Maratha history, dramatic terrain, and accessible adventure. Whether you’re into trekking, history, or nature, it offers a fulfilling one-day getaway near Pune.`,
    coordinates: { lat: 18.366, lng: 73.755 },
    image: "sinhagad.jpg",
  },
  {
    name: "Raigad Fort",
    location: "Raigad",
    category: "Fort",
    description: `**Historical Significance:**  
Raigad Fort, originally called *Rairi*, became the capital of the Maratha Empire under Chhatrapati Shivaji Maharaj. In 1674, Shivaji’s grand coronation took place here, marking the formal establishment of the Maratha kingdom. The fort remained a symbol of sovereignty and Maratha pride until its fall in 1818.  

**What to See:**  
- The steep path or ropeway leading to the 820-meter-high summit.  
- Ruins of Shivaji’s palace complex, Nagarkhana Darwaja, and Ganga Sagar Lake.  
- Takmak Tok, the dramatic execution cliff offering stunning valley views.  
- The statue of Shivaji Maharaj and the resting place of his loyal dog, Waghya.  

**Best Time to Visit:**  
November to February offers cool and dry weather with great visibility.  
Avoid the summer heat; monsoon months (July–September) add greenery but can make the paths slippery.  

**Budget & How to Reach:**  
From Mumbai: ~170 km (via Mahad or Mangaon) — easily accessible by car or bus.  
From Pune: ~130 km via Bhor Ghat.  
Budget around ₹1,500–₹4,000 for travel, food, and ropeway tickets.  

**Why It’s Worth Visiting:**  
Raigad is not just a fort — it’s the cradle of Maratha heritage. The breathtaking views, historic ruins, and royal atmosphere make it one of Maharashtra’s most iconic destinations.`,
    coordinates: { lat: 18.234, lng: 73.442 },
    image: "raigad.jpg",
  },
  {
    name: "Pratapgad Fort",
    location: "Satara",
    category: "Fort",
    description: `**Historical Significance:**  
Built in 1656 by Shivaji Maharaj, Pratapgad Fort near Mahabaleshwar became famous for the 1659 battle between Shivaji and Afzal Khan — a decisive victory for the Marathas that strengthened their rule.  

**What to See:**  
- The Bhavani Mata Temple, built by Shivaji Maharaj, dedicated to Goddess Bhavani.  
- Towering ramparts and gates like the “Maha Darwaza” with majestic views.  
- The Afzal Khan Tomb near the fort’s base — a reminder of the fort’s historical battle.  
- Scenic viewpoints offering panoramic views of the lush Western Ghats.  

**Best Time to Visit:**  
September to February is best, offering clear skies and vibrant greenery after monsoon.  

**Budget & How to Reach:**  
20 km from Mahabaleshwar and 25 km from Poladpur — easily accessible by road.  
Plan ₹1,500–₹3,500 for meals, transport, and entry.  

**Why It’s Worth Visiting:**  
Pratapgad represents Maratha bravery and strategy at its finest. Its commanding location, rich history, and monsoon charm make it a must-visit for history enthusiasts.`,
    coordinates: { lat: 17.933, lng: 73.58 },
    image: "pratapgad.jpg",
  },
 
  {
    name: "Lohagad Fort",
    location: "Lonavala",
    category: "Fort",
    description: `**Historical Significance:**  
Lohagad Fort (“Iron Fort”) near Lonavala is one of the best-preserved hill forts of the Maratha era. Once used to store Shivaji Maharaj’s treasury, it later came under British control in 1818.  

**What to See:**  
- The four massive gates — Ganesh, Narayan, Hanuman, and Maha Darwaza — showcasing ancient architecture.  
- The “Vinchu Kata” (Scorpion’s Tail), a long fortification wall that extends dramatically into the valley.  
- Stunning monsoon views as mist and clouds roll over the fort walls.  

**Best Time to Visit:**  
October to May for comfortable trekking weather; June–September for surreal monsoon beauty.  

**Budget & How to Reach:**  
15 km from Lonavala, accessible via Malavali station followed by a 45-minute trek.  
Budget ₹800–₹2,000 for travel and meals.  

**Why It’s Worth Visiting:**  
A perfect weekend trek — Lohagad combines ease of access, historical value, and panoramic views, making it a favorite among trekkers and families alike.`,
    coordinates: { lat: 18.71, lng: 73.48 },
    image: "lohagad.jpg",
  },
  {
    name: "Shivneri Fort",
    location: "Junnar",
    category: "Fort",
    description: `**Historical Significance:**  
Shivneri Fort, near Junnar, is the birthplace of Chhatrapati Shivaji Maharaj — born here in 1630. The fort’s seven-layered defenses and natural cliffs made it an impregnable stronghold during the Mughal era.  

**What to See:**  
- The main entrance “Maha Darwaza” and seven defensive gates.  
- The temple of Goddess Shivai, after whom Shivaji was named.  
- Ancient water cisterns, fort walls, and scenic viewpoints.  
- The Junnar Caves nearby — ancient Buddhist rock-cut monuments.  

**Best Time to Visit:**  
November to February for cool and pleasant weather.  

**Budget & How to Reach:**  
About 90 km from Pune, accessible by car or bus.  
Budget ₹1,000–₹2,500 for travel and local food.  

**Why It’s Worth Visiting:**  
A historically sacred site, Shivneri Fort offers a mix of Maratha history, architecture, and scenic tranquility — ideal for family trips and history lovers.`,
    coordinates: { lat: 19.202, lng: 73.854 },
    image: "shivneri.jpg",
  },
  {
  name: "Panhala Fort",
  location: "Kolhapur",
  category: "Fort",
  description: `**Vast Hill Fort with Deep History:**  
Panhala is a sprawling Sahyadri fort with long ramparts, historic bastions, caves and a network of tunnels. Less crowded than some forts, it offers a contemplative walk through layered Deccan history and sweeping valley views.  

**What to See:**  
- Teen Darwaza (gateway), long parapet walls and Rajdindi bastion.  
- Underground passages, folklore points and small water cisterns.  
- Nearby Kolhapur cultural circuits (food, temples, craft).  

**Best Time to Visit:**  
October to February for pleasant climbs and clear views.  

**Budget & How to Reach:**  
About 20 km from Kolhapur city; reachable by road. Day trip budget ₹800–₹2,000.  

**Why It’s Worth Visiting:**  
A large, under-appreciated fort with rich historic layers — ideal for history lovers and peaceful trekking without large crowds.`,
  coordinates: { lat: 16.8113, lng: 74.1078 },
  image: "panhala.jpg",
},


   // Beaches
  {
    name: "Alibaug Beach",
    location: "Alibaug",
    category: "Beach",
    description: `**Historical Significance:**  
Alibaug Beach, located on the Konkan coast, is one of Maharashtra’s most popular seaside getaways. Once a strategic naval base during the Maratha period, it still faces the historic Kolaba Fort, built by Chhatrapati Shivaji Maharaj in the 17th century.  

**What to See:**  
- The black-sand shoreline and scenic view of the Kolaba Fort visible from the beach.  
- Horse cart rides and camel rides along the shore.  
- Water sports such as parasailing, banana rides, and jet skiing.  
- The nearby Alibaug Fort accessible during low tide by walking or boat.  

**Best Time to Visit:**  
October to March offers ideal weather with cool breezes and beautiful sunsets. Avoid peak monsoon (June–September) due to high tides.  

**Budget & How to Reach:**  
Accessible from Mumbai (95 km) via ferry from Gateway of India to Mandwa, followed by a 20-minute drive.  
Budget ₹1,500–₹5,000 depending on travel, meals, and stay.  

**Why It’s Worth Visiting:**  
Alibaug offers the perfect mix of history, relaxation, and beach fun — ideal for families, couples, and weekend travelers.`,
    coordinates: { lat: 18.655, lng: 72.875 },
    image: "alibaug.jpg",
  },
  {
    name: "Ganpatipule Beach",
    location: "Ratnagiri",
    category: "Beach",
    description: `**Historical Significance:**  
Ganpatipule is both a scenic beach and an important pilgrimage destination, home to the 400-year-old Swayambhu Ganesha Temple located right by the sea. The self-manifested idol of Lord Ganesha is said to have emerged from the sand itself.  

**What to See:**  
- The pristine golden beach stretching for miles with calm turquoise waters.  
- The ancient Swayambhu Ganesha Temple facing the Arabian Sea.  
- Aarti ceremonies at sunrise and sunset that create a divine atmosphere.  
- Water sports and scenic drives along the Konkan coast.  

**Best Time to Visit:**  
November to February is ideal for pleasant weather and smooth seas. Summers can be hot but evenings remain breezy.  

**Budget & How to Reach:**  
About 375 km from Mumbai and 330 km from Pune via NH66.  
Budget ₹2,000–₹6,000 for transport, lodging, and local food.  

**Why It’s Worth Visiting:**  
Ganpatipule uniquely blends spirituality with seaside charm — a rare spot where devotion meets natural beauty.`,
    coordinates: { lat: 17.146, lng: 73.27 },
    image: "ganpatipule.jpg",
  },
  {
    name: "Kashid Beach",
    location: "Murud",
    category: "Beach",
    description: `**Historical Significance:**  
Kashid Beach lies between Alibaug and Murud and was once a quiet fishermen’s village. Today it’s one of Maharashtra’s most beautiful and clean beaches, famous for its silver-white sands.  

**What to See:**  
- Clear turquoise waters perfect for swimming.  
- Water adventure sports like parasailing, jet skiing, and ATV rides.  
- The nearby Murud-Janjira Fort visible from the shore.  
- Lush coconut groves lining the beach road — perfect for photography.  

**Best Time to Visit:**  
October to March offers calm seas and moderate temperatures. Avoid heavy rains between June and September.  

**Budget & How to Reach:**  
30 km from Alibaug, easily accessible via road or ferry from Mumbai.  
Budget ₹1,500–₹4,000 for food, rides, and stay.  

**Why It’s Worth Visiting:**  
A peaceful and clean escape — Kashid is ideal for couples and groups seeking solitude away from crowded beaches.`,
    coordinates: { lat: 18.438, lng: 72.889 },
    image: "kashid.jpg",
  },
  {
    name: "Velas Beach",
    location: "Ratnagiri",
    category: "Beach",
    description: `**Historical Significance:**  
Velas is an eco-tourism haven known for its Olive Ridley turtle conservation program. The beach gained recognition for the annual turtle festival, where baby turtles are released into the sea.  

**What to See:**  
- The Olive Ridley turtle hatching event (February–March).  
- Clean and unspoiled sands surrounded by coconut groves.  
- Rural Konkan homestay experience with local cuisine.  
- Anjarle Beach and Bankot Fort nearby for sightseeing.  

**Best Time to Visit:**  
November to March — especially February for the turtle festival.  

**Budget & How to Reach:**  
Around 200 km from Pune and 220 km from Mumbai via Mandangad.  
Budget ₹2,000–₹4,000 including stay, meals, and local travel.  

**Why It’s Worth Visiting:**  
Velas offers an authentic eco-tourism experience that supports conservation — perfect for those seeking nature and peace over commercial tourism.`,
    coordinates: { lat: 17.956, lng: 73.054 },
    image: "velas.jpg",
  },
  {
    name: "Tarkarli Beach",
    location: "Sindhudurg",
    category: "Beach",
    description: `**Historical Significance:**  
Tarkarli is a gem of the Konkan coast known for its crystal-clear waters and coral reefs. Historically, the area served as an important naval port during the Maratha period under Admiral Kanhoji Angre.  

**What to See:**  
- Scuba diving and snorkeling sites with visibility up to 20 feet.  
- Water sports like parasailing, banana rides, and jet skiing.  
- The Sindhudurg Fort, built by Shivaji Maharaj, located on an island nearby.  
- White sandy beaches, coconut trees, and tranquil sunsets.  

**Best Time to Visit:**  
October to February for clear waters and perfect beach weather. Avoid the monsoon season.  

**Budget & How to Reach:**  
Around 530 km from Mumbai, 400 km from Pune, reachable via train to Kudal followed by road transport.  
Budget ₹3,000–₹8,000 including water activities, stay, and meals.  

**Why It’s Worth Visiting:**  
Known as Maharashtra’s “Scuba Paradise,” Tarkarli offers unmatched marine beauty, adventure, and serenity in one perfect coastal retreat.`,
    coordinates: { lat: 16.041, lng: 73.474 },
    image: "tarkarli.jpg",
  },

{
  name: "Gorai Beach",
  location: "Mumbai",
  category: "Beach",
  description: `**Historical Significance:**  
Gorai Beach is one of Mumbai’s most accessible yet relaxed coastal getaways, located across the Manori Creek. Once a sleepy fishing village, it’s now a beloved escape for locals who want sea air without long drives. The area still retains its East Indian and fishing community heritage, giving visitors a glimpse of old coastal Mumbai.  

**What to See:**  
- Long sandy stretch ideal for walks, sunsets, and photography.  
- Ferry ride from Marve or Borivali — a short scenic boat trip over the creek.  
- Local seafood shacks, horse carts, and cycling paths near the shore.  
- Nearby attractions like the Global Vipassana Pagoda and EsselWorld amusement park.  

**Best Time to Visit:**  
October to March for pleasant sea breezes and clean tides.  
Avoid monsoon (June–September) when the beach can get rough and some ferry routes pause.  

**Budget & How to Reach:**  
Reach via ferry from Marve Jetty (Malad) or drive via Bhayandar–Uttan Road.  
Budget ₹500–₹2,000 including ferry, food, and local activities.  

**Why It’s Worth Visiting:**  
Close to the city but worlds apart — Gorai combines Mumbai’s coastal charm with a village feel, perfect for quiet sunset walks and weekend relaxation.`,
  coordinates: { lat: 19.2376, lng: 72.7926 },
  image: "gorai.jpg",
},
{
  name: "Kelva Beach",
  location: "Palghar",
  category: "Beach",
  description: `**Historical Significance:**  
Kelva (also spelled Kelwe) Beach is a hidden gem on the northern Konkan coast, north of Mumbai. Once a quiet fishing area, it’s now an emerging eco-tourism spot known for its long, untouched shoreline and the nearby Kelva Fort that dates back to the Maratha era.  

**What to See:**  
- 7 km of wide, clean sand with casuarina trees along the coast.  
- Remains of Kelva Fort and Shitladevi Temple near the beach.  
- Small shacks serving local seafood and coconut water.  
- Horse cart rides, ATV bikes, and peaceful sunrise/sunset walks.  

**Best Time to Visit:**  
October to March for calm weather and easy sea access.  
Monsoon (June–September) transforms the beach into a lush, misty paradise but swimming isn’t recommended.  

**Budget & How to Reach:**  
About 100 km from Mumbai; accessible via Palghar by train or road.  
Budget ₹1,000–₹3,000 for travel, food, and stay (beachside resorts or homestays available).  

**Why It’s Worth Visiting:**  
One of Maharashtra’s cleanest and most underrated beaches — perfect for solitude seekers, weekend families, and photographers craving scenic coastal beauty without crowds.`,
  coordinates: { lat: 19.6533, lng: 72.7433 },
  image: "kelva.jpg",
},

   // Waterfalls
  {
    name: "Thoseghar Waterfalls",
    location: "Satara",
    category: "Waterfall",
    description: `**Historical Significance:**  
Thoseghar Waterfalls near Satara are among Maharashtra’s tallest and most mesmerizing cascades. The site, surrounded by dense forests and deep valleys, is part of the Sahyadri ecosystem that contributes to the region’s rich biodiversity. Historically, it’s been a popular monsoon getaway for locals and travelers alike, symbolizing the natural beauty of the Western Ghats.  

**What to See:**  
- A cluster of waterfalls ranging from 15 to 500 feet in height.  
- A well-maintained viewing platform offering panoramic views of the falls.  
- Lush green valleys and mist-covered cliffs that create a magical ambiance.  
- Nearby attractions like Chalkewadi Windmill Farms and Sajjangad Fort.  

**Best Time to Visit:**  
July to October, during and just after the monsoon, when the waterfalls are in full force.  

**Budget & How to Reach:**  
Located about 20 km from Satara City; accessible by road via NH48.  
Budget ₹1,000–₹2,500 for travel, entry, and food.  

**Why It’s Worth Visiting:**  
Thoseghar is perfect for monsoon lovers — offering tranquil views, photographic opportunities, and a refreshing experience amidst nature.`,
    coordinates: { lat: 17.604, lng: 73.815 },
    image: "thoseghar.jpg",
  },
  {
    name: "Devkund Waterfall",
    location: "Bhira",
    category: "Waterfall",
    description: `**Historical Significance:**  
Devkund Waterfall, nestled deep within the Bhira forest near Tamhini Ghat, is considered one of Maharashtra’s hidden gems. The name ‘Devkund’ translates to “Pond of the Gods,” and local legends say the waters here were once used for rituals by ancient sages.  

**What to See:**  
- The spectacular plunge waterfall that forms a natural turquoise pool below.  
- A scenic 2-hour trek through forests, river crossings, and mountain paths.  
- Surrounding natural landmarks such as Bhira Dam and Tamhini Ghat.  
- The pristine serenity of untouched wilderness.  

**Best Time to Visit:**  
October to March for safe trekking conditions and clear blue waters.  
Avoid heavy monsoons due to strong currents.  

**Budget & How to Reach:**  
Located near Bhira village, about 100 km from Pune and 170 km from Mumbai.  
Budget ₹800–₹2,000 including trek guide fees and local travel.  

**Why It’s Worth Visiting:**  
Devkund offers the perfect blend of adventure and serenity — a paradise for trekkers, photographers, and nature enthusiasts.`,
    coordinates: { lat: 18.484, lng: 73.342 },
    image: "devkund.jpg",
  },
  {
    name: "Randha Waterfall",
    location: "Bhandardara",
    category: "Waterfall",
    description: `**Historical Significance:**  
Formed by the Pravara River, Randha Waterfall near Bhandardara is one of the most magnificent natural waterfalls in Maharashtra. The site has long been admired for its power and beauty — it even served as a natural water source for nearby settlements in the old days.  

**What to See:**  
- The breathtaking 170-foot plunge into a deep gorge surrounded by greenery.  
- The nearby Wilson Dam and Arthur Lake, ideal for boating and picnics.  
- Small temples and local food stalls near the viewing point.  
- Scenic drives through the Sahyadri ranges, especially post-monsoon.  

**Best Time to Visit:**  
July to November, especially during monsoon and early winter when the water volume is highest.  

**Budget & How to Reach:**  
About 185 km from Mumbai and 160 km from Pune; accessible by road via Igatpuri.  
Budget ₹1,500–₹3,500 for travel, food, and sightseeing.  

**Why It’s Worth Visiting:**  
Randha Falls is a perfect monsoon spectacle — combining scenic grandeur, calm lakes, and mountain freshness in one unforgettable destination.`,
    coordinates: { lat: 19.52, lng: 73.758 },
    image: "randha.jpg",
  },


    // Temples
  {
    name: "Trimbakeshwar Temple",
    location: "Nashik",
    category: "Temple",
    description: `**Historical Significance:**  
Trimbakeshwar Temple, located near Nashik, is one of the twelve sacred *Jyotirlingas* dedicated to Lord Shiva. Built in the 18th century by Peshwa Balaji Baji Rao, it sits at the origin of the Godavari River. The temple is said to mark the spot where Lord Shiva manifested himself as a column of fire, symbolizing the infinite. The black stone structure reflects classic Hemadpanti architectural style and is steeped in centuries of spiritual tradition.  

**What to See:**  
- The sacred Jyotirlinga representing Brahma, Vishnu, and Mahesh together.  
- The intricate carvings and sculpted domes of the temple complex.  
- The nearby Kushavarta Kund, the holy tank where the Godavari River emerges.  
- Religious rituals, Rudrabhishek ceremonies, and the holy fairs held during *Shravan* month.  

**Best Time to Visit:**  
November to February offers pleasant weather for exploration.  
Avoid peak monsoon (June–August) when heavy rainfall can disrupt travel.  

**Budget & How to Reach:**  
Located 28 km from Nashik city, accessible by car or local bus.  
Budget ₹1,000–₹3,000 for transport, offerings, and meals.  

**Why It’s Worth Visiting:**  
Trimbakeshwar is not just a temple — it’s a living spiritual hub that combines deep religious significance, ancient architecture, and the natural serenity of the Godavari’s birthplace.`,
    coordinates: { lat: 19.932, lng: 73.531 },
    image: "trimbakeshwar.jpg",
  },
  {
    name: "Siddhivinayak Temple",
    location: "Mumbai",
    category: "Temple",
    description: `**Historical Significance:**  
The Siddhivinayak Temple in Prabhadevi, Mumbai, is one of India’s most famous temples dedicated to Lord Ganesha. Built in 1801 by Deubai Patil, a childless woman who wished to bless others with fertility, the temple has since become a symbol of faith and hope. Over the years, it has been visited by millions, including celebrities and politicians, earning its place as one of Mumbai’s most sacred landmarks.  

**What to See:**  
- The iconic gold-plated idol of Lord Ganesha carved from a single black stone.  
- The inner sanctum adorned with intricate carvings and religious motifs.  
- Tuesday’s *Aarti* ceremonies, when the temple glows with lamps and chants.  
- The temple’s charitable trusts supporting social and educational initiatives.  

**Best Time to Visit:**  
Open year-round, but best visited early mornings or weekdays to avoid large crowds.  
Ganesh Chaturthi (August–September) sees the temple decorated in grand splendor.  

**Budget & How to Reach:**  
Located in central Mumbai, easily reachable by train, metro, or cab from any part of the city.  
Budget ₹500–₹1,000 for offerings and local transport.  

**Why It’s Worth Visiting:**  
Siddhivinayak Temple embodies devotion amid urban life — a place where spirituality and Mumbai’s vibrant energy blend seamlessly, drawing devotees from all walks of life.`,
    coordinates: { lat: 19.016, lng: 72.83 },
    image: "siddhivinayak.jpg",
  },
{
  name: "Grishneshwar Temple",
  location: "Ellora (Aurangabad)",
  category: "Temple",
  description: `**Historical & Religious Significance:**  
Grishneshwar (also spelled Ghushmeshwar) is one of the twelve Jyotirlinga shrines of Lord Shiva and sits close to the Ellora Caves. The temple’s current structure dates to the 18th century, but the site’s sanctity goes back much further in regional tradition.

**What to See:**  
- The sanctum with the Jyotirlinga and ornate stone carvings.  
- Close proximity to the Ellora cave complex — easy to combine both cultural visits.  
- Regular pujas and festivals that bring the temple alive, especially during Mahashivratri.

**Best Time to Visit:**  
October to March for comfortable weather. Mahashivratri is an important festival time.

**Budget & How to Reach:**  
About 30 km from Aurangabad; accessible by car or taxi. Combine with an Ellora day trip. Budget ₹1,000–₹3,000 for travel and entry/offerings.

**Why It’s Worth Visiting:**  
A Jyotirlinga site with compact, powerful spiritual presence and immediate access to one of India’s great rock-cut complexes.`,
  coordinates: { lat: 20.0220, lng: 75.1789 },
  image: "grishneshwar.jpg",
},
{
  name: "Tulja Bhavani Temple",
  location: "Tuljapur",
  category: "Temple",
  description: `**Historical & Cultural Significance:**  
Tulja Bhavani is one of Maharashtra’s most revered Devi shrines, dedicated to the fierce goddess Bhavani — the patron deity of the Marathas. The temple has been a focal point of regional faith for centuries and draws devotees year-round.

**What to See:**  
- The garbha griha with the powerful image of Goddess Tulja Bhavani.  
- Traditional aarti, processions and the bustling prasad/market area.  
- Local festivals and fairs that showcase regional folk culture.

**Best Time to Visit:**  
October to February for comfortable travel; Navratri and local festivals are peak times for pilgrimage.

**Budget & How to Reach:**  
Accessible from Solapur / Osmanabad by road (Tuljapur is well connected). Budget ₹800–₹2,000.

**Why It’s Worth Visiting:**  
A living center of devotion and Maratha cultural history — ideal for spiritual visitors and cultural travelers.`,
  coordinates: { lat: 18.0231, lng: 76.0556 },
  image: "tuljabhavani.jpg",
},
{
  name: "Mahalaxmi Temple (Kolhapur)",
  location: "Kolhapur",
  category: "Temple",
  description: `**Historical & Spiritual Significance:**  
Kolhapur’s Mahalaxmi (Ambabai) Temple is an ancient and powerful Shakti peeth, drawing pilgrims from across India. The temple architecture is classically Deccan and the shrine plays a central role in local religious life.

**What to See:**  
- The main shrine and the gold-plated ornamentation used by devotees.  
- Busy bazaars around the temple selling Kolhapuri chappals, sarees and sweets.  
- Major festivals like Navratri, when the temple and city are especially vibrant.

**Best Time to Visit:**  
October to March for comfortable sightseeing and festival visits.

**Budget & How to Reach:**  
Located in central Kolhapur, accessible by road and rail. Budget ₹800–₹2,000 including offerings and local shopping.

**Why It’s Worth Visiting:**  
A must-visit for devotees and cultural tourists — combines potent ritual life with rich local handicrafts and cuisine.`,
  coordinates: { lat: 16.6910, lng: 74.2446 },
  image: "kolhapurmahalaxmi.jpg",
},

{
  name: "Jivdani Mata Temple",
  location: "Virar",
  category: "Temple",
  description: `**Historical & Spiritual Significance:**  
The Jivdani Mata Temple, perched atop a hill in Virar, is one of Maharashtra’s most important shrines dedicated to Goddess Jivdani — believed to be a form of Goddess Adishakti. The temple’s name means “Goddess who gives life,” and it holds immense significance for devotees across the Vasai–Virar region. The shrine sits within an ancient cave where the goddess’s idol was discovered centuries ago, and the surrounding hills are rich with legends and local traditions.  

**What to See:**  
- The sacred idol of Goddess Jivdani in the cave sanctum, adorned with flowers and lamps.  
- 1,300 stone steps (or the modern ropeway) leading to panoramic views of Virar and the Arabian Sea.  
- The new marble temple structure, prayer halls, and resting shelters for pilgrims.  
- The vibrant Navratri festival, when thousands of devotees climb the hill in celebration.  

**Best Time to Visit:**  
October to March for comfortable weather and clear views.  
Navratri (September–October) is the most auspicious time but expect large crowds.  
Avoid peak monsoon when the steps can be slippery.  

**Budget & How to Reach:**  
Located about 1.5 km from Virar Railway Station (Western Line); autos and local buses available up to the temple base.  
Budget ₹300–₹1,000 for travel, offerings, and refreshments. Ropeway tickets cost extra (optional).  

**Why It’s Worth Visiting:**  
Jivdani Mata Temple combines faith, panoramic views, and light adventure — a sacred climb that rewards both the spirit and the senses, making it one of the must-visit temples near Mumbai.`,
  coordinates: { lat: 19.4624, lng: 72.8005 },
  image: "jivdani.jpg",
},

{
  name: "Khandoba Temple",
  location: "Jejuri",
  category: "Temple",
  description: `**Folk Devotion & Hilltop Shrine:**  
Jejuri’s Khandoba temple (on Parvati Hill) is a lively folk-shrine dedicated to Khandoba (a regional form of Shiva). Known for turmeric-splashed devotees and a distinctly Maharashtrian festive tone, Jejuri offers both ritual drama and panoramic hilltop views.

**What to See:**  
- The colorful main shrine, devotees with turmeric markings and the festival atmosphere.  
- Steps and viewpoints offering sweeping views of the surrounding plains.  
- Local stalls selling devotional items and snacks.

**Best Time to Visit:**  
October to February for comfortable climbing and festival visits; Somvati Amavasya and Champa Shashti are peak celebration days.

**Budget & How to Reach:**  
About 50 km from Pune city; accessible by road. Budget ₹500–₹1,800.

**Why It’s Worth Visiting:**  
A culturally distinctive temple experience uncommon outside Maharashtra — vivid, tactile and energetic.`,
  coordinates: { lat: 18.4042, lng: 73.8920 },
  image: "khandoba.jpg",
},
{
  name: "Bhuleshwar Temple",
  location: "Bhuleshwar ",
  category: "Temple",
  description: `**Ancient Temple with Fort Remains:**  
Bhuleshwar (near Pune) is a lesser-known but architecturally interesting Shiva temple situated on a hill with fort ruins and panoramic views. The site offers calm, history-rich exploration without crowds.

**What to See:**  
- The small but intricate sanctum and carved stonework.  
- Nearby fort remnants and hilltop viewing points.  
- Quiet walks and local village charm.

**Best Time to Visit:**  
October to March for pleasant exploration and trekking weather.

**Budget & How to Reach:**  
Short drive from Pune; ideal for half-day trips. Budget ₹500–₹1,200.

**Why It’s Worth Visiting:**  
A compact, peaceful temple-ruin site offering history, views and low-tourist crowds — ideal for reflective half-day visits.`,
  coordinates: { lat: 18.4750, lng: 73.8350 },
  image: "bhuleshwar.jpg",
},

   // Lakes
  {
    name: "Pawna Lake",
    location: "Lonavala",
    category: "Lake/River",
    description: `**Historical Significance:**  
Pawna Lake, located near Lonavala, is a man-made reservoir formed by the Pawna Dam built across the Pawna River. Over time, it has become one of Maharashtra’s most popular camping and weekend getaway destinations. The lake’s surroundings — including Lohagad, Tikona, and Tung forts — give it deep historical importance as it once supplied water to these Maratha strongholds.  

**What to See:**  
- Stunning sunrise and sunset views reflecting off the tranquil waters.  
- Lakeside camping sites offering bonfires, stargazing, and barbecue nights.  
- Nearby forts like Lohagad, Visapur, and Tikona, ideal for short treks.  
- Water activities like kayaking, paddle boating, and swimming.  

**Best Time to Visit:**  
October to March for clear skies and mild temperatures.  
Avoid the monsoon months (June–September) if you prefer dry conditions, though greenery peaks then.  

**Budget & How to Reach:**  
About 25 km from Lonavala and 60 km from Pune; easily reachable by car or bike.  
Budget ₹1,500–₹4,000 for travel, camping, and meals.  

**Why It’s Worth Visiting:**  
Pawna Lake combines relaxation and adventure perfectly — from peaceful waters to fort views and cozy campsites, it’s the ideal escape for couples, friends, and families alike.`,
    coordinates: { lat: 18.676, lng: 73.492 },
    image: "pawna.jpg",
  },
  {
    name: "Bhandardara Lake",
    location: "Ahmednagar",
    category: "Lake/River",
    description: `**Historical Significance:**  
Bhandardara Lake, also known as Arthur Lake, lies nestled in the Sahyadri ranges and is fed by the Wilson Dam built during British rule in 1910. The lake has long served as a serene retreat for nature enthusiasts and is surrounded by lush forests, waterfalls, and mountains steeped in Maratha history.  

**What to See:**  
- The tranquil blue waters perfect for boating and lakeside relaxation.  
- Wilson Dam, one of the oldest in India, offering breathtaking views of the valley.  
- Randha Falls and Umbrella Falls, which flow from the same water source.  
- Night camping with stargazing — the region has minimal light pollution.  

**Best Time to Visit:**  
October to March offers pleasant weather for camping and sightseeing.  
Monsoon (June–September) brings a different charm, with misty hills and roaring waterfalls.  

**Budget & How to Reach:**  
Located 180 km from Mumbai and 165 km from Pune; accessible via Igatpuri by road.  
Budget ₹2,000–₹5,000 for travel, food, and stay.  

**Why It’s Worth Visiting:**  
Bhandardara Lake offers a perfect mix of tranquility and natural beauty — whether it’s camping, photography, or simply unwinding by the water, it remains one of Maharashtra’s most peaceful retreats.`,
    coordinates: { lat: 19.531, lng: 73.758 },
    image: "bhandardara.jpg",
  },
{
  name: "Powai Lake",
  location: "Mumbai",
  category: "Lake/River",
  description: `**Urban Lake with Scenic Walks:**  
Powai Lake is a large artificial lake in suburban Mumbai, surrounded by Powai’s gardens, walking paths and residential skyline. It’s popular for morning walks, birdwatching and cityside sunset views.

**What to See:**  
- Lakeside promenades and early-morning birdlife (kingfishers, migratory ducks in season).  
- Scenic views framed by Powai’s skyline and the nearby Hiranandani neighbourhood.  
- Nearby cafes and easy urban amenities.

**Best Time to Visit:**  
October to March for comfortable mornings and clear skies.

**Budget & How to Reach:**  
Easily accessible within Mumbai by local transport; minimal costs for transport and refreshments.

**Why It’s Worth Visiting:**  
A relaxing urban green spot for city dwellers — useful for short escapes without leaving Mumbai.`,
  coordinates: { lat: 19.1186, lng: 72.9043 },
  image: "powailake.jpeg",
},
{
  name: "Mulshi Lake",
  location: "pune",
  category: "Lake/River",
  description: `**Reservoir & Hill Drive:**  
Mulshi Lake (fed by Mulshi Dam) offers a beautiful hill-backdrop reservoir, serene resorts, and scenic drives through the Sahyadris. It’s a popular short-break spot for Pune residents seeking water views and quiet stays.

**What to See:**  
- Wide reservoir views, verdant hills and dam infrastructure.  
- Lakeside resorts and short hikes to nearby viewpoints.  
- Sunrise/sunset reflections and monsoon mist.

**Best Time to Visit:**  
October to March for clear conditions; monsoon is spectacular but roads can be wet.

**Budget & How to Reach:**  
About 40–60 km from Pune depending on route; day trip or overnight stays at lakeside resorts. Budget ₹1,500–₹5,000.

**Why It’s Worth Visiting:**  
An accessible water escape from Pune with good resort options and scenic drives.`,
  coordinates: { lat: 18.5136, lng: 73.5254 },
  image: "mulshilake.jpg",
},

{
  name: "Khadakwasla Lake",
  location: "pune",
  category: "Lake/River",
  description: `**Reservoir with Fort Views:**  
Khadakwasla lake (Khadakwasla Dam / Khadakwasla Reservoir) lies below Sinhagad and offers beautiful reflections of the surrounding forts and hills. It’s a popular local spot for picnics, boathouses and lakeside drives.

**What to See:**  
- Wide reservoir views with Lohagad/Sinhagad silhouettes.  
- Boating in calmer seasons, lakeside evening walks, and local food stalls.  
- Great sunrise views and easy access from Pune city.

**Best Time to Visit:**  
October to March for clear skies; monsoon brings dramatic inflows and views.

**Budget & How to Reach:**  
Very close to Pune (under an hour by car); minimal local costs.

**Why It’s Worth Visiting:**  
A convenient and scenic lakeside destination combining fort views and easy access from Pune.`,
  coordinates: { lat: 18.4806, lng: 73.7660 },
  image: "khadakwasla.jpg",
},


    //  Hidden Gems
  {
    name: "Kaas Plateau",
    location: "Satara",
    category: "Hidden Gem",
    description: `**Historical Significance:**  
Kaas Plateau, often called the *“Valley of Flowers of Maharashtra,”* is a UNESCO World Heritage site known for its rich biodiversity. Located in the Sahyadri range, this lateritic plateau blooms into a vibrant carpet of wildflowers every monsoon. The plateau is home to over 850 species of flowering plants, many of which are endemic and protected by conservation efforts.  

**What to See:**  
- Fields of colorful wildflowers stretching across the plateau during monsoon.  
- Kaas Lake, surrounded by dense forests and misty hills.  
- Rare species like Smithia, Utricularia, and Karvi that bloom once every few years.  
- Nearby attractions like Sajjangad Fort and Thoseghar Falls.  

**Best Time to Visit:**  
Late August to early October — when the flowers are in full bloom. Entry is limited to preserve the ecosystem, so booking online is recommended.  

**Budget & How to Reach:**  
Around 25 km from Satara and 130 km from Pune.  
Budget ₹1,500–₹3,000 for transport, meals, and entry fees.  

**Why It’s Worth Visiting:**  
Kaas Plateau offers a once-in-a-lifetime natural spectacle — a living mosaic of colors that transforms with every monsoon.`,
    coordinates: { lat: 17.7, lng: 73.805 },
    image: "kaas.jpg",
  },
  {
    name: "Sandhan Valley",
    location: "Ahmednagar",
    category: "Hidden Gem",
    description: `**Historical Significance:**  
Sandhan Valley, also known as the *Valley of Shadows*, is one of India’s most thrilling canyons located near Bhandardara. Carved naturally between the Ratangad and Kalsubai mountains, it’s famous for its narrow rock formations and adventure treks that blend geology with history.  

**What to See:**  
- The 2 km-long deep gorge surrounded by towering cliffs.  
- Rappelling, rock climbing, and overnight camping under starlit skies.  
- Panoramic views of nearby forts like Ratangad and Alang-Madan-Kulang.  
- The natural interplay of sunlight and shadow within the valley walls.  

**Best Time to Visit:**  
November to February for trekking-friendly weather and clear skies.  

**Budget & How to Reach:**  
Located 190 km from Mumbai and 170 km from Pune via Bhandardara.  
Budget ₹2,000–₹4,000 for travel, guide, and camping.  

**Why It’s Worth Visiting:**  
A paradise for thrill-seekers — Sandhan Valley combines breathtaking landscapes, adventure sports, and a sense of raw wilderness that few places can match.`,
    coordinates: { lat: 19.51, lng: 73.739 },
    image: "sandhan.jpg",
  },
  {
    name: "Chandoli National Park",
    location: "Sangli",
    category: "Hidden Gem",
    description: `**Historical Significance:**  
Chandoli National Park is a UNESCO-recognized World Heritage Site forming part of the Sahyadri Tiger Reserve. It was once a stronghold of the Maratha Empire, with ruins of Prachitgad and Bhairavgad Forts hidden deep within the forest. Today, it stands as a sanctuary for rare flora and fauna, showcasing the untouched beauty of the Western Ghats.  

**What to See:**  
- Dense evergreen forests and waterfalls like Maharkhor and Kandati.  
- Wildlife such as leopards, bison, sambar deer, and giant squirrels.  
- Ruins of Maratha-era forts scattered within the forest.  
- Jungle safaris, birdwatching, and scenic viewpoints overlooking the Krishna River valley.  

**Best Time to Visit:**  
October to February for pleasant weather and best chances of spotting wildlife.  

**Budget & How to Reach:**  
About 75 km from Sangli and 210 km from Pune.  
Budget ₹2,000–₹5,000 including safari, transport, and meals.  

**Why It’s Worth Visiting:**  
Chandoli is Maharashtra’s wild secret — a blend of natural beauty, history, and biodiversity that remains blissfully untouched by heavy tourism.`,
    coordinates: { lat: 17.066, lng: 73.866 },
    image: "chandoli.jpg",
  },
  {
    name: "Amboli Ghat",
    location: "Sindhudurg",
    category: "Hidden Gem",
    description: `**Historical Significance:**  
Amboli Ghat, tucked away in the Sindhudurg district, is a misty hill station often called the *“Cherrapunji of Maharashtra.”* Situated at an altitude of 2,200 feet, it’s one of the last eco-hotspots of the Western Ghats and holds historical significance as part of the ancient trade route between coastal Konkan and inland Deccan.  

**What to See:**  
- Endless waterfalls and viewpoints like Amboli Falls and Sunset Point.  
- Hiranyakeshi Temple and cave where the Hiranyakeshi River originates.  
- Dense misty forests teeming with rare amphibians and orchids.  
- The serpentine Amboli Ghat road offering cinematic monsoon views.  

**Best Time to Visit:**  
June to September for misty weather and gushing waterfalls.  
October to February for cool, pleasant trekking conditions.  

**Budget & How to Reach:**  
Located 30 km from Sawantwadi and 80 km from Belgaum.  
Budget ₹1,500–₹3,500 for travel, food, and stay.  

**Why It’s Worth Visiting:**  
Amboli is pure monsoon magic — an unexplored paradise for nature lovers, photographers, and anyone seeking solitude in the clouds.`,
    coordinates: { lat: 15.958, lng: 74.006 },
    image: "amboli.jpg",
  },
  {
    name: "Tamhini Ghat",
    location: "Mulshi",
    category: "Hidden Gem",
    description: `**Historical Significance:**  
Tamhini Ghat, a scenic mountain pass connecting Mulshi and the Konkan coast, has been a natural trade route for centuries. Surrounded by the Sahyadri ranges, it transforms into a lush wonderland during monsoon — covered in mist, waterfalls, and emerald hills.  

**What to See:**  
- Countless waterfalls cascading by the roadside during monsoon.  
- Mulshi Dam and nearby viewpoints offering panoramic valley views.  
- Hidden trails, picnic spots, and small temples along the drive.  
- A soothing, cloud-covered drive perfect for bikers and photographers.  

**Best Time to Visit:**  
June to September for misty monsoon weather and overflowing waterfalls.  

**Budget & How to Reach:**  
Located 55 km from Pune and 150 km from Mumbai via the Mulshi route.  
Budget ₹1,000–₹2,500 for travel and food.  

**Why It’s Worth Visiting:**  
Tamhini Ghat offers one of Maharashtra’s most scenic drives — a peaceful retreat into nature where every turn reveals a waterfall or a misty forest view.`,
    coordinates: { lat: 18.452, lng: 73.43 },
    image: "tamhini.jpg",
  },


{
  name: "Kalsubai Peak",
  location: "Akole (Ahmednagar)",
  category: "Hidden Gem",
  description: `**Highest Point in Maharashtra:**  
Kalsubai is the state’s highest peak and a classic Sahyadri trek. The summit houses a small temple and rewards trekkers with panoramic Western Ghats vistas, rare wildflowers, and (in season) dawn clouds rolling across the ridgelines.  

**What to See:**  
- Sunrise from the summit — unparalleled vistas across the Kalsubai-Harishchandragad sanctuary.  
- Seasonal wildflowers and endemic birds; excellent vantage points for photographers.  
- Small shrine at the top and narrow rock sections that add a little scrambling fun.  

**Best Time to Visit:**  
October to February for clear skies; monsoon (June–Sept) turns the route lush but slippery — go prepared.  

**Budget & How to Reach:**  
Nearest base is Bhandardara / Bari village approach via Akole — accessible by road from Ahmednagar/Pune. Day trek budget ~₹800–₹2,000.  

**Why It’s Worth Visiting:**  
It’s Maharashtra’s “Everest” — accessible, satisfying, and scenically spectacular for trekkers of moderate experience.`,
  coordinates: { lat: 19.6003, lng: 73.7111 },
  image: "kalsubai.jpg",
},


{
  name: "Harishchandragad",
  location: "Ahmednagar",
  category: "Hidden Gem",
  description: `**Classic Adventure & Ancient Caves:**  
Harishchandragad is a rugged Sahyadri plateau famed for its steep climbs, ancient temples and the Konkan Kada (a dramatic cliff). The fort and caves combine thrill, archaeology and wide hilltop vistas.  

**What to See:**  
- Konkan Kada cliff (breathtaking viewpoint) and the ancient Harishchandreshwar temple.  
- Kedareshwar cave with a natural Shiva linga and a seasonal waterfall near the cave entrance.  
- Long ridge treks and starry nights for campers.  

**Best Time to Visit:**  
November to February for safe trekking and clear skies. Monsoon offers waterfalls but can close trails.  

**Budget & How to Reach:**  
Trailheads near Khireshwar village; accessible by road from Pune/Ahmednagar. Plan ₹1,000–₹3,000 for a trek weekend.  

**Why It’s Worth Visiting:**  
Perfect blend of technical trekking, sacred sites, and dramatic Sahyadri scenery — a favorite among experienced trekkers.`,
  coordinates: { lat: 19.3882, lng: 73.7759 },
  image: "harishchandragad.jpg",
},


{
  name: "Matheran",
  location: "Raigad",
  category: "Hidden Gem",
  description: `**Automobile-free Hill Station:**  
Matheran is a compact, colonial-era hill station famous for being strictly vehicle-free — travel is by foot, horseback or hand-pulled rickshaw. Its toy-train heritage, easy trails and dozens of viewpoints make it a peaceful escape from city life.

**What to See:**  
- Panorama Points (Porcupine, Panorama, Echo Point) for sunrise/sunset.  
- Toy train (Neral–Matheran narrow-gauge) and quaint market streets.  
- Short forest walks, small waterfalls in monsoon and vintage colonial bungalows.

**Best Time to Visit:**  
October to February for clear days; monsoon (June–Sept) turns the hillset lush and dramatically misty (take care on trails).  

**Budget & How to Reach:**  
About 90 km from Mumbai; reachable via Neral by train/road. Day-trip or overnight; budget ~₹1,000–₹3,000.  

**Why It’s Worth Visiting:**  
A rare quiet hill experience near Mumbai/Pune with easy walks, viewpoints and an old-school hill-station charm.`,
  coordinates: { lat: 18.9870, lng: 73.2709 },
  image: "matheran.jpg",
},
{
  name: "Mahabaleshwar",
  location: "Satara",
  category: "Hidden Gem",
  description: `**Famous Plateau & Viewpoint Hub:**  
Mahabaleshwar is a classic Sahyadri plateau known for sweeping viewpoints, strawberry farms, cool weather and cultural sites. It’s ideal for family trips, short treks and scenic drives across the Western Ghats.

**What to See:**  
- Arthur’s Seat, Kate’s Point, and Wilson Point for epic vistas.  
- Strawberry farms, local markets and the ancient Mahabaleshwar temple.  
- Lingmala and Chinaman’s Falls and short nature walks.

**Best Time to Visit:**  
October to February for crisp weather; monsoon (June–Sept) offers dramatic greenery.  

**Budget & How to Reach:**  
About 120 km from Pune; well-connected by road. Weekend budgets typically ₹2,000–₹6,000 depending on stay and activities.  

**Why It’s Worth Visiting:**  
A versatile hill retreat combining viewpoints, local produce (strawberries) and accessible nature trails — great for families and couples.`,
  coordinates: { lat: 17.9230, lng: 73.6590 },
  image: "mahabaleshwar.jpg",
},
{
  name: "Panchgani",
  location: "Satara",
  category: "Hidden Gem",
  description: `**Tableland & Adventure-Friendly Plateau:**  
Panchgani’s broad Table Land is among the highest plateaus in Asia. It offers paragliding, easy walks, viewpoints and a pleasant colonial atmosphere. Close to Mahabaleshwar yet distinctive in its flat, open vistas.

**What to See:**  
- Table Land for sunrise walks and paragliding.  
- Sydney Point, Mapro Garden (strawberry-based treats) and scenic drives to nearby villages.  
- Gentle trails and viewpoints overlooking the Krishna valley.

**Best Time to Visit:**  
October to February for comfortable weather; monsoon for lush vistas.  

**Budget & How to Reach:**  
Well connected by road from Pune and Mumbai; day trips or weekend resort stays common. Budget ~₹1,500–₹4,000.  

**Why It’s Worth Visiting:**  
Easy-access plateau with family-friendly activities and beautiful wide-open views — a mellow counterpoint to steeper Sahyadri treks.`,
  coordinates: { lat: 17.9233, lng: 73.8200 },
  image: "panchgani.jpg",
},


{
  name: "Chalkewadi Windmill Plateau",
  location: "Satara",
  category: "Hidden Gem",
  description: `**Iconic Windmill Landscape:**  
Chalkewadi is a wide, breezy plateau famous for its hundreds of wind turbines set against Sahyadri backdrops — an unusual and photogenic landscape in Maharashtra.

**What to See:**  
- Vast rows of windmills with dramatic sunrise & sunset photography.  
- Nearby small temples and village routes for quiet exploration.  
- Seasonal wildflowers and open-air picnic spots.

**Best Time to Visit:**  
October to March for clear skies and comfortable visits; monsoon adds lushness but can be misty.  

**Budget & How to Reach:**  
Accessible from Satara/Talpadeh region by road. Low-cost day visit or en-route stop on longer Sahyadri drives.  

**Why It’s Worth Visiting:**  
Unique visual landscape — excellent for photography and quiet countryside drives away from crowds.`,
  coordinates: { lat: 17.6703, lng: 73.9978 },
  image: "chalkewadi.jpg",
},


{
  name: "Sawantwadi",
  location: "Sindhudurg",
  category: "Hidden Gem",
  description: `**Craft Town & Cultural Gateway to Konkan:**  
Sawantwadi is known for its wooden handicrafts, royal palace, and proximity to Konkan coastal circuits. It’s a good base for cultural exploration and quieter coastal trips.

**What to See:**  
- Sawantwadi Palace and palace museum, local woodcraft workshops.  
- Nearby beaches and small Konkan hamlets.  
- Traditional Konkani cuisine and weekly markets.

**Best Time to Visit:**  
October to March for coastal comfort; monsoon for lush greenery.  

**Budget & How to Reach:**  
Accessible from Sindhudurg / Ratnagiri by road and rail; budget ~₹1,500–₹4,000 depending on travel and stays.  

**Why It’s Worth Visiting:**  
A cultural stop that connects crafts, palace history and peaceful Konkan routes — excellent for travelers who appreciate local make and slow tourism.`,
  coordinates: { lat: 15.8666, lng: 73.7853 },
  image: "sawantwadi.jpg",
},


];

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await Destination.deleteMany({});
    console.log("Old destinations cleared");

    for (const dest of destinations) {
      const newDest = await Destination.create(dest);
      console.log("Added:", newDest.name);
    }

    console.log("Seeding complete");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
})();
