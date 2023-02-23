import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  updateDoc,
  doc,
  deleteDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PasswordManagerService {
  // dependency injection
  constructor(private fireStore: Firestore) {}

  // INSERT DATA
  addSite(data: object) {
    const dbInstance = collection(this.fireStore, 'sites');
    return addDoc(dbInstance, data);
  }

  // LOAD DATA
  loadSites() {
    const dbInstance = collection(this.fireStore, 'sites');
    return collectionData(dbInstance, {
      idField: 'id',
    });
  }

  // DELETE DATA
  updateSite(id: string, data: object) {
    const dbInstance = doc(this.fireStore, 'sites', id);
    return updateDoc(dbInstance, data);
  }

  // DELETE DATA
  deleteSite(id: string) {
    const dbInstance = doc(this.fireStore, 'sites', id);
    return deleteDoc(dbInstance);
  }
}
