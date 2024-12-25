

export function WeatherCard({name , description, icon,tempHi, tempLo , day , date , sunset , sunrise , temp}){
	return(
		<div className='WeatherCard'>
			<section className='temps'>
			<h1 >Location: {name}</h1>		
			<p>{day}</p>
			<p>{date}</p>
			<p >HI: {tempHi}&deg;</p>
			<p >LO: {tempLo}&deg;</p>
			<p >sunrise: {sunrise}</p>		
			<p >sunset: {sunset}</p>		
			</section>
			<div className='iconBorder'>
				<img className='icon' alt='No image' src={icon}/>
				<p className='iconDescription'>{description}</p>
				<p className='iconTemp' >{temp}&deg;</p>
			</div>
		</div>
	)
}