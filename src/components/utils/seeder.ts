import { db } from '../../firebaseConfig';
import { doc, setDoc, collection } from 'firebase/firestore';

const PRODUCTS_TO_ADD = [
  { id: '1', name: "Basket-Ball Jersey", price: 2450, category: "Player Jersey", image: "https://res.cloudinary.com/dczcyu7e7/image/upload/v1772340978/1_e4yu5d.jpg" },
  { id: '2', name: "Non-Player Jersey", price: 1850, category: "Non-Player Jersey", image: "https://res.cloudinary.com/dczcyu7e7/image/upload/v1772340979/2.1_f1kyuo.jpg" },
  { id: '3', name: "Badminton Jersey", price: 3200, category: "Player Jersey", image: "https://res.cloudinary.com/dczcyu7e7/image/upload/v1772340979/2.2_xlzczk.jpg" },
  { id: '4', name: "Woman's Volleyball Jersey", price: 2100, category: "Player Jersey", image: "https://res.cloudinary.com/dczcyu7e7/image/upload/v1772340980/2.3_fuaet1.jpg" },
  { id: '5', name: "Basket-Ball Jersey Elite", price: 2450, category: "Player Jersey", image: "https://res.cloudinary.com/dczcyu7e7/image/upload/v1772340978/1_e4yu5d.jpg" },
  { id: '6', name: "Non-Player Casual", price: 1850, category: "Non-Player Jersey", image: "https://res.cloudinary.com/dczcyu7e7/image/upload/v1772340979/2.1_f1kyuo.jpg" },
  { id: '7', name: "Badminton Pro", price: 3200, category: "Player Jersey", image: "https://res.cloudinary.com/dczcyu7e7/image/upload/v1772340979/2.2_xlzczk.jpg" },
  { id: '8', name: "Woman's Volleyball Pro", price: 2100, category: "Player Jersey", image: "https://res.cloudinary.com/dczcyu7e7/image/upload/v1772340980/2.3_fuaet1.jpg" },
];

export const seedProducts = async () => {
  try {
    const productsRef = collection(db, 'products');
    for (const item of PRODUCTS_TO_ADD) {
      // We use setDoc(doc(ref, id)) to ensure we use your specific IDs 1-8
      await setDoc(doc(productsRef, item.id), {
        ...item,
        stock: 100, // Adding a default stock
        createdAt: new Date()
      });
    }
    alert("🔥 JG Apparel Inventory: Seeding Complete!");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};