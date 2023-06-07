import mongoose from 'mongoose';

try {
  const client = await mongoose.connect(process.env.ATLAS_URI);
  console.log('Conntected to MongoDB');
} catch (error) {
  console.log(err.stack);
}
