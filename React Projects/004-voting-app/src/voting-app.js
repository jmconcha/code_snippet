import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './styles.css';

class UserInfo extends React.Component {
	render() {
		return (
			<div className="user-info">
				<span>Submitted by: </span>
				<img src={'images/avatars/' + this.props.userImage} alt="User Image" />
			</div>
		);
	}
}
UserInfo.propTypes = {
	userImage: PropTypes.string
};

class ProductImage extends React.Component {
	render() {
		return (
			<div className="product-image">
				<img src={'images/products/' + this.props.imageSrc} width="960" height="796" alt="Product Image" />
			</div>
		);
	}
}
ProductImage.propTypes = {
	imageSrc: PropTypes.string
}

class ProductListItem extends React.Component {
	render() {
		const product = this.props.product;

		return (
			<div className="product">
				<ProductImage imageSrc={product.image} />
				<div className="product-info">
					<div className="header">
						<button 
							className="caret"
							onClick={this.props.onClick}
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
}
ProductListItem.propTypes = {
	product: PropTypes.object,
	onClick: PropTypes.func
};

class ProductList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			products: [] 
		};

		this.handleVoteClick = this.handleVoteClick.bind(this);
	}

	componentDidMount() {
		this.setState({ products: this.props.products });
	}

	sortProducts(products) {
		products.sort((productA, productB) => (
			productB.voteCount - productA.voteCount
		));

		return products;
	}

	handleVoteClick(id) {
		this.setState(currentState => {
			const productsCopy = currentState.products.slice();

			for (let product of productsCopy) {
				if (product.id === id) {
					product.voteCount++;
					break;
				}
			}

			return { products: productsCopy };
		});

		this.setState(currentState => {
			const productsCopy = currentState.products.slice();
			const sortedProductsCopy = this.sortProducts(productsCopy);

			return { products: sortedProductsCopy };
		});
	}

	render() {
		const products = this.state.products;
		const productList = products.map(product => (
			<ProductListItem 
				key={product.id}
				product={product}
				onClick={() => this.handleVoteClick(product.id)}
			/>
		));
		
		return (
			<div className="product-list">
				{productList}
			</div>
		);
	}
}
ProductList.propTypes = {
	products: PropTypes.array
};

const productList = [
	{
		id: '1',
		image: 'image-steel.png',
		voteCount: 59,
		title: 'Tinfoild: Tailored tinfoil hats',
		description: 'We already have you measurements and shipping address',
		userImage: 'veronika.jpg',
	},
	{
		id: '2',
		image: 'image-aqua.png',
		voteCount: 44,
		title: 'Yello Pail',
		description: 'On-demand sand castle construction expertise.',
		userImage: 'daniel.jpg',
	},
	{
		id: '3',
		image: 'image-yellow.png',
		voteCount: 20,
		title: 'Haught or Naught',
		description: 'High-minded or absend-minded? You decide',
		userImage: 'molly.png',
	},
	{
		id: '4',
		image: 'image-rose.png',
		voteCount: 21,
		title: 'Supermajority: The Fantasy Congress Leagure',
		description: 'Earn points when you favorite politicians pass legislation.',
		userImage: 'kristy.png',
	}

];

ReactDOM.render(
	<ProductList products={productList} />,
	document.getElementById('root')
);
