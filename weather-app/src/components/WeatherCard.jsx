

export function WeatherCard({name , description, icon,tempHi, tempLo , day , date , sunset , sunrise }){

	return(
		<div className='WeatherCard'>
			<section className='temps'>
			<h1 >Location: {name}</h1>		
			<p>{day}</p>
			<p>{date}</p>
			<p >HI:{tempHi}&deg;</p>
				<p >LO:{tempLo}&deg;</p>
			</section>
			<div className='IconBorder'>
				<p className='icon'>Icon:{icon}</p>
				<p className='description'>Description: {description}</p>
			</div>
			<section>
				
			</section>
		</div>
	)
}