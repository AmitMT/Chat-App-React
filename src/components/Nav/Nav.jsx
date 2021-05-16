import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	AppBar,
	IconButton,
	Toolbar,
	useScrollTrigger,
	Slide,
	Typography
} from '@material-ui/core';
import LightIcon from '@material-ui/icons/Brightness7';
import DarkIcon from '@material-ui/icons/Brightness4';
import CommentIcon from '@material-ui/icons/Comment';

const Nav = ({ isLight, setIsLight, ...props }) => {
	const classes = useStyles();
	return (
		<div {...props} className={classes.root}>
			<HideOnScroll>
				<AppBar>
					<Toolbar>
						{/* <img src={logo} alt='logo' className={classes.logo} /> */}
						<CommentIcon className={classes.logo} />
						<Typography variant='h5' className={classes.title}>
							Chat App - Rom Kondom
						</Typography>
						<IconButton
							className={classes.IconButton}
							onClick={() => {
								setIsLight(!isLight);
							}}
						>
							{isLight ? (
								<LightIcon style={{ color: 'white' }} />
							) : (
								<DarkIcon style={{ color: 'white' }} />
							)}
						</IconButton>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
		</div>
	);
};

function HideOnScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({ target: window ? window() : undefined });

	return (
		<Slide appear={false} direction='down' in={!trigger}>
			{children}
		</Slide>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {},
	IconButton: {
		marginLeft: 'auto'
	},
	logo: {
		height: theme.spacing(3),
		marginRight: theme.spacing(0.25),
		color: 'white'
	},
	title: {
		color: 'white',
		// fontWeight: 800,
		fontFamily: '"Pacifico", cursive'
	}
}));

export default Nav;
