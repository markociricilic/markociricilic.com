"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import Link from "next/link"

const Dithering = dynamic(() => import("@paper-design/shaders-react").then(m => ({ default: m.Dithering })), { ssr: false })
import { ImageCarousel } from "@/components/image-carousel"
import { MusicPlayer } from "@/components/music-player"

// To get a Spotify track ID: open the track on Spotify → Share → Copy link
// The ID is the part after /track/ and before the ?  e.g. https://open.spotify.com/track/TRACK_ID?si=...
const musicItems = [
  {
    title: "aisatsana [102]",
    artist: "Aphex Twin",
    album: "Syro",
    spotifyTrackId: "5ljMlD10En5rRGZU0cs2Np",
  },
  {
    title: "...",
    artist: "⣎⡇ꉺლ༽இ•̛)ྀ◞ ༎ຶ ༽ৣৢ؞ৢ؞ؖ ꉺლ",
    album: "...",
    spotifyTrackId: "4BGGy5uWeAl7SfAa28Hacv",
  },
  {
    title: "Immigrant",
    artist: "Sade",
    album: "Lovers Rock",
    spotifyTrackId: "2lijdOYNAjF8y7hRJQJNCx",
  },
  {
    title: "Make Me Yours",
    artist: "Bettye Swann",
    album: "Make Me Yours",
    spotifyTrackId: "4vjIH6ddtqnUfGUET1cJaQ",
  },
  {
    title: "Sway",
    artist: "Bic Runga",
    album: "Drive",
    spotifyTrackId: "35PYCZLdGi3gRMdA26dZ59",
  },
  {
    title: "Slow",
    artist: "Rumer",
    album: "Seasons Of My Soul",
    spotifyTrackId: "1OMRoJR1N6xnqCW6m5lQzc",
  },
  {
    title: "I Walk A Little Faster",
    artist: "Fiona Apple",
    album: "The Best Is Yet To Come",
    spotifyTrackId: "0YcNShIOj5rIxzA0yLbMve",
  },
  {
    title: "More Than This",
    artist: "10,000 Maniacs",
    album: "Love Among the Ruins",
    spotifyTrackId: "5v6b9RUk83Z33shcsqt1m3",
  },
  {
    title: "Let Me Live In Your City - Work In Progress",
    artist: "Paul Simon",
    album: "There Goes Rhymin' Simon",
    spotifyTrackId: "0lImSLCWoi9V1PxldVsFYq",
  },
  {
    title: "Packt Like Sardines In a Crushd Tin Box",
    artist: "Radiohead",
    album: "Amnesiac",
    spotifyTrackId: "0tDn82XkoueVV5q9G7OUAv",
  },
  {
    title: "Clementine",
    artist: "Elliott Smith",
    album: "Elliott Smith",
    spotifyTrackId: "1pTwsLvnN8xPULDGzRjnfd",
  },
  {
    title: "Place To Be",
    artist: "Nick Drake",
    album: "Pink Moon",
    spotifyTrackId: "5QUeSXjTMHbq1fW5da2waF",
  },
  {
    title: "Wicked Game",
    artist: "Chris Isaak",
    album: "Heart Shaped World",
    spotifyTrackId: "7w5AOd6HrDIHewHfpABEss",
  },
  {
    title: "Imaginary Folklore",
    artist: "Nujabes feat. clammbon",
    album: "2nd Collection",
    spotifyTrackId: "7xNpCuqDKASx2f64nkhzNm",
  },
  {
    title: "QUOI",
    artist: "POiSON GiRL FRiEND",
    album: "MELTING MOMENT",
    spotifyTrackId: "6xEFdEc2v14roRuwBR3lyn",
  },
  {
    title: "Mad About You",
    artist: "Hooverphonic",
    album: "The Magnificent Tree",
    spotifyTrackId: "5drK2kTE2mrUdV33iHWyrx",
  },
  {
    title: "Bloodsport",
    artist: "Sneaker Pimps",
    album: "Bloodsport",
    spotifyTrackId: "4sLqcpvMrIJUyOs7x6fl5m",
  },
  {
    title: "Violently Happy",
    artist: "Björk",
    album: "Debut",
    spotifyTrackId: "1oyRhrmdRoJj0rUe7b22FS",
  },
  {
    title: "Like A Stone",
    artist: "Tricky feat. Marta",
    album: "Fall to Pieces",
    spotifyTrackId: "154Btwvv4e6YAuqrOlHUb1",
  },
  {
    title: "Lazy Calm",
    artist: "Cocteau Twins",
    album: "Victorialand",
    spotifyTrackId: "6MWnAibO1HAEhlrHoH1kNi",
  },
  {
    title: "Disorder",
    artist: "Joy Division",
    album: "Unknown Pleasures",
    spotifyTrackId: "5fbQCQt91LsVgXusFS0CCD",
  },
  {
    title: "Should I Stay or Should I Go",
    artist: "The Clash",
    album: "Combat Rock",
    spotifyTrackId: "39shmbIHICJ2Wxnk1fPSdz",
  },
  {
    title: "Tonight, Tonight",
    artist: "Smashing Pumpkins",
    album: "Mellon Collie and the Infinite Sadness (Deluxe Edition)",
    spotifyTrackId: "5KahLK67IOhTUSZzW8mb5h",
  },
  {
    title: "How's It Going To Be",
    artist: "Third Eye Blind",
    album: "Third Eye Blind",
    spotifyTrackId: "3Uvx1TO0Kg5HgGPk58lHXv",
  },
  {
    title: "You Could Be More As You Are",
    artist: "Saâda Bonaire",
    album: "Saâda Bonaire",
    spotifyTrackId: "1z4wF1YNe3FphOqyD2eRqY",
  },
  {
    title: "Cities In Dust",
    artist: "Siouxsie and the Banshees",
    album: "Tinderbox",
    spotifyTrackId: "2xq9cLlOPyLoi8kLlR4miz",
  },
  {
    title: "Torn",
    artist: "Ednaswap",
    album: "Wacko Magneto",
    spotifyTrackId: "3Ko0HG4tuWVE7Q9do59z4m",
  },
  {
    title: "Do You Love Me Now?",
    artist: "The Breeders",
    album: "Last Splash",
    spotifyTrackId: "6mI1t5Q6egSw7mTAApiD68",
  },
  {
    title: "Dagger",
    artist: "Slowdive",
    album: "Souvlaki",
    spotifyTrackId: "3MmRfG64qt04Efx9gK9Ec8",
  },
  {
    title: "Scratched",
    artist: "Etienne de Crécy",
    album: "Tempovision",
    spotifyTrackId: "52PCi5DlwcHFknaMyEE9cD",
  },
  {
    title: "Here I Am - Kaskade Remix",
    artist: "David Morales feat. Kaskade",
    album: "HERE I AM",
    spotifyTrackId: "4I9TgYWypLdackFhnfNu2T",
  },
]

// Sample data for the card stacks
const cookingItems = [
  {
    title: "Braised Lamb Shank",
    description: "Braised lamb shank in a red wine, beef stock, walnut sauce",
    imageUrl: "/images/interests/cooking-1.jpg",
    category: "cooking" as const,
  },
  {
    title: "Rainbow Trout",
    description: "Rainbow trout with vegetables and mashed potatoes",
    imageUrl: "/images/interests/cooking-2.jpg",
    category: "cooking" as const,
  },
  {
    title: "Thai-inspired Chicken Yellow Curry",
    description: "Thai-inspired chicken yellow curry with coconut milk, rice and vegetables",
    imageUrl: "/images/interests/cooking-27.jpg",
    category: "cooking" as const,
  },
  {
    title: "Chicken Bean Stew",
    description: "Bean stew with chicken",
    imageUrl: "/images/interests/cooking-3.jpg",
    category: "cooking" as const,
  },
  {
    title: "Beef Ragù Pasta",
    description: "Beef ragù with rigatoni pasta",
    imageUrl: "/images/interests/cooking-4.jpg",
    category: "cooking" as const,
  },
  {
    title: "Stuffed Sour Cabbage Rolls (Сарма)",
    description: "Balkan stuffed fermented cabbage rolls with ground beef, ground pork and dried smoked bacon (сланина)",
    imageUrl: "/images/interests/cooking-5.jpg",
    category: "cooking" as const,
  },
  {
    title: "Stuffed Bell Peppers (Пуњене Паприке)",
    description: "Balkan stuffed red bell peppers with ground beef and tomato sauce",
    imageUrl: "/images/interests/cooking-6.jpg",
    category: "cooking" as const,
  },
  {
    title: "Borscht (Борщ)",
    description: "Ukrainian borscht soup",
    imageUrl: "/images/interests/cooking-7.jpg",
    category: "cooking" as const,
  },  
  {
    title: "Pea Stew (Грашак)",
    description: "Balkan pea stew with beef",
    imageUrl: "/images/interests/cooking-8.jpg",
    category: "cooking" as const,
  },
  {
    title: "Potato Beef Stew",
    description: "Beef stew with potatoes and spinach",
    imageUrl: "/images/interests/cooking-9.jpg",
    category: "cooking" as const,
  },
  {
    title: "Flatbread (Лепиња)",
    description: "Balkan flatbread",
    imageUrl: "/images/interests/cooking-10.jpg",
    category: "cooking" as const,
  },
  {
    title: "Bread Porridge (Попара)",
    description: "Balkan bread porridge",
    imageUrl: "/images/interests/cooking-11.jpg",
    category: "cooking" as const,
  },
  {
    title: "Butternut Squash Soup",
    description: "Roasted butternut squash soup with olio santo and cream",
    imageUrl: "/images/interests/cooking-12.jpg",
    category: "cooking" as const,
  },
  {
    title: "Rosé Tteokbokki",
    description: "Rosé tteokbokki with chicken",
    imageUrl: "/images/interests/cooking-13.jpg",
    category: "cooking" as const,
  },
  {
    title: "Braised Lamb Stew",
    description: "Braised lamb shoulder stew",
    imageUrl: "/images/interests/cooking-14.jpg",
    category: "cooking" as const,
  },
  {
    title: "Japanese Chicken Curry",
    description: "Japanese chicken curry with rice",
    imageUrl: "/images/interests/cooking-15.jpg",
    category: "cooking" as const,
  },
  {
    title: "Chicken Malai Boti Handi",
    description: "Chicken malai boti handi with cheese",
    imageUrl: "/images/interests/cooking-16.jpg",
    category: "cooking" as const,
  },
  {
    title: "Beef Bourguignon",
    description: "French beef bourguignon stew",
    imageUrl: "/images/interests/cooking-17.jpg",
    category: "cooking" as const,
  },
  {
    title: "Marry Me Chicken",
    description: "Marry me chicken leg with mashed potatoes",
    imageUrl: "/images/interests/cooking-18.jpg",
    category: "cooking" as const,
  },
  {
    title: "Salmon With Coconut Rice",
    description: "Salmon with creamy tomato sauce and coconut rice",
    imageUrl: "/images/interests/cooking-19.jpg",
    category: "cooking" as const,
  },
  {
    title: "Steak With Creamy Peppercorn Sauce",
    description: "Steak with creamy peppercorn sauce and mashed potatoes and broccolini",
    imageUrl: "/images/interests/cooking-20.jpg",
    category: "cooking" as const,
  },
  {
    title: "Spaghetti Carbonara",
    description: "Carbonara with spaghetti",
    imageUrl: "/images/interests/cooking-21.jpg",
    category: "cooking" as const,
  },
  {
    title: "Fettuccine Alfredo With Turkey Meatballs",
    description: "Fettuccine with homemade alfredo sauce and turkey meatballs",
    imageUrl: "/images/interests/cooking-22.jpg",
    category: "cooking" as const,
  },
  {
    title: "Spicy Italian Sausage Pasta",
    description: "Spicy Italian sausage sauce with rigatoni pasta",
    imageUrl: "/images/interests/cooking-23.jpg",
    category: "cooking" as const,
  },
  {
    title: "Chicken Sandwich",
    description: "Chicken sandwich with baguette bread",
    imageUrl: "/images/interests/cooking-24.jpg",
    category: "cooking" as const,
  },
  {
    title: "Grilled Pork Skewers (Шашлык)",
    description: "Eastern European grilled pork shoulder skewers",
    imageUrl: "/images/interests/cooking-25.jpg",
    category: "cooking" as const,
  },
  {
    title: "Hibiscus Poached Pear",
    description: "Poached pear in hibiscus syrup, vanilla yogurt, walnuts and mint",
    imageUrl: "/images/interests/cooking-26.jpg",
    category: "cooking" as const,
  },
]

const photographyItems = [
  {
    title: "Tunisia 2011: فندق مهدية بالاس تالاسو",
    description: "Staying with my family in the Mahdia Palace Thalasso hotel in Mahdia",
    imageUrl: "/images/interests/photography-251.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Pool in فندق مهدية بالاس تالاسو",
    description: "The swimming pool in the Mahdia Palace Thalasso hotel",
    imageUrl: "/images/interests/photography-252.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: بحر المهدية",
    description: "Me reading a book by the Mahdia beach",
    imageUrl: "/images/interests/photography-253.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: قصر الجم I",
    description: "The Amphitheatre of El Jem in the modern-day city of El Jem, formerly Thysdrus in the Roman province of Africa, was built in the 3rd-century entirely out of massive stone blocks and without mortar, and is the largest Roman structure in Africa, and the 3rd largest Roman amphitheatre in the world, once capable of hosting 35,000 spectators",
    imageUrl: "/images/interests/photography-254.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: قصر الجم II",
    description: "Another view of the Amphitheatre of El Jem",
    imageUrl: "/images/interests/photography-255.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: قصر الجم III",
    description: "Inside the chambers of the Amphitheatre of El Jem",
    imageUrl: "/images/interests/photography-256.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Family in قصر الجم",
    description: "My dad, brother and I against the wall of the Amphitheatre of El Jem",
    imageUrl: "/images/interests/photography-257.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: مقهى سيدي بوسعيد I",
    description: "Café Sidi Bou Said located in the coastal town of Al-Maharas, the name of the café refers to Abu Said al-Baji, a 13th-century Sufi wali, or saint, who's buried in the famous cliffside village of Sidi Bou Said near Tunis",
    imageUrl: "/images/interests/photography-258.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: مقهى سيدي بوسعيد II",
    description: "Other view of the Café Sidi Bou Said",
    imageUrl: "/images/interests/photography-259.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: مقهى سيدي بوسعيد III",
    description: "My mom, brother and I drinking beverages at the Café Sidi Bou Said",
    imageUrl: "/images/interests/photography-260.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: زهرة الكركديه",
    description: "Vibrant red hibiscus flower growing in the Café Sidi Bou Said garden",
    imageUrl: "/images/interests/photography-261.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: سورة النصر",
    description: "Mosaic of Surah An-Nasr in the Café Sidi Bou Said, it is the 110th chapter of the Quran, and is a popular surah to display in cafés, homes, and public spaces because it's short, beautiful, and carries a humble message about gratitude and remembrance",
    imageUrl: "/images/interests/photography-262.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Ceramic Mosaic in مقهى سيدي بوسعيد",
    description: "A hand-painted Nabeul-style ceramic mosaic at the Café Sidi Bou Said, featuring an ornate birdcage, songbirds, and flowering branches set within a keyhole arch, framed by classic blue-and-white tilework that blends Andalusian, Ottoman, and Berber influences",
    imageUrl: "/images/interests/photography-263.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Jar in مقهى سيدي بوسعيد",
    description: "A traditional clay jar, now displayed as a decoration by the Café Sidi Bou Said",
    imageUrl: "/images/interests/photography-269.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: حمامة",
    description: "A pigeon perching on the stone wall around the Café Sidi Bou Said",
    imageUrl: "/images/interests/photography-270.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: الجهنمية",
    description: "Bougainvillea flower petals, common in Tunisia, fallen on the ground",
    imageUrl: "/images/interests/photography-264.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: نخلة",
    description: "Unripe dates growing on a date palm tree in southern Tunisia",
    imageUrl: "/images/interests/photography-265.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: كرموس الهندي",
    description: "Truck bed loaded up with prickly pear fruits to be sold, an iconic summer fruit and street snack across Tunisia",
    imageUrl: "/images/interests/photography-266.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Street Vendors",
    description: "Local vendors selling food and other products in the streets of southern Tunisia",
    imageUrl: "/images/interests/photography-268.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: مطماطة / ⵎⴰⵜⵎⴰⵜⴰ",
    description: "Matmata is a small Amazigh, or Berber, speaking town in southern Tunisia, with the community known for living in unique traditional underground 'troglodyte' homes carved into the soft sandstone earth for protection against the extreme heat of the Sahara desert",
    imageUrl: "/images/interests/photography-271.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Family in مطماطة / ⵎⴰⵜⵎⴰⵜⴰ",
    description: "My mom, brother and I in Matmata",
    imageUrl: "/images/interests/photography-273.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Inside a home in مطماطة / ⵎⴰⵜⵎⴰⵜⴰ",
    description: "Inside a traditional Amazigh underground home in Matmata, with a vaulted earthen ceiling and colourful hand-woven textiles",
    imageUrl: "/images/interests/photography-274.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Inside another home in مطماطة / ⵎⴰⵜⵎⴰⵜⴰ",
    description: "Inside another traditional Amazigh underground home in Matmata, featuring a traditional Berber kitchen with a hand-grinding stone, woven palm matting, and a figurative kilim hanging on the earthen wall",
    imageUrl: "/images/interests/photography-275.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: خير الرازقين — تعويذة على باب دار في مطماطة",
    description: "Panel above the door of a home in Matmata, with the Arabic inscription 'خير الرازقين' meaning 'The Best of Providers', a common phrase invoking Allah's provision and blessings for the household, and the fish symbolizing protection, blessing, and good fortune in Amazigh (Berber) culture and is used to ward off the evil eye",
    imageUrl: "/images/interests/photography-276.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: اللقمي في مطماطة",
    description: "Me drinking lagmi, a fresh date palm sap, and traditional southern Tunisian drink in Matmata",
    imageUrl: "/images/interests/photography-277.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: شاي الضيافة في مطماطة",
    description: "Being served traditional Tunisian red tea (شاي أحمر) in Matmata",
    imageUrl: "/images/interests/photography-278.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: إكليل الجبل",
    description: "Dried rosemary in Matmata, stored in a traditional Tunisian deep green glazed terracotta jar",
    imageUrl: "/images/interests/photography-279.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Single-humped Arabian Camels in the Sahara Desert",
    description: "Camels in the Sahara Desert near Matmata",
    imageUrl: "/images/interests/photography-280.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Golden Hour Sky",
    description: "The desert sky in southern Tunisia during golden hour",
    imageUrl: "/images/interests/photography-281.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Sunset",
    description: "Sunset in the Sahara Desert",
    imageUrl: "/images/interests/photography-282.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Single-humped Arabian Camels",
    description: "Single-humped Arabian Camels in the Sahara Desert after sunset, with traditional woven saddles attached",
    imageUrl: "/images/interests/photography-283.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Riding an Arabian Camel",
    description: "Me riding a single-humped Arabian camel in the Sahara Desert nearby the city of Douz, also known as the 'Gateway to the Sahara'",
    imageUrl: "/images/interests/photography-284.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Petting an Arabian Camel",
    description: "My mom and I next to a single-humped Arabian camel in the Sahara Desert",
    imageUrl: "/images/interests/photography-285.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: حصان بربري",
    description: "Me riding a traditional Berber horse in the Sahara Desert, one of the oldest horse breeds in the world famous for its endurance, speed, and surefootedness",
    imageUrl: "/images/interests/photography-286.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Amazigh Shepherd",
    description: "A shepherd tending his small flock in the arid scrubland of southern Tunisia",
    imageUrl: "/images/interests/photography-287.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: My Brother and I",
    description: "My brother and I in southern Tunisia",
    imageUrl: "/images/interests/photography-288.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Me at Sunset",
    description: "Me at sunset in southern Tunisia",
    imageUrl: "/images/interests/photography-289.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Southern Tunisian Town",
    description: "A town in southern Tunisia during sunset",
    imageUrl: "/images/interests/photography-290.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: شط الجريد",
    description: "The Chott el Djerid, is an iconic vast endorheic salt lake in southern Tunisia and is the largest salt pan (a salt flat with no outlet to the sea) of the Sahara Desert covering 7,000 km²",
    imageUrl: "/images/interests/photography-292.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: My Family in شط الجريد",
    description: "My family in the Chott el Djerid, atop a wooden boat with the flag of Tunisia",
    imageUrl: "/images/interests/photography-291.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Street Vendor",
    description: "Local man selling dates and other produce from a shop in southern Tunisia",
    imageUrl: "/images/interests/photography-293.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Donkey Cart",
    description: "Man driving a donkey cart, an everyday scene of life in southern Tunisia",
    imageUrl: "/images/interests/photography-294.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Driving in Sahara Desert",
    description: "Driving through the vast landscapes of the Sahara Desert in southern Tunisia",
    imageUrl: "/images/interests/photography-295.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: عنق الجمل",
    description: "My father, brother and I nearby Ong Jmal, or the Neck of the Camel, located in the dunes around the city of Tozeur in the Sahara Desert, is a distinctive rock formation that resembles a camel's neck and head silhouetted against the desert sky",
    imageUrl: "/images/interests/photography-296.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: الصحراء التونسية I",
    description: "The Sahara Desert in southern Tunisia",
    imageUrl: "/images/interests/photography-297.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: الصحراء التونسية II",
    description: "Another view of the Sahara Desert in southern Tunisia",
    imageUrl: "/images/interests/photography-298.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: الصحراء التونسية III",
    description: "Me climbing a sand dune in the Sahara Desert in southern Tunisia",
    imageUrl: "/images/interests/photography-299.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: الصحراء التونسية IV",
    description: "My family in the Sahara Desert in southern Tunisia",
    imageUrl: "/images/interests/photography-300.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: الصحراء التونسية V",
    description: "My dad in the Sahara Desert in southern Tunisia",
    imageUrl: "/images/interests/photography-301.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Mos Espa I",
    description: "The original film set location in the Star Wars universe for the spaceport city, Mos Espa, located in the Sahara desert near the city of Tozeur",
    imageUrl: "/images/interests/photography-302.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: Mos Espa II",
    description: "Me at the Mos Espa Star Wars film set location in the Sahara desert",
    imageUrl: "/images/interests/photography-303.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: واحة شبيكة I",
    description: "The Chebika Oasis, one of the three mountain oases collectively known as the Mountain Oases of Tunisia, it is tucked into the Atlas Mountain foothills, where the natural springs flow from the rocky cliffs that create an environment for lush palm groves to grow in the middle of an otherwise harsh, arid desert landscape",
    imageUrl: "/images/interests/photography-304.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: واحة شبيكة II",
    description: "Ancient Amazigh, or Berber, settlement ruins on a cliff atop the Chebika Oasis in southern Tunisia",
    imageUrl: "/images/interests/photography-305.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: واحة شبيكة III",
    description: "Drinking water while at the Chebika Oasis in southern Tunisia",
    imageUrl: "/images/interests/photography-306.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: جامع القيروان الأكبر I",
    description: "The Great Mosque of Kairouan, also known as the Mosque of Uqba, is a mosque in the city of Kairouan and is the first Muslim stronghold in North Africa. It is one of the most important and oldest religious sites in Islam and the largest Islamic monument in North Africa serving as a model for all later mosques in the Maghreb. Built in the 7th-century and named after عقبة بن نافع (Uqba ibn Nafi), the Arab general and companion of the Prophet Muhammad, who founded the city of Kairouan and is buried within the mosque's grounds",
    imageUrl: "/images/interests/photography-307.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: جامع القيروان الأكبر II",
    description: "My brother and I at the Great Mosque of Kairouan",
    imageUrl: "/images/interests/photography-308.jpg",
    category: "photography" as const,
  },
  {
    title: "Tunisia 2011: مشربية تونسية",
    description: "A traditional Tunisian mashrabiyya in Mahdia, an ornately carved wooden balcony painted in the iconic turquoise blue colour common in Tunisian coastal architecture",
    imageUrl: "/images/interests/photography-309.jpg",
    category: "photography" as const,
  },
  {
    title: "Costa Rica 2016: Classic Costa Rican Breakfast ",
    description: "A classic Costa Rican desayuno típico — gallo pinto, fried eggs, fried sweet plantain, toast, fresh cheese, and orange juice — served at Restaurante Mi Casa in La Fortuna",
    imageUrl: "/images/interests/photography-310.jpg",
    category: "photography" as const,
  },
  {
    title: "Costa Rica 2016: Plátanos",
    description: "Clusters of plátanos, or plantains, hanging from harvested banana plant stalks near the town La Fortuna",
    imageUrl: "/images/interests/photography-311.jpg",
    category: "photography" as const,
  },
  {
    title: "Costa Rica 2016: Brazilian Red Cloak Flower",
    description: "A vibrant Brazilian red cloak flower in full bloom in Costa Rica's tropical lowlands",
    imageUrl: "/images/interests/photography-312.jpg",
    category: "photography" as const,
  },
  {
    title: "Costa Rica 2016: Parque Nacional Manuel Antonio",
    description: "The famous lush national park in the heart of Manuel Antonio, on Costa Rica's central Pacific coast, known for its diverse wildlife and pristine beaches",
    imageUrl: "/images/interests/photography-313.jpg",
    category: "photography" as const,
  },
  {
    title: "Costa Rica 2016: Garrobo",
    description: "A black spiny-tailed iguana, locally known in Costa Rica as 'garrobo' or 'iguana negra', commonly seen in Costa Rica and Manuel Antonio National Park, they are one of the fastest lizards in the world, capable of reaching speeds up to 35 km/h",
    imageUrl: "/images/interests/photography-314.jpg",
    category: "photography" as const,
  },
  {
    title: "Costa Rica 2016: Tidal Estuary near Playa Espadilla Sur",
    description: "A mangrove-fringed tidal estuary inside Manuel Antonio National Park, where freshwater meets the tidal zone of the Pacific Ocean",
    imageUrl: "/images/interests/photography-315.jpg",
    category: "photography" as const,
  },
  {
    title: "Costa Rica 2016: Sky Adventures Arenal Park",
    description: "Me zip-lining with the Sky Adventures Arenal zipline company through the Costa Rican rainforest canopy in the Arenal Volcano region, where the speed of the zip line ride can reach speeds of 40 to 80 km/h",
    imageUrl: "/images/interests/photography-316.jpg",
    category: "photography" as const,
  },
  {
    title: "Costa Rica 2016: Maleku Indigenous Reserve",
    description: "The Maleku Indigenous Reserve is located in the northern plains of Costa Rica, near the town of San Rafael de Guatuso. It is home to the Maleku people, the smallest indigenous group in Costa Rica, consisting of fewer than 1,000 members",
    imageUrl: "/images/interests/photography-317.jpg",
    category: "photography" as const,
  },
  {
    title: "Costa Rica 2016: Pink Bananas",
    description: "Clusters of pink bananas, or musa velutina, growing from the trees in Costa Rica",
    imageUrl: "/images/interests/photography-318.jpg",
    category: "photography" as const,
  },
  {
    title: "Costa Rica 2016: Scarlet Bananas",
    description: "Clusters of scarlet bananas, or musa coccinea, growing from the trees in Costa Rica",
    imageUrl: "/images/interests/photography-319.jpg",
    category: "photography" as const,
  },
  {
    title: "Costa Rica 2016: Playa Manuel Antonio",
    description: "A beautiful beach in Manuel Antonio National Park, known for its pristine waters and vibrant marine life",
    imageUrl: "/images/interests/photography-320.jpg",
    category: "photography" as const,
  },
  {
    title: "Costa Rica 2016: 727 Fuselage Hotel Suite",
    description: "This famous hotel suite is located inside the fuselage of a decommissioned Boeing 727 airplane, which was originally built in 1963 and served as a commercial airliner for several airlines before being converted into a unique hotel suite in Hotel Costa Verde",
    imageUrl: "/images/interests/photography-321.jpg",
    category: "photography" as const,
  },
  {
    title: "Costa Rica 2016: White-Faced Capuchin Monkey",
    description: "A white-faced capuchin monkey near Manuel Antonio, highly intelligent, they have the largest brain-to-body ratio of any nonhuman primate and are known for complex behaviors like using tools to crack nuts",
    imageUrl: "/images/interests/photography-322.jpg",
    category: "photography" as const,
  },
  {
    title: "Costa Rica 2016: Arenal Volcano",
    description: "Arenal Volcano in La Fortuna, is a 1,633-meter stratovolcano and one of the most active volcanoes in the country and is one of the most symmetrical volcano profiles in the world",
    imageUrl: "/images/interests/photography-323.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Bandera Bicentenario",
    description: "The Bicentennial Flag is a monumental Chilean flag in the city of Santiago",
    imageUrl: "/images/interests/photography-324.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Monumento a Bernardo O'Higgins",
    description: "A monument in Santiago dedicated to Bernardo O'Higgins Riquelme, a Chilean military officer, statesman and a major leader of Chile's successful struggle for independence from the Spanish Empire",
    imageUrl: "/images/interests/photography-325.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Cripta Bernardo O'Higgins",
    description: "The Crypt of Bernardo O'Higgins in Santiago, is located beneath the Plaza de la Ciudadanía in front of La Moneda Palace, and houses the remains of the nation's founding father",
    imageUrl: "/images/interests/photography-326.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: La Estación Universidad de Chile",
    description: "The Universidad de Chile metro station in Santiago, typically hosting up to 60,000 passengers a day",
    imageUrl: "/images/interests/photography-327.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Iglesia de San Francisco",
    description: "The Church of San Francisco in Santiago, known for its distinctive terracotta deep red exterior walls and being the oldest surviving building in Santiago",
    imageUrl: "/images/interests/photography-328.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Stranger in a Car",
    description: "Someone in a car driving by in Santiago asked for me to take his photo",
    imageUrl: "/images/interests/photography-329.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Pomegranate Tree",
    description: "A pomegranate tree in the garden of my family friend's house in Chicureo, a part of the Santiago Metropolitan Region",
    imageUrl: "/images/interests/photography-330.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Barros Luco and Pisco Sour",
    description: "Eating at the restaurant Bar Nacional 3 in Santiago, with a traditional Chilean Barros Luco sandwich and a Pisco Sour cocktail, the national drink of Chile",
    imageUrl: "/images/interests/photography-331.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Barrio Pueblito los Dominicos",
    description: "The Los Dominicos Craft Centre in Santiago, where local artisans sell handmade jewelry, sculptures, paintings and clothes at this arts-and-crafts market",
    imageUrl: "/images/interests/photography-332.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Cerro Santa Lucía",
    description: "The Santa Lucía Hill in Santiago, a steep park with trails, monuments and viewpoints winding around a rugged mound of volcanic rock",
    imageUrl: "/images/interests/photography-333.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Fuente Neptuno",
    description: "The Neptune Fountain in Santiago, a popular landmark in the Santa Lucía Hill built in the early 20th-century in a neoclassical style with a bronze statue of Neptune",
    imageUrl: "/images/interests/photography-334.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Estatua del Arzobispo Manuel Vicuña Larraín",
    description: "A statue of Manuel Vicuña Larraín, a Chilean cardinal and archbishop, located in Santiago on the Santa Lucía Hill",
    imageUrl: "/images/interests/photography-335.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Plaza Pedro de Valdivia",
    description: "A historic square in Santiago within the Santa Lucía Hill, named after Pedro de Valdivia, the founder of the city",
    imageUrl: "/images/interests/photography-336.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Reflection of Me",
    description: "A distorted reflection of me on a nearby office building in Santiago on the Santa Lucía Hill, approximately 400 meters away from the Plaza Pedro de Valdivia",
    imageUrl: "/images/interests/photography-337.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Castillo Hidalgo",
    description: "A historic castle atop the Santa Lucía Hill in Santiago, built in the late 19th-century as a military fortification and now serves as a cultural center and museum",
    imageUrl: "/images/interests/photography-338.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: San Pedro de Atacama",
    description: "Atacama Desert in South America",
    imageUrl: "/images/interests/photography-1.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: San Pedro de Atacama",
    description: "Atacama Desert in South America",
    imageUrl: "/images/interests/photography-2.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Puritama Hot Springs",
    description: "Hiking to the Puritama hot springs in the Atacama Desert",
    imageUrl: "/images/interests/photography-3.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Vicuña",
    description: "Wildlife photograph of a vicuña (a South American camelid and relative of the llama) in the Atacama Desert",
    imageUrl: "/images/interests/photography-4.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Flamingo",
    description: "Wildlife photograph of a flamingo in the Atacama Desert",
    imageUrl: "/images/interests/photography-5.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Cat",
    description: "Cat approaching me during breakfast in San Pedro de Atacama",
    imageUrl: "/images/interests/photography-248.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Valle de la Luna",
    description: "Valley of the Moon in the Atacama Desert",
    imageUrl: "/images/interests/photography-6.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: El Tatio",
    description: "El Tatio in the Andes Mountains is the largest geyser field in the Southern Hemisphere",
    imageUrl: "/images/interests/photography-7.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Lagunas Baltinache",
    description: "System of turquoise salt-water lagoons in the Atacama Desert",
    imageUrl: "/images/interests/photography-8.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Arica",
    description: "Port city in northern Chile, known as the City of Eternal Spring",
    imageUrl: "/images/interests/photography-9.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: View of Arica",
    description: "Atop the Morro de Arica, a steep hill 139-meters above sea level, overlooking the city of Arica",
    imageUrl: "/images/interests/photography-249.jpg",
    category: "photography" as const,
  },
  {
    title: "Chile 2025: Cristo de la Concordia de Arica",
    description: "An 11-meter steel and bronze statue erected in 1999 atop the historic Morro de Arica, representing peace following the Tacna-Arica compromise which solidified the border between Chile and Peru",
    imageUrl: "/images/interests/photography-250.jpg",
    category: "photography" as const,
  },
  {
    title: "Peru 2025: Huaca Pucllana",
    description: "Pre-Columbian adobe pyramid in Miraflores, Lima previously used as an administrative and ceremonial center",
    imageUrl: "/images/interests/photography-10.jpg",
    category: "photography" as const,
  },
  {
    title: "Peru 2025: Lima",
    description: "Lima's scenic coastline",
    imageUrl: "/images/interests/photography-11.jpg",
    category: "photography" as const,
  },
  {
    title: "Peru 2025: Machu Picchu",
    description: "Sunrise in Machu Picchu, a 15th-century Inca citadel and one of the Seven Wonders of the World",
    imageUrl: "/images/interests/photography-12.jpg",
    category: "photography" as const,
  },
  {
    title: "Peru 2025: Vinicunca",
    description: "Summit of Vinicunca, also known as Rainbow Mountain, with a 5,036 m altitude located near Cusco",
    imageUrl: "/images/interests/photography-13.jpg",
    category: "photography" as const,
  },
  {
    title: "Peru 2025: Valle Rojo",
    description: "The Red Valley, located near Vinicunca, known for its intense, iron-oxide red soil",
    imageUrl: "/images/interests/photography-14.jpg",
    category: "photography" as const,
  },
  {
    title: "Peru 2025: Ollantaytambo",
    description: "Ollantaytambo, located in Peru's Sacred Valley, is a continuously inhabited Inca town and significant to Inca history as an administrative center",
    imageUrl: "/images/interests/photography-15.jpg",
    category: "photography" as const,
  },
  {
    title: "Peru 2025: Templo del Sol",
    description: "Temple of the Sun, located in Ollantaytambo, featuring the Wall of the Six Monoliths made of pink granite, with windows aligned to the position of the sun on the solstices",
    imageUrl: "/images/interests/photography-16.jpg",
    category: "photography" as const,
  },
  {
    title: "Ecuador 2025: Playa Montañita",
    description: "Montañita, a surfing village on Ecuador's coast",
    imageUrl: "/images/interests/photography-17.jpg",
    category: "photography" as const,
  },
  {
    title: "Ecuador 2025: Surfing at Playa Montañita",
    description: "Me surfing at the beach in Montañita",
    imageUrl: "/images/interests/photography-339.jpg",
    category: "photography" as const,
  },
  {
    title: "Ecuador 2025: Local Art",
    description: "An art piece of a tropical bird painted on a dried banana leaf sheath, the outer casing that wraps around the trunk of a banana plant, made by an Argentinian artist in Montañita",
    imageUrl: "/images/interests/photography-340.jpg",
    category: "photography" as const,
  },
  {
    title: "Ecuador 2025: Dogs",
    description: "Dogs on the back of a pickup truck in Montañita",
    imageUrl: "/images/interests/photography-341.jpg",
    category: "photography" as const,
  },
  {
    title: "Ecuador 2025: Cow",
    description: "A local cow by my hostel in Montañita",
    imageUrl: "/images/interests/photography-342.jpg",
    category: "photography" as const,
  },
  {
    title: "Ecuador 2025: Cows on Montañita Beach",
    description: "Cows cooling off on the beach in Montañita",
    imageUrl: "/images/interests/photography-343.jpg",
    category: "photography" as const,
  },

  {
    title: "Portugal 2025: Porto",
    description: "Fountain in Porto",
    imageUrl: "/images/interests/photography-18.jpg",
    category: "photography" as const,
  },
  {
    title: "Portugal 2025: Livraria Lello",
    description: "One of the most beautiful bookstores in the world, located in Porto",
    imageUrl: "/images/interests/photography-19.jpg",
    category: "photography" as const,
  },
  {
    title: "Portugal 2025: Luís I Bridge",
    description: "Overlooking the famous double-deck metal arch bridge that spans the river Douro, in Porto",
    imageUrl: "/images/interests/photography-20.jpg",
    category: "photography" as const,
  },
  {
    title: "Portugal 2025: Lisbon",
    description: "Downtown Lisbon",
    imageUrl: "/images/interests/photography-21.jpg",
    category: "photography" as const,
  },
  {
    title: "Portugal 2025: Convento da Ordem do Carmo",
    description: "The Convent of Our Lady of Mount Carmel is a former Catholic convent located in Lisbon, ruined during the 1755 Lisbon earthquake",
    imageUrl: "/images/interests/photography-22.jpg",
    category: "photography" as const,
  },
  {
    title: "Portugal 2025: Inside Castelo de São Jorge",
    description: "Under an arch in the historic 11th-century, hilltop Moorish castle in Lisbon",
    imageUrl: "/images/interests/photography-23.jpg",
    category: "photography" as const,
  },
  {
    title: "Portugal 2025: Atop Castelo de São Jorge",
    description: "Atop the historic 11th-century, hilltop Moorish castle in Lisbon",
    imageUrl: "/images/interests/photography-24.jpg",
    category: "photography" as const,
  },
  {
    title: "Portugal 2025: Overlooking Lisbon",
    description: "Overlooking Lisbon during a sunset",
    imageUrl: "/images/interests/photography-25.jpg",
    category: "photography" as const,
  },
  {
    title: "Spain 2025: Setas de Sevilla",
    description: "Massive wooden structure in Seville",
    imageUrl: "/images/interests/photography-26.jpg",
    category: "photography" as const,
  },
  {
    title: "Spain 2025: Plaza de España",
    description: "Plaza in the Parque de María Luisa, in Seville",
    imageUrl: "/images/interests/photography-27.jpg",
    category: "photography" as const,
  },
  {
    title: "Spain 2025: Real Alcázar de Sevilla",
    description: "Historic Moorish royal palace with fountain-filled gardens, ornate arches and 16th-century tiles in Seville",
    imageUrl: "/images/interests/photography-28.jpg",
    category: "photography" as const,
  },
  {
    title: "Spain 2025: Córdoba",
    description: "In the courtyard of the Mosque–Cathedral of Córdoba",
    imageUrl: "/images/interests/photography-29.jpg",
    category: "photography" as const,
  },
  {
    title: "Spain 2025: Mezquita-Catedral de Córdoba",
    description: "Mosque–Cathedral of Córdoba",
    imageUrl: "/images/interests/photography-30.jpg",
    category: "photography" as const,
  },
  {
    title: "Spain 2025: Palacio Real de Madrid",
    description: "Inside the Royal Palace of Madrid, the official residence of the Spanish royal family, and the largest royal palace in Europe",
    imageUrl: "/images/interests/photography-31.jpg",
    category: "photography" as const,
  },
  {
    title: "Spain 2025: Catedral de Santa María la Real de la Almudena",
    description: "On the rooftop of the Cathedral of Saint Mary the Royal of the Almudena, featuring large bronze statues overlooking Madrid",
    imageUrl: "/images/interests/photography-32.jpg",
    category: "photography" as const,
  },
  {
    title: "Spain 2025: Museo Nacional del Prado",
    description: "Museo del Prado, the main Spanish national art museum, located in Madrid featuring notable art collections from Francisco Goya, Diego Velázquez, El Greco, and Peter Paul Rubens",
    imageUrl: "/images/interests/photography-33.jpg",
    category: "photography" as const,
  },
  {
    title: "Spain 2025: Basílica de la Sagrada Família",
    description: "World renowned Catholic church in Barcelona designed by Catalan architect Antoni Gaudí",
    imageUrl: "/images/interests/photography-34.jpg",
    category: "photography" as const,
  },
  {
    title: "Spain 2025: Casa Batlló",
    description: "Modernisme-styled, curving dragon-roofed apartment block in Barcelona designed by Catalan architect Antoni Gaudí",
    imageUrl: "/images/interests/photography-35.jpg",
    category: "photography" as const,
  },
  {
    title: "Spain 2025: Inside the Casa Batlló",
    description: "Inside the modernisme-styled, curving dragon-roofed apartment block in Barcelona designed by Catalan architect Antoni Gaudí",
    imageUrl: "/images/interests/photography-36.jpg",
    category: "photography" as const,
  },
  {
    title: "Spain 2025: Mies van der Rohe Pavilion",
    description: "Reconstruction of the pavilion from the 1929 International Exposition in Barcelona designed by architects Ludwig Mies van der Rohe and Lilly Reich, an important building in the history of modern architecture, known for its simple form and use of extravagant materials, including marble, red onyx and travertine",
    imageUrl: "/images/interests/photography-37.jpg",
    category: "photography" as const,
  },
  {
    title: "Spain 2025: Museu Picasso de Barcelona",
    description: "The Picasso Museum is an art museum in Barcelona housing an extensive collection of artworks by the 20th-century Spanish artist Pablo Picasso, with a total of 4251 of his works",
    imageUrl: "/images/interests/photography-38.jpg",
    category: "photography" as const,
  },
  {
    title: "Spain 2025: Parc Güell",
    description: "Park Güell is a complex of parks and gardens in Barcelona with architectural mosaic elements designed by Catalan architect Antoni Gaudí",
    imageUrl: "/images/interests/photography-39.jpg",
    category: "photography" as const,
  },
  {
    title: "Spain 2025: Recinte Modernista de Sant Pau",
    description: "Modernista hospital with gardens dotted with colorful Moorish-style pavilions designed by Catalan modernisme architect Lluís Domènech i Montaner, located in Barcelona",
    imageUrl: "/images/interests/photography-40.jpg",
    category: "photography" as const,
  },
  {
    title: "Spain 2025: Mercat dels Encants de Barcelona",
    description: "Mercat dels Encants is the largest and best-known flea market in Barcelona, with a long history of over 700 years making it one of the oldest markets in Europe",
    imageUrl: "/images/interests/photography-41.jpg",
    category: "photography" as const,
  },
  {
    title: "France 2025: Cathédrale La Major",
    description: "19th-century neo-Byzantine Roman Catholic cathedral in Marseille and seat of the Archdiocese of Marseille",
    imageUrl: "/images/interests/photography-42.jpg",
    category: "photography" as const,
  },
  {
    title: "France 2025: Vieux-Port de Marseille",
    description: "The Old Port of Marseille",
    imageUrl: "/images/interests/photography-43.jpg",
    category: "photography" as const,
  },
  {
    title: "France 2025: Fort Saint-Jean",
    description: "17th-century fortress with a bridge, built in Marseille by King Louis XIV at the entrance to the Old Port",
    imageUrl: "/images/interests/photography-44.jpg",
    category: "photography" as const,
  },
  {
    title: "France 2025: Overlooking Mediterranean Sea",
    description: "In Fort Saint-Jean, looking out towards the Mediterranean Sea",
    imageUrl: "/images/interests/photography-45.jpg",
    category: "photography" as const,
  },
  {
    title: "France 2025: Fort Saint-Jean Rooftop",
    description: "On a rooftop in Fort Saint-Jean, overlooking Marseille",
    imageUrl: "/images/interests/photography-46.jpg",
    category: "photography" as const,
  },
  {
    title: "France 2025: Cosquer Méditerranée",
    description: "Inside an immersive, high-fidelity replica of the submerged prehistoric Cosquer Cave in Marseille, featuring over 400 prehistoric paintings and engravings dating back 19,000 to 33,000 years",
    imageUrl: "/images/interests/photography-47.jpg",
    category: "photography" as const,
  },
  {
    title: "France 2025: Musée des Civilizations de l'Europe et de la Méditerranée",
    description: "The Museum of European and Mediterranean Civilizations is a national museum in Marseille, featuring many exhibitions and contemporary galleries",
    imageUrl: "/images/interests/photography-48.jpg",
    category: "photography" as const,
  },
  {
    title: "France 2025: Le Panier",
    description: "Famous street in Marseille, decorated with colourful murals and antique shops",
    imageUrl: "/images/interests/photography-49.jpg",
    category: "photography" as const,
  },
  {
    title: "France 2025: Bouillabaisse",
    description: "Bouillabaisse is a traditional Provençal fish soup originating in the port city Marseille",
    imageUrl: "/images/interests/photography-50.jpg",
    category: "photography" as const,
  },
  {
    title: "France 2025: Arsoned Car",
    description: "Arsoned car found in the streets of Marseille",
    imageUrl: "/images/interests/photography-51.jpg",
    category: "photography" as const,
  },
  {
    title: "France 2025: Nice",
    description: "Flowers on the streets of Nice",
    imageUrl: "/images/interests/photography-52.jpg",
    category: "photography" as const,
  },
  {
    title: "France 2025: Alleyway",
    description: "Alleyway in Nice",
    imageUrl: "/images/interests/photography-53.jpg",
    category: "photography" as const,
  },
  {
    title: "France 2025: Fontaine du Soleil",
    description: "Landmark bronze sculpture of the Greek god Apollo in Nice",
    imageUrl: "/images/interests/photography-54.jpg",
    category: "photography" as const,
  },
  {
    title: "France 2025: Walking in Nice",
    description: "Walking by the beach in Nice",
    imageUrl: "/images/interests/photography-55.jpg",
    category: "photography" as const,
  },
  {
    title: "France 2025: Voilier Plage",
    description: "Going to swim in the Mediterranean Sea in a pebble beach in Nice",
    imageUrl: "/images/interests/photography-56.jpg",
    category: "photography" as const,
  },
  {
    title: "France 2025: Escargot",
    description: "Eating snails with pesto in Nice",
    imageUrl: "/images/interests/photography-57.jpg",
    category: "photography" as const,
  },
  {
    title: "France 2025: Jardins Biovès",
    description: "Park in Menton, known for its citrus sculptures during the annual Lemon Festival",
    imageUrl: "/images/interests/photography-58.jpg",
    category: "photography" as const,
  },
  {
    title: "France 2025: Alleyway in Menton",
    description: "Walking through an alleyway in Menton",
    imageUrl: "/images/interests/photography-59.jpg",
    category: "photography" as const,
  },
  {
    title: "France 2025: Tarte au Citron",
    description: "Lemon pie from Jean-Luc Pelé in Menton, a town known as the lemon capital of the French Riviera",
    imageUrl: "/images/interests/photography-60.jpg",
    category: "photography" as const,
  },
  {
    title: "Monaco 2025: Monte-Carlo",
    description: "Walking through Monte Carlo",
    imageUrl: "/images/interests/photography-61.jpg",
    category: "photography" as const,
  },
  {
    title: "Monaco 2025: Casino de Monte-Carlo",
    description: "Inside the Monte Carlo Casino, made famous in film and literature",
    imageUrl: "/images/interests/photography-62.jpg",
    category: "photography" as const,
  },
  {
    title: "Monaco 2025: Metropole Shopping Monte-Carlo",
    description: "Upscale shopping center in Monaco",
    imageUrl: "/images/interests/photography-63.jpg",
    category: "photography" as const,
  },
  {
    title: "Monaco 2025: Overlooking Monte-Carlo",
    description: "Overlooking Monaco and the Mediterranean Sea",
    imageUrl: "/images/interests/photography-64.jpg",
    category: "photography" as const,
  },
  {
    title: "Monaco 2025: Street in Monte-Carlo",
    description: "Me on the street in Monte-Carlo",
    imageUrl: "/images/interests/photography-65.jpg",
    category: "photography" as const,
  },
  {
    title: "Monaco 2025: Musée océanographique de Monaco",
    description: "The Oceanographic Museum in Monaco founded by navigator and oceanographer Prince Albert I, featuring an aquarium with 6000 specimens",
    imageUrl: "/images/interests/photography-66.jpg",
    category: "photography" as const,
  },
  {
    title: "Monaco 2025: Beach in Monte-Carlo",
    description: "People swimming in a small beach in Monaco",
    imageUrl: "/images/interests/photography-67.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Genoa",
    description: "Fountain in Genoa",
    imageUrl: "/images/interests/photography-68.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Italian Deli Sandwich",
    description: "Italian deli sandwich in Genoa",
    imageUrl: "/images/interests/photography-69.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Tram in Milan",
    description: "Iconic tramway network in Milan",
    imageUrl: "/images/interests/photography-70.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Galleria Vittorio Emanuele II",
    description: "Glass-covered 19th-century shopping mall in Milan with luxury clothing brands and upscale dining",
    imageUrl: "/images/interests/photography-71.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Duomo di Milano",
    description: "Located in Milan, it is one of the largest cathedrals in the world, taking over 600 years to complete and is dedicated to the Nativity of St. Mary and is the seat of the Archbishop of Milan",
    imageUrl: "/images/interests/photography-72.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Piazza del Duomo",
    description: "Central plaza in Milan surrounded by the cathedral, the Royal Palace and the Galleria Vittorio Emanuele II mall",
    imageUrl: "/images/interests/photography-73.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Castello Sforzesco",
    description: "Iconic 15th-century fortress in Milan built by Francesco Sforza, Duke of Milan, now featuring historical museums and art by da Vinci and Michelangelo",
    imageUrl: "/images/interests/photography-74.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Rigatoni alla Carbonara",
    description: "Iconic Roman pasta in a restaurant in Milan",
    imageUrl: "/images/interests/photography-75.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Street in Florence",
    description: "Me in a street in Florence",
    imageUrl: "/images/interests/photography-76.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Cattedrale di Santa Maria del Fiore",
    description: "Famous 13th-century cathedral in Florence, and seat of the Catholic Archdiocese of Florence, known for its red-tiled dome and coloured marble facade",
    imageUrl: "/images/interests/photography-77.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Campanile di Giotto",
    description: "Inside Giotto's Bell Tower, composed of red, green and white marble in the Florentine Gothic architecture style, located beside the Florence Cathedral",
    imageUrl: "/images/interests/photography-78.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Overlooking Florence",
    description: "Atop Giotto's Bell Tower, with a full view of Florence",
    imageUrl: "/images/interests/photography-79.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Battistero di San Giovanni",
    description: "Inside the Baptistery of Saint John, known for its bronze doors and mosaic ceiling, and dedicated to John the Baptist as the patron saint of the city of Florence",
    imageUrl: "/images/interests/photography-80.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Cupola del Brunelleschi",
    description: "Inside the Florence Cathedral, looking up at the interior of Brunelleschi's dome featuring the fresco painting 'The Last Judgment' by Giorgio Vasari and Federico Zuccari",
    imageUrl: "/images/interests/photography-81.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Alice Masks",
    description: "Handicraft store in Florence, specializing in portrait masks in the Venetian traditional style",
    imageUrl: "/images/interests/photography-82.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Piazza della Signoria",
    description: "16th-century fountain of Neptune located in a plaza, in the center of Florence",
    imageUrl: "/images/interests/photography-83.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Fontana del Porcellino",
    description: "Famous fountain in Florence, where travellers can rub the snout of this bronze fountain of a boar to ensure their return to Florence",
    imageUrl: "/images/interests/photography-84.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Ponte Vecchio",
    description: "Medieval arched river bridge with Roman origins, lined with jewelry and souvenir shops",
    imageUrl: "/images/interests/photography-85.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: David",
    description: "Michelangelo's famous sculpture of David, located in the art museum, Galleria dell'Accademia di Firenze, in Florence",
    imageUrl: "/images/interests/photography-86.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Galleria degli Uffizi",
    description: "16th-century building in Florence housing a vast collection of Primitive and Renaissance paintings and masterpieces, including the 1554 painting 'The Dream and Allegory of Time' by Marcello Venusti (based on Michelangelo's original design)",
    imageUrl: "/images/interests/photography-87.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Anfiteatro di Boboli",
    description: "Amphitheater inside the Boboli Gardens, a massive park in Florence, originally designed as the garden of the Medici family's Pitti Palace in the 16th-century",
    imageUrl: "/images/interests/photography-88.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Fontana del Forcone",
    description: "The Fountain of Neptune inside the Boboli Gardens",
    imageUrl: "/images/interests/photography-89.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Statua dell'Abbondanza",
    description: "The Statue of Abundance inside the Boboli Gardens",
    imageUrl: "/images/interests/photography-90.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Fontana dell'Oceano",
    description: "The Fountain of the Ocean is a 16th-century masterpiece by Giambologna located on an island within the Boboli Gardens in Florence, and in the surrounding moat, there are statues of Perseus and Andromeda",
    imageUrl: "/images/interests/photography-91.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Flowers in Florence",
    description: "Me on the side of a street in Florence with some flowers in the background",
    imageUrl: "/images/interests/photography-92.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Pizza",
    description: "Pizza from a pizzeria in Florence",
    imageUrl: "/images/interests/photography-93.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Museo Galileo",
    description: "Collection of artifacts from the 15th and 16th-centuries, with Galileo Galilei's scientific instruments and personal items on display",
    imageUrl: "/images/interests/photography-94.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Museo Interattivo Leonardo da Vinci",
    description: "A collection of interactive machines modeled on Leonardo Da Vinci's original sketches",
    imageUrl: "/images/interests/photography-95.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Street Musicians in Florence",
    description: "In a restaurant in Florence, watching street performers play music",
    imageUrl: "/images/interests/photography-96.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Trapizzino",
    description: "Trapizzino from a shop in Rome",
    imageUrl: "/images/interests/photography-97.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: First Day in Rome",
    description: "Me on the street after arriving in Rome",
    imageUrl: "/images/interests/photography-98.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Statua di Cesare Ottaviano",
    description: "A modern bronze statue of Augustus, a replica of Augusto di Prima Porta, located near Trajan's Forum in Rome",
    imageUrl: "/images/interests/photography-99.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Basilica Papale di Santa Maria Maggiore",
    description: "Papal Basilica of Saint Mary Major, founded in the 5th-century and known for its Roman mosaics and gilded ceiling, and one of the Seven Pilgrim Churches of Rome",
    imageUrl: "/images/interests/photography-100.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Monumento a Vittorio Emanuele II",
    description: "Massive marble neoclassical temple honouring Italy's first king, Vittorio Emanuele II, and Italy's First World War soldiers",
    imageUrl: "/images/interests/photography-101.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Scalinata di Trinità dei Monti",
    description: "The Spanish Steps known for its irregular butterfly-shaped design, and built in 18th-century at a French diplomat's bequest, located beside the Piazza di Spagna, a square in the centre of Rome",
    imageUrl: "/images/interests/photography-102.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Atop Scalinata di Trinità dei Monti",
    description: "Me at the top of the Spanish Steps, overlooking Rome",
    imageUrl: "/images/interests/photography-103.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Lemons",
    description: "Lemons being sold in a shop in the Piazza di Spagna in Rome",
    imageUrl: "/images/interests/photography-104.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Pantheon",
    description: "The world famous temple built in Rome in the 2nd-century as a Roman temple, and now as a Catholic church, containing several Renaissance tombs, including Raphael's",
    imageUrl: "/images/interests/photography-105.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Inside the Pantheon",
    description: "Inside the Pantheon, looking up at the dome, which two thousand years after it was built still remains as the world's largest unreinforced concrete dome",
    imageUrl: "/images/interests/photography-106.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Tomba di Vittorio Emanuele II",
    description: "The tomb of Vittorio Emanuele II, the first king of unified Italy, located inside the Pantheon in Rome",
    imageUrl: "/images/interests/photography-107.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Fontana di Trevi",
    description: "The Trevi Fountain, an aqueduct-fed rococo fountain in Rome designed by Nicola Salvi and completed in 1762, featuring sculpted figures",
    imageUrl: "/images/interests/photography-108.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Roman Street Gambling",
    description: "People gambling on the street in Rome",
    imageUrl: "/images/interests/photography-109.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Foro di Traiano",
    description: "Trajan's Forum is the remains of the Roman square, built in the 2nd-century with a column celebrating victory over Dacia",
    imageUrl: "/images/interests/photography-110.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Tiramisù",
    description: "Tiramisù from a Roman supermarket",
    imageUrl: "/images/interests/photography-111.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Ponte Sant'Angelo",
    description: "St. Angelo Bridge, a pedestrian bridge in Rome built in the 2nd-century by the Roman Emperor Hadrian with travertine marble fascias and spanning the River Tiber",
    imageUrl: "/images/interests/photography-112.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Castel Sant'Angelo",
    description: "Circular, 2nd-century castle in Rome, initially commissioned by the Roman Emperor Hadrian as a mausoleum for himself and his family, the popes later used the building as a fortress and castle dedicated to Saint Michael the Archangel, and it is now a museum housing furniture and paintings from the Renaissance",
    imageUrl: "/images/interests/photography-113.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Atop Castel Sant'Angelo",
    description: "Me beside a wall in the Castel Sant'Angelo, with the River Tiber and Ponte Vittorio Emanuele II in the background",
    imageUrl: "/images/interests/photography-114.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Inside Castel Sant'Angelo",
    description: "Inside one of the rooms in the Castel Sant'Angelo, with several Renaissance artworks on display",
    imageUrl: "/images/interests/photography-115.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Fontana dei Quattro Fiumi",
    description: "A 17th-century fountain located inside the Piazza Navona in Rome, built as an homage to the four rivers, and featuring Obelisco Agonale, a Roman obelisk, topped by a dove",
    imageUrl: "/images/interests/photography-116.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Museo dei Gladiatori",
    description: "A gladiator museum in Rome, featuring the gladiators' equipment",
    imageUrl: "/images/interests/photography-117.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Roman Apartment",
    description: "Apartment complex in the center of Rome",
    imageUrl: "/images/interests/photography-118.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Area Sacra di Largo Argentina",
    description: "This archaeological site in Rome is close to where the famous Roman general Julius Caesar was assassinated, and now is home to a colony of cats",
    imageUrl: "/images/interests/photography-119.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Terme di Caracalla",
    description: "The Baths of Caracalla in Rome were a vast rectangular-shaped Roman thermal bath complex used between the 3rd to 6th-centuries, and were Rome's second largest public bath complex, after the Baths of Diocletian",
    imageUrl: "/images/interests/photography-120.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Outside Terme di Caracalla",
    description: "Me in the park surrounding the Baths of Caracalla",
    imageUrl: "/images/interests/photography-121.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Villa Borghese",
    description: "A vast urban park in Rome with formally landscaped gardens, a lake and villas now housing important museums",
    imageUrl: "/images/interests/photography-122.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Arco di Costantino",
    description: "The Arch of Constantine, a triumphal arch in Rome that's 21 meter-high and composed of 3 arches, dedicated to the Emperor Constantine the Great to commemorate his victory over Maxentius at the Battle of the Milvian Bridge in 312 AD",
    imageUrl: "/images/interests/photography-123.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Foro Romano",
    description: "The Roman Forum in Rome, a vast excavated area of ancient Roman temples, squares and government buildings, some dating back 2,000 years",
    imageUrl: "/images/interests/photography-124.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Tempio di Antonino e Faustina",
    description: "The Antoninus and Faustina Temple, located inside the Roman Forum, is an ancient Roman temple built by Emperor Antoninus on his wife's death in 141 AD",
    imageUrl: "/images/interests/photography-125.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: More Foro Romano",
    description: "Another view of the Roman Forum",
    imageUrl: "/images/interests/photography-126.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Casa delle Vestali",
    description: "House of the Vestals, featuring ancient statues in the Roman Forum situated beside the remains of an old atrium and palace",
    imageUrl: "/images/interests/photography-127.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Fontana delle Pelte",
    description: "The Fountain of the Pelte is the central fountain on Palatine Hill, the centremost of Rome's seven hills, and is the legendary birthplace of the city of Rome",
    imageUrl: "/images/interests/photography-128.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Fontana Venezia Sposa il Mare",
    description: "The Venice Marries the Sea fountain is an 18th-century Baroque masterpiece by Carlo Monaldi, located in the courtyard of Palazzo Venezia in Rome",
    imageUrl: "/images/interests/photography-129.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Colosseo",
    description: "The Colosseum, the legendary 3-tiered Roman amphitheatre built in the 1st-century and once used for gladiatorial games and other events, located in the center of Rome it is the largest ancient amphitheatre ever built, and is the largest standing amphitheatre in the world and one of the Seven Wonders of the World",
    imageUrl: "/images/interests/photography-130.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: L'arena del Colosseo",
    description: "View of the interior of the Colosseum from the arena floor",
    imageUrl: "/images/interests/photography-131.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Colosseo Outfit I",
    description: "Me putting on my Venetian mask I bought in Florence, while standing inside the Colosseum's arena",
    imageUrl: "/images/interests/photography-132.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Colosseo Outfit II",
    description: "Me with the Venetian mask on, standing inside the Colosseum's arena recreating the King Baldwin IV of Jerusalem scene from the film, Kingdom of Heaven, directed by Ridley Scott",
    imageUrl: "/images/interests/photography-133.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Top Row View of the Colosseo",
    description: "On the top row of the Colosseum, looking down at the arena floor during the sunset",
    imageUrl: "/images/interests/photography-134.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Another Top Row View of the Colosseo",
    description: "On the top row of the Colosseum but at a different vantage point, looking down at the arena floor during the sunset",
    imageUrl: "/images/interests/photography-135.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Scuola Gladiatori Roma, 'Gruppo Storico Romano'",
    description: "The Rome Gladiator School, known as 'Gruppo Storico Romano' open to public, and offering 'training' to be a gladiator, as well as watching live gladiator fights",
    imageUrl: "/images/interests/photography-136.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Wine at Scuola Gladiatori Roma",
    description: "Drinking red wine offered to me at the Rome Gladiator School, while watching gladiators fight",
    imageUrl: "/images/interests/photography-137.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Pantomime Intermission during Gladiator Fight",
    description: "During a break of the gladiators fighting, there was a pantomime theatre show",
    imageUrl: "/images/interests/photography-138.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Gladiator Fight",
    description: "Gladiators fighting, one jumping up with a sword and shield to defeat the other",
    imageUrl: "/images/interests/photography-139.jpg",
    category: "photography" as const,
  },
  {
    title: "Italy 2025: Gladiator",
    description: "The winning gladiator kneeling down to rest",
    imageUrl: "/images/interests/photography-140.jpg",
    category: "photography" as const,
  },
  {
    title: "Vatican City 2025: Palazzo Apostolico",
    description: "The grand pillared Vatican City residence for the Pope with papal apartments",
    imageUrl: "/images/interests/photography-141.jpg",
    category: "photography" as const,
  },
  {
    title: "Vatican City 2025: Fontane di Piazza San Pietro",
    description: "The Fountain of St. Peter's Square in the Vatican City was built in the 17th-century by the architect Carlo Maderno, and located beside St. Peter Square Obelisk, a monumental granite obelisk dating to Ancient Egyptian times",
    imageUrl: "/images/interests/photography-142.jpg",
    category: "photography" as const,
  },
  {
    title: "Vatican City 2025: Basilica di San Pietro",
    description: "Saint Peter's Basilica, a church of the Italian High Renaissance, located in Vatican City and the largest church in the world by interior size, it was built to replace the ageing Old St. Peter's Basilica that was built in the 4th-century by Roman Emperor Constantine the Great",
    imageUrl: "/images/interests/photography-143.jpg",
    category: "photography" as const,
  },
  {
    title: "Vatican City 2025: Interior of Basilica di San Pietro",
    description: "The interior of one of Saint Peter's Basilica's domes, featuring a Renaissance fresco",
    imageUrl: "/images/interests/photography-144.jpg",
    category: "photography" as const,
  },
  {
    title: "Vatican City 2025: Baldacchino di San Pietro",
    description: "St. Peter's Baldachin is a large Baroque sculpted bronze canopy over the high altar of Saint Peter's Basilica in Vatican City, it was designed in the 17th-century by Gian Lorenzo Bernini and was built right above the place of Saint Peter's tomb",
    imageUrl: "/images/interests/photography-145.jpg",
    category: "photography" as const,
  },
  {
    title: "Vatican City 2025: La Cattedra di San Pietro",
    description: "The Chair of Saint Peter is located inside Saint Peter's Basilica in Vatican City, originally from the 9th-century as a wooden chair, it was enshrined in a 17th-century bronze sculpture by Gian Lorenzo Bernini, to represent the authority of the Pope as the successor of Saint Peter",
    imageUrl: "/images/interests/photography-146.jpg",
    category: "photography" as const,
  },
  {
    title: "Vatican City 2025: Panoramic View of Vatican City and Rome",
    description: "Atop the dome of Saint Peter's Basilica, overlooking Vatican City and Rome",
    imageUrl: "/images/interests/photography-147.jpg",
    category: "photography" as const,
  },
  {
    title: "Vatican City 2025: Atop Basilica di San Pietro",
    description: "Atop the dome of Saint Peter's Basilica, me looking out at Vatican City and Rome",
    imageUrl: "/images/interests/photography-148.jpg",
    category: "photography" as const,
  },
  {
    title: "Vatican City 2025: Fontana della Pigna",
    description: "The Fontana della Pigna, or Pinecone Fountain, is a massive, roughly 4 meter-tall Roman bronze sculpture from the 1st or 2nd-century, located in the Vatican City's Courtyard of the Pinecone",
    imageUrl: "/images/interests/photography-149.jpg",
    category: "photography" as const,
  },
  {
    title: "Vatican City 2025: Cortile della Biblioteca",
    description: "The Cortile della Biblioteca, or Library Courtyard, is a key section of the Vatican courtyards, built in the 19th-century within the Vatican Palace",
    imageUrl: "/images/interests/photography-150.jpg",
    category: "photography" as const,
  },
  {
    title: "Vatican City 2025: Musei Vaticani",
    description: "Artwork featured in the Vatican Museums",
    imageUrl: "/images/interests/photography-151.jpg",
    category: "photography" as const,
  },
  {
    title: "Vatican City 2025: Scuola di Atene",
    description: "The School of Athens, a famous fresco by the Italian Renaissance artist Raphael painted in the 16th-century to decorate the rooms now called the Stanze di Raffaello in the Apostolic Palace in Vatican City",
    imageUrl: "/images/interests/photography-152.jpg",
    category: "photography" as const,
  },
  {
    title: "Vatican City 2025: Cappella Sistina",
    description: "The Sistine Chapel, the famous chapel in the Vatican Museums, best known for featuring Michelangelo's famous 16th-century painted ceiling which includes The Creation of Adam",
    imageUrl: "/images/interests/photography-153.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Döner",
    description: "Döner kebab in Munich",
    imageUrl: "/images/interests/photography-154.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Rosengarten im Westpark",
    description: "The rose garden in Westpark in Munich",
    imageUrl: "/images/interests/photography-155.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Playground in Westpark",
    description: "Me swinging in a playground in Westpark in Munich",
    imageUrl: "/images/interests/photography-156.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Mini Cooper Hatchback",
    description: "Mini Cooper hatchback on the street in Munich",
    imageUrl: "/images/interests/photography-157.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: U-Bahn München",
    description: "Taking the Munich U-Bahn, the electric rapid transit network in Munich",
    imageUrl: "/images/interests/photography-158.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Rave in Ebersberger Forst",
    description: "A rave in the Ebersberg forest, located in the outskirts of Munich",
    imageUrl: "/images/interests/photography-159.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Neues Rathaus",
    description: "The New Town Hall in Munich, is an ornate neo-Gothic town hall with a soaring tower for city views and featuring the famous glockenspiel chiming daily",
    imageUrl: "/images/interests/photography-160.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Englischer Garten",
    description: "The English Garden in Munich, is an expansive, 18th-century, urban park with 78 kilometres of cycling and jogging trails with a lakeside beer garden",
    imageUrl: "/images/interests/photography-161.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: KZ-Gedenkstätte Dachau",
    description: "The Dachau Concentration Camp Memorial Site in Dachau, is a Nazi concentration camp memorial and museum, with photographs, documents and reconstructed cell blocks",
    imageUrl: "/images/interests/photography-162.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Brandenburger Tor",
    description: "The Brandenburg Gate is a restored 18th-century gate and landmark in Berlin with 12 Doric columns topped by a classical goddess statue",
    imageUrl: "/images/interests/photography-163.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Denkmal für die ermordeten Juden Europas",
    description: "The Memorial to the Murdered Jews of Europe is a 2,710 column vast mazelike Holocaust memorial in Berlin, with an underground exhibition room",
    imageUrl: "/images/interests/photography-164.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Dokumentationszentrum Topographie des Terrors",
    description: "The Topography of Terror is a modern history museum in Berlin located on the site of the former Gestapo headquarters, and documents the horrors of Nazism",
    imageUrl: "/images/interests/photography-165.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Checkpoint Charlie",
    description: "A landmark boundary marking east and west Berlin with a white sentry guard house and cobbled border line",
    imageUrl: "/images/interests/photography-166.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Berlin Story Bunker",
    description: "Berlin Story Bunker in Berlin is a subterranean museum tracing 800 years of city history with a reconstruction of Hitler's bunker",
    imageUrl: "/images/interests/photography-167.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Inside Berlin Story Bunker",
    description: "The washroom inside the Berlin Story Bunker",
    imageUrl: "/images/interests/photography-168.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Bumble Coffee",
    description: "Drinking a Bumble Coffee, which is an Americano with orange juice over ice in Berlin",
    imageUrl: "/images/interests/photography-169.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Neue Wache",
    description: "The Neue Wache, or New Watchhouse, in Berlin is a war remembrance building restored after World War II bombings",
    imageUrl: "/images/interests/photography-170.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Altes Museum",
    description: "The Altes Museum, or Old Museum, in Berlin is a landmark neoclassical building with 18 columns and rotunda, with displays of Roman and Greek artifacts",
    imageUrl: "/images/interests/photography-171.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Berliner Dom",
    description: "The Berliner Dom, or Berlin Cathedral, in Berlin is a monumental 19th-century German Protestant church with an organ made of 7,269 pipes, and also featuring royal tombs and a dome for city views",
    imageUrl: "/images/interests/photography-172.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: DDR Museum",
    description: "The DDR Museum is a museum in Berlin showcasing the everyday life in a pre-unified Germany through interactive exhibits, it is also the 11th most visited museum in Berlin",
    imageUrl: "/images/interests/photography-173.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Neptunbrunnen",
    description: "The Neptune Fountain in Berlin depicts the Roman god of water, Neptune, and 4 women representing Prussia's main rivers",
    imageUrl: "/images/interests/photography-174.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Alexanderplatz",
    description: "Train station Alexanderplatz in Berlin, is a regional station in a historic square rebuilt after war damage and running both S-Bahn and U-Bahn services",
    imageUrl: "/images/interests/photography-175.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Spree River",
    description: "The river Spree in Berlin after sunset",
    imageUrl: "/images/interests/photography-176.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Siegessäule",
    description: "The Victory Column in Berlin is a 67 meter-high gilded column commemorating victory in the Prussian-Danish war, with a deck for city views",
    imageUrl: "/images/interests/photography-177.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Altgermanische Wisentjagd",
    description: "The Altgermanische Wisentjagd is an outdoor sculpture by Fritz Schaper, installed along Fasanerieallee in the Tiergarten in Berlin",
    imageUrl: "/images/interests/photography-178.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Spielplatz",
    description: "Playground in Viktoriapark, an urban park in Berlin",
    imageUrl: "/images/interests/photography-179.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Nationaldenkmal für die Befreiungskriege",
    description: "The Prussian National Monument for the Liberation Wars in Viktoriapark in Berlin is a war memorial for the Napoleonic Wars",
    imageUrl: "/images/interests/photography-180.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Flughafen Tempelhof",
    description: "The Tempelhof Airport in Berlin is a former military airport and now a park, museum and events space",
    imageUrl: "/images/interests/photography-181.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Deutsches Technikmuseum - Ladestraße",
    description: "The German Museum of Technology in Berlin, is a museum of science and technology, exhibiting a large collection of historical technical artifacts",
    imageUrl: "/images/interests/photography-182.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Deutsches Technikmuseum - Spectrum 'Electricity'",
    description: "The science center section of the German Museum of Technology in Berlin featuring hands-on experiments in light, electricity and sound at a multimedia, family museum founded in 1983",
    imageUrl: "/images/interests/photography-183.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Deutsches Technikmuseum - Spectrum 'Light'",
    description: "Another experiment in the science center section of the German Museum of Technology in Berlin",
    imageUrl: "/images/interests/photography-184.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Deutsches Technikmuseum",
    description: "The main exhibition in the German Museum of Technology in Berlin featuring different methods of  transportation and technologies with an airplane on the roof, set in a green park with windmills",
    imageUrl: "/images/interests/photography-185.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Zossener Str. 33",
    description: "Zossener Str. 33 is an address in Berlin for an underground, punk clothing store that I visited",
    imageUrl: "/images/interests/photography-186.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Tresor",
    description: "Tresor is a famous 3-story nightclub in Berlin founded in March 1991, built in the location of a converted heating plant, the club is primarily known for playing techno",
    imageUrl: "/images/interests/photography-187.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Flakturm Humboldthain",
    description: "The remains of a World War II anti-aircraft gun blockhouse tower, with city views of Berlin",
    imageUrl: "/images/interests/photography-188.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Geldzählerbrunnen",
    description: "Fountain in Pappelplatz in Berlin",
    imageUrl: "/images/interests/photography-189.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Holzmarkt 25",
    description: "Park in Berlin known for its riverside views, bohemian bars and food stands",
    imageUrl: "/images/interests/photography-190.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Berghain",
    description: "Berghain is a famous nightclub in Berlin founded in 2004, built in the location of a former power plant with a stage for regular live acts, typically DJs playing techno music",
    imageUrl: "/images/interests/photography-191.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Berliner Mauer I",
    description: "The Berlin Wall that originally was a guarded concrete barrier that encircled West Berlin from 1961 to 1989, separating it from East Berlin and the German Democratic Republic (i.e. East Germany) and now contains artworks by various artists",
    imageUrl: "/images/interests/photography-192.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Berliner Mauer II",
    description: "Another artwork on the Berlin Wall",
    imageUrl: "/images/interests/photography-193.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Berliner Mauer III",
    description: "Also another artwork on the Berlin Wall",
    imageUrl: "/images/interests/photography-194.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Hamburger Bahnhof I",
    description: "The Hamburger Bahnhof is a contemporary art national gallery museum in a former 19th-century railway station in Berlin, showing works from 1960 to the present",
    imageUrl: "/images/interests/photography-195.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Hamburger Bahnhof II",
    description: "Short film being played in the Hamburger Bahnhof museum",
    imageUrl: "/images/interests/photography-196.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Hamburger Bahnhof III",
    description: "Photography slideshow being played in the Hamburger Bahnhof museum",
    imageUrl: "/images/interests/photography-197.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Hamburger Bahnhof IV",
    description: "Artwork on display in the Hamburger Bahnhof museum",
    imageUrl: "/images/interests/photography-198.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Nordhafenpark West",
    description: "Park in Berlin",
    imageUrl: "/images/interests/photography-199.jpg",
    category: "photography" as const,
  },
  {
    title: "Germany 2025: Last Day in Berlin",
    description: "Me on my last day in Berlin",
    imageUrl: "/images/interests/photography-200.jpg",
    category: "photography" as const,
  },
  {
    title: "Scotland 2025: Ayr Train Station",
    description: "Arriving in the Ayr train station in Scotland",
    imageUrl: "/images/interests/photography-201.jpg",
    category: "photography" as const,
  },
  {
    title: "Scotland 2025: Robert Burns Statue",
    description: "Statue of Robert Burns in Ayr, a Scottish poet and lyricist and widely regarded as the national poet of Scotland",
    imageUrl: "/images/interests/photography-202.jpg",
    category: "photography" as const,
  },
  {
    title: "Scotland 2025: St. Leonards Church",
    description: "St. Leonards Church in Ayr",
    imageUrl: "/images/interests/photography-203.jpg",
    category: "photography" as const,
  },
  {
    title: "Scotland 2025: Abbotsford Hotel",
    description: "Abbotsford Hotel in Ayr where my family and I stayed for my cousin's wedding",
    imageUrl: "/images/interests/photography-204.jpg",
    category: "photography" as const,
  },
  {
    title: "Scotland 2025: Burns Cottage I",
    description: "Burns Cottage in Ayr is the birthplace of the Scottish poet Robert Burns and now serves as a museum",
    imageUrl: "/images/interests/photography-205.jpg",
    category: "photography" as const,
  },
  {
    title: "Scotland 2025: Burns Cottage II",
    description: "View of Burns Cottage from the garden",
    imageUrl: "/images/interests/photography-206.jpg",
    category: "photography" as const,
  },
  {
    title: "Scotland 2025: River Doon Estuary",
    description: "Bird watching area in the Firth Of Clyde by the town of Ayr",
    imageUrl: "/images/interests/photography-207.jpg",
    category: "photography" as const,
  },
  {
    title: "Scotland 2025: St. Germain-En-Laye Gardens",
    description: "St. Germain-En-Laye Gardens in Ayr",
    imageUrl: "/images/interests/photography-208.jpg",
    category: "photography" as const,
  },
  {
    title: "Scotland 2025: My Cousin's Wedding",
    description: "Attending my cousin's wedding in Ayr",
    imageUrl: "/images/interests/photography-209.jpg",
    category: "photography" as const,
  },
  {
    title: "Scotland 2025: My Brother and I at Cousin's Wedding",
    description: "My brother Antonije and I at my cousin's wedding in Ayr",
    imageUrl: "/images/interests/photography-210.jpg",
    category: "photography" as const,
  },
  {
    title: "Scotland 2025: Sunset at Ayr Beach",
    description: "Sunset at Ayr Beach in Scotland",
    imageUrl: "/images/interests/photography-211.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: View from Grandparents' Apartment",
    description: "View of the neighbourhood Zvezdara in Belgrade from my grandparents' apartment",
    imageUrl: "/images/interests/photography-212.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Споменик Ћирилу и Методију",
    description: "Monument to Cyril and Methodius in Belgrade, they were brothers, Byzantine Christian theologians and missionaries, popular for their work evangelizing the Slavs, and known as the 'Apostles to the Slavs' as well as credited with devising the Glagolitic alphabet, the first alphabet used to transcribe Old Church Slavonic",
    imageUrl: "/images/interests/photography-213.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Споменик Вуку Караџићу",
    description: "Monument to Vuk Karadžić in Belgrade, a Serbian philologist, anthropologist and linguist and one of the most important reformers of the modern Serbian language",
    imageUrl: "/images/interests/photography-214.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Споменик Николи Тесли",
    description: "Monument to Nikola Tesla in Belgrade, a Serbian-American inventor, electrical engineer, and physicist",
    imageUrl: "/images/interests/photography-215.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Машински факултет Универзитета у Београду",
    description: "The Faculty of Mechanical Engineering of the University of Belgrade, where my father studied",
    imageUrl: "/images/interests/photography-216.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Теразијска Чесма",
    description: "The Terazija fountain in Belgrade, a historic 6.35 meter-tall romantic-style monument located in front of the Hotel Moskva",
    imageUrl: "/images/interests/photography-217.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Хотел Москва",
    description: "Hotel Moskva, a four star hotel in Belgrade, and one of the oldest currently operating in Serbia",
    imageUrl: "/images/interests/photography-218.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Споменик Кнезу Михаилу",
    description: "Monument to Prince Mihailo, a Serbian noble and military leader, located in the main Republic Square in Belgrade",
    imageUrl: "/images/interests/photography-219.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Правни факултет Универзитета у Београду",
    description: "The Faculty of Law of the University of Belgrade",
    imageUrl: "/images/interests/photography-220.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Српска православна црква Светог Марка",
    description: "View of the Serbian Orthodox Church of Saint Mark in Tašmajdan Park in Belgrade",
    imageUrl: "/images/interests/photography-221.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Apartment Complex",
    description: "Apartment complex in Belgrade",
    imageUrl: "/images/interests/photography-222.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Belgrade Design District",
    description: "Hip shopping complex featuring local fashion designers in a formerly abandoned shopping center in Belgrade",
    imageUrl: "/images/interests/photography-223.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Бадње вече",
    description: "Celebrating Orthodox Christmas Eve, on January 6th, in Belgrade, shopping for a young oak branch (бадњак)",
    imageUrl: "/images/interests/photography-224.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Пекара Трпковић",
    description: "Trpković's bakery in Belgrade, operating since 1908, and known for making some of the best burek in the city",
    imageUrl: "/images/interests/photography-225.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Игралиште Бубамара",
    description: "Playground by my grandparents' apartment in Belgrade",
    imageUrl: "/images/interests/photography-226.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Храм Светог Саве",
    description: "The Church of Saint Sava in Belgrade, the largest Serbian Orthodox church in the world, and one of the largest Orthodox churches in the world, built on the site where it is believed that the remains of Saint Sava were burned by the Ottoman Empire in 1595",
    imageUrl: "/images/interests/photography-227.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Inside Храм Светог Саве",
    description: "Inside the Church of Saint Sava in Belgrade, with its large dome and intricate mosaics",
    imageUrl: "/images/interests/photography-228.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Dinner at my Grandparents' Apartment",
    description: "Spaghetti and Serbian beer (Зајечарско пиво) for dinner at my grandparents' apartment in Belgrade",
    imageUrl: "/images/interests/photography-229.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Таблић",
    description: "Playing tablić, a popular Balkan card game, with my grandpa in Belgrade",
    imageUrl: "/images/interests/photography-230.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Chess",
    description: "Playing chess with my grandpa in Belgrade",
    imageUrl: "/images/interests/photography-231.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Пијаца Каленић",
    description: "Kalenić Market in Belgrade, a spacious open-air farmers' market featuring fresh produce, flowers and traditional Serbian products",
    imageUrl: "/images/interests/photography-232.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Палилулски Парк",
    description: "Palilula Park in Belgrade, featuring a playground",
    imageUrl: "/images/interests/photography-233.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Outdoor Chess Tables",
    description: "Chess tables set up in a public park in Belgrade",
    imageUrl: "/images/interests/photography-234.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Пијаца Ђерам",
    description: "Đeram Market in Belgrade, a traditional market and one of Belgrade's oldest and most well-maintained pre-war green markets",
    imageUrl: "/images/interests/photography-235.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Делијска Чесма",
    description: "The Delijska fountain is one of the most visited public fountains in Belgrade and located on Knez Mihailova Street, the main pedestrian and shopping zone in Belgrade",
    imageUrl: "/images/interests/photography-236.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Народни Музеј Србије",
    description: "The National Museum of Serbia in Belgrade, a large national museum with a celebrated European art collection, ancient artifacts and historical objects",
    imageUrl: "/images/interests/photography-237.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Serbian Dinner",
    description: "A traditional Serbian dinner with red wine",
    imageUrl: "/images/interests/photography-238.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Споменик Сибињанин Јанку",
    description: "Monument to Hunyadi János in Zemun, a municipality of Belgrade, he was a leading Hungarian politician and military figure in the 15th-century. The monument was given to Zemun as a gift from the Hungarian government to commemorate the anniversary of the Siege of Belgrade in 1456, in which the Kingdom of Hungary and the Serbian Despotate held off the Ottoman Empire",
    imageUrl: "/images/interests/photography-239.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Кула Гардош",
    description: "The Gardoš Tower is a memorial tower located in Zemun, a municipality of Belgrade",
    imageUrl: "/images/interests/photography-240.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Me in Café",
    description: "A photo of myself in a cozy café in Belgrade",
    imageUrl: "/images/interests/photography-241.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Српска Нова Година",
    description: "Celebrating Serbian New Year, on January 14th, in Belgrade with my grandparents",
    imageUrl: "/images/interests/photography-242.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Sunset in Belgrade",
    description: "A beautiful sunset while walking down a street in Belgrade",
    imageUrl: "/images/interests/photography-243.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Скадарлија",
    description: "Skadarlija is a vintage street and the main bohemian quarter of Belgrade, featuring cobblestone streets, traditional restaurants, art and live music",
    imageUrl: "/images/interests/photography-244.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Миодраг 'Дадо' Ђурић Gallery I",
    description: "Art exhibition in Belgrade, for Miodrag 'Dado' Đurić's artworks, a famous 20th-century Montenegrin-born artist",
    imageUrl: "/images/interests/photography-245.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Миодраг 'Дадо' Ђурић Gallery II",
    description: "Bowery, painted in 1962, is a significant oil on paper/board painting by Montenegrin-born artist Miodrag 'Dado' Đurić, created during his pivotal trip to New York",
    imageUrl: "/images/interests/photography-246.jpg",
    category: "photography" as const,
  },
  {
    title: "Serbia 2026: Миодраг 'Дадо' Ђурић Gallery III",
    description: "Merry-go-round (or Manège), painted between 1955 and 1956, by Montenegrin-born artist Miodrag 'Dado' Đurić",
    imageUrl: "/images/interests/photography-247.jpg",
    category: "photography" as const,
  },
]

const artItems = [
  {
    title: "Untitled 1",
    description: "",
    imageUrl: "/images/interests/art-1.jpg",
    category: "art" as const,
  },
  {
    title: "Untitled 2",
    description: "",
    imageUrl: "/images/interests/art-2.jpg",
    category: "art" as const,
  },
  {
    title: "Untitled 3",
    description: "",
    imageUrl: "/images/interests/art-3.jpg",
    category: "art" as const,
  },
  {
    title: "Untitled 4",
    description: "",
    imageUrl: "/images/interests/art-4.jpg",
    category: "art" as const,
  },
  {
    title: "Untitled 5",
    description: "",
    imageUrl: "/images/interests/art-5.jpg",
    category: "art" as const,
  },
]

export default function InterestsPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  // Sync dark class on html element for CSS variable theming
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])
  
  return (
    <div className="relative flex flex-col h-[100dvh] md:h-auto md:min-h-screen md:flex-row md:pb-16 md:pt-12">
      {/* Fixed Top Navigation */}
      <div className={`h-12 w-full shrink-0 md:fixed md:top-0 md:left-0 md:right-0 md:z-50 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
        <div className="relative flex items-center justify-between md:justify-center w-full h-full px-2 md:px-4 font-mono text-[clamp(8px,2.2vw,0.875rem)]">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`md:absolute md:left-4 p-1 md:p-2 rounded-full shrink-0 transition-colors ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"}`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <div className="flex flex-1 items-center justify-evenly md:flex-none md:justify-start md:gap-6">
            <a href="#cooking" className="hover:opacity-70 transition-opacity whitespace-nowrap">cooking</a>
            <a href="#photography" className="hover:opacity-70 transition-opacity whitespace-nowrap">
              <span className="md:hidden">photos</span>
              <span className="hidden md:inline">photography</span>
            </a>
            <a href="#art" className="hover:opacity-70 transition-opacity whitespace-nowrap">art</a>
            <a href="#music" className="hover:opacity-70 transition-opacity whitespace-nowrap">music</a>
            <a href="#fashion" className="hover:opacity-70 transition-opacity whitespace-nowrap">fashion</a>
            <a href="#films" className="hover:opacity-70 transition-opacity whitespace-nowrap">films</a>
          </div>
          <Link href="/" className="shrink-0 md:absolute md:right-4 hover:opacity-70 transition-opacity whitespace-nowrap">
            <span className="hidden md:inline">← back to marko&apos;s portfolio 🌺</span>
            <span className="md:hidden">← portfolio</span>
          </Link>
        </div>
      </div>

      <div
        className={`flex-1 overflow-y-auto overflow-x-hidden w-full md:flex-none md:w-1/2 p-4 md:p-8 font-mono relative z-10 order-2 md:order-1 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
      >

        {/* Header */}
        <div className="mb-12">
          <div className="mb-8">
            <h1 className="text-lg font-normal">Marko's Interests</h1>
            <p className="text-sm opacity-70 mt-2">Cooking, Photography, Painting and More</p>
          </div>
        </div>

        {/* Cooking Section */}
        <div id="cooking" className="mb-12 scroll-mt-16">
          <h2 className="text-sm lowercase mb-4 opacity-70">cooking</h2>
          <p className="text-sm opacity-70 mb-4">
            Experimenting with various cuisines at home, and blending traditional recipes with techniques I&apos;ve picked up from travelling and research.
          </p>
          <ImageCarousel items={cookingItems} isDarkMode={isDarkMode} />
        </div>

        {/* Photography Section */}
        <div id="photography" className="mb-12 scroll-mt-16">
          <h2 className="text-sm lowercase mb-4 opacity-70">photography</h2>
          <p className="text-sm opacity-70 mb-4">
            Life outtakes from all my adventures.
          </p>
          <ImageCarousel 
            items={photographyItems} 
            isDarkMode={isDarkMode} 
            countries={["Tunisia", "Costa Rica", "Chile", "Peru", "Ecuador", "Portugal", "Spain", "France", "Monaco", "Italy", "Vatican City", "Germany", "Scotland", "Serbia"]}
          />
        </div>

        {/* Art Section */}
        <div id="art" className="mb-12 scroll-mt-16">
          <h2 className="text-sm lowercase mb-4 opacity-70">art</h2>
          <p className="text-sm opacity-70 mb-4">
            Predominantly painting with soft oil pastels (from MUNGYO gallery).
          </p>
          <ImageCarousel items={artItems} isDarkMode={isDarkMode} />
        </div>

        {/* Music Section */}
        <div id="music" className="mb-12 scroll-mt-16">
          <h2 className="text-sm lowercase mb-4 opacity-70">music</h2>
          <div className={`border p-4 mb-4 ${isDarkMode ? "border-white/50" : "border-black/30"}`}>
            <h3 className="text-sm font-semibold mb-2">Record Collecting & DJing</h3>
            <p className="text-sm mb-3">
              I&apos;ve been collecting vinyl records for several years, focusing on electronic music, hip-hop, and alternative genres.
              DJing has become a creative outlet that combines my love for music with technical skills.
            </p>
            <p className="text-sm opacity-70">
              Favourite Artists: Aphex Twin, Sade, Radiohead, Nujabes, Yung Lean, Playboi Carti
            </p>
          </div>
          <MusicPlayer items={musicItems} isDarkMode={isDarkMode} />
        </div>

        {/* Fashion Section */}
        <div id="fashion" className="mb-12 scroll-mt-16">
          <h2 className="text-sm lowercase mb-4 opacity-70">fashion</h2>
          <div className={`border p-4 mb-4 ${isDarkMode ? "border-white/50" : "border-black/30"}`}>
            <h3 className="text-sm font-semibold mb-2">Style & Brands</h3>
            <p className="text-sm mb-3">
              Fashion is another form of self-expression for me. I appreciate both streetwear and more avant-garde designers.
            </p>
            <p className="text-sm opacity-70">
              Favourite Brands: Stüssy, Supreme, Nike, New Balance, Aries Arise, Paloma Wool, Fucking Awesome, Bode, Professor. E, Yohji Yamamoto
            </p>
          </div>
        </div>

        {/* Films & Animation Section */}
        <div id="films" className="mb-12 scroll-mt-16">
          <h2 className="text-sm lowercase mb-4 opacity-70">films</h2>
          <div className={`border p-4 mb-4 ${isDarkMode ? "border-white/50" : "border-black/30"}`}>
            <h3 className="text-sm font-semibold mb-2">Favourite Films</h3>
            <p className="text-sm mb-3">
              Kill Bill (2003-2004), The Lord of the Rings (2001-2003), City of God (2002), All About Lily Chou-Chou (2001),
              Memento (2000), Fight Club (1999), All About My Mother (1999), The Big Lebowski (1998), Gattaca (1997), Fallen Angels (1995), La Haine (1995),
              Dead Poets Society (1989), Time of the Gypsies (1988), Wings of Desire (1987), Mirror (1975), Blade Runner (1982)
            </p>
          </div>
          <div className={`border p-4 ${isDarkMode ? "border-white/50" : "border-black/30"}`}>
            <h3 className="text-sm font-semibold mb-2">Favourite Animations</h3>
            <p className="text-sm">
              serial experiments lain (1998), Samurai Champloo (2004), Trigun (1998), Violet Evergarden (2018),
              Naruto (2002-2017), The Boy and The Beast (2015), Fantastic Planet (1973)
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:block md:relative md:w-1/2 md:order-2">
        <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack={isDarkMode ? "hsl(0, 0%, 0%)" : "hsl(0, 0%, 95%)"}
          colorFront={isDarkMode ? "hsl(350, 75%, 50%)" : "hsl(220, 100%, 70%)"}
          shape="cat"
          type="4x4"
          pxSize={3}
          offsetX={0}
          offsetY={0}
          scale={0.8}
          rotation={0}
          speed={0.1}
        />
      </div>

      {/* Fixed Footer Links */}
      <div className={`h-12 w-full shrink-0 order-3 md:fixed md:bottom-0 md:left-0 md:right-0 md:z-50 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
        <div className="flex items-center justify-center gap-3 md:gap-6 w-full h-full px-2 md:px-4 font-mono text-[clamp(9px,2.4vw,0.875rem)] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden whitespace-nowrap">
          <a
            href="mailto:markociricilic@gmail.com"
            className="hover:opacity-70 transition-opacity"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/markociricilic/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/markociricilic"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            GitHub
          </a>
          <a
            href="/docs/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            Resume
          </a>
          <span className="opacity-70">📍 Toronto, ON</span>
        </div>
      </div>
    </div>
  )
}
