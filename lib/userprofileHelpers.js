import { deleteDoc, doc, getDoc, setDoc, collection, query, where, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { deleteImage } from "./storageHelpers";

export async function submitDetails(email, name, bio) {
	// submit details to users collection and
	// sets the document id to the email of the user

	await setDoc(doc(db, "users", email), {
		email: email,
		name: name,
		bio: bio,
	});
}

export async function deleteUser(email) {
	// delete from user collection
	await deleteDoc(doc(db, "users", email));

	// delete from storage
	await deleteImage(email);
}

export async function getUserData(email) {
	/**
	 * FIRESTORE EXERCISE
	 * TODO: Complete this function by creating a firestore action here.
	 * Goal: Read the document tied to 'email' and return the data for it, if it exists.
	 * Documentation: https://firebase.google.com/docs/firestore/query-data/get-data
	 */

	// Insert your solution here.

	
	// get document from 'users' collection,
	// using email as the document id
	const docRef = doc(db, 'users/' + email);

	// get a snapshot of the document 
	const docSnap = await getDoc(docRef);

	// checking if the document exists
	// if it exists, we return the data
	if (docSnap.exists()) {
		return docSnap.data();
	}

	return null;
}