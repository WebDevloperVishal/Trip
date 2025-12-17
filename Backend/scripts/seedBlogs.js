// scripts/seedBlogs.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "../models/blog.model.js";

dotenv.config();

const baseBlogs = [
  {
    title: "Exploring Forts of Maharashtra",
    content: `Maharashtra, the land of valiant warriors and timeless heritage, is home to more than 350 majestic forts that reflect the state’s glorious past. These forts—nestled atop the rugged peaks of the Sahyadri range, along its sun-drenched coastlines, and deep inside verdant forests—stand as silent witnesses to centuries of military genius, cultural evolution, and architectural brilliance. From Chhatrapati Shivaji Maharaj’s hill forts that exude Maratha pride to coastal citadels that guarded trade routes, every stone carved into these fortresses narrates an inspiring tale of courage, innovation, and devotion.

A Legacy Etched in Stone  
The history of Maharashtra’s fortifications stretches across dynasties—the Mauryas, Chalukyas, Yadavas, Mughals, and most notably, the Marathas. Yet, it was under the visionary rule of Shivaji Maharaj that fort architecture reached its zenith. His guerrilla warfare strategies, known as Ganimi Kava, made forts the lifeblood of the Maratha Empire’s defense network. Each fort, from Raigad to Sinhagad, Pratapgad, and Torna, was strategically situated to ensure maximum control over trade routes and regional administration. These fortresses became symbols of independence and resistance against large invading empires.

Walking through the gateways of Raigad Fort, where Shivaji Maharaj was crowned in 1674, one can feel a deep connection with India’s heroic past. The fort’s marketplace, royal quarters, and panoramic views from Takmak Tok evoke the zest and determination of a kingdom that once stood defiantly against the most powerful armies of its time.

Diversity of Design and Purpose  
Maharashtra’s forts are as varied as the state’s geography. They broadly fall into three categories: Hill Forts (Giri-Durg), Sea Forts (Jal-Durg), and Forest Forts (Van-Durg). Hill forts like Rajgad, Sinhagad, and Torna perch dramatically above valleys, blending seamlessly with the rugged terrain. Their natural elevation served as a strong defense while offering 360-degree vantage views.

Sea forts like Sindhudurg, Janjira, and Kolaba were masterpieces of naval architecture, built to guard the Konkan coast from foreign invaders. For instance, Sindhudurg, constructed in the 16th century by Shivaji Maharaj himself, is an engineering marvel set on a rocky island. Its secret entrance, freshwater wells, and bastions capable of mounting cannons show extraordinary foresight.

Forest forts such as Vasota and Bhairavgad remain hidden deep within thick greenery, often accessible only by trekking trails. They provided refuge and secrecy for Maratha soldiers during ambush warfare, demonstrating nature’s harmonious role in the state’s defensive strategy.

Architectural Genius and Innovation  
The engineering of Maharashtra’s forts demonstrates ancient India’s understanding of terrain, hydrology, and acoustics. Many forts feature concentric walls, curved entryways, and gateways placed at sharp angles to confuse invaders using elephants or battering rams. Ingeniously designed water cisterns ensured year-round supply, even during sieges. Bastions were often equipped with “machicolations”—openings through which defenders poured hot oil or shot arrows at enemies.

Daulatabad Fort, originally known as Devagiri, is one of the finest examples of advanced military engineering. Its maze-like dark passage (Andheri) was devised to trap intruders, while its 40-foot-deep moat once housed alligators to prevent invasions. Even today, it stands resilient on a conical hill near Aurangabad, illustrating the tactical acumen and architectural foresight of medieval Maharashtra.

Legends, Treks, and Modern Appeal  
Today, these forts are more than just historical ruins—they are thriving destinations for trekkers, history enthusiasts, and photographers. Sinhagad Fort, near Pune, provides easy access for families, offering scenic treks and tantalizing local delicacies like pithla bhakri at the summit. Rajgad and Harishchandragad attract seasoned hikers seeking overnight adventures through misty trails, while Lohagad caters perfectly to beginners wanting panoramic monsoon views of the Western Ghats.

Fort tourism in Maharashtra has experienced a significant revival, with efforts to preserve their authenticity while enhancing visitor safety and learning experiences. Guided heritage walks, light-and-sound shows, and local community-based tourism initiatives are helping keep these cultural treasures alive for future generations.

Spiritual and Cultural Connection  
Beyond their military and architectural grandeur, Maharashtra’s forts hold an enduring spiritual aura. Many enshrine temples—like the Bhavani Temple in Pratapgad or the Hanuman shrines in Rajgad—where warriors prayed before battles. These sites transcend mere historical importance; they represent Maharashtra’s soul—its resilience, self-respect, and faith.

Best Time to Visit  
For travelers planning to explore these monumental marvels, the best time is between October and February, when the climate remains pleasant. The monsoon months from July to September reveal another perspective—the forts enveloped in lush greenery and mist, creating surreal visual poetry across the Sahyadri skyline.

Conclusion  
Exploring the forts of Maharashtra is not just a journey through ancient walls—it’s a pilgrimage through India’s living history. Every fortress, whether majestic or modest, echoes the enduring courage of those who built and defended them. From the sea-breeze whispers at Sindhudurg to the cloud-draped peaks of Rajgad, these architectural marvels invite travelers to pause, reflect, and admire the legacy of a civilization that believed in courage, culture, and craftsmanship above all.`,
    category: "Culture",
    image: "fort.jpg",
    isApproved: true,
  },


  {
    title: "Hidden Beaches of Konkan",
    content: `The Konkan coastline, stretching elegantly along the Arabian Sea, is Maharashtra’s hidden gem—a tranquil stretch of golden sands, turquoise waves, and untouched beauty. Unlike the crowded beaches of Goa, Konkan offers solitude wrapped in scenic charm and cultural authenticity. From the unspoiled shores of Diveagar to the crystal-clear waters of Tarkarli, each beach here feels like a secret whisper from nature.

A Coastal Paradise  
Konkan’s charm lies in its balance of serenity and simplicity. Dotted with coconut groves, fishing villages, and ancient temples, the region captures the soul of rural Maharashtra. Diveagar’s shimmering sands and the famous Suvarna Ganesh Temple attract both pilgrims and peace seekers. Velneshwar, known for its calm waters, is perfect for swimming and watching breathtaking sunsets.

Further south, Tarkarli beckons adventure lovers with scuba diving, snorkeling, and parasailing. The coral reefs here are among the clearest in India, revealing colorful marine life beneath the surface. Guhagar, meanwhile, remains one of the most untouched beaches, lined with pristine stretches of sand and casuarina trees swaying in the breeze.

Local Culture and Cuisine  
No trip to Konkan is complete without tasting its rich coastal cuisine. Freshly caught fish cooked in tangy Malvani masalas, coconut curries, and solkadhi (a pink drink made from kokum and coconut milk) define the region’s flavors. Local homes often serve food on banana leaves, preserving age-old traditions. Beachside shacks offer delicious seafood thalis that make every meal a memory.

Forts like Sindhudurg and Vijaydurg add historical grandeur to the coastline. Built by Chhatrapati Shivaji Maharaj, these sea forts served as naval strongholds. Standing amid the roaring waves, they offer panoramic views and stories of maritime might.

Festivals and Folklore  
Konkan’s calendar is alive with color and devotion. Ganesh Chaturthi, celebrated with unmatched enthusiasm, sees idols of Lord Ganesha immersed into the sea amid chanting and fireworks. Local festivals like Narali Purnima honor the sea gods, symbolizing the deep bond between Konkan’s people and the ocean.

Best Time to Visit  
The best time to explore Konkan beaches is from November to February, when the air is cool, and the sea is calm. However, monsoon travelers can enjoy lush greenery, waterfalls, and misty seascapes that transform the coastline into a poetic escape.

Conclusion  
The hidden beaches of Konkan are not merely destinations—they are experiences of serenity and simplicity. They invite you to slow down, breathe deeply, and reconnect with nature’s rhythm. Whether you’re watching dolphins leap at Tarkarli, walking barefoot on Diveagar’s sands, or listening to waves crash against Sindhudurg’s walls, the Konkan coast will always whisper—“stay a little longer.”`,
    category: "Nature",
    image: "konkanbeaches.jpg",
    isApproved: true,
  },

  {
    title: "Top Waterfalls to Visit During Monsoon",
    content: `When monsoon clouds descend upon Maharashtra, the landscape transforms into a lush green paradise dotted with cascading waterfalls. The rhythmic downpour awakens rivers, fills reservoirs, and births magnificent waterfalls that flow with unmatched power and grace. For travelers and photographers alike, these natural spectacles offer a visual symphony of mist, motion, and magic.

The Majestic Roar of Thoseghar Falls  
Located near Satara, Thoseghar Falls is among Maharashtra’s tallest and most breathtaking. The main waterfall plunges from a height of nearly 500 meters into a deep gorge, surrounded by thick forests. During heavy rainfall, the sound of rushing water echoes across the valley, creating an awe-inspiring spectacle. A nearby viewpoint allows visitors to safely admire its grandeur while enveloped in clouds of mist.

Amboli Ghat – The Waterfall Capital  
Amboli, often called the “Cherrapunji of Maharashtra,” boasts dozens of waterfalls tumbling from emerald cliffs. The main Amboli Falls becomes a roaring torrent, attracting thousands of tourists every monsoon. Small roadside streams and hidden cascades enhance the experience for travelers who love unplanned stops and photography.

Randha Falls and Bhandardara  
In Ahmednagar district lies Randha Falls, where the Pravara River plunges 170 feet into a deep gorge, feeding the Bhandardara Dam below. The lush hills, the sound of gushing water, and cool mist make this spot ideal for monsoon picnics. Bhandardara itself is a serene lakeside destination, offering boating, camping, and views of the Wilson Dam.

Offbeat Beauties: Dugarwadi and Vihigaon  
Dugarwadi Falls near Nashik remains one of the least explored yet most enchanting spots. Reaching it requires a short trek through forests, making it a hidden treasure for nature enthusiasts. Similarly, Vihigaon Falls in Igatpuri has become a favorite for adventure seekers, thanks to its rappelling activities amidst rain-soaked cliffs.

Travel Tips and Best Time  
Monsoon (June–September) is the best season to witness these waterfalls in full bloom. However, travelers must carry rain gear, wear non-slip footwear, and maintain caution on slippery paths. Morning visits often offer the clearest views before the mist thickens.

Conclusion  
Maharashtra’s waterfalls are not just nature’s marvels—they are moments of calm amid chaos. Standing before their thunderous beauty, one realizes how deeply nature connects to human emotion. For anyone seeking to experience the monsoon in its purest form, these waterfalls promise not just a view, but a feeling—of peace, wonder, and awe.`,
    category: "Adventure",
    image: "dugarwadiwaterfall.jpg",
    isApproved: true,
  },

  
    {
    title: "A Guide to Temples of Nashik",
    content: `Nashik, nestled along the sacred banks of the Godavari River, stands as one of Maharashtra’s most spiritual and historically rich cities. Known for its blend of mythology, devotion, and architectural splendor, Nashik invites pilgrims and travelers alike to explore its timeless temples, where every stone echoes with chants of faith and stories of gods.

A City of Divine Origins  
According to Hindu mythology, Nashik derives its name from “Nasika,” meaning nose. Legend says that during Lord Rama’s exile, Shurpanakha’s nose was cut off here, marking Nashik as a place of divine retribution and redemption. Today, this mythological significance blends with centuries of devotion that make Nashik a living canvas of India’s spiritual heritage.

Trimbakeshwar – The Sacred Jyotirlinga  
Located about 28 km from the city, Trimbakeshwar Temple is one of the twelve Jyotirlingas dedicated to Lord Shiva. Nestled at the foothills of the Brahmagiri Mountains, the temple’s black basalt structure radiates serenity and devotion. It marks the origin of the Godavari River, often called the “Ganga of the South.” The Shiva lingam here uniquely represents the trinity—Brahma, Vishnu, and Mahesh—signifying cosmic balance.

Pilgrims visit not just to pray, but to perform rituals like Narayan Nagbali and Kalsarpa Shanti, which are believed to liberate souls from ancestral sins. The rhythmic sound of temple bells, echoing chants, and the tranquil setting together create a divine experience.

Kalaram Temple – A Testament of Faith  
In the heart of Panchavati lies the Kalaram Temple, dedicated to Lord Rama. Built in the 18th century using black stone, it houses a striking black idol of Rama, hence the name “Kalaram.” The temple’s towering spires and intricate carvings reflect Maratha craftsmanship and devotion. It holds immense historical importance as it was a focal point during India’s Dalit movement when Dr. B.R. Ambedkar led a satyagraha here in 1930, advocating temple entry for all castes.

Saptashrungi Devi Temple – The Goddess of the Seven Hills  
About 60 km from Nashik, perched high on a mountain, is the temple of Goddess Saptashrungi Devi. The climb of 500 steps to reach the shrine is a spiritual journey in itself. Devotees believe that the goddess fulfills the wishes of all who pray with a pure heart. The panoramic views from the temple, combined with the serene chants of “Jai Mata Di,” offer a divine retreat amid nature.

Other Temples Worth Visiting  
Muktidham, a marble temple complex in Nashik Road, features replicas of the 12 Jyotirlingas and the temples of major Hindu deities, allowing pilgrims to experience pan-Indian sanctity in one place. The Naroshankar Temple, standing proudly along the Godavari ghats, is an architectural gem from the 18th century known for its bell that once symbolized victory in battles.

Festivals and Spiritual Vibes  
Nashik’s spirituality peaks during the Kumbh Mela, held once every 12 years, attracting millions of devotees who bathe in the Godavari to attain moksha (liberation). The city becomes a living river of faith, with saffron-clad sadhus, hymns, and rituals transforming it into a cosmic gathering of souls.

Best Time to Visit  
October to February offers pleasant weather, ideal for exploring temples. During festivals like Mahashivratri and Ram Navami, the city vibrates with lights, processions, and devotion—making it an unforgettable spiritual experience.

Conclusion  
Nashik’s temples aren’t just places of worship—they’re living monuments of faith, art, and culture. Walking through their ancient corridors feels like traversing centuries of devotion, where every prayer adds a whisper to the city’s sacred rhythm. A journey to Nashik isn’t just a pilgrimage—it’s an awakening.`,
    category: "Culture",
    image: "saptashuringi.jpg",
    isApproved: true,
  },

  {
    title: "Trekking the Sahyadris",
    content: `The Sahyadri mountain range, also known as the Western Ghats, stretches like a mighty backbone across Maharashtra—lush, rugged, and eternally inviting. For trekkers, it’s not just a range of hills; it’s a realm of discovery, history, and adventure.

A Mountain Range of Myths and Majesty  
Home to ancient forts, hidden waterfalls, and sacred caves, the Sahyadris have long fascinated explorers. The terrain is a mix of steep cliffs, dense forests, and plateaus shrouded in mist. During monsoons, they transform into a dreamscape where clouds drift at eye level and every trail smells of wet earth and wildflowers.

Famous Treks in the Sahyadris  
1. **Harishchandragad** – Known for the Konkan Kada cliff, which drops dramatically into the Konkan plains. The fort’s ancient caves and the Kedareshwar temple make it a perfect blend of nature and spirituality.  
2. **Rajmachi Fort** – A moderate trek near Lonavala with twin fortresses (Shrivardhan and Manaranjan) and panoramic views of waterfalls and valleys. Ideal for both beginners and night trekkers.  
3. **Kalsubai Peak** – Standing tall at 5,400 ft, Kalsubai is Maharashtra’s highest peak. The iron ladders and flower-strewn paths lead to views that make every step worth it.  
4. **Torna Fort** – The first fort captured by Shivaji Maharaj, Torna offers steep climbs, historical ruins, and majestic views of the Sahyadris.  

Monsoon Magic  
From June to September, the range becomes a paradise. Streams trickle across trails, the valleys glow emerald, and waterfalls cascade from every cliff. Trekkers often pause mid-climb to witness the dance of clouds swirling around ancient bastions.

Adventure and Conservation  
The Sahyadris are not just a trekker’s playground but also a UNESCO World Heritage site known for its biodiversity. Endangered species like the Malabar civet and Indian giant squirrel call these forests home. Trekkers are encouraged to follow eco-friendly practices, ensuring the preservation of this living wonder.

Best Time to Trek  
While monsoon treks are magical, October to February offers safer, clearer trails with cool weather. Carry proper footwear, hydration packs, and always trek with local guides if you’re new to the region.

Conclusion  
Trekking the Sahyadris is more than an outdoor pursuit; it’s a spiritual journey into the heart of Maharashtra. Every sunrise atop a fort and every breeze through the valleys tells stories of warriors, sages, and dreamers. Once you’ve conquered a Sahyadri peak, you don’t just return home with memories—you return with a piece of its soul.`,
    category: "Adventure",
    image: "sahyadris.jpg",
    isApproved: true,
  },

  {
    title: "Camping Near Pawna Lake",
    content: `Pawna Lake, a serene reservoir near Lonavala, is one of Maharashtra’s most beloved camping destinations. Surrounded by the towering forts of Lohagad, Tikona, and Tung, it offers a magical escape where tranquility meets adventure.

A Lakeside Haven  
As dusk settles over the lake, the horizon glows orange, and reflections of distant hills shimmer on the water’s surface. The soft crackle of bonfires, laughter of campers, and twinkling stars above create an atmosphere that feels worlds away from city life.

Activities and Experiences  
Pawna isn’t just about relaxing by the water—it’s about living in the moment. Campers can enjoy kayaking, speed boating, paragliding, or exploring nearby forts. Nighttime brings acoustic music sessions, barbecue dinners, and stargazing under an unpolluted sky.

Eco-friendly and Community-Driven  
Many local villagers now run campsites around Pawna, offering sustainable tourism experiences. Visitors are encouraged to respect nature by minimizing plastic waste and maintaining the lake’s purity.

Best Time to Visit  
The best months are between October and March, when the weather is cool and pleasant. Monsoon visits are equally beautiful, though camps may be slippery and windy.

Conclusion  
Camping at Pawna Lake is not just a weekend retreat—it’s a reminder that peace lies in simplicity. Whether you’re watching the sunrise with a cup of chai or gazing at constellations beside a bonfire, Pawna teaches you to pause, breathe, and just be.`,
    category: "Nature",
    image: "pawna.jpg",
    isApproved: true,
  },

];

const blogs = baseBlogs.map((b) => ({
  ...b,
  author: null,
  authorModelType: "Captain",
}));

console.log("Prepared Blogs:", blogs.map((b) => b.authorModelType));

(async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("Connected to MongoDB");

    await Blog.deleteMany();
    console.log("Old blogs cleared");

    await Blog.insertMany(blogs);
    console.log("Blogs seeded successfully");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding blogs:", err);
    process.exit(1);
  }
})();
