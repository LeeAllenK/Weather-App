

export function WeatherCard({name , description, icon,tempHi, tempLo }){

	return(
		<div className='WeatherCard'>
			<section className='temps'>
			<h1 >Location: {name}I AM HERE</h1>
			<h1 >Description: {description}</h1>
			<h1 >Icon: {icon}</h1>
			<p >HI:123{tempHi}&deg;</p>
			<p >LO:4{tempLo}&deg;</p>
			</section>
		</div>
	)
}