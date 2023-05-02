import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import {
Firestore,
getFirestore,
doc,
setDoc,
collection,
query,
where,
getDocs
} from 'firebase/firestore';
import { IQuestion } from '../interfaces/question.interface';
import { QUESTIONS } from './questions';

const firebaseConfig = {
  apiKey: "AIzaSyD7Rn8P5UyunNfmpF1N7rPiKUsW9coG6BQ",
  authDomain: "trivia-s2023-5f114.firebaseapp.com",
  projectId: "trivia-s2023-5f114",
  storageBucket: "trivia-s2023-5f114.appspot.com",
  messagingSenderId: "490624417942",
  appId: "1:490624417942:web:cf266fff32a7950ac4c2b7"
};

@Injectable({
  providedIn: 'root'
})
export class FirabaseService {

  db: Firestore;
  questions: IQuestion[] = [];
  constructor() {
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);
  }

  async importData() {
    const collectionName = 'Questions';
    const q = QUESTIONS;
    for (const question of q) {
      const docRef = doc(collection(this.db, collectionName));
      await setDoc(docRef, question);
    }
  }

  async getAllQuestions(): Promise<IQuestion[]> {
    const collectionName = 'Questions';
    const collectionRef = collection(this.db, collectionName);
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as IQuestion);
  }


}
