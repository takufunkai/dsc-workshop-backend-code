import Stack  from "@mui/material/Stack";
import { Button } from '@mui/material';
import Avatar  from '@mui/material/Avatar';
import Person from '@mui/icons-material/Person';
import CustomItem from "./CustomItem";

import { useRef, useEffect } from "react";
import { editImage, currentImage } from "../../lib/storageHelpers";

function UpdateProfile(props) {
	const reference = useRef(undefined);

	function handleButtonOnClick() {
		if (reference) {
			return reference.current?.click();
		}
	}

	async function handleUpload(e) {
		var file = e.target.files[0];
		await editImage(props.userEmail, file);
		var result = await currentImage(props.userEmail);
		props.onImageURLChange(result);
	}

	useEffect(() => {
		const fetchImage = async () => {
			var result = await currentImage(props.userEmail);
			props.onImageURLChange(result);
		};

		fetchImage();
	}, [props.userEmail]);

	return (
	<Stack spacing={2}>
		<CustomItem>
			<Button
			component="label"
			style={{backgroundColor: 'transparent'}}
			disableRipple
			disabled
			>
				
				{props.imageURL != null && props.user != null
				? <Avatar sx={{width: 96, height: 96}} src={props.imageURL}/>
				: <Avatar sx={{width: 96, height: 96}}>
					<Person sx={{width: 80, height: 80}}/>
				</Avatar>
				}
				
			</Button>
		</CustomItem>
		<CustomItem>
			<div>
				<Button onClick={handleButtonOnClick}>Edit Profile</Button>
				<input
				type="file"
				ref={reference}
				hidden
				onChange={handleUpload}/>
			</div>		
			</CustomItem>
	</Stack>
	);
}

export default UpdateProfile;