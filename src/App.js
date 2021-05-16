import React, { useEffect, useState } from 'react';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Chat from './components/Chat/Chat';
import Nav from './components/Nav/Nav';
import useLocalStorage from './hooks/useLocalStorage/useLocalStorage';
import { orange, lightBlue } from '@material-ui/core/colors';
import { io } from 'socket.io-client';

function App() {
	const classes = useStyles();

	const [ socket, setSocket ] = useState();

	useEffect(() => {
		const _socket = io('https://chat-app-server-amitmt.herokuapp.com/');
		setSocket(_socket);
		console.log(_socket);

		_socket.on('id', (id) => {
			console.log(id);
		});

		return () => {
			_socket.disconnect();
		};
	}, []);

	const [ isLight, setIsLight ] = useLocalStorage('isLight', true);

	console.log('https://chat-app-server-amitmt.herokuapp.com');

	const theme = createMuiTheme({
		palette: {
			primary: {
				main: isLight ? orange[500] : orange[800]
			},
			secondary: lightBlue,
			type: isLight ? 'light' : 'dark'
		}
	});

	return (
		<div className={classes.root}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Nav {...{ isLight, setIsLight }} />
				<div className={classes.ChatParent}>
					<Chat color={isLight ? orange[300] : orange[800]} {...{ socket }} />
				</div>
			</ThemeProvider>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {},
	ChatParent: {
		display: 'grid',
		alignItems: 'center',
		height: `calc(100vh - ${theme.spacing(8)}px)`,
		marginTop: theme.spacing(8),
		justifyContent: 'center'
	}
}));

export default App;
