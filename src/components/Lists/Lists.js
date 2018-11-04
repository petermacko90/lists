import React from 'react';
import List from '../List/List';
import './Lists.css';

const Lists = ({ lists, items, onClickList, onEnterList }) => {
	let listComponenets = [];
	let itemsProp = [];
	
	lists.forEach((list) => {
		items.forEach((item) => {
			if (list.id === item.list_id) {
				itemsProp = itemsProp.concat(item);
			}
		});
		listComponenets = listComponenets.concat(
			<List
				key={list.id}
				list={list}
				items={itemsProp}
				onClickList={onClickList}
				onEnterList={onEnterList}
			/>
		);
		itemsProp = [];
	});

	return (
		<div className="fl w-25-l w-third-m w-100 lists">
			{listComponenets}
		</div>
	);
}

export default Lists;
