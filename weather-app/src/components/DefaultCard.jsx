
export function DefaultCard({day , icon , temp ,tempHi, tempLo, description }) {


	return (
		<div className='defaultCard'>
			<section className='Default'>
				<h1 >{day}<p>{temp}&deg;</p><img
				className='forecastIcon'
				alt='No image'
				src={icon}	
				/><p>HI {tempHi}&deg;</p><p>Lo {tempLo}&deg;</p>
				<p>{description}</p></h1>
			</section>
			<section>

			</section>
		</div>
	)
}