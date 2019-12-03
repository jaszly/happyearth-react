import React from 'react'
import Nav from './Nav.jsx'
import GoogleMap from 'google-map-react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Pin from './Pin.jsx'
import Sidebar from './Sidebar.jsx'
import '../styles/buttons.css'
import '../styles/cards.css'
import '../styles/forms.css'
import '../styles/icons.css'
import '../styles/gallery.css'
import '../styles/googlemap.css'
import '../styles/grid.css'
import '../styles/sidebar.css'
import '../styles/users.css'

class Spot extends React.Component {
	state = {
		spot: {
			liked: false,
			selectedImage: '',
			images: [],
			title: '',
			spotters: {
				name: '',
				avatar: ''
			},
			description: '',
			types: [],
			amenities: [],
			city: '',
			country: '',
			key: {
				key: 'AIzaSyCVJkF4x11QI221vToWHyVvM4voNYuYbwU'
			},
			center: {},
			zoom: 11
		},
		spotter: {}
	}

	UNSAFE_componentWillMount() {
		let spotId = this.props.match.params.id
		axios
			.get(`${process.env.REACT_APP_API}/spots/${spotId}`)
			.then(res => {
				res.data.selectedImage = res.data.images[0]
				console.log('res.data.selectedImage', res.data.selectedImage)
				console.log('res', res)
				this.setState({ spot: res.data })
				console.log({ spot: res.data })
				let spotterId = this.state.spot.spotters
				console.log('spotterId', spotterId)
				axios
					.get(`${process.env.REACT_APP_API}/users/${spotterId}`)
					.then(user => {
						console.log({ user: user })
						this.setState({ spotter: user.data })
						console.log('spotter', { spotter: user.data })
					})
					.catch(err => {
						console.log(err)
					})
			})
			.catch(err => console.log(err))
	}

	//Main Image
	clickedImage = image => {
		let spot = this.state.spot
		spot.selectedImage = image
		this.setState({ spot })
	}
	//Like button
	getClass = () => {
		return this.state.spot.liked
			? 'fas fa-globe-africa'
			: 'fas fa-globe-americas'
	}

	toggleLike = () => {
		let spot = this.state.spot
		spot.liked = !spot.liked
		this.setState({ spot })
	}

	render() {
		return (
			<>
				<div className="grid image">
					<div className="grid sidebar-left">
						<Sidebar />
						<div className="grid">
							<Nav />
							<div className="grid scroll">
								<div className="grid two">
									<div className="gallery">
										<div
											className="image-main"
											style={{
												backgroundImage: `url('${this.state.spot.selectedImage}')`
											}}
										>
											<button
												className="icon"
												onClick={() => this.toggleLike()}
											>
												<i className={this.getClass()}></i>
											</button>
										</div>
										<div className="thumbnails">
											{this.state.spot.images.map((image, index) => {
												return (
													<div
														className="thumbnail"
														style={{
															backgroundImage: `url(${image})`
														}}
														key={index}
														onClick={() => this.clickedImage(image)}
													></div>
												)
											})}
										</div>
									</div>
									<div>
										<GoogleMap
											bootstrapURLKeys={this.state.spot.key}
											center={this.state.spot.center}
											zoom={this.state.spot.zoom}
											className="map"
										>
											<Pin spot={this.state.spot} key={this.state.spot._id} />
										</GoogleMap>
									</div>
								</div>
								<div className="grid medium">
									<div>
										<div className="user">
											<div className="name">
												<small>Spotted by</small>
												<span>{this.state.spot.spotters.name}</span>
											</div>
										</div>
										<div className="content">
											<h1>{this.state.spot.title}</h1>
											<small>
												<i className="fas fa-map-marker-alt"></i>
												<span>
													{this.state.spot.city}, {this.state.spot.country}
												</span>
											</small>
										</div>
									</div>
									<div className="grid twocards">
										<div>
											<div className="grid">
												<h3>Amenities</h3>

												{this.state.spot.amenities.map(amenity => {
													return (
														<div className="content" key={amenity._id}>
															<li>
																<i className={amenity.icon}> </i>
																{amenity.name}
															</li>
														</div>
													)
												})}
											</div>
										</div>

										<div>
											<div className="grid">
												<h3>Amenities</h3>

												{this.state.spot.amenities.map(amenity => {
													return (
														<div className="content" key={amenity._id}>
															<li>
																<i className={amenity.icon}> </i>
																{amenity.name}
															</li>
														</div>
													)
												})}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default withRouter(Spot)
