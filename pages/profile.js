import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';

import UpdateProfile from '../components/profile/updateProfile';
import CustomItem from '../components/profile/CustomItem';
import DetailsForm from '../components/profile/detailsForm';
import { getUserData, deleteUser, submitDetails } from "../lib/userprofileHelpers";
import { useEffect, useState } from "react";
import useAuthStore from '../lib/store/authStore';
import DefaultLayout from "../layouts/defaultLayout";

function ProfilePage() {
	const user = useAuthStore((state) => state.user);
	const [userEmail, setUserEmail] = useState("");
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");
	const [imageURL, setImageURL] = useState("");

	useEffect(() => {
		const userData = async () => {
			const result = await getUserData(userEmail);
			if (result) {
				setName(result.name);
				setBio(result.bio);
			}
		};
		setUserEmail(user?.email);
		userData().catch(console.error);
	}, [user, userEmail]);
	
	function onNameChange(name) {
		setName(name);
	}

	function onBioChange(bio) {
		setBio(bio);
	} 

	function onImageURLChange(imageURL) {
		setImageURL(imageURL);
	}

	async function handleUpdateUser() {
		await submitDetails(userEmail, name, bio);
		alert('succeeded in saving!')
	}

	async function handleDeleteUser() {
		await deleteUser(userEmail);
		setImageURL("");
		setBio("");
		setName("");
		alert('successfully deleted');
	}
		return (
			<DefaultLayout>
					<Stack spacing={4}>
						<CustomItem>
							<UpdateProfile 
							userEmail={userEmail}
							user={user}
							imageURL={imageURL}
							onImageURLChange={onImageURLChange}
							/>
						</CustomItem>
						<CustomItem>
							<DetailsForm 
							userEmail={userEmail} 
							onNameChange={onNameChange}
							onBioChange={onBioChange}
							name={name}
							bio={bio}
							/>
						</CustomItem>
						<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						>
							<Stack  direction="row" spacing={2}>
								<Button 
								variant="outlined"
								startIcon={<DeleteIcon/>}
								onClick={handleDeleteUser}
								color="error"
								>
									Reset Profile
								</Button>
								<Button
								variant="contained"
								onClick={handleUpdateUser}
								color="success">
									Save details
								</Button>
							</Stack>
						</Box>
					</Stack>
			</DefaultLayout>


		);
}

export default ProfilePage;