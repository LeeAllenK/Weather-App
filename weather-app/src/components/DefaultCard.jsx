
export function DefaultCard({ defaultData ,name , addOn}) {


	return (
		<div className='defaultCard'>
			<section className='Default'>
				<h1>{name}: </h1>
				<h2>{defaultData}{addOn}</h2>
			</section>
			<section>

			</section>
		</div>
	)
}