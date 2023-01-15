import CustomItem from "./CustomItem";
import Stack from "@mui/material/Stack";
import TextField  from "@mui/material/TextField";

function DetailsForm(props) {
	function handleNameChange(e) {
		props.onNameChange(e.target.value);
	}

	function handleBioChange(e) {
		props.onBioChange(e.target.value);
	}

	return (
	<Stack>
			<CustomItem>
				<TextField
				label="Name"
				placeholder={"Name"}
				value={props.name}
				variant='standard'
				sx={{width: '25ch'}}
				onChange={handleNameChange}>
				</TextField>
			</CustomItem>
			<CustomItem>
				<TextField
				label="Bio"
				placeholder={"Bio"}
				value={props.bio}
				variant='standard'
				sx={{width: '25ch'}}
				onChange={handleBioChange}>
				</TextField>
			</CustomItem>
	</Stack>
	);
}

export default DetailsForm;