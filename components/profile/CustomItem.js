import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const CustomItem = styled(Paper)(({theme}) => ({
	textAlign: 'center',
	borderColor: 'transparent',
	boxShadow: '0 0 0 0'

}));

export default CustomItem;