/**
 * Скрипт миграции данных из data.ts в Firebase Firestore.
 *
 * Использование:
 * 1. Заполните .env файл Firebase конфигурацией
 * 2. Запустите: npx ts-node --compiler-options '{"module":"CommonJS","moduleResolution":"node"}' scripts/seed-firestore.ts
 *
 * Или добавьте в package.json:
 * "seed": "ts-node scripts/seed-firestore.ts"
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

// Вручную загрузите конфигурацию из .env или вставьте сюда
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Импортируем данные — при запуске нужно будет использовать ts-node с path aliases
// Или скопируйте данные напрямую
async function seed() {
  console.log("Начинаю миграцию данных в Firestore...");

  // Для запуска этого скрипта, скопируйте массивы universities и majors из src/lib/data.ts
  // и вставьте их сюда, или настройте path aliases для ts-node

  console.log("\nИнструкции:");
  console.log("1. Откройте src/lib/data.ts");
  console.log("2. Скопируйте массив universities и majors");
  console.log("3. Вставьте в этот файл и раскомментируйте код ниже");
  console.log("\nИли используйте Firebase Console для импорта данных вручную.");

  // Раскомментируйте после добавления данных:
  /*
  const { universities, majors } = require("../src/lib/data");

  for (const uni of universities) {
    await setDoc(doc(db, "universities", uni.id), uni);
    console.log(`✓ Университет: ${uni.nameRu}`);
  }

  for (const major of majors) {
    await setDoc(doc(db, "majors", major.id), major);
    console.log(`✓ Специальность: ${major.nameRu}`);
  }

  console.log("\nМиграция завершена!");
  */
}

seed().catch(console.error);
