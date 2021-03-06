import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { openLoginComponent, logOutAccount, showPosts, showLoader } from "dispatchers";

class Nav extends Component {
	constructor(props) {
		super(props);

		this.openSearchLayout = this.openSearchLayout.bind(this);
		this.openLoginLayout = this.openLoginLayout.bind(this);
		this.logOut = this.logOut.bind(this);
		this.goToTop = this.goToTop.bind(this);
		this.backToNewersArticles = this.backToNewersArticles.bind(this);

		this.state = {
			userInfo: {},
		};
	}

	goToTop() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}

	backToNewersArticles() {
		this.props.showPosts(1);
		this.goToTop();
		this.props.showLoader();
	}

	openSearchLayout(event) {
		event.preventDefault();

		document.body.classList.add("overflow-hidden");
		document.getElementById("searchEngine").classList.add("d-flex");
		document.getElementById("searchBox").focus();
	}

	openLoginLayout(event) {
		this.props.openLoginComponent();
	}

	logOut() {
		this.props.logOutAccount();
	}

	componentDidMount() {
		var lastScrollTop = 0;

		document.addEventListener(
			"scroll",
			function() {
				let st = window.pageYOffset || document.documentElement.scrollTop;

				let navbar = document.getElementById("mainNav");
				let heightOfNavbar = document.getElementById("mainNav").offsetHeight;

				if (st < lastScrollTop) {
					if (st === 0) {
						navbar.classList.remove("is-fixed", "is-visible");
					} else navbar.classList.add("is-visible");
				} else if (st > heightOfNavbar) {
					navbar.classList.add("is-fixed");
					navbar.classList.remove("is-visible");
				}
			},
			false
		);
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
				<div className="container">
					<Link className="navbar-brand" to="/" onClick={this.backToNewersArticles}>
						HOME
					</Link>
					<div className="d-flex justify-content-end align-items-center">
						<ul className="navbar-nav ml-auto align-items-center flex-row">
							<li className="nav-item mx-2">
								<Link className="nav-link" to="/" onClick={this.openSearchLayout}>
									<i className="fas fa-search" title="Search" />
								</Link>
							</li>
							<li className="nav-item">
								{this.props.userInfo.user.name ? (
									<Link to="/" className="nav-link dropdown ">
										<span className="dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown">
											Hello {this.props.userInfo.user.name}
										</span>
										<div
											className="dropdown-menu right-0 left-auto"
											aria-labelledby="dropdownMenuLink">
											<div className="dropdown-item">Create A New Article</div>
											<div className="dropdown-item">Manage Articles</div>
											<div className="dropdown-item">Create A New Category</div>
											<div className="dropdown-item">Manage Categories</div>
											<div className="dropdown-item">Manage Users</div>
											<div className="dropdown-item" onClick={this.logOut}>
												Logout
											</div>
										</div>
									</Link>
								) : (
									<Link to="/" className="nav-link" onClick={this.openLoginLayout}>
										Login
									</Link>
								)}
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

Nav.propTypes = {
	userInfo: PropTypes.object,
	logOutAccount: PropTypes.func.isRequired,
	openLoginComponent: PropTypes.func.isRequired,
	showPosts: PropTypes.func.isRequired,
	showLoader: PropTypes.func.isRequired,
};

Nav.defaultProps = {
	userInfo: {},
};

const mapStateToProps = state => {
	return {
		userInfo: state.user,
	};
};

const mapDispatchToProps = { openLoginComponent, logOutAccount, showPosts, showLoader };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Nav);
