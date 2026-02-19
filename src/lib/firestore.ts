import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { University, Major } from "@/types";

// --- Universities ---

export async function getUniversities(): Promise<University[]> {
  const snapshot = await getDocs(
    query(collection(db, "universities"), orderBy("ranking"))
  );
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as University));
}

export async function getUniversityBySlug(slug: string): Promise<University | null> {
  const snapshot = await getDocs(
    query(collection(db, "universities"), where("slug", "==", slug))
  );
  if (snapshot.empty) return null;
  const d = snapshot.docs[0];
  return { id: d.id, ...d.data() } as University;
}

// --- Majors ---

export async function getMajors(): Promise<Major[]> {
  const snapshot = await getDocs(collection(db, "majors"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Major));
}

// --- User Profile ---

export async function saveUserProfile(uid: string, data: {
  email: string;
  displayName: string;
}) {
  await setDoc(doc(db, "users", uid), {
    ...data,
    createdAt: Timestamp.now(),
  }, { merge: true });
}

// --- Quiz Results ---

export async function saveQuizResult(uid: string, scores: Record<string, number>) {
  await addDoc(collection(db, "quizResults"), {
    uid,
    scores,
    createdAt: Timestamp.now(),
  });
}

// --- ENT Scores ---

export async function saveEntScore(uid: string, data: {
  scores: Record<string, number>;
  totalScore: number;
  category: string;
}) {
  await addDoc(collection(db, "entScores"), {
    uid,
    ...data,
    createdAt: Timestamp.now(),
  });
}

// --- Chat History ---

export async function saveChatMessage(uid: string, message: {
  role: "user" | "assistant";
  content: string;
}) {
  await addDoc(collection(db, "chatHistory"), {
    uid,
    ...message,
    createdAt: Timestamp.now(),
  });
}

export async function getChatHistory(uid: string) {
  const snapshot = await getDocs(
    query(
      collection(db, "chatHistory"),
      where("uid", "==", uid),
      orderBy("createdAt", "asc")
    )
  );
  return snapshot.docs.map((doc) => ({
    role: doc.data().role as "user" | "assistant",
    content: doc.data().content as string,
  }));
}
