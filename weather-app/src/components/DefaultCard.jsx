
export function DefaultCard({ defaultData ,date , addOn , day , icon , temp , description }) {


	return (
		<div className='defaultCard'>
			<section className='Default'>
				<h1>{day}</h1>
				<p>{description}</p>
				<img
				alt='No image'
				src={icon}	
				/>
				<p>HI {temp}&deg;</p>
				<p>Lo {temp}&deg;</p>
				<h2>{defaultData}{addOn}</h2>
			</section>
			<section>

			</section>
		</div>
	)
}