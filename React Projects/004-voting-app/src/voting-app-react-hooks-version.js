import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './styles.css';

function UserInfo(props) {
	return (
		<div className="user-info">
			<span>Submitted by: </span>
			<img src={'images/avatars/' + props.userImage} alt="User Image" />
		</div>
	);
}
UserInfo.propTypes = {
	userImage: PropTypes.string
};

function ProductImage(props) {
	return (
		<div className="product-image">
			<img src={'images/products/' + props.imageSrc} width="960" height="796" alt="Product Image" />
		</div>
	);
}
ProductImage.propTypes = {
	imageSrc: PropTypes.string
}

function ProductListItem(props) {
	const product = props.product;

	return (
		<div className="product">
			<ProductImage imageSrc={product.image} />
			<div className="product-info">
				<div className="header">
					<button 
						className="caret"
						onClick={props.onClick}
					></button>
					<span className="vote-count">{product.voteCount}</span>
				</div>
				<div className="info">
					<a href="#">{product.title}</a>
					<p>{product.description}</p>
				</div>
				<UserInfo userImage={product.userImage} />
			</div>
		</div>
	);
}
ProductListItem.propTypes = {
	product: PropTypes.object,
	onClick: PropTypes.func
};

function ProductList() {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		import('./products.js')
			.then(({ products }) => setProducts(products));
	}, []);

	function handleVoteClick(id) {
		const productsCopy = products.map(product => {
			if (product.id === id) {
				return {...product, voteCount: product.voteCount + 1};
			}

			return {...product};
		});

		setProducts(productsCopy);
	}
	
	products.sort((productA, productB) => (
		productB.voteCount - productA.voteCount
	));

	const productList = products.map(product => (
		<ProductListItem 
			key={product.id}
			product={product}
			onClick={() => handleVoteClick(product.id)}
		/>
	));
	
	return (
		<div className="product-list">
			{productList}
		</div>
	);
}
	
ReactDOM.render(
	<ProductList />,
	document.getElementById('root')
);
