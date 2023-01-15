import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

// Assumption is that we are saving the image file name as userEmail

async function uploadImage(userEmail, file) {
	// Create an image reference to the userEmail
	const imageRef = ref(storage, userEmail);

	// Upload the image to firestore
	await uploadBytes(imageRef, file)
	.then((snapshot) => {
		// Upload success!
	})
}

export async function deleteImage(userEmail) {
	// Create an image reference to the userEmail
	const imageRef = ref(storage, userEmail);

	// Delete the image reference from firestore
	await deleteObject(imageRef)
	.then(() => {

		// File deleted successfully

	}).catch((error) => {
		// Handle Error
	})

}

// Editing the image is basically deleting and reuploading it.

export async function editImage(userEmail, file) {
	// Delete the current image first
	await deleteImage(userEmail);

	// Upload the new image
	await uploadImage(userEmail, file);
}

// Obtains the current image of the user profile.
// Returns the download URL, so that JS can use the image.

export async function currentImage(userEmail) {
	/**
	 * FIREBASE STORAGE EXERCISE
	 * TODO: Complete this function by creating a firestore action here.
	 * GOAL: Obtain the user profile image from storage and return the download URL.
	 * Documentation: https://firebase.google.com/docs/storage/web/download-files
	 */
    return null;
}