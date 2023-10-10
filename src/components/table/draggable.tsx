import React, { DragEvent, useState } from 'react';
import styled from 'styled-components';

function Draggable({ col, min, last }: { col: number; min: number; last: boolean }) {
	const [drag, setDrag] = useState({ iniMouse: 0, iniSize: 0 });
	return (
		<StyledDiv
			style={{ right: `${last ? 0 : -4}px` }}
			draggable={true}
			onDragStart={(e: DragEvent) => {
				let iniMouse = e.clientX;
				let iniSize = (document.getElementsByClassName(`${col}`)[0] as HTMLElement).offsetWidth;

				setDrag({
					iniMouse: iniMouse,
					iniSize: iniSize,
				});
			}}
			onDrag={(e: DragEvent) => {
				if (e.screenX) {
					let iniMouse = drag.iniMouse;
					let iniSize = drag.iniSize;
					let endMouse = e.clientX;

					let endSize = iniSize + (endMouse - iniMouse);

					const elements = Array.from(document.getElementsByClassName(`${col}`));
					elements.forEach((cell) => {
						//(cell as HTMLElement).style.minWidth = `${endSize <= min ? min : endSize}px`;
						(cell as HTMLElement).style.width = `${endSize <= min ? min : endSize}px`;
					});
				}
			}}
		/>
	);
}

const StyledDiv = styled.div`
	cursor: col-resize;
	height: 100%;
	position: absolute;
	top: 0;
	width: 8px;
	z-index: 2;
`;

export default Draggable;
