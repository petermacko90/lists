import React from 'react';
import './List.css';

const List = ({ list, items, onClickList, onEnterList }) => {
	return (
		<div className="pa2 ma2 mt1 bg-yellow pointer shadow-3 noselect list"
		tabIndex="0" onClick={onClickList(list, list.id)}
		onKeyPress={onEnterList(list, list.id)}>
			<h3 className="f3-l f4-m f5 truncate">{list.title}</h3>
			<p>{list.modified.toLocaleDateString()}</p>
			<p className="list-items truncate">
				{
					items.slice(0, 5).map((item) => {
						return <span key={item.id}>- {item.name} </span>;
					})
				}
			</p>
		</div>
	);
}

export default List;
