import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const Message = ({ children, color, top, bottom, end, ...props }) => {
	const classes = useStyles();

	return (
		<div
			className={[
				classes.message,
				top && classes['top' + (end ? 'Right' : 'Left')],
				bottom && classes['bottom' + (end ? 'Right' : 'Left')],
				end ? classes.end : classes.start
			]
				.filter((n) => !!n)
				.join(' ')}
			style={{ backgroundColor: color }}
			{...props}
		>
			{children}
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	message: {
		marginTop: theme.spacing(0.25),
		padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
		// marginLeft: theme.spacing(5),
		width: 'fit-content',
		maxWidth: `calc(clamp(${theme.spacing(500 / 8)}px, 25vw, 70vh) - ${theme.spacing(12)}px)`,
		borderRadius: theme.spacing(0.5),
		fontSize: '1rem',
		wordWrap: 'break-word',
		display: 'inline-block'
	},
	topLeft: {
		borderTopLeftRadius: theme.spacing(2.5),
		marginTop: theme.spacing(2)
	},
	bottomLeft: {
		borderBottomLeftRadius: theme.spacing(2.5)
	},
	topRight: {
		borderTopRightRadius: theme.spacing(2.5),
		marginTop: theme.spacing(2)
	},
	bottomRight: {
		borderBottomRightRadius: theme.spacing(2.5)
	},
	start: {
		borderTopRightRadius: theme.spacing(2.5),
		borderBottomRightRadius: theme.spacing(2.5)
	},
	end: {
		justifySelf: 'end',
		backgroundColor: `#${theme.palette.type === 'light' ? 'dddddd' : '333'} !important`,
		borderTopLeftRadius: theme.spacing(2.5),
		borderBottomLeftRadius: theme.spacing(2.5)
	}
}));

export default Message;
