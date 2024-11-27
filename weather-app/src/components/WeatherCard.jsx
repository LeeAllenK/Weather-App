

export function WeatherCard({name , description, icon,tempHi, tempLo }){

	return(
		<div className='WeatherCard'>
			<section className='temps'>
			<h1 >NAME:{name}</h1>
			<h1 >Description:{description}</h1>
			<h1 >Icon:{icon}</h1>
			<p >HI:{tempHi}</p>
			<p >LO:{tempLo}</p>
			</section>
		</div>
	)
}