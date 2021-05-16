import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Message from '../Message/Message';
import { IconButton, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const Chat = ({ color, socket, ...props }) => {
	const classes = useStyles();

	const [ messagesJSON, setMessagesJSON ] = useState([]);

	if (!!socket)
		socket.on('messagesJSON', (_messagesJSON) => {
			setMessagesJSON(_messagesJSON);
		});

	useEffect(
		() => {
			scrollDown();
		},
		[ messagesJSON ]
	);

	const [ text, setText ] = useState('');

	const chatDiv = useRef(null);

	const sendToServer = () => {
		if (text.replace(/\s/g, '').length) {
			if (!!socket) socket.emit('new-message', text);
			setText('');
		}
	};

	const scrollDown = () => {
		// console.log(chatDiv);
	};

	return (
		<div className={classes.root} {...props}>
			<div className={classes.messages} ref={chatDiv}>
				{messagesJSON.map((n, i) => {
					const top = i < 1 || messagesJSON[i - 1].name !== n.name;
					const bottom = i > messagesJSON.length - 2 || messagesJSON[i + 1].name !== n.name;
					const end = n.name !== socket.id;
					return (
						<Message key={i} {...{ color, top, bottom, end }}>
							{n.message}
						</Message>
					);
				})}
				<div className={classes.spacing} />
			</div>
			<div className={classes.textType}>
				<TextField
					id='standard-multiline-flexible'
					disabled={!!!socket}
					multiline
					rowsMax={5}
					value={text}
					onChange={(e) => setText(e.target.value)}
					className={classes.textInput}
					InputProps={{ disableUnderline: true }}
					placeholder='Type a message'
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault();
							sendToServer();
						}
					}}
				/>
				<IconButton style={{ backgroundColor: 'transparent' }} onClick={sendToServer}>
					<SendIcon style={{ color: '#9e9e9e' }} />
				</IconButton>
			</div>
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
		borderRadius: theme.spacing(2),
		maxHeight: '90%',
		display: 'grid',
		gridTemplateRows: '1fr auto',
		overflow: 'hidden'
	},
	messages: {
		width: `clamp(${theme.spacing(500 / 8)}px, 25vw, 70vh)`,
		padding: `0 ${theme.spacing(4)}px`,
		overflowY: 'overlay',
		overflowX: 'hidden',
		display: 'grid',
		borderTop: `${theme.spacing(4)}px solid transparent`,
		borderRadius: theme.spacing(2),
		position: 'relative',

		'&::before': {
			content: '""',
			width: `calc(clamp(${theme.spacing(500 / 8)}px, 25vw, 70vh) - ${theme.spacing(5.5)}px)`,
			height: theme.spacing(2),
			position: 'fixed',
			transform: 'translate(-50%, 0)',
			left: '50%',
			marginTop: -theme.spacing(1.25),
			pointerEvents: 'none',
			border: theme.spacing(1.25) + 'px solid ' + theme.palette.background.paper,
			borderBottom: 'none',
			borderTopLeftRadius: theme.spacing(2),
			borderTopRightRadius: theme.spacing(2)
		},

		'& *:first-child': {
			marginTop: 0
		},

		'&::-webkit-scrollbar': {
			width: theme.spacing(2),
			borderBottomRightRadius: theme.spacing(2)
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: `rgba(0,0,0,${theme.palette.type === 'light' ? 0.2 : 0.5})`,
			borderRadius: theme.spacing(1),
			border: '4px solid transparent',
			backgroundClip: 'padding-box'
		}
	},
	spacing: {
		minHeight: theme.spacing(2)
	},
	textType: {
		boxShadow: '0px -0px 20px rgba(0,0,0,0.2)',
		background: theme.palette.type === 'light' ? '#ccc' : theme.palette.background.default,
		padding: theme.spacing(1),
		display: 'grid',
		gridTemplateColumns: '1fr auto'
	},
	textInput: {
		backgroundColor: theme.palette.background.paper,
		borderRadius: theme.spacing(3),
		width: `calc(100% - ${theme.spacing(2)}px)`,
		padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
		paddingRight: 0,
		margin: `0 ${theme.spacing(1)}px`,
		color: theme.palette.text.primary,

		'& * *': {
			paddingRight: theme.spacing(0.5)
		},

		'& *::-webkit-scrollbar': {
			width: theme.spacing(2),
			borderBottomRightRadius: theme.spacing(2)
		},
		'& *::-webkit-scrollbar-thumb': {
			backgroundColor: `rgba(0,0,0,${theme.palette.type === 'light' ? 0.2 : 0.5})`,
			borderRadius: theme.spacing(1),
			border: '4px solid transparent',
			backgroundClip: 'padding-box'
		}
	}
}));

export default Chat;
