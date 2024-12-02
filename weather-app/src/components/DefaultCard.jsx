
export function DefaultCard({ defaultData ,date , addOn , day , icon , temp ,tempHi, tempLo, description }) {


	return (
		<div className='defaultCard'>
			<section className='Default'>
				<h1>{day}</h1>
				<p>{temp}&deg;</p>
				<img
				className='forecastIcon'
				alt='No image'
				src={icon}	
				/>
				<p>HI {tempHi}&deg;</p>
				<p>Lo {tempLo}&deg;</p>
				<h2>{defaultData}{addOn}</h2>
				<p>{description}</p>
			</section>
			<section>

			</section>
		</div>
	)
}