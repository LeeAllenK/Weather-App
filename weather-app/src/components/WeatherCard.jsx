

export function WeatherCard({name ,tempHi, tempLo }){

	return(
		<div className='WeatherCard'>
			<h1 >{name}</h1>
			<section className='temps'>
			<p >HI:{tempHi}</p>
			<p >LO:{tempLo}</p>
			</section>
		</div>
	)
}