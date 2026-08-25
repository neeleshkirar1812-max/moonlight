import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from '../models/Video.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const raw = fs.readFileSync('C:\\Users\\neele\\.gemini\\antigravity\\scratch\\luxury-wedding-platform\\client\\src\\data\\moonlightFilms.json', 'utf8');
const films = JSON.parse(raw);

const seedVideos = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0.61illn3.mongodb.net/lumiere_studios?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB Atlas...');

    await Video.deleteMany({});
    console.log('Cleared existing videos...');

    const videoDocs = films.map((f, i) => {
      // Determine client names and location from title
      let clientNames = 'Moonlight Couple';
      let locationCity = 'Central India';
      let cat = 'Pre-Wedding';

      if (f.title.toLowerCase().includes('pre')) {
        cat = 'Pre-Wedding Film';
      } else if (f.title.toLowerCase().includes('teaser')) {
        cat = 'Cinema Teaser';
      } else if (f.title.toLowerCase().includes('engagement') || f.title.toLowerCase().includes('ring')) {
        cat = 'Engagement Film';
      } else {
        cat = 'Wedding Highlights';
      }

      if (f.title.includes('&')) {
        const parts = f.title.split('&');
        const first = parts[0].trim();
        const second = parts[1].split('|')[0].replace(/pre.*/i, '').replace(/teaser.*/i, '').trim();
        clientNames = `${first} & ${second}`;
      } else if (f.title.includes('Anant')) {
        clientNames = 'Anant & Sonam';
      } else if (f.title.includes('Karan')) {
        clientNames = 'Karan & Vaishali';
      } else if (f.title.includes('Piyush')) {
        clientNames = 'Piyush & Priyanka';
      } else if (f.title.includes('Shubhanshu')) {
        clientNames = 'Shubhanshu & Monika';
      }

      if (f.title.toLowerCase().includes('maheshwar')) {
        locationCity = 'Maheshwar Palace';
      } else if (f.title.toLowerCase().includes('mumbai')) {
        locationCity = 'Mumbai';
      } else if (f.title.toLowerCase().includes('bhopal')) {
        locationCity = 'Bhopal';
      } else if (f.title.toLowerCase().includes('film city')) {
        locationCity = 'Film City';
      } else {
        locationCity = 'Royal Destination';
      }

      return {
        title: f.title,
        youtubeUrl: f.youtubeUrl,
        youtubeVideoId: f.id,
        thumbnail: f.hqThumbnail,
        category: cat,
        clientNames: clientNames,
        location: { city: locationCity, venue: `${locationCity} Heritage` },
        description: `Cinematic royal wedding film produced by Moonlight Production (@moonlightproductions_films). Duration: ${f.duration}.`,
        duration: f.duration,
        isFeatured: i < 6,
        order: i,
      };
    });

    await Video.insertMany(videoDocs);
    console.log(`✅ Successfully seeded ${videoDocs.length} real Moonlight Production videos into MongoDB Atlas!`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding videos:', err);
    process.exit(1);
  }
};

seedVideos();
